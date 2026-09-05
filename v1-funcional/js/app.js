/* Senda URJC v1 — aplicación de usuario (I2: + luminarias del mock, hora simulada y efemérides). */

(function () {
  "use strict";

  let mapa, capaLuminarias;
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
    Efemerides.inicializar(CAMPUS.centro[0], CAMPUS.centro[1]).then(refrescarEstado);
    document.getElementById("hora-sim").addEventListener("input", ev => cambiarHora(parseFloat(ev.target.value)));
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

    /* Red peatonal del grafo, en gris de fondo (I2: comprobar que el grafo casa con el campus) */
    TRAMOS.forEach(t => {
      const a = nodoPorId(t.a), b = nodoPorId(t.b);
      L.polyline([[a.lat, a.lon], [b.lat, b.lon]],
        { color: "#9aa0a6", weight: 2, opacity: .5, dashArray: t.escaleras ? "2 6" : null })
        .bindTooltip(t.id + " · " + t.longitud + " m · zona " + t.zona).addTo(mapa);
    });

    capaLuminarias = L.layerGroup().addTo(mapa);
    pintarLuminarias();

    LumenMock.on("zona.apagon", pintarLuminarias);
    LumenMock.on("luminaria.estado.cambio", pintarLuminarias);
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

  /* ---------- Hora simulada, efemérides y barra de estado ---------- */
  function cambiarHora(h) {
    horaSimulada = h;
    LumenMock.setHora(h);
    document.getElementById("hora-sim").value = h;
    document.getElementById("hora-sim-out").textContent = Efemerides.formatoHora(h);
    pintarLuminarias();
    refrescarEstado();
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
