/* Senda URJC v1 — datos del campus de Móstoles.
   Red peatonal como grafo (nodos + tramos). Las coordenadas de los edificios proceden de
   OpenStreetMap (contrastadas); los nodos intermedios son una aproximación razonable del
   trazado real de los caminos, declarada como tal en el README (D-A: en producción la red
   vendría del GeoJSON de rutas peatonales de LumenSmart). */

const CAMPUS = {
  id: "MOS",
  nombre: "Móstoles",
  centro: [40.33600, -3.87620],
  zoom: 16
};

/* Nodos del grafo. poi=true → seleccionable como origen/destino (RF-02). */
const NODOS = [
  { id: "metro",       lat: 40.33880, lon: -3.87665, nombre: "Metro Universidad Rey Juan Carlos", poi: true },
  { id: "n1",          lat: 40.33800, lon: -3.87640 },
  { id: "rectorado",   lat: 40.33774, lon: -3.87493, nombre: "Rectorado", poi: true },
  { id: "biblioteca",  lat: 40.33719, lon: -3.87580, nombre: "Biblioteca", poi: true },
  { id: "n2",          lat: 40.33700, lon: -3.87650 },
  { id: "n10",         lat: 40.33680, lon: -3.87560 },
  { id: "cafeteria",   lat: 40.33640, lon: -3.87560, nombre: "Cafetería central", poi: true },
  { id: "n3",          lat: 40.33610, lon: -3.87620 },
  { id: "aulario1",    lat: 40.33570, lon: -3.87654, nombre: "Aulario I", poi: true },
  { id: "lab2",        lat: 40.33536, lon: -3.87721, nombre: "Laboratorio II", poi: true },
  { id: "aulario2",    lat: 40.33508, lon: -3.87773, nombre: "Aulario II", poi: true },
  { id: "aulario3",    lat: 40.33450, lon: -3.87890, nombre: "Aulario III", poi: true },
  { id: "n4",          lat: 40.33560, lon: -3.87800 },
  { id: "n5",          lat: 40.33480, lon: -3.87700 },
  { id: "n6",          lat: 40.33440, lon: -3.87620 },
  { id: "n9",          lat: 40.33390, lon: -3.87680, nombre: "Entrada sur", poi: true },
  { id: "polideportivo", lat: 40.33470, lon: -3.87500, nombre: "Polideportivo", poi: true },
  { id: "n7",          lat: 40.33560, lon: -3.87450 },
  { id: "gestion",     lat: 40.33548, lon: -3.87315, nombre: "Edificio de Gestión", poi: true },
  { id: "n8",          lat: 40.33660, lon: -3.87440 }
];

/* Tramos (aristas). zona → celda de afluencia LumenSmart; escaleras → excluible con el
   filtro de accesibilidad (RF-21); via='principal' → luminarias LC-400, resto LC-200. */
const TRAMOS = [
  { a: "metro", b: "n1", zona: "Z1", via: "principal" },
  { a: "n1", b: "n2", zona: "Z1", via: "principal" },
  { a: "n1", b: "rectorado", zona: "Z1", via: "principal" },
  { a: "rectorado", b: "biblioteca", zona: "Z1" },
  { a: "rectorado", b: "n8", zona: "Z4" },
  { a: "biblioteca", b: "n2", zona: "Z1" },
  { a: "biblioteca", b: "n10", zona: "Z1" },
  { a: "n10", b: "cafeteria", zona: "Z2" },
  { a: "n2", b: "n3", zona: "Z2", via: "principal" },
  { a: "n3", b: "cafeteria", zona: "Z2" },
  { a: "cafeteria", b: "n8", zona: "Z4" },
  { a: "cafeteria", b: "aulario1", zona: "Z2", escaleras: true },
  { a: "n3", b: "aulario1", zona: "Z2", via: "principal" },
  { a: "n3", b: "n7", zona: "Z2" },
  { a: "aulario1", b: "lab2", zona: "Z2" },
  { a: "aulario1", b: "n7", zona: "Z2" },
  { a: "lab2", b: "aulario2", zona: "Z3" },
  { a: "lab2", b: "n4", zona: "Z3" },
  { a: "lab2", b: "n5", zona: "Z3", escaleras: true },
  { a: "aulario2", b: "aulario3", zona: "Z3" },
  { a: "aulario2", b: "n4", zona: "Z3" },
  { a: "aulario2", b: "n5", zona: "Z3" },
  { a: "n4", b: "aulario3", zona: "Z3" },
  { a: "aulario3", b: "n9", zona: "Z3" },
  { a: "n5", b: "n6", zona: "Z3" },
  { a: "n6", b: "n9", zona: "Z3" },
  { a: "n6", b: "polideportivo", zona: "Z4" },
  { a: "n7", b: "polideportivo", zona: "Z4" },
  { a: "n7", b: "gestion", zona: "Z4", via: "principal" },
  { a: "gestion", b: "n8", zona: "Z4" }
];

/* Celdas de afluencia (mapa de calor LumenSmart, índice relativo 0-100 por celda). */
const ZONAS = [
  { id: "Z1", nombre: "Campus norte (acceso y biblioteca)", perfilDia: 78, perfilNoche: 30 },
  { id: "Z2", nombre: "Campus centro (aularios)",           perfilDia: 85, perfilNoche: 22 },
  { id: "Z3", nombre: "Sendas suroeste (jardines)",         perfilDia: 45, perfilNoche: 6 },
  { id: "Z4", nombre: "Campus este (gestión y deportes)",   perfilDia: 55, perfilNoche: 12 }
];

/* Utilidades geométricas compartidas */
function nodoPorId(id) { return NODOS.find(n => n.id === id); }

function distanciaMetros(n1, n2) {
  const R = 6371000, rad = Math.PI / 180;
  const dLat = (n2.lat - n1.lat) * rad, dLon = (n2.lon - n1.lon) * rad;
  const a = Math.sin(dLat/2)**2 +
            Math.cos(n1.lat*rad) * Math.cos(n2.lat*rad) * Math.sin(dLon/2)**2;
  return Math.round(2 * R * Math.asin(Math.sqrt(a)));
}

/* Longitud precalculada de cada tramo + clave única */
TRAMOS.forEach(t => {
  t.longitud = distanciaMetros(nodoPorId(t.a), nodoPorId(t.b));
  t.id = t.a + "__" + t.b;
});

const POIS = NODOS.filter(n => n.poi);
