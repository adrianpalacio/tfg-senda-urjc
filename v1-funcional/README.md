# Senda URJC — v1 funcional (intento de desarrollo íntegramente con IA)

Primera versión funcional de Senda URJC, desarrollada **íntegramente con IA** (Claude) sobre la
especificación de la rama tradicional del estudio (la validada con el cliente). El analista no
escribió código: redactó los prompts, aportó el contexto, probó cada resultado y pidió las
correcciones. El proceso completo está documentado por iteraciones en `iteraciones/I1..I6.md`
(prompt, contexto, artefactos, evaluación).

**Demo:** `index.html` (aplicación de usuario) · `admin.html` (panel de administración).
Funciona en local abriendo los ficheros con un servidor estático o desde GitHub Pages.

## Qué funciona de verdad

- Mapa real del campus de Móstoles (Leaflet + OpenStreetMap), 11 puntos de interés con
  coordenadas contrastadas, red peatonal de 20 nodos y 30 tramos.
- **Cálculo real de rutas**: Dijkstra ponderado por seguridad, hasta 3 alternativas ordenadas
  por el Índice de Seguridad Percibida (0-100), con distancia y tiempo, y filtro accesible
  sin escaleras.
- **Índice de Seguridad** con la fórmula de la ERS: media ponderada de iluminación (lux,
  UNE-EN 13201), afluencia (celdas 0-100) y entorno; pesos configurables (⅓ por defecto) y
  regla del eslabón débil (umbral crítico 30).
- **Horas de luz reales**: el criterio de iluminación consulta el orto y el ocaso del campus en
  una API abierta (Open-Meteo), con cálculo astronómico local si no hay red.
- **Modo «Voy contigo»** completo: prealerta con cuenta atrás configurable, alerta al contacto
  o a Seguridad, SOS inmediato, cancelación con aviso de falsa alarma, re-anclaje al cambiar de
  ruta sin falsa alerta, y cola de eventos sin cobertura.
- **Incidencias** de punta a punta: reporte tipificado → ticket → grado asignado por la
  administración → efecto en el índice y en las rutas → resolución.
- **Panel de administración**: tickets, alertas del proveedor, pesos/umbrales y estadísticas
  anonimizadas.
- Identidad visual corporativa URJC (rojo #CB0017, logotipo oficial, contraste AA).

## Qué está simulado (y declarado)

- **API LumenSmart**: mock fiel a la ficha técnica (endpoints, `iluminancia_lux`, afluencia por
  celdas, webhooks `zona.apagon`), emulando el sandbox de 50 luminarias — LumenSmart es una
  empresa ficticia del enunciado, no hay API real que llamar.
- **LDAP/SSO**: validación del dominio corporativo sin credenciales reales.
- **GPS**: avance simulado sobre la ruta, con botones que provocan los disparadores reales del
  protocolo (desvío, parada, pérdida de cobertura).
- **Persistencia**: localStorage (sin backend); app y panel comparten los datos.

## Cobertura declarada frente a la ERS (22 RF)

| Estado | Requisitos |
|---|---|
| Cubiertos (15) | RF-01 (dominio corporativo, LDAP simulado), RF-02, RF-03, RF-05 (apagones vía mock), RF-06, RF-07 (vista simulada del contacto), RF-09, RF-11 (disparadores simulados), RF-12, RF-13, RF-14, RF-15, RF-16, RF-17, RF-20 |
| Parciales (5) | RF-04 (subconjunto de datos de luminaria), RF-10 (alta de voluntario sí; recepción de solicitudes no), RF-18 (ciclo y estado visible sí; aviso push y derivación externa no), RF-19 (estadísticas básicas), RF-21 (filtro de escaleras; sin más criterios de accesibilidad en ruta) |
| No cubiertos (2) | RF-08 (emparejamiento solicitante-voluntario), RF-22 (rutas guardadas) |

RNF: identidad corporativa (RNF-06) y contraste AA cuidados; horario de campus y sesión de 30
días implementados; multi-idioma (RNF-07), historial con borrado a 24 h (RNF-02) y el resto de
RNF de plataforma quedan fuera de la v1 y declarados aquí.

## Pruebas

`pruebas/smoke-nucleo.js` — banco de 15 comprobaciones del núcleo (rutas, índice, apagón,
regla S-12, día/noche, pesos) ejecutable con Node sin navegador. Estado: **15/15 pasan**.

## Estructura

```
v1-funcional/
  index.html          aplicación de usuario
  admin.html          panel de administración
  css/senda.css       identidad URJC
  js/campus-data.js   grafo del campus (nodos, tramos, zonas)
  js/lumen-mock.js    mock LumenConnect v2 (ficha técnica)
  js/efemerides.js    horas de luz (API abierta + respaldo local)
  js/isp.js           índice de seguridad (fórmula ERS)
  js/router.js        Dijkstra ponderado, 3 alternativas
  js/voycontigo.js    máquina de estados del acompañamiento
  js/incidencias.js   tickets
  js/app.js           interfaz de usuario
  js/admin.js         interfaz del panel
  pruebas/            banco de pruebas del núcleo
  iteraciones/        fichas I1-I6 del proceso con IA
```

## Nota sobre la red peatonal

Los nodos intermedios del grafo son una aproximación razonable del trazado del campus
(los edificios usan coordenadas reales). En producción, la red vendría del GeoJSON de rutas
peatonales que LumenSmart entrega bajo petición (decisión D-A del estudio).
