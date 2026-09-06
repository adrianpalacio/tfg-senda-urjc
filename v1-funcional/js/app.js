/* Senda URJC v1 — aplicación de usuario (I4: + modo «Voy contigo» con prealerta, alerta y SOS). */

(function () {
  "use strict";

  let mapa, capaRutas, capaLuminarias, marcadorAvance;
  let rutasActuales = [];
  let rutaElegida = null;
  let horaSimulada = 21;

  /* ============ RF-01 — acceso con cuenta corporativa (LDAP/SSO simulado) ============ */
  const formLogin = document.getElementById("form-login");
  formLogin.addEventListener("submit", ev => {
    ev.preventDefault();
    const email = document.getElementById("login-email").value.trim().toLowerCase();
    const error = document.getElementById("login-error");
    if (!/@(alumnos\.)?urjc\.es$/.test(email)) {
      error.textContent = "Solo se admiten cuentas corporativas @urjc.es o @alumnos.urjc.es (RF-01).";
      error.hidden = false;
      return;
    }
    localStorage.setItem("senda.sesion", JSON.stringify({ email, inicio: Date.now() }));
    arrancarApp(email);
  });

  const sesion = (() => {
    try { return JSON.parse(localStorage.getItem("senda.sesion")); } catch (e) { return null; }
  })();
  /* RNF: sesión persistente de 30 días (decisión documentada) */
  if (sesion && Date.now() - sesion.inicio < 30 * 86400000) arrancarApp(sesion.email);

  function arrancarApp(email) {
    document.getElementById("pantalla-login").hidden = true;
    document.getElementById("app").hidden = false;
    iniciarMapa();
    montarVistas(email);
    Efemerides.inicializar(CAMPUS.centro[0], CAMPUS.centro[1]).then(refrescarEstado);
    cambiarHora(21);
  }

  /* ============ Mapa (Leaflet + OpenStreetMap) ============ */
  function iniciarMapa() {
    if (mapa) return;
    mapa = L.map("mapa").setView(CAMPUS.centro, CAMPUS.zoom);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "&copy; OpenStreetMap"
    }).addTo(mapa);

    POIS.forEach(p => {
      L.marker([p.lat, p.lon], { title: p.nombre })
        .addTo(mapa)
        .bindPopup("<b>" + p.nombre + "</b>");
    });

    capaLuminarias = L.layerGroup().addTo(mapa);
    capaRutas = L.layerGroup().addTo(mapa);
    pintarLuminarias();

    LumenMock.on("zona.apagon", () => { pintarLuminarias(); recalcularSiProcede(); });
    LumenMock.on("luminaria.estado.cambio", () => { pintarLuminarias(); recalcularSiProcede(); });
  }

  function pintarLuminarias() {
    capaLuminarias.clearLayers();
    LumenMock.listarLuminarias().forEach(l => {
      const color = l.estado === "ENCENDIDA" ? "#F5C518" :
                    l.estado === "APAGADA" ? "#555" : "#CB0017";
      L.circleMarker([l.lat, l.lon], {
        radius: 4, color, fillColor: color, fillOpacity: .9, weight: 1
      }).bindTooltip(l.id + " · " + l.modelo + " · " + l.estado +
                     " · " + l.iluminancia_lux + " lux").addTo(capaLuminarias);
    });
  }

  /* ============ Vistas del panel lateral ============ */
  function montarVistas(email) {
    document.querySelectorAll(".nav-btn").forEach(b => {
      b.addEventListener("click", () => {
        document.querySelectorAll(".nav-btn").forEach(x => x.classList.remove("activo"));
        document.querySelectorAll(".vista").forEach(x => x.classList.remove("activo"));
        b.classList.add("activo");
        document.getElementById("vista-" + b.dataset.vista).classList.add("activo");
      });
    });
    montarVistaRutas();
    montarVistaVoyContigo();
    document.getElementById("btn-sos").addEventListener("click", accionSOS);
    document.getElementById("hora-sim").addEventListener("input", ev => cambiarHora(parseFloat(ev.target.value)));
  }

  /* ---------- RF-02 / RF-03 / RF-21 — cálculo de rutas ---------- */
  function montarVistaRutas() {
    const v = document.getElementById("vista-rutas");
    const opciones = POIS.map(p => `<option value="${p.id}">${p.nombre}</option>`).join("");
    v.innerHTML = `
      <h2>Rutas seguras</h2>
      <label for="sel-origen">Origen</label>
      <select id="sel-origen">${opciones}</select>
      <label for="sel-destino">Destino</label>
      <select id="sel-destino">${opciones}</select>
      <label><input type="checkbox" id="chk-accesible"> Ruta accesible (evitar escaleras) <span class="nota-req">RF-21</span></label>
      <button id="btn-calcular" class="btn btn-primario">Calcular rutas seguras</button>
      <p class="nota-req">RF-02 · RF-03 — hasta 3 alternativas ordenadas por Índice de Seguridad (0-100)</p>
      <div id="lista-rutas"></div>
      <h3>Demostración del entorno</h3>
      <button id="btn-apagon" class="btn btn-suave">Simular apagón en la zona de jardines (Z3)</button>
      <button id="btn-fin-apagon" class="btn btn-suave" hidden>Resolver el apagón</button>
      <p class="nota-req">Webhook <code>zona.apagon</code> del mock LumenConnect (IEXT-05)</p>`;
    document.getElementById("sel-destino").selectedIndex = Math.min(POIS.length - 1, 8);
    document.getElementById("btn-calcular").addEventListener("click", calcularYPintar);
    document.getElementById("btn-apagon").addEventListener("click", () => {
      LumenMock.simularApagon("Z3");
      document.getElementById("btn-apagon").hidden = true;
      document.getElementById("btn-fin-apagon").hidden = false;
    });
    document.getElementById("btn-fin-apagon").addEventListener("click", () => {
      LumenMock.resolverApagon("Z3");
      document.getElementById("btn-apagon").hidden = false;
      document.getElementById("btn-fin-apagon").hidden = true;
    });
  }

  function calcularYPintar() {
    const origen = document.getElementById("sel-origen").value;
    const destino = document.getElementById("sel-destino").value;
    const sinEscaleras = document.getElementById("chk-accesible").checked;
    const cont = document.getElementById("lista-rutas");
    if (origen === destino) { cont.innerHTML = "<p class='ruta-aviso'>Elige origen y destino distintos.</p>"; return; }
    rutasActuales = Router.calcularRutas(origen, destino, { sinEscaleras });
    rutaElegida = null;
    pintarRutas();
    const cfg = ISP.config();
    cont.innerHTML = rutasActuales.length === 0
      ? "<p class='ruta-aviso'>No hay ruta disponible con ese filtro.</p>"
      : rutasActuales.map((r, i) => {
          const clase = r.isp >= 70 ? "isp-alta" : r.isp >= cfg.umbralCritico ? "isp-media" : "isp-baja";
          return `
          <div class="tarjeta-ruta" data-i="${i}" role="button" tabindex="0">
            <div class="fila">
              <strong>Ruta ${i + 1}</strong>
              <span class="isp-pastilla ${clase}">${r.isp}</span>
            </div>
            <div class="fila"><span>${r.distancia} m · ${r.minutos} min</span>
              <span>${r.conEscaleras ? "escaleras" : "sin escaleras"}</span></div>
            ${r.segura ? "" : `<p class="ruta-aviso">Tramo por debajo del umbral de seguridad (${cfg.umbralCritico}): no recomendada.</p>`}
          </div>`;
        }).join("") +
        (rutasActuales.length === 1
          ? `<p>Solo existe una ruta. Puedes solicitar acompañamiento de un voluntario en «Voy contigo».</p>`
          : "");
    cont.querySelectorAll(".tarjeta-ruta").forEach(t => {
      t.addEventListener("click", () => elegirRuta(parseInt(t.dataset.i, 10)));
    });
  }

  function elegirRuta(i) {
    rutaElegida = rutasActuales[i];
    document.querySelectorAll(".tarjeta-ruta").forEach((t, j) => t.classList.toggle("elegida", j === i));
    pintarRutas();
    /* RF-13 / S-06: si hay trayecto activo, la nueva ruta re-ancla la supervisión sin alerta */
    if (VoyContigo.estadoPublico().estado !== "inactivo") VoyContigo.recalcular(rutaElegida);
    refrescarVoyContigo(VoyContigo.estadoPublico());
  }

  function pintarRutas() {
    capaRutas.clearLayers();
    const cfg = ISP.config();
    rutasActuales.forEach((r, i) => {
      const color = r.isp >= 70 ? "#1E7A2E" : r.isp >= cfg.umbralCritico ? "#B26B00" : "#CB0017";
      L.polyline(Router.coordsDeRuta(r), {
        color,
        weight: rutaElegida === r ? 7 : 4,
        opacity: rutaElegida === r ? .95 : .55,
        dashArray: r.segura ? null : "6 8"
      }).bindTooltip("Ruta " + (i + 1) + " · ISP " + r.isp).addTo(capaRutas);
    });
  }

  function recalcularSiProcede() {
    if (rutasActuales.length) calcularYPintar();
  }

  /* ---------- CU-03 / CU-04 — Voy contigo ---------- */
  function montarVistaVoyContigo() {
    const v = document.getElementById("vista-voycontigo");
    v.innerHTML = `
      <h2>Voy contigo</h2>
      <div id="vc-estado"></div>
      <div id="vc-controles"></div>
      <h3>Lo que ve tu contacto <span class="nota-req">vista simulada · RF-07</span></h3>
      <ul class="feed" id="vc-feed"></ul>`;
    VoyContigo.on(refrescarVoyContigo);
    refrescarVoyContigo(VoyContigo.estadoPublico());
  }

  function refrescarVoyContigo(s) {
    const est = document.getElementById("vc-estado");
    const ctr = document.getElementById("vc-controles");
    if (!est) return;

    if (s.estado === "inactivo") {
      est.innerHTML = `<p>Sin trayecto activo.</p>` +
        (s.contacto
          ? `<p class="chip chip-ok">Contacto de confianza: ${s.contacto}</p>`
          : `<p class="chip chip-alerta">Sin contacto configurado — las alertas irían al Servicio de Seguridad (RF-12)</p>`);
      ctr.innerHTML = `<button id="vc-iniciar" class="btn btn-primario" ${rutaElegida ? "" : "disabled"}>
          Activar «Voy contigo» con la ruta elegida</button>
        <p class="nota-req">${rutaElegida ? "Ruta elegida: ISP " + rutaElegida.isp + " · " + rutaElegida.distancia + " m" : "Primero calcula y elige una ruta en la pestaña Rutas."}</p>`;
      const b = document.getElementById("vc-iniciar");
      if (b) b.addEventListener("click", () => VoyContigo.iniciar(rutaElegida));
    } else if (s.estado === "activo") {
      est.innerHTML = `<p class="chip chip-ok">Trayecto en curso — ${Math.round(s.progreso * 100)} %</p>`;
      ctr.innerHTML = `
        <p>Simular una situación del protocolo de detección (CU-03):</p>
        <button class="btn btn-suave" data-sim="desvio">Provocar desvío</button>
        <button class="btn btn-suave" data-sim="parada">Provocar parada</button>
        <button class="btn btn-suave" data-sim="cobertura">Perder cobertura</button>
        <button id="vc-fin" class="btn btn-secundario" style="margin-top:10px">Finalizar trayecto</button>`;
      ctr.querySelectorAll("[data-sim]").forEach(b =>
        b.addEventListener("click", () => VoyContigo.simular(b.dataset.sim)));
      document.getElementById("vc-fin").addEventListener("click", () => VoyContigo.finalizar("Trayecto finalizado por el usuario."));
      quitarModal();
      moverMarcadorAvance(s);
    } else if (s.estado === "prealerta") {
      mostrarModalPrealerta(s);
    } else if (s.estado === "alerta") {
      est.innerHTML = `<p class="chip chip-alerta">ALERTA activa — ${s.motivoPrealerta}</p>`;
      ctr.innerHTML = `<button id="vc-ok" class="btn btn-primario">Estoy bien — cancelar la alerta</button>
        <p class="nota-req">CU-04: el aviso de falsa alarma llega a quienes recibieron la alerta.</p>`;
      document.getElementById("vc-ok").addEventListener("click", () => VoyContigo.cancelarAlerta());
      quitarModal();
    }

    const feed = document.getElementById("vc-feed");
    feed.innerHTML = s.feed.map(l =>
      `<li><strong>${l.hora}</strong> — ${l.texto}</li>`).join("") || "<li>(sin eventos)</li>";
  }

  function moverMarcadorAvance(s) {
    if (!s.ruta) return;
    const coords = Router.coordsDeRuta(s.ruta);
    const idx = Math.min(coords.length - 1, Math.floor(s.progreso * (coords.length - 1)));
    const punto = coords[idx];
    if (!marcadorAvance) {
      marcadorAvance = L.circleMarker(punto, { radius: 9, color: "#CB0017", fillColor: "#fff", fillOpacity: 1, weight: 4 }).addTo(mapa);
    } else marcadorAvance.setLatLng(punto);
  }

  function mostrarModalPrealerta(s) {
    let m = document.getElementById("modal-prealerta");
    if (!m) {
      document.getElementById("capa-modales").innerHTML = `
        <div class="modal-fondo" id="modal-prealerta">
          <div class="modal modal-prealerta" role="alertdialog" aria-labelledby="pa-titulo">
            <h2 id="pa-titulo">¿Está todo bien?</h2>
            <p id="pa-motivo"></p>
            <div class="cuenta-atras" id="pa-cuenta"></div>
            <p>Si no confirmas, se avisará automáticamente a <strong id="pa-destino"></strong>.</p>
            <div class="acciones">
              <button id="pa-ok" class="btn btn-primario">Estoy bien</button>
            </div>
            <p class="nota-req">RF-12 · prealerta con vibración y aviso (RF-11); plazo configurable</p>
          </div>
        </div>`;
      document.getElementById("pa-ok").addEventListener("click", () => VoyContigo.confirmarOk());
    }
    document.getElementById("pa-motivo").textContent = s.motivoPrealerta +
      (s.sinCobertura ? " (sin cobertura: prealerta local, se sincronizará al recuperar señal)" : "");
    document.getElementById("pa-cuenta").textContent = s.restante + " s";
    document.getElementById("pa-destino").textContent = s.contacto || "el Servicio de Seguridad del campus";
  }

  function quitarModal() { document.getElementById("capa-modales").innerHTML = ""; }

  function accionSOS() {
    if (!VoyContigo.sos()) {
      alert("El botón SOS actúa durante un trayecto. Activa «Voy contigo» primero (demo).");
    }
  }

  /* ---------- Hora simulada, efemérides y barra de estado ---------- */
  function cambiarHora(h) {
    horaSimulada = h;
    LumenMock.setHora(h);
    document.getElementById("hora-sim").value = h;
    document.getElementById("hora-sim-out").textContent = Efemerides.formatoHora(h);
    pintarLuminarias();
    refrescarEstado();
    recalcularSiProcede();
  }

  function refrescarEstado() {
    const deDia = Efemerides.esDeDia(horaSimulada);
    document.getElementById("estado-hora").textContent = "🕒 " + Efemerides.formatoHora(horaSimulada);
    document.getElementById("estado-luz").textContent =
      (deDia ? "☀ De día" : "🌙 De noche") +
      " (orto " + Efemerides.formatoHora(Efemerides.orto) +
      " · ocaso " + Efemerides.formatoHora(Efemerides.ocaso) +
      " — " + Efemerides.fuente + ")";
    document.getElementById("estado-lumen").textContent =
      "💡 " + LumenMock.total + " luminarias · " + LumenMock.alertas().length + " alertas";
  }
})();
