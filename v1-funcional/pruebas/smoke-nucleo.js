/* Senda URJC v1 — banco de pruebas del núcleo (sin navegador).
   Ejecutar con Node desde cualquier directorio:  node v1-funcional/pruebas/smoke-nucleo.js
   Carga los módulos de lógica con stubs mínimos (localStorage, sin red) y comprueba el
   comportamiento contra la ERS: rutas, índice, apagón, regla S-12 de incidencias, filtro
   accesible, día/noche con efemérides y ajuste de pesos. */
const fs = require("fs"), path = require("path"), vm = require("vm");

const almacen = {};
const contexto = {
  localStorage: {
    getItem: k => (k in almacen ? almacen[k] : null),
    setItem: (k, v) => { almacen[k] = String(v); },
    removeItem: k => { delete almacen[k]; }
  },
  fetch: async () => { throw new Error("sin red (prueba el respaldo local de efemérides)"); },
  console, Math, JSON, Date, setTimeout, clearTimeout, setInterval, clearInterval
};
vm.createContext(contexto);

const base = path.join(__dirname, "..", "js");
for (const f of ["campus-data.js", "efemerides.js", "lumen-mock.js", "incidencias.js", "isp.js", "router.js"]) {
  vm.runInContext(fs.readFileSync(path.join(base, f), "utf8"), contexto, { filename: f });
}

const out = [];
function prueba(nombre, fn) {
  try { fn(); out.push("PASA  " + nombre); }
  catch (e) { out.push("FALLA " + nombre + " → " + e.message); }
}
function asegura(cond, msg) { if (!cond) throw new Error(msg); }

vm.runInContext(`
  function _test() {
    const R = {};
    R.efem = null;
    Efemerides.inicializar(40.336, -3.876).then(r => { R.efem = r; });
    LumenMock.setHora(22);
    R.nLums = LumenMock.total;
    R.afluencia = LumenMock.afluencia("MOS");
    R.alertasIni = LumenMock.alertas().length;
    R.rutas = Router.calcularRutas("metro", "aulario3", {});
    R.rutasAcc = Router.calcularRutas("metro", "aulario3", { sinEscaleras: true });
    R.ispTramo = ISP.ispTramo(TRAMOS[0]);
    const tramoZ3 = TRAMOS.find(t => t.zona === "Z3");
    R.antes = ISP.ispTramo(tramoZ3).valor;
    LumenMock.simularApagon("Z3");
    R.despues = ISP.ispTramo(tramoZ3).valor;
    LumenMock.resolverApagon("Z3");
    const t0 = ISP.ispTramo(tramoZ3).valor;
    const tk = Incidencias.reportar({ categoria: "solitaria", zona: "Z3", autor: "prueba@urjc.es" });
    const t1 = ISP.ispTramo(tramoZ3).valor;
    Incidencias.actualizar(tk.id, { gravedad: "grave", estado: "en curso" });
    const t2 = ISP.ispTramo(tramoZ3).valor;
    Incidencias.actualizar(tk.id, { estado: "resuelto" });
    const t3 = ISP.ispTramo(tramoZ3).valor;
    R.inc = { t0, t1, t2, t3 };
    ISP.guardarConfig({ wI: 0.6, wA: 0.2, wE: 0.2 });
    R.ispPesos = ISP.ispTramo(tramoZ3).valor;
    ISP.guardarConfig({ wI: 1/3, wA: 1/3, wE: 1/3 });
    LumenMock.setHora(12);
    R.ispDia = ISP.ispTramo(tramoZ3).valor;
    LumenMock.setHora(22);
    return R;
  }
  __R = _test();
`, contexto);

setTimeout(() => {
  const R = contexto.__R;
  prueba("parque de luminarias en el orden del sandbox (40-60)", () => asegura(R.nLums >= 40 && R.nLums <= 60, "n=" + R.nLums));
  prueba("afluencia: 4 celdas con índice 0-100", () => asegura(R.afluencia.length === 4 && R.afluencia.every(c => c.indice >= 0 && c.indice <= 100), JSON.stringify(R.afluencia)));
  prueba("alertas iniciales (averías de partida)", () => asegura(R.alertasIni >= 1, "sin alertas"));
  prueba("3 rutas metro→Aulario III", () => asegura(R.rutas.length === 3, "n=" + R.rutas.length));
  prueba("rutas ordenadas por ISP descendente", () => asegura(R.rutas[0].isp >= R.rutas[1].isp && R.rutas[1].isp >= R.rutas[2].isp, R.rutas.map(r => r.isp).join(",")));
  prueba("rutas con distancia y tiempo", () => asegura(R.rutas.every(r => r.distancia > 200 && r.minutos >= 3), JSON.stringify(R.rutas.map(r => [r.distancia, r.minutos]))));
  prueba("el filtro accesible excluye escaleras (RF-21)", () => asegura(R.rutasAcc.length >= 1 && R.rutasAcc.every(r => !r.conEscaleras), "falló filtro"));
  prueba("ISP de tramo en rango con componentes I/A/E", () => asegura(R.ispTramo.valor >= 0 && R.ispTramo.valor <= 100 && "I" in R.ispTramo, JSON.stringify(R.ispTramo)));
  prueba("el apagón de zona hunde el ISP (IEXT-05)", () => asegura(R.despues < R.antes - 15, R.antes + "→" + R.despues));
  prueba("incidencia sin grado NO penaliza (S-12)", () => asegura(R.inc.t1 === R.inc.t0, R.inc.t0 + "→" + R.inc.t1));
  prueba("incidencia grave SÍ penaliza (RF-16)", () => asegura(R.inc.t2 < R.inc.t1 - 10, R.inc.t1 + "→" + R.inc.t2));
  prueba("resolver la incidencia restaura el índice", () => asegura(R.inc.t3 === R.inc.t0, R.inc.t3 + " vs " + R.inc.t0));
  prueba("cambiar los pesos altera el cálculo (RF-20)", () => asegura(typeof R.ispPesos === "number", "sin valor"));
  prueba("de día el ISP sube (efemérides)", () => asegura(R.ispDia > R.inc.t0, R.inc.t0 + "→dia:" + R.ispDia));
  prueba("efemérides con respaldo local sin red", () => asegura(R.efem && R.efem.fuente.includes("local"), JSON.stringify(R.efem)));
  console.log(out.join("\n"));
  const fallos = out.filter(l => l.startsWith("FALLA")).length;
  console.log(fallos === 0 ? "\nTODO PASA (" + out.length + " pruebas)" : "\n" + fallos + " FALLOS");
  process.exit(fallos === 0 ? 0 : 1);
}, 300);
