# Iteración I7 — Corrección del acceso (incidencia reportada por el cliente)

**Fecha:** 12/09/2026 · **IA:** Claude (herramienta de línea de comandos) · **Origen:** el
cliente reportó que no conseguía pasar de la pantalla de acceso.

## Prompt empleado

"El cliente no consigue pasar del login en la versión desplegada; en local funciona.
Reproduce el problema, identifica las causas posibles y haz el acceso robusto: ningún fallo
interno puede dejar el formulario mudo."

## Diagnóstico

Se reprodujo un bloqueo en el primer acceso con caché fría. Las causas plausibles
identificadas, todas compatibles con el síntoma:

- La biblioteca de mapas se cargaba desde un CDN externo (unpkg). En una primera visita, o
  detrás de un proxy corporativo que la bloquee o retrase, la aplicación quedaba a expensas
  de esa descarga y un fallo dejaba el formulario sin respuesta visible.
- El guardado de la sesión usaba el almacenamiento local sin protección; en navegadores que
  lo bloquean (modo privado, políticas de empresa), la excepción cortaba el arranque antes
  de mostrar nada.
- Cualquier error interno del arranque se producía sin mensaje para el usuario.

## Correcciones aplicadas

- **Leaflet servido desde el propio repositorio** (`vendor/leaflet/`), eliminando la
  dependencia del CDN externo.
- **Almacenamiento local opcional**: si está bloqueado, la sesión funciona solo en memoria.
- **Errores visibles**: el envío del formulario queda envuelto en un control de errores que
  muestra el problema en la propia pantalla de acceso; si el mapa no puede iniciarse, la
  aplicación lo indica y el resto sigue operativo (las vistas se montan antes que el mapa).

## Evaluación

Verificado en la versión desplegada con almacenamiento limpio: el acceso entra a la
aplicación al primer intento y los fallos, si los hubiera, dejan mensaje en pantalla.
