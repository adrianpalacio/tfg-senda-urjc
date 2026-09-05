/* Senda URJC v1 — efemérides (horas de luz).
   El criterio de iluminación del índice solo penaliza cuando NO es de día ("la iluminación es
   máxima durante el día; la hora del día es prerrequisito del criterio" — aclaración del cliente).
   Para saber cuándo es de día, el sistema consulta el orto y el ocaso reales del campus en una
   API abierta (Open-Meteo, sin clave), con un cálculo astronómico local como respaldo si no hay
   red. Decisión del 05/09 (adenda F3 §8.1): interfaz externa nueva, pequeña y gratuita. */

const Efemerides = (() => {
  let orto = 7.5, ocaso = 20.5;      // horas decimales; respaldo inicial razonable
  let fuente = "cálculo local";

  /* Respaldo local: aproximación de amanecer/atardecer por declinación solar (precisión de
     minutos, suficiente para el criterio de iluminación). */
  function calculoLocal(lat, lon, fecha) {
    const dia = Math.floor((fecha - new Date(fecha.getFullYear(), 0, 0)) / 86400000);
    const decl = -23.44 * Math.cos((2 * Math.PI / 365) * (dia + 10)) * Math.PI / 180;
    const latRad = lat * Math.PI / 180;
    const cosH = -Math.tan(latRad) * Math.tan(decl);
    const H = Math.acos(Math.min(1, Math.max(-1, cosH))) * 180 / Math.PI; // semiarco en grados
    const mediodiaSolar = 12 - lon / 15;                                   // hora solar local
    const utcOffset = -fecha.getTimezoneOffset() / 60;
    const correccion = utcOffset - 0;                                      // lon ya en el término anterior
    return {
      orto: mediodiaSolar - H / 15 + correccion,
      ocaso: mediodiaSolar + H / 15 + correccion
    };
  }

  async function inicializar(lat, lon) {
    const local = calculoLocal(lat, lon, new Date());
    orto = local.orto; ocaso = local.ocaso;
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
                  `&daily=sunrise,sunset&timezone=auto&forecast_days=1`;
      const r = await fetch(url);
      if (r.ok) {
        const d = await r.json();
        const s = new Date(d.daily.sunrise[0]), p = new Date(d.daily.sunset[0]);
        orto = s.getHours() + s.getMinutes() / 60;
        ocaso = p.getHours() + p.getMinutes() / 60;
        fuente = "API abierta (Open-Meteo)";
      }
    } catch (e) {
      /* sin red: se mantiene el cálculo local, y se declara */
      fuente = "cálculo local (sin red)";
    }
    return { orto, ocaso, fuente };
  }

  function esDeDia(horaDecimal) { return horaDecimal >= orto && horaDecimal <= ocaso; }

  function formatoHora(h) {
    const hh = Math.floor(h), mm = Math.round((h - hh) * 60);
    return String(hh).padStart(2, "0") + ":" + String(mm).padStart(2, "0");
  }

  return {
    inicializar, esDeDia, formatoHora,
    get orto() { return orto; },
    get ocaso() { return ocaso; },
    get fuente() { return fuente; }
  };
})();
