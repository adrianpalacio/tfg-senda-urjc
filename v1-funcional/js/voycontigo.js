/* Senda URJC v1 — modo «Voy contigo» (RF-06..RF-14, CU-03/CU-04).
   Estados: inactivo → activo → prealerta → (ok | alerta) → cerrado.
   El avance del usuario es SIMULADO (declarado): un marcador recorre la ruta y unos botones
   provocan los tres disparadores reales del protocolo (desvío, parada, pérdida de cobertura).
   Reglas clave implementadas:
   - Prealerta con cuenta atrás configurable (30 s por defecto; S-05: la ajusta el usuario).
   - Sin confirmación → alerta con última ubicación al contacto o, si no hay, a Seguridad (RF-12).
   - SOS → alerta inmediata a Seguridad Y contacto (RF-14).
   - Cancelación posterior → aviso de «todo OK / falsa alarma» a los avisados (CU-04).
   - Recalcular ruta en trayecto → re-anclaje SIN alerta, notificando el cambio (RF-13 / S-06).
   - Sin cobertura: el evento se encola y se transmite al recuperar señal (CU-04/E1, RNF-12). */

const VoyContigo = (() => {
  let estado = "inactivo";
  let ruta = null;
  let progreso = 0;                  // 0..1 sobre la polilínea
  let temporizadorAvance = null;
  let temporizadorPrealerta = null;
  let restante = 0;
  let motivoPrealerta = "";
  let sinCobertura = false;
  let colaPendiente = [];            // eventos encolados mientras no hay señal
  const feed = [];                   // lo que ve el contacto de confianza (vista simulada)
  let escuchas = [];

  function on(cb) { escuchas.push(cb); }
  function emitir() { escuchas.forEach(cb => cb(estadoPublico())); }

  function registrarFeed(texto, tipo = "info") {
    const linea = { hora: new Date().toLocaleTimeString("es-ES"), texto, tipo };
    if (sinCobertura) { colaPendiente.push(linea); return; }
    feed.unshift(linea);
  }

  function contactoConfigurado() {
    try { return (JSON.parse(localStorage.getItem("senda.perfil")) || {}).contacto || null; }
    catch (e) { return null; }
  }

  function destinatarioAlerta() {
    /* RF-12: al contacto seleccionado o, en su defecto, al Servicio de Seguridad */
    return contactoConfigurado() || "Servicio de Seguridad del campus";
  }

  function iniciar(rutaElegida) {
    ruta = rutaElegida;
    progreso = 0;
    estado = "activo";
    sinCobertura = false;
    colaPendiente = [];
    registrarFeed("Trayecto iniciado. Ruta compartida (" + ruta.distancia + " m, ISP " + ruta.isp + ").");
    temporizadorAvance = setInterval(() => {
      if (estado !== "activo") return;
      progreso = Math.min(1, progreso + 0.012);
      if (progreso >= 1) finalizar("El usuario ha llegado a su destino.");
      emitir();
    }, 400);
    emitir();
  }

  function simular(disparador) {
    if (estado !== "activo") return;
    const motivos = {
      desvio: "Desvío del trazado de la ruta por encima del umbral",
      parada: "Detención prolongada sin movimiento",
      cobertura: "Pérdida de señal GPS / cobertura de datos"
    };
    motivoPrealerta = motivos[disparador] || disparador;
    if (disparador === "cobertura") {
      sinCobertura = true;
      /* CU-04/E1: sin red la prealerta es local y lo no enviado se encola */
    }
    estado = "prealerta";
    restante = ISP.config().plazoConfirmacion;
    temporizadorPrealerta = setInterval(() => {
      restante -= 1;
      if (restante <= 0) dispararAlerta();
      emitir();
    }, 1000);
    emitir();
  }

  function confirmarOk() {
    /* El usuario pulsa «Estoy bien» antes de agotar la cuenta atrás */
    if (estado !== "prealerta") return;
    clearInterval(temporizadorPrealerta);
    if (sinCobertura) recuperarCobertura();   // al confirmar asumimos señal recuperada en la demo
    estado = "activo";
    registrarFeed("Prealerta cancelada por el usuario («Estoy bien»).", "ok");
    emitir();
  }

  function dispararAlerta() {
    clearInterval(temporizadorPrealerta);
    estado = "alerta";
    registrarFeed("⚠ ALERTA — " + motivoPrealerta + ". Última ubicación enviada a: " +
                  destinatarioAlerta() + ".", "alerta");
    if (sinCobertura) {
      /* el servidor detecta la falta de latido y avisa por su lado al recuperar (RNF-12) */
      setTimeout(recuperarCobertura, 4000);
    }
    emitir();
  }

  function recuperarCobertura() {
    if (!sinCobertura) return;
    sinCobertura = false;
    colaPendiente.forEach(l => feed.unshift(l));
    colaPendiente = [];
    registrarFeed("Cobertura recuperada: eventos pendientes sincronizados.", "ok");
  }

  function sos() {
    /* RF-14: inmediata, sin prealerta, a Seguridad y al contacto */
    if (estado === "inactivo") return false;
    clearInterval(temporizadorPrealerta);
    estado = "alerta";
    motivoPrealerta = "Botón SOS pulsado por el usuario";
    registrarFeed("⚠ SOS — Alerta inmediata al Servicio de Seguridad del campus" +
                  (contactoConfigurado() ? " y al contacto de confianza (" + contactoConfigurado() + ")" : "") +
                  ". Ubicación en tiempo real activa.", "alerta");
    emitir();
    return true;
  }

  function cancelarAlerta() {
    /* CU-04: «todo OK» posterior → aviso de falsa alarma a los avisados */
    if (estado !== "alerta") return;
    estado = "activo";
    registrarFeed("El usuario indica que está bien. Aviso de falsa alarma enviado a los avisados.", "ok");
    emitir();
  }

  function recalcular(nuevaRuta) {
    /* RF-13 / S-06: la supervisión se re-ancla a la nueva ruta SIN generar alerta */
    if (estado === "inactivo") return;
    ruta = nuevaRuta;
    progreso = 0;
    registrarFeed("El usuario ha cambiado de ruta. Supervisión re-anclada a la nueva ruta (sin alerta).");
    emitir();
  }

  function finalizar(mensaje) {
    clearInterval(temporizadorAvance);
    clearInterval(temporizadorPrealerta);
    estado = "inactivo";
    if (mensaje) registrarFeed(mensaje, "ok");
    emitir();
  }

  function estadoPublico() {
    return { estado, progreso, restante, motivoPrealerta, sinCobertura,
             ruta, feed, contacto: contactoConfigurado() };
  }

  return { iniciar, simular, confirmarOk, cancelarAlerta, sos, recalcular, finalizar, on, estadoPublico };
})();
