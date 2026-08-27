# F2 — Requisitos extraídos (rama tradicional)

## Requisitos funcionales

| ID | Requisito (redacción "El sistema deberá…") | Prio. | Fuente |
|----|---------------------------------------------|-------|--------|
| RF-01 | Autenticar a los usuarios mediante el SSO corporativo de la URJC, basado en el protocolo LDAP (@urjc.es / @alumnos.urjc.es) | A | Enunciado: "deberán autenticarse mediante el Sistema de Autenticación Centralizada (SSO)" + Entrevista 1 [LDAP] |
| RF-02 | Permitir solicitar un trayecto (origen→destino) y ofrecer varias rutas alternativas | A | Enunciado: "al solicitar un trayecto […] ofrecerá diferentes alternativas" |
| RF-03 | Calificar cada ruta mediante el Índice de Seguridad Percibida, calculado en tiempo real con iluminación, afluencia y estado del entorno | A | Enunciado: "se calificarán por un 'Índice de Seguridad Percibida' […] tres parámetros" + [S-08: pesos iguales configurables] |
| RF-04 | Recibir de LumenSmart, en tiempo real, el estado de las farolas (encendida/apagada/averiada), su intensidad y los datos de afluencia de los sensores de presencia | A | Enunciado: "el sistema de LumenSmart enviará […] en tiempo real" |
| RF-05 | Penalizar automáticamente en el cálculo de rutas los tramos afectados por un apagón, al recibir la alerta de LumenSmart | A | Enunciado: "deberá recibir esa alerta automáticamente y penalizar inmediatamente ese tramo" |
| RF-06 | Permitir activar el modo «Voy contigo» antes de iniciar un trayecto | A | Enunciado: "al activar este modo antes de iniciar un trayecto" |
| RF-07 | Compartir la ubicación en tiempo real con el contacto de confianza configurado | A | Enunciado: "podrá compartir su ubicación en tiempo real con un 'Contacto de confianza'" |
| RF-08 | Permitir solicitar acompañamiento físico a un voluntario inscrito en la aplicación | A | Enunciado: "solicitar acompañamiento a alguno de los voluntarios" + Entrevista 1 [S-07: solo físico] |
| RF-09 | Permitir configurar el contacto de confianza en el perfil del usuario; el contacto debe pertenecer a la comunidad universitaria de la URJC | A | Enunciado: "(previamente configurado en su perfil)" + Entrevista 1 [contacto solo comunidad URJC, por protección de datos] |
| RF-10 | Permitir marcarse como voluntario desde el perfil (cuenta corporativa, sin aprobación previa) y recibir solicitudes de acompañamiento por proximidad o por calendario de disponibilidad | A | Enunciado: "voluntarios que previamente se haya apuntado en la aplicación" + Entrevista 1 [corrige S-07] |
| RF-11 | Emitir una prealerta (vibración y notificación) si el usuario se desvía de la ruta más del ancho del camino (unos 2 m) o se detiene por inactividad | A | Enunciado: "emitirá una 'prealerta' (vibración y notificación)" + Entrevista 1 [corrige S-05: desvío = ancho + 2 m; valor de «parada» pendiente del documento de Sergio] |
| RF-12 | Si el usuario no confirma que «está bien» en el plazo fijado tras la prealerta (30 s por defecto, configurable por el usuario en su perfil), enviar automáticamente una alerta con la última ubicación al contacto seleccionado o al Servicio de Seguridad | A | Enunciado: "si el usuario no confirma que 'está bien' en 30 segundos…" + Entrevista 1 [corrige S-05: 30 s configurable por el usuario] |
| RF-13 | Permitir solicitar una nueva ruta antes o durante el trayecto; la ruta activa se sustituye y la prealerta se re-ancla a la nueva sin generar falsa alerta, notificando el cambio al contacto | M | Enunciado: "podrá solicitar […] una nueva ruta […] antes o durante" + [S-06] |
| RF-14 | Ofrecer un botón de emergencia (SOS) que envíe alerta inmediata al Servicio de Seguridad y al contacto de confianza | A | Enunciado: "botones de emergencia o contacto rápido" (funcionalidad sin definir) + [S-04] |
| RF-15 | Permitir reportar incidencias tipificadas: «Farola fundida», «Zona solitaria/miedo», «Obstáculo en la vía», «Punto con dificultad» | A | Enunciado: "los usuarios podrán notificar: …" |
| RF-16 | Reflejar las incidencias en el algoritmo bajando la puntuación de la zona; para los reportes subjetivos («zona solitaria/miedo»), la penalización la fija manualmente el administrador, que asigna un grado de inseguridad tras revisar y puede modificarlo o disolverlo | A | Enunciado: "alimentarán el algoritmo de rutas (bajando la puntuación)" + Entrevista 1 [corrige S-12] |
| RF-17 | Generar un ticket en el panel de administración por cada incidencia reportada | M | Enunciado: "generarán tickets en el panel de administración para su resolución" |
| RF-18 | Gestionar los tickets desde el panel de administración con ciclo abierto→en curso→resuelto y una categoría de gravedad (grave/media); el administrador (PTGAS) deriva la resolución, fuera de la app, a mantenimiento URJC (obstáculos, mobiliario) o a LumenSmart (farolas), y notifica el cierre a quien reportó | M | Enunciado: "para su resolución" + Entrevista 1 [corrige S-10] |
| RF-19 | Ofrecer estadísticas anonimizadas de uso y seguridad (incluidos mapas de calor de rutas e incidencias) a los perfiles institucionales autorizados | B | Enunciado: "las estadísticas se mostrarán de forma anonimizada" + Entrevista 1 |
| RF-20 | Permitir a la administración (PDI/PTGAS autorizados) ajustar desde la web los parámetros de seguridad —pesos del índice y umbrales— por campus, día y hora | M | Entrevista 1 [amplía RF-03 / S-08; hoja de ruta #13] |
| RF-21 | Tener en cuenta el perfil de accesibilidad del usuario (discapacidad / movilidad reducida) al calcular la ruta, evitando p. ej. escaleras | M | Entrevista 1 [requisito nuevo] |
| RF-22 | Permitir al usuario guardar y volver a consultar rutas realizadas anteriormente | B | Entrevista 1 [requisito nuevo] |

## Requisitos no funcionales

| ID | Requisito | Prio. | Fuente |
|----|-----------|-------|--------|
| RNF-01 | Cumplir rigurosamente la normativa de protección de datos (RGPD) en todo el tratamiento | A | Enunciado: "debe cumplir rigurosamente con las leyes y reglamentos de protección de datos" |
| RNF-02 | No conservar el historial de rutas más de 24 horas, salvo trayectos con incidencia de seguridad reportada (retención hasta su resolución más el plazo legal, con acceso restringido) | A | Enunciado: "no debe guardarse más de 24 horas, salvo…" + [S-09] |
| RNF-03 | Garantizar que las estadísticas no expongan información individualizada de los usuarios | A | Enunciado: "garantizando que no se exponga información individualizada" |
| RNF-04 | Ofrecer un diseño de interfaz inclusivo | A | Enunciado: "el diseño de la interfaz debe ser inclusivo" |
| RNF-05 | Hacer accesibles los botones de emergencia con una sola mano y sin necesidad de mirar la pantalla fijamente | A | Enunciado: literal |
| RNF-06 | Cumplir el manual de identidad visual corporativo de la URJC vigente | M | Enunciado: literal |
| RNF-07 | Estar disponible en español, inglés y chino | M | Enunciado: literal + Entrevista 1 [tercer idioma: chino] |
| RNF-08 | Priorizar tecnologías open source con comunidades activas y soporte consolidado | M | Enunciado: literal |
| RNF-09 | Garantizar disponibilidad 24/7 con mecanismos de redundancia en el servidor de cálculo de rutas | A | Enunciado: "el sistema es crítico en horario nocturno…" |
| RNF-10 | Ofrecer la app móvil (Android e iOS) para el uso general: consulta de rutas, «Voy contigo», voluntarios e incidencias | A | Enunciado: "(disponible en Android e iOS)" + Entrevista 1 |
| RNF-11 | Cubrir los campus de la URJC y sus accesos/zonas aledañas inmediatas con cobertura LumenSmart | M | Enunciado: "los campus y sus accesos" + [S-01] |
| RNF-12 | Conservar la ruta activa en el dispositivo si se pierde la conexión y tratar la pérdida de cobertura como disparador automático de alerta; al recuperar la cobertura, reanudar con normalidad | M | [S-03, corregido en Entrevista 1] |
| RNF-13 | Restringir el acceso a miembros de la comunidad universitaria con credenciales corporativas (visitantes fuera de la primera versión) | A | Enunciado (SSO) + [S-02] |
| RNF-14 | Elaborar la especificación conforme a IEEE-STD-29148-2018, con lenguaje según las directrices del grupo INGENIA | A | Enunciado: literal (requisito de proceso) |
| RNF-15 | Ofrecer una aplicación web de administración, separada de la app móvil, accesible solo con cuentas autorizadas (PDI/PTGAS y Servicio de Seguridad), desde la que se gestionan incidencias, se generan informes y se ajustan los parámetros de seguridad | A | Entrevista 1 [corrige S-11] |
| RNF-16 | Funcionar únicamente dentro del horario de apertura de los campus (todos los días, incluidos fines de semana); fuera de ese horario la app no permite su uso | A | Entrevista 1 [requisito nuevo] |
| RNF-17 | Generar las rutas en un tiempo razonable (orientativo: 5-10 s) | M | Entrevista 1 [requisito nuevo] |
| RNF-18 | Minimizar el consumo de recursos del dispositivo (batería, memoria, almacenamiento) para no limitar su descarga y uso | M | Entrevista 1 [requisito nuevo] |

## Recuento y trazabilidad

- **22 RF + 18 RNF = 40 requisitos.** De ellos, 9 usan supuestos: S-01…S-12 → RF-03, RF-10,
  RF-11, RF-13, RF-14, RF-16, RF-18, RNF-02, RNF-11, RNF-12, RNF-13.
- **Requisitos nuevos de la Entrevista 1 (#10):** RF-21 (accesibilidad en ruta), RF-22 (rutas
  guardadas), RNF-16 (horario de campus), RNF-17 (rendimiento), RNF-18 (bajo consumo); más los
  matices de RF-01 (LDAP), RF-09 (contacto solo URJC) y RNF-07 (chino).
- **RNF-15 (nuevo, 25/08):** frente web de administración, elicitado en la Entrevista 1 → corrige
  el supuesto S-11 (que lo daba fuera de la primera versión). La app móvil (RNF-10) queda para el
  uso general; la administración va en la web.
- **RF-20 (nuevo, 25/08):** ajuste de parámetros de seguridad desde la web (PDI/PTGAS), elicitado en
  la Entrevista 1; da soporte a la parametrización del índice (RF-03 / S-08). Corresponde al nuevo CU-10.
- Todos los demás derivan de frases literales del enunciado (citadas en la columna Fuente).
- **Prioridades (17/07):** derivadas por REGLA a partir de las decisiones del analista en
  F1-04 (cada RF hereda la prioridad del grupo funcional que el analista priorizó; RNF:
  legal/seguridad/disponibilidad = A, estética/idiomas/proceso = M, basados en supuestos = M).
  Regla documentada; el analista conserva el veto (cualquier cambio se anota aquí).
- **Pendiente del analista:** requisitos implícitos adicionales que quiera añadir [IMPLÍCITO].
- Siguiente paso tras las prioridades: formalización IEEE 29148 (F3) y casos de uso.
