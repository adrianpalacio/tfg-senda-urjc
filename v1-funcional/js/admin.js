/* Senda URJC v1 — panel de administración (RF-16..RF-20, CU-08/CU-09/CU-10).
   Perfil institucional (PDI/PTGAS). En la v1 el acceso directo está abierto para facilitar la
   demo; en producción exigiría rol administrador tras el SSO (RNF-13/RNF-15). */

(function () {
  "use strict";

  /* ---------- Tickets (RF-17 / RF-18) ---------- */
  function pintarTickets() {
    const tbody = document.querySelector("#tabla-tickets tbody");
    const tickets = Incidencias.todas().slice().reverse();
    tbody.innerHTML = tickets.map(t => `
      <tr>
        <td><strong>${t.id}</strong><br><span class="nota-req">${new Date(t.fecha).toLocaleString("es-ES")}</span></td>
        <td>${Incidencias.nombreCategoria(t.categoria)}${t.descripcion ? "<br><span class='nota-req'>«" + t.descripcion + "»</span>" : ""}</td>
        <td>${t.zona}</td>
        <td class="estado-${t.estado.replace(" ", "")}">${t.estado}</td>
        <td>${t.gravedad || "—"}</td>
        <td>
          ${t.estado !== "resuelto" ? `
            <button class="btn btn-suave" data-accion="grave" data-id="${t.id}">Grave</button>
            <button class="btn btn-suave" data-accion="media" data-id="${t.id}">Media</button>
            <button class="btn btn-suave" data-accion="curso" data-id="${t.id}">En curso</button>
            <button class="btn btn-suave" data-accion="resolver" data-id="${t.id}">Resolver</button>
            <button class="btn btn-suave" data-accion="disolver" data-id="${t.id}">Sin efecto</button>` : ""}
        </td>
      </tr>`).join("") || "<tr><td colspan='6'>(sin tickets)</td></tr>";

    tbody.querySelectorAll("button[data-accion]").forEach(b => {
      b.addEventListener("click", () => {
        const id = b.dataset.id;
        switch (b.dataset.accion) {
          case "grave": Incidencias.actualizar(id, { gravedad: "grave", estado: "en curso" }); break;
          case "media": Incidencias.actualizar(id, { gravedad: "media", estado: "en curso" }); break;
          case "curso": Incidencias.actualizar(id, { estado: "en curso" }); break;
          case "resolver": Incidencias.actualizar(id, { estado: "resuelto" }); break;
          case "disolver": Incidencias.actualizar(id, { gravedad: null }); break;   // S-12: puede disolverlo
        }
        pintarTickets();
        pintarEstadisticas();
      });
    });
  }

  /* ---------- Alertas del proveedor ---------- */
  function pintarAlertas() {
    const ul = document.getElementById("lista-alertas");
    const alertas = LumenMock.alertas();
    ul.innerHTML = alertas.map(a =>
      `<li><strong>${a.severidad}</strong> · ${a.tipo} · zona ${a.zona} — ${a.descripcion}</li>`
    ).join("") || "<li>(sin alertas activas)</li>";
  }

  /* ---------- Parámetros del índice (RF-20) ---------- */
  const rangos = { i: document.getElementById("peso-i"), a: document.getElementById("peso-a"), e: document.getElementById("peso-e") };
  const salidas = { i: document.getElementById("out-i"), a: document.getElementById("out-a"), e: document.getElementById("out-e") };

  function cargarParametros() {
    const c = ISP.config();
    rangos.i.value = Math.round(c.wI * 100);
    rangos.a.value = Math.round(c.wA * 100);
    rangos.e.value = Math.round(c.wE * 100);
    document.getElementById("umbral").value = c.umbralCritico;
    document.getElementById("pen-averia").value = c.penalizacionAveria;
    refrescarSalidas();
  }

  function refrescarSalidas() {
    const total = (+rangos.i.value) + (+rangos.a.value) + (+rangos.e.value) || 1;
    salidas.i.textContent = Math.round(rangos.i.value / total * 100) + " %";
    salidas.a.textContent = Math.round(rangos.a.value / total * 100) + " %";
    salidas.e.textContent = Math.round(rangos.e.value / total * 100) + " %";
  }

  Object.values(rangos).forEach(r => r.addEventListener("input", refrescarSalidas));

  document.getElementById("guardar-params").addEventListener("click", () => {
    const total = (+rangos.i.value) + (+rangos.a.value) + (+rangos.e.value) || 1;
    ISP.guardarConfig({
      wI: rangos.i.value / total,
      wA: rangos.a.value / total,
      wE: rangos.e.value / total,
      umbralCritico: Math.max(0, Math.min(100, parseInt(document.getElementById("umbral").value, 10) || 30)),
      penalizacionAveria: Math.max(0, Math.min(100, parseInt(document.getElementById("pen-averia").value, 10) || 35))
    });
    document.getElementById("params-aviso").textContent =
      "Guardado. Las próximas rutas se calculan con los nuevos parámetros (RF-20).";
  });

  /* ---------- Estadísticas (RF-19) ---------- */
  function pintarEstadisticas() {
    const s = Incidencias.estadisticas();
    document.getElementById("kpis").innerHTML = `
      <div class="kpi"><b>${s.total}</b>reportes</div>
      <div class="kpi"><b>${s.abiertas}</b>abiertos</div>
      <div class="kpi"><b>${s.enCurso}</b>en curso</div>
      <div class="kpi"><b>${s.resueltas}</b>resueltos</div>`;
    const max = Math.max(1, ...s.porCategoria.map(c => c.n));
    document.getElementById("stats-categorias").innerHTML = s.porCategoria.map(c => `
      <div class="pesos-fila">
        <label>${c.nombre}</label>
        <div style="flex:1;background:var(--gris-fondo);border-radius:6px;height:16px">
          <div style="width:${Math.round(c.n / max * 100)}%;background:var(--urjc-rojo);height:16px;border-radius:6px"></div>
        </div>
        <output>${c.n}</output>
      </div>`).join("");
  }

  pintarTickets();
  pintarAlertas();
  cargarParametros();
  pintarEstadisticas();
})();
