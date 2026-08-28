# F3b — Casos de uso extendidos (rama tradicional)

---

## CU-01 — Autenticarse en el sistema

- **Actor principal:** Usuario (comunidad URJC). **Actor secundario:** SSO corporativo (sistema externo).
- **Precondiciones:** aplicación instalada; el usuario dispone de credenciales corporativas (@urjc.es / @alumnos.urjc.es).
- **Postcondiciones (éxito):** sesión iniciada; el usuario accede a las funcionalidades según su perfil (RNF-13).

**Flujo principal:**
1. El usuario abre la aplicación sin sesión activa.
2. El sistema redirige al SSO corporativo de la URJC (RF-01).
3. El usuario introduce sus credenciales corporativas en el SSO.
4. El SSO valida la identidad y devuelve la confirmación al sistema.
5. El sistema inicia la sesión y muestra la pantalla principal.

**Flujos alternativos:**
- 1a. Existe sesión previa válida: el sistema entra directamente a la pantalla principal.

**Excepciones:**
- E1. Credenciales inválidas: el SSO rechaza el acceso; el sistema informa y permite reintentar.
- E2. SSO no disponible: el sistema informa de que el acceso no es posible en este momento (sin acceso anónimo alternativo, RNF-13).
- E3. Cuenta no corporativa (visitante): acceso denegado (S-02, validado en Entrevista 1: solo se admite cualquier cuenta institucional @urjc; los visitantes sin cuenta quedan fuera).

---

## CU-02 — Solicitar ruta segura

- **Actor principal:** Usuario. **Actor secundario:** LumenSmart (sistema externo).
- **Precondiciones:** sesión iniciada (CU-01); ubicación del dispositivo activa; conexión de datos [S-03].
- **Postcondiciones (éxito):** una ruta queda seleccionada como activa, con su Índice de Seguridad Percibida calculado.

**Flujo principal:**
1. El usuario introduce el destino (p. ej. «Aulario II») y confirma el origen (ubicación actual u otro punto).
2. El sistema calcula rutas alternativas dentro del ámbito de cobertura [S-01] (RF-02).
3. El sistema valora cada ruta con el Índice de Seguridad Percibida en tiempo real: iluminación e intensidad (datos LumenSmart, RF-04), afluencia (sensores de presencia, RF-04) y estado del entorno (incidencias activas, RF-16) — ponderación según [S-08].
4. El sistema muestra las alternativas ordenadas por índice (RF-03).
5. El usuario selecciona una ruta; el sistema la establece como activa.

**Flujos alternativos:**
- 2a. Solo existe un camino viable: el sistema lo muestra como única opción, con su índice.
- 5a. El usuario decide iniciar el trayecto con modo «Voy contigo»: continúa en CU-03.

**Excepciones:**
- E1. Destino fuera del ámbito de cobertura [S-01]/(RNF-11): el sistema informa del límite y no calcula ruta.
- E2. Datos de LumenSmart no disponibles: el sistema informa de que no puede garantizar rutas seguras y no calcula ruta (validado en Entrevista 1; corrige la mitigación provisional del riesgo 1 de F1-03).

---

## CU-04 — Usar el botón de emergencia (SOS) [SUPUESTO S-04]

- **Actor principal:** Usuario. **Actores secundarios:** Servicio de Seguridad, Contacto de confianza.
- **Precondiciones:** sesión iniciada; el botón es accesible de forma permanente durante el uso, operable con una sola mano y sin mirar la pantalla (RNF-05).
- **Postcondiciones (éxito):** alerta registrada y entregada; si había trayecto en curso, queda marcado con incidencia (retención según [S-09]).

**Flujo principal:**
1. El usuario pulsa el botón SOS.
2. El sistema envía inmediatamente una alerta con la ubicación actual al Servicio de Seguridad y al contacto de confianza (RF-14), sin pasos intermedios ni confirmaciones.
3. El sistema muestra al usuario la confirmación de que la alerta ha sido enviada.

**Flujos alternativos:**
- 1a. El usuario pulsa el SOS estando en prealerta (CU-03/E1): la prealerta escala directamente a alerta.

**Excepciones:**
- E1. Sin conexión de datos: la alerta SOS queda registrada en el dispositivo y se entrega al recuperar la cobertura; además, la propia pérdida de cobertura se trata como disparador automático de alerta [S-03, corregido en Entrevista 1].
- Nota: la cancelación de una alerta SOS errónea quedó definida en la Entrevista 1 — se puede cancelar, y se avisa al contacto de que la alerta se ha desactivado [S-04, validado].

---

## CU-05 — Reportar incidencia del entorno

- **Actor principal:** Usuario.
- **Precondiciones:** sesión iniciada; ubicación activa.
- **Postcondiciones (éxito):** incidencia registrada; ticket abierto en el panel (RF-17); puntuación de la zona penalizada (RF-16).

**Flujo principal:**
1. El usuario accede a «Reportar incidencia».
2. El sistema ofrece los cuatro tipos: «Farola fundida», «Zona solitaria/miedo», «Obstáculo en la vía», «Punto con dificultad» (RF-15).
3. El usuario elige el tipo; el sistema propone la ubicación actual, que el usuario puede ajustar.
4. El usuario añade descripción opcional y envía.
5. El sistema registra la incidencia y genera el ticket (RF-16, RF-17). Para los reportes subjetivos («zona solitaria/miedo»), el efecto sobre la puntuación de la zona lo fija el administrador al revisarlo, no de forma automática [S-12 corregido en Entrevista 1: ajuste manual].
6. El sistema confirma el registro al usuario.

**Flujos alternativos:**
- 3a. El usuario reporta sobre un punto distinto al actual (p. ej. algo visto antes): selecciona la ubicación en el mapa.

**Excepciones:**
- E1. Sin conexión: el sistema informa de que el reporte no puede enviarse [S-03].

---

## CU-06 — Configurar perfil (contacto de confianza / alta de voluntario)

- **Actor principal:** Usuario.
- **Precondiciones:** sesión iniciada.
- **Postcondiciones (éxito):** contacto de confianza configurado (disponible para CU-03) y/o alta de voluntario registrada (disponible para CU-07).

**Flujo principal (contacto de confianza):**
1. El usuario accede a su perfil y a «Contacto de confianza» (RF-09).
2. Introduce los datos del contacto y su medio de notificación.
3. El sistema guarda la configuración y la usa en adelante para «Voy contigo» y alertas.

**Flujo principal (alta de voluntario):**
1. El usuario accede a «Quiero ser voluntario/a» y se marca como voluntario en su perfil (RF-10).
2. El sistema comprueba que la cuenta es corporativa; no hay aprobación ni verificación adicional [S-07 corregido en Entrevista 1: autoservicio].
3. El usuario configura su disponibilidad (por calendario) y acepta las condiciones.
4. El sistema registra el alta; el usuario pasa a poder recibir solicitudes por proximidad o según su calendario (CU-07).

**Excepciones:**
- E1. El usuario puede darse de baja como voluntario desmarcándose en su perfil en cualquier momento.
- Nota [S-07 corregido, Entrevista 1]: el alta es autoservicio (sin aprobación) y el acompañamiento es solo físico; queda resuelto lo que antes era refinamiento pendiente.

---

## CU-07 — Atender solicitud de acompañamiento

- **Actor principal:** Voluntario. **Actor secundario:** Usuario solicitante.
- **Precondiciones:** voluntario dado de alta (CU-06) y disponible; un usuario ha solicitado acompañamiento (CU-03, flujo 3a).
- **Postcondiciones (éxito):** acompañamiento establecido; el voluntario recibe la información del trayecto mientras dure.

**Flujo principal:**
1. El sistema notifica al voluntario una solicitud de acompañamiento, por proximidad a la zona o según su calendario de disponibilidad (RF-08, RF-10) [S-07, Entrevista 1].
2. El voluntario acepta la solicitud.
3. El sistema conecta a ambos: el voluntario recibe la ubicación/trayecto del usuario; el usuario recibe la confirmación de quién le acompaña.
4. El acompañamiento se desarrolla de forma presencial hasta el fin del trayecto [S-07 corregido en Entrevista 1: solo físico, no hay acompañamiento virtual].
5. El sistema cierra el acompañamiento al finalizar el trayecto.

**Flujos alternativos:**
- 2a. El voluntario rechaza o no responde: el sistema ofrece la solicitud a otros voluntarios disponibles.
- 2b. Ningún voluntario acepta en un tiempo prudencial: el sistema informa al solicitante y le ofrece continuar con contacto de confianza (CU-03/3a).

**Excepciones:**
- E1. El voluntario pierde la conexión durante el acompañamiento: el usuario es informado del corte del seguimiento [S-03].

---

## CU-08 — Gestionar tickets de incidencias

- **Actor principal:** Administración (PTGAS, desde la web). **Actores secundarios:** mantenimiento URJC / LumenSmart (destinatarios de la derivación, fuera de la app), Usuario que reportó.
- **Precondiciones:** perfil de administración con acceso al panel web; existen tickets generados (CU-05).
- **Postcondiciones (éxito):** ticket resuelto y notificado a quien reportó (RF-18); el administrador ajusta o cierra manualmente el efecto de la incidencia en el algoritmo [S-12].

**Flujo principal:**
1. La administración consulta el panel de tickets en la web (RF-17).
2. Selecciona un ticket abierto y lo examina (tipo, gravedad grave/media, ubicación, fecha, descripción).
3. Deriva la resolución, fuera de la app, a mantenimiento URJC (obstáculos, mobiliario) o a LumenSmart (farolas) [S-10 corregido en Entrevista 1: no hay traslado al ayuntamiento]; el ticket pasa a «en curso».
4. Completada la intervención, marca el ticket como «resuelto».
5. El sistema notifica la resolución al usuario que reportó (RF-18) y permite al administrador cerrar el efecto de la incidencia en el algoritmo [S-12].

**Flujos alternativos:**
- 3a. La incidencia tipo «Zona solitaria/miedo» no requiere intervención física: el administrador la revisa, asigna un grado de inseguridad a la zona y puede modificar o disolver la penalización [S-12 corregido, Entrevista 1: ajuste manual, no hay decaimiento automático].

**Excepciones:**
- E1. La derivación a mantenimiento URJC o a LumenSmart se realiza fuera de la aplicación (aviso al servicio correspondiente); el sistema solo registra el estado del ticket [S-10 corregido, Entrevista 1].

---

## CU-09 — Consultar estadísticas anonimizadas

- **Actor principal:** Administración / perfiles institucionales autorizados.
- **Precondiciones:** perfil autorizado (RNF-13); datos agregados disponibles.
- **Postcondiciones (éxito):** consulta realizada sin exposición de información individual (RNF-03).

**Flujo principal:**
1. El perfil autorizado accede al módulo de estadísticas (RF-19).
2. Selecciona el periodo y el ámbito (campus, zona).
3. El sistema muestra los agregados anonimizados (uso, incidencias por tipo y zona, alertas).

**Excepciones:**
- E1. El nivel de agregación no permite mostrar un corte sin riesgo de reidentificación: el sistema oculta ese corte (RNF-03; técnica concreta de anonimización pendiente de definir — señalado también por M3 en su análisis de riesgos).

---

## CU-10 — Ajustar parámetros de seguridad (web) [Entrevista 1]

- **Actor principal:** Administración (PDI/PTGAS autorizados, desde la web).
- **Precondiciones:** perfil autorizado con acceso al panel web (RNF-15).
- **Postcondiciones (éxito):** los parámetros quedan guardados y se aplican en los cálculos de rutas posteriores (RF-20).

**Flujo principal:**
1. El administrador accede al módulo de parámetros de seguridad en la web (RF-20).
2. Selecciona el ámbito: campus, día y hora.
3. Ajusta los pesos del Índice de Seguridad (iluminación / afluencia / entorno) y/o los umbrales [S-08].
4. Guarda; el sistema valida que los pesos suman 1 y aplica los valores a las rutas que se calculen a partir de ese momento.

**Excepciones:**
- E1. Valores inconsistentes (pesos que no suman 1, umbral fuera de rango): el sistema rechaza el guardado e informa del error.

---

## Trazabilidad

- Los 10 CU cubren los 22 RF (RF-04/RF-05 quedan dentro de CU-02/CU-03 como interacción con
  LumenSmart, sin CU propio — decisión de modelado del catálogo, F3 §3).
- Supuestos usados: S-02 (CU-01), S-01/S-03/S-08 (CU-02), S-04/S-09 (CU-04), S-12 (CU-05,
  CU-08), S-07 (CU-06, CU-07), S-10 (CU-08). Si el cliente corrige alguno → propagar por ID.
- **Actualización 25/08 (Entrevista 1) — supuestos ya CORREGIDOS aquí:**
  - **S-07** (CU-06, CU-07): voluntariado autoservicio (sin aprobación), solicitudes por
    proximidad/calendario, acompañamiento **solo físico** (no hay seguimiento virtual).
  - **S-12** (CU-05, CU-08): la penalización de los reportes subjetivos es **ajuste manual del
    administrador** (grado que asigna y puede cambiar o disolver), no un decaimiento automático.
  - **S-10** (CU-08): tickets derivados a **mantenimiento URJC o LumenSmart** (no ayuntamiento),
    con gravedad grave/media; derivación fuera de la app.
  - **Rol Seguridad (#11):** actor con cuentas genéricas que recibe alertas (secundario de CU-03/CU-04).
  - **Administración web (#13):** CU-08/CU-09 son web y se añade **CU-10 (ajustar parámetros)**;
    actores precisados a PDI/PTGAS autorizados.
- El catálogo pasa de 9 a **10 CU** (CU-10 nuevo). Pendiente: propagar todo esto al **UML** (#14) y al prototipo (#15).
- Preguntas nuevas detectadas al extender: cancelación de SOS erróneo (CU-04) y comportamiento
  de alertas sin conexión (CU-04/E1) — añadidas como notas; ya relacionadas con el guion.
