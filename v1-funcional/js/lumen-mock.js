/* Senda URJC v1 — mock de la API LumenConnect v2 (LumenSmart S.A.).
   LumenSmart es una empresa ficticia del enunciado: no hay API real que llamar. Este módulo
   replica su contrato tal y como lo define la ficha técnica FT-LC-2025-URJC-001 v2.3
   (endpoints, campos y comportamiento), emulando el sandbox documentado (50 luminarias
   simuladas). Decisión D-K: si existiera el sandbox real, este módulo se sustituye por
   llamadas HTTP sin tocar el resto del código.

   Endpoints emulados:
     GET /luminarias                      → listarLuminarias(filtros)
     GET /luminarias/{id}                 → luminaria(id)
     GET /zonas/{campus_id}/afluencia     → afluencia(campusId)
     GET /alertas                         → alertas(filtros)
   Webhooks emulados: zona.apagon, luminaria.averia (suscripción con on()). */

const LumenMock = (() => {
  const LUMINARIAS = [];
  const suscriptores = {};          // evento → [callback]
  let horaSimulada = 21;            // la fija la app (control de hora de la demo)
  let alertasActivas = [];

  /* --- Generación del parque de luminarias: a lo largo de los tramos del grafo --- */
  function generarParque() {
    let contador = 1;
    TRAMOS.forEach(t => {
      const n1 = nodoPorId(t.a), n2 = nodoPorId(t.b);
      const cuantas = t.longitud > 85 ? 2 : 1;          // 1-2 por tramo → ~50 total (paridad sandbox)
      for (let i = 1; i <= cuantas; i++) {
        const f = i / (cuantas + 1);
        LUMINARIAS.push({
          id: "LUM-MOS-" + String(contador++).padStart(3, "0"),
          modelo: t.via === "principal" ? "LC-400" : "LC-200",
          lat: n1.lat + (n2.lat - n1.lat) * f,
          lon: n1.lon + (n2.lon - n1.lon) * f,
          zona: t.zona,
          tramo: t.id,
          estado: "ENCENDIDA",       // ENCENDIDA | APAGADA | AVERIADA | EN_MANTENIMIENTO
          intensidad_pct: 80
        });
      }
    });
    /* Averías de partida para que la demo no salga plana (senda de jardines) */
    const enZ3 = LUMINARIAS.filter(l => l.zona === "Z3");
    if (enZ3.length >= 3) { enZ3[1].estado = "AVERIADA"; enZ3[enZ3.length - 2].estado = "AVERIADA"; }
    reconstruirAlertas();
  }

  function reconstruirAlertas() {
    alertasActivas = LUMINARIAS
      .filter(l => l.estado === "AVERIADA")
      .map(l => ({
        tipo: "AVERIA",
        severidad: l.modelo === "LC-400" ? "ALTA" : "MEDIA",   // ficha §5: principal vs senda
        luminaria: l.id, zona: l.zona, tramo: l.tramo,
        descripcion: "Avería en " + (l.modelo === "LC-400" ? "vía principal" : "senda peatonal")
      }));
  }

  /* --- Iluminancia simulada (campo iluminancia_lux del endpoint /luminarias/{id}) --- */
  function luxDe(l) {
    if (Efemerides.esDeDia(horaSimulada)) return 900;                 // luz solar
    if (l.estado !== "ENCENDIDA") return 0.8;                          // apagada/averiada de noche
    const base = l.modelo === "LC-400" ? 22 : 12;                      // UNE-EN 13201: 15 / 5 lux
    return Math.round(base * (l.intensidad_pct / 100) * 10) / 10;
  }

  /* --- API pública (síncrona en el mock; el contrato real es REST/JSON) --- */
  function listarLuminarias(filtros = {}) {
    return LUMINARIAS
      .filter(l => !filtros.zona || l.zona === filtros.zona)
      .filter(l => !filtros.estado || l.estado === filtros.estado)
      .map(l => ({ ...l, iluminancia_lux: luxDe(l) }));
  }

  function luminaria(id) {
    const l = LUMINARIAS.find(x => x.id === id);
    return l ? { ...l, iluminancia_lux: luxDe(l) } : null;
  }

  function afluencia(/* campusId */) {
    /* Índice relativo 0-100 por celda (¡cuenta ACTIVACIONES, no personas! — limitación #4a) */
    const deDia = Efemerides.esDeDia(horaSimulada);
    const madrugada = horaSimulada < 6.5;
    return ZONAS.map(z => {
      let v = deDia ? z.perfilDia : z.perfilNoche;
      if (madrugada) v = Math.max(1, Math.round(v * 0.3));
      return { zona: z.id, indice: v };
    });
  }

  function alertas(filtros = {}) {
    return alertasActivas.filter(a => !filtros.tipo || a.tipo === filtros.tipo);
  }

  /* --- Webhooks --- */
  function on(evento, cb) { (suscriptores[evento] = suscriptores[evento] || []).push(cb); }
  function emitir(evento, payload) { (suscriptores[evento] || []).forEach(cb => cb(payload)); }

  /* Simulación de un apagón de zona (disparo real: 3 luminarias consecutivas apagadas) */
  function simularApagon(zonaId) {
    const afectadas = LUMINARIAS.filter(l => l.zona === zonaId).slice(0, 3);
    afectadas.forEach(l => { l.estado = "APAGADA"; });
    alertasActivas.push({
      tipo: "APAGON", severidad: "CRITICA", zona: zonaId,
      descripcion: "Apagón de zona (3 luminarias consecutivas)",
      luminarias_afectadas: afectadas.map(l => ({ id: l.id, ultimo_lux_ambiental: 0.8 }))
    });
    emitir("zona.apagon", { zona: zonaId, luminarias_afectadas: afectadas.map(l => l.id) });
  }

  function resolverApagon(zonaId) {
    LUMINARIAS.filter(l => l.zona === zonaId && l.estado === "APAGADA")
              .forEach(l => { l.estado = "ENCENDIDA"; });
    alertasActivas = alertasActivas.filter(a => !(a.tipo === "APAGON" && a.zona === zonaId));
    emitir("luminaria.estado.cambio", { zona: zonaId });
  }

  function setHora(h) { horaSimulada = h; }

  generarParque();

  return { listarLuminarias, luminaria, afluencia, alertas, on, simularApagon, resolverApagon, setHora,
           get total() { return LUMINARIAS.length; } };
})();
