/* Senda URJC v1 — incidencias y tickets (RF-15..RF-18).
   Reporte tipificado (las 4 categorías del enunciado) → ticket en el panel (RF-17) con ciclo
   abierto → en curso → resuelto y gravedad grave/media (RF-18, validado en la Entrevista 1).
   Regla S-12 (corregida por el cliente): los reportes subjetivos NO penalizan el índice hasta
   que un administrador les asigna grado; puede modificarlo o disolverlo.
   Persistencia en localStorage (v1 sin backend; compartida entre app y panel). */

const Incidencias = (() => {
  const CLAVE = "senda.tickets";
  const CATEGORIAS = [
    { id: "farola",    nombre: "Farola fundida" },
    { id: "solitaria", nombre: "Zona solitaria / miedo" },
    { id: "obstaculo", nombre: "Obstáculo en la vía" },
    { id: "dificultad", nombre: "Punto con dificultad" }
  ];

  function todas() {
    try { return JSON.parse(localStorage.getItem(CLAVE)) || []; }
    catch (e) { return []; }
  }
  function guardar(lista) { localStorage.setItem(CLAVE, JSON.stringify(lista)); }

  function reportar({ categoria, zona, lat, lon, descripcion, autor }) {
    const lista = todas();
    const ticket = {
      id: "T-" + String(lista.length + 1).padStart(3, "0"),
      categoria, zona, lat, lon,
      descripcion: (descripcion || "").slice(0, 300),
      autor: autor || "anónimo",
      fecha: new Date().toISOString(),
      estado: "abierto",            // abierto | en curso | resuelto
      gravedad: null,               // null hasta que la administración la asigna (S-12)
      penaliza: false
    };
    lista.push(ticket);
    guardar(lista);
    return ticket;
  }

  /* Panel de administración (RF-18) */
  function actualizar(id, cambios) {
    const lista = todas();
    const t = lista.find(x => x.id === id);
    if (!t) return null;
    Object.assign(t, cambios);
    if (cambios.gravedad !== undefined) t.penaliza = cambios.gravedad !== null;
    if (cambios.estado === "resuelto") t.penaliza = false;   // resuelta → deja de penalizar
    guardar(lista);
    return t;
  }

  /* Tickets que penalizan el índice ahora mismo (con grado y sin resolver) */
  function activasConGrado() {
    return todas().filter(t => t.penaliza && t.estado !== "resuelto");
  }

  function nombreCategoria(id) {
    const c = CATEGORIAS.find(x => x.id === id);
    return c ? c.nombre : id;
  }

  function estadisticas() {
    const lista = todas();
    return {
      total: lista.length,
      abiertas: lista.filter(t => t.estado === "abierto").length,
      enCurso: lista.filter(t => t.estado === "en curso").length,
      resueltas: lista.filter(t => t.estado === "resuelto").length,
      porCategoria: CATEGORIAS.map(c => ({
        nombre: c.nombre,
        n: lista.filter(t => t.categoria === c.id).length
      }))
    };
  }

  return { CATEGORIAS, todas, reportar, actualizar, activasConGrado, nombreCategoria, estadisticas };
})();
