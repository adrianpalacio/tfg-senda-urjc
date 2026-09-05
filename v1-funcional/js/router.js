/* Senda URJC v1 — cálculo de rutas (RF-02, RF-03, RF-21).
   Dijkstra sobre el grafo del campus, con coste = longitud × factor de inseguridad, de modo
   que la ruta "corta pero oscura" pierde contra la "algo más larga pero segura". Las 3
   alternativas se obtienen por penalización iterativa: tras cada ruta, los tramos usados
   multiplican su coste y se relanza la búsqueda (alternativas reales, no permutaciones). */

const Router = (() => {
  const VELOCIDAD_M_MIN = 75;      // ritmo a pie ~4,5 km/h

  function vecinos(nodoId, excluirEscaleras) {
    return TRAMOS
      .filter(t => !excluirEscaleras || !t.escaleras)
      .filter(t => t.a === nodoId || t.b === nodoId)
      .map(t => ({ tramo: t, hasta: t.a === nodoId ? t.b : t.a }));
  }

  function costeTramo(t, penalizados) {
    const s = ISP.ispTramo(t);
    const factor = 1 + 3 * (100 - s.valor) / 100;          // ISP 100 → ×1 · ISP 0 → ×4
    const castigo = penalizados[t.id] || 1;
    return t.longitud * factor * castigo;
  }

  function dijkstra(origen, destino, penalizados, excluirEscaleras) {
    const dist = {}, previo = {}, visto = {};
    NODOS.forEach(n => { dist[n.id] = Infinity; });
    dist[origen] = 0;
    while (true) {
      let u = null, mejor = Infinity;
      for (const id in dist) if (!visto[id] && dist[id] < mejor) { mejor = dist[id]; u = id; }
      if (u === null || u === destino) break;
      visto[u] = true;
      vecinos(u, excluirEscaleras).forEach(({ tramo, hasta }) => {
        const d = dist[u] + costeTramo(tramo, penalizados);
        if (d < dist[hasta]) { dist[hasta] = d; previo[hasta] = { nodo: u, tramo }; }
      });
    }
    if (!isFinite(dist[destino])) return null;
    const tramos = [], nodos = [destino];
    let actual = destino;
    while (actual !== origen) {
      const p = previo[actual];
      if (!p) return null;
      tramos.unshift(p.tramo);
      nodos.unshift(p.nodo);
      actual = p.nodo;
    }
    return { tramos, nodos };
  }

  /* Devuelve hasta 3 alternativas ordenadas por ISP de ruta (RF-02: «las 3 más seguras»). */
  function calcularRutas(origen, destino, opciones = {}) {
    const penalizados = {};
    const rutas = [];
    for (let i = 0; i < 3; i++) {
      const r = dijkstra(origen, destino, penalizados, opciones.sinEscaleras);
      if (!r) break;
      const clave = r.tramos.map(t => t.id).join("|");
      if (rutas.some(x => x.clave === clave)) break;        // sin duplicados
      const seg = ISP.ispRuta(r.tramos);
      rutas.push({
        clave,
        nodos: r.nodos,
        tramos: r.tramos,
        isp: seg.valor,
        minimoTramo: seg.minimo,
        segura: seg.segura,
        distancia: seg.longitud,
        minutos: Math.max(1, Math.round(seg.longitud / VELOCIDAD_M_MIN)),
        conEscaleras: r.tramos.some(t => t.escaleras)
      });
      r.tramos.forEach(t => { penalizados[t.id] = (penalizados[t.id] || 1) * 2.5; });
    }
    rutas.sort((a, b) => b.isp - a.isp);
    return rutas;
  }

  function coordsDeRuta(ruta) {
    return ruta.nodos.map(id => { const n = nodoPorId(id); return [n.lat, n.lon]; });
  }

  return { calcularRutas, coordsDeRuta };
})();
