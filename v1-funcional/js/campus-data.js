/* Senda URJC v1 — datos del campus de Móstoles (I1: puntos de interés).
   Coordenadas de edificios contrastadas con OpenStreetMap. */

const CAMPUS = {
  id: "MOS",
  nombre: "Móstoles",
  centro: [40.33600, -3.87620],
  zoom: 16
};

const NODOS = [
  { id: "metro",       lat: 40.33880, lon: -3.87665, nombre: "Metro Universidad Rey Juan Carlos", poi: true },
  { id: "rectorado",   lat: 40.33774, lon: -3.87493, nombre: "Rectorado", poi: true },
  { id: "biblioteca",  lat: 40.33719, lon: -3.87580, nombre: "Biblioteca", poi: true },
  { id: "cafeteria",   lat: 40.33640, lon: -3.87560, nombre: "Cafetería central", poi: true },
  { id: "aulario1",    lat: 40.33570, lon: -3.87654, nombre: "Aulario I", poi: true },
  { id: "lab2",        lat: 40.33536, lon: -3.87721, nombre: "Laboratorio II", poi: true },
  { id: "aulario2",    lat: 40.33508, lon: -3.87773, nombre: "Aulario II", poi: true },
  { id: "aulario3",    lat: 40.33450, lon: -3.87890, nombre: "Aulario III", poi: true },
  { id: "n9",          lat: 40.33390, lon: -3.87680, nombre: "Entrada sur", poi: true },
  { id: "polideportivo", lat: 40.33470, lon: -3.87500, nombre: "Polideportivo", poi: true },
  { id: "gestion",     lat: 40.33548, lon: -3.87315, nombre: "Edificio de Gestión", poi: true }
];

const POIS = NODOS.filter(n => n.poi);
