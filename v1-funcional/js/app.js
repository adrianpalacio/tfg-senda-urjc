/* Senda URJC v1 — aplicación de usuario (I1: acceso + mapa del campus). */

(function () {
  "use strict";

  let mapa;

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
  }
})();
