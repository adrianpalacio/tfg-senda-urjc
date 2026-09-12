# Iteración I7 — Corrección del acceso (incidencia reportada por el cliente)

**Fecha:** 12/09/2026 · **IA:** Claude (herramienta de línea de comandos) · **Origen:** el
cliente reportó que no conseguía pasar de la pantalla de acceso.

## Prompt empleado

"El cliente no consigue pasar del login en la versión desplegada; en local funciona.
Reproduce el problema, identifica las causas posibles y haz el acceso robusto: ningún fallo
interno puede dejar el formulario mudo."

## Diagnóstico

El problema se reprodujo en la versión desplegada y resultaron ser dos defectos encadenados:

1. **Trampa visual en el formulario**: el campo de contraseña tenía como *placeholder* una
   fila de puntos (••••••••), que parece una contraseña ya escrita. El usuario rellenaba su
   correo, daba la contraseña por rellena y pulsaba «Entrar»; el navegador bloqueaba el envío
   por el atributo `required` con un aviso efímero, y el formulario parecía no responder.
2. **La pantalla de acceso no se ocultaba nunca**: al entrar, el código marcaba la pantalla
   con el atributo `hidden`, pero una regla de estilo propia (`display: flex`) tiene más
   prioridad que ese atributo, de modo que incluso con las credenciales correctas la pantalla
   de acceso seguía tapando la aplicación.

Durante el diagnóstico se identificaron además tres fragilidades adicionales, compatibles con
el mismo síntoma en otros entornos: la dependencia de un CDN externo para la biblioteca de
mapas, el guardado de sesión sin protección frente a navegadores con el almacenamiento local
bloqueado, y la ausencia de mensajes visibles ante errores internos del arranque.

## Correcciones aplicadas

- **Campo de contraseña sin trampa visual**: el *placeholder* de puntos se sustituye
  por un texto explícito («Escribe cualquier contraseña»), la etiqueta aclara que es una demo
  y el campo deja de ser obligatorio, de modo que el acceso solo depende del correo.
- **Ocultación fiable de la pantalla de acceso**: se añade la regla
  `.pantalla-login[hidden] { display: none; }` para que el atributo `hidden` prevalezca
  sobre el estilo de la pantalla.
- **Leaflet servido desde el propio repositorio** (`vendor/leaflet/`), eliminando la
  dependencia del CDN externo.
- **Almacenamiento local opcional**: si está bloqueado, la sesión funciona solo en memoria.
- **Errores visibles**: el envío del formulario queda envuelto en un control de errores que
  muestra el problema en la propia pantalla de acceso; si el mapa no puede iniciarse, la
  aplicación lo indica y el resto sigue operativo (las vistas se montan antes que el mapa).

## Evaluación

Verificado en la versión desplegada con almacenamiento limpio: el acceso entra a la
aplicación al primer intento y los fallos, si los hubiera, dejan mensaje en pantalla.
