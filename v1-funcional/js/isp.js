/* Senda URJC v1 — Índice de Seguridad Percibida (RF-03), fórmula de la ERS (F3 §8):
     ISP(tramo) = round( wI·I + wA·A + wE·E )  con  wI + wA + wE = 1
   - I (iluminación): de la iluminancia en lux (UNE-EN 13201): ≥15 lux → 100, ≤3 lux → 0,
     interpolación lineal. De día I=100 (efemérides: el criterio no penaliza con luz solar).
   - A (afluencia): índice 0-100 de la celda LumenSmart (relativo: activaciones, no personas).
   - E (entorno): parte de 100; restan averías, apagones de zona e incidencias con grado
     asignado por la administración (S-12: las subjetivas no penalizan hasta que un
     administrador les fija grado).
   Ruta: media ponderada por longitud; si algún tramo tiene ISP < umbral crítico (30 por
   defecto), la ruta se marca «no segura» y sale de las recomendadas (regla del eslabón débil). */

const ISP = (() => {
  const CONFIG_DEFECTO = {
    wI: 1 / 3, wA: 1 / 3, wE: 1 / 3,
    umbralCritico: 30,
    penalizacionAveria: 35,
    plazoConfirmacion: 30          // s, prealerta (configurable por el usuario, S-05)
  };

  function config() {
    try {
      const c = JSON.parse(localStorage.getItem("senda.config"));
      return { ...CONFIG_DEFECTO, ...(c || {}) };
    } catch (e) { return { ...CONFIG_DEFECTO }; }
  }

  function guardarConfig(parcial) {
    localStorage.setItem("senda.config", JSON.stringify({ ...config(), ...parcial }));
  }

  function componenteIluminacion(tramo) {
    const lums = LumenMock.listarLuminarias().filter(l => l.tramo === tramo.id);
    if (!lums.length) return 40;                            // tramo sin luminaria: penaliza solo
    const lux = Math.max(...lums.map(l => l.iluminancia_lux));
    if (lux >= 15) return 100;
    if (lux <= 3) return 0;
    return Math.round(((lux - 3) / 12) * 100);
  }

  function componenteAfluencia(tramo, tablaAfluencia) {
    const celda = tablaAfluencia.find(c => c.zona === tramo.zona);
    return celda ? celda.indice : 20;
  }

  function componenteEntorno(tramo, cfg) {
    let e = 100;
    const alertas = LumenMock.alertas();
    if (alertas.some(a => a.tipo === "APAGON" && a.zona === tramo.zona)) return 0;   // IEXT-05
    alertas.filter(a => a.tipo === "AVERIA" && a.tramo === tramo.id)
           .forEach(() => { e -= cfg.penalizacionAveria; });
    /* (I5 añadirá aquí las incidencias reportadas con grado asignado — RF-16 / S-12) */
    return Math.max(0, e);
  }

  function ispTramo(tramo) {
    const cfg = config();
    const tabla = LumenMock.afluencia(CAMPUS.id);
    const I = componenteIluminacion(tramo);
    const A = componenteAfluencia(tramo, tabla);
    const E = componenteEntorno(tramo, cfg);
    const valor = Math.round(cfg.wI * I + cfg.wA * A + cfg.wE * E);
    return { valor: Math.max(0, Math.min(100, valor)), I, A, E };
  }

  function ispRuta(tramos) {
    const cfg = config();
    let suma = 0, longitud = 0, minimo = 100;
    tramos.forEach(t => {
      const s = ispTramo(t);
      suma += s.valor * t.longitud;
      longitud += t.longitud;
      minimo = Math.min(minimo, s.valor);
    });
    const media = longitud ? Math.round(suma / longitud) : 0;
    return { valor: media, minimo, segura: minimo >= cfg.umbralCritico, longitud };
  }

  return { config, guardarConfig, ispTramo, ispRuta };
})();
