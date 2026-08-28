# F3 — Especificación (rama tradicional) — formalización IEEE 29148

## 1. Convenciones (conforme a IEEE-STD-29148-2018, adaptado)

- Cada requisito se enuncia con "El sistema deberá…" en forma verificable, con atributos:
  **ID** (RF-XX/RNF-XX), **prioridad** (A/M/B), **fuente** (frase del enunciado o S-XX) y
  **criterio de verificación** (esta sección).
- Lenguaje: directrices de inclusión del grupo INGENIA (requisito RNF-14); redacción
  impersonal y sin ambigüedades (términos vagos prohibidos salvo cita del enunciado).
- Trazabilidad: requisito ↔ fuente (en F2) ↔ caso de uso (catálogo §3) ↔ supuesto (si aplica).

## 2. Criterios de verificación

| ID | Criterio de verificación (cómo se comprueba que se cumple) |
|----|------------------------------------------------------------|
| RF-01 | Un usuario con credenciales corporativas válidas accede; cualquier otra credencial es rechazada con mensaje de error |
| RF-02 | Ante origen y destino válidos, el sistema devuelve ≥ 2 rutas alternativas cuando existen caminos distintos |
| RF-03 | Cada ruta ofrecida muestra su Índice de Seguridad; ante un cambio de datos de entrada (p. ej. apagón), el índice recalculado difiere |
| RF-04 | Los cambios de estado de una farola en LumenSmart se reflejan en el sistema dentro de la ventana de actualización acordada |
| RF-05 | Simulado un apagón en un tramo, las rutas nuevas dejan de atravesarlo o lo muestran penalizado |
| RF-06 | El modo «Voy contigo» solo puede activarse antes de iniciar el trayecto y queda visiblemente activo |
| RF-07 | El contacto de confianza recibe la ubicación en tiempo real mientras el modo esté activo |
| RF-08 | Una solicitud de acompañamiento llega a voluntarios inscritos y su aceptación se comunica al solicitante |
| RF-09 | El contacto configurado en el perfil es el que recibe ubicación y alertas |
| RF-10 | El alta de voluntario es autoservicio (solo cuenta corporativa, sin aprobación); el voluntario recibe solicitudes por proximidad o calendario y el acompañamiento es presencial [S-07, Entrevista 1] |
| RF-11 | Al desviarse más del ancho del camino (~2 m) o detenerse por inactividad, el dispositivo vibra y muestra la prealerta [S-05, Entrevista 1] |
| RF-12 | Sin confirmación en el plazo fijado (30 s por defecto, configurable por el usuario), el contacto o el Servicio de Seguridad recibe la alerta con la última ubicación [S-05, Entrevista 1] |
| RF-13 | Al solicitar ruta nueva en trayecto, la ruta activa cambia, NO se genera alerta por el desvío del cambio, y el contacto ve la ruta actualizada |
| RF-14 | La pulsación del botón SOS genera alerta inmediata a Seguridad y contacto, sin pasos intermedios |
| RF-15 | Los cuatro tipos de incidencia pueden reportarse y quedan registrados con ubicación y fecha |
| RF-16 | Tras un reporte subjetivo, la administración lo revisa, asigna un grado de inseguridad y puede modificar o disolver la penalización de la zona; sin acción del administrador, la penalización se mantiene [S-12, Entrevista 1] |
| RF-17 | Cada incidencia reportada genera exactamente un ticket visible en el panel |
| RF-18 | Un ticket transita abierto→en curso→resuelto, con su gravedad (grave/media); el administrador registra la derivación a mantenimiento URJC o LumenSmart y, al resolverse, quien reportó recibe notificación |
| RF-19 | Las estadísticas y mapas de calor son accesibles solo para perfiles autorizados y no permiten identificar usuarios |
| RF-20 | Un administrador autorizado modifica los pesos del índice y los umbrales por campus/día/hora desde la web, y el cambio se refleja en el cálculo de rutas posterior |
| RF-21 | Con un perfil que declara movilidad reducida, las rutas ofrecidas evitan escaleras cuando existe alternativa |
| RF-22 | Una ruta guardada por el usuario puede volver a consultarse después desde su perfil |
| RNF-01 | Auditoría de protección de datos sin no conformidades (base legal, consentimientos, registro de tratamiento) |
| RNF-02 | Un trayecto sin incidencia no es recuperable pasadas 24 h; uno con incidencia lo es solo por perfiles autorizados |
| RNF-03 | Ninguna vista estadística permite reconstruir trayectos o identidades individuales |
| RNF-04 | Revisión de accesibilidad/inclusión superada según pauta acordada con el cliente |
| RNF-05 | Los botones de emergencia son operables con una sola mano y sin mirar (prueba con usuarios en movimiento) |
| RNF-06 | Revisión de conformidad con el manual de identidad visual vigente |
| RNF-07 | Toda la interfaz y notificaciones existen en español e inglés y el cambio de idioma es completo |
| RNF-08 | El inventario tecnológico documenta licencia y comunidad de cada componente; las excepciones no open source están justificadas |
| RNF-09 | Prueba de conmutación: la caída del servidor primario de rutas no interrumpe el servicio |
| RNF-10 | La aplicación se instala y opera en las versiones soportadas de Android e iOS |
| RNF-11 | El cálculo de rutas funciona en los campus y accesos definidos; fuera de cobertura se informa al usuario |
| RNF-12 | Sin conexión, la app muestra la última ruta cargada y el aviso de funcionalidad limitada, sin errores |
| RNF-13 | Ninguna funcionalidad es accesible sin autenticación corporativa |
| RNF-14 | El documento ERS supera la revisión de conformidad con IEEE 29148 y las directrices de lenguaje |
| RNF-15 | La app móvil no expone funciones de administración; el panel web solo es accesible con cuentas autorizadas |
| RNF-16 | Fuera del horario de apertura del campus, la app no permite calcular rutas ni iniciar trayectos e informa de ello |
| RNF-17 | El cálculo de una ruta típica se completa en un tiempo razonable (referencia: 5-10 s) |
| RNF-18 | El consumo de batería, memoria y almacenamiento se mantiene dentro de límites que no penalizan el uso en móviles de gama media |

## 3. Catálogo de casos de uso

| CU | Nombre | Actor principal | RF cubiertos |
|----|--------|-----------------|--------------|
| CU-01 | Autenticarse en el sistema | Usuario (comunidad URJC) | RF-01 |
| CU-02 | Solicitar ruta segura | Usuario | RF-02, RF-03 |
| CU-03 | **Realizar trayecto con modo «Voy contigo»** | Usuario | RF-06, RF-07, RF-08, RF-11, RF-12, RF-13 |
| CU-04 | Usar el botón de emergencia (SOS) | Usuario | RF-14 |
| CU-05 | Reportar incidencia del entorno | Usuario | RF-15, RF-16 |
| CU-06 | Configurar perfil (contacto de confianza / alta de voluntario) | Usuario | RF-09, RF-10 |
| CU-07 | Atender solicitud de acompañamiento | Voluntario | RF-08 |
| CU-08 | Gestionar tickets de incidencias *(web)* | Administración web (PTGAS) | RF-17, RF-18 |
| CU-09 | Consultar estadísticas y mapas de calor *(web)* | Administración web (PDI/PTGAS) | RF-19 |
| CU-10 | Ajustar parámetros de seguridad *(web)* | Administración web (PDI/PTGAS) | RF-20 |
| — | (Integración LumenSmart: interacción sistema-sistema, sin caso de uso de usuario; se modela como actor secundario) | LumenSmart | RF-04, RF-05 |
| — | (Recepción de alertas: el Servicio de Seguridad recibe las alertas con cuentas genéricas; actor secundario de CU-03/CU-04) | Servicio de Seguridad | RF-12, RF-14 |

> ✅ Casos extendidos: CU-03 abajo como modelo; CU-01…CU-09 en `F3-casos-de-uso-extendidos.md`
> (21/07). **CU-10 (ajustar parámetros, web) añadido el 25/08** — extendido en ese mismo fichero.

> **NOTA 25/08 (Entrevista 1) — dos frentes [corrige S-11]:** el sistema tiene una **app móvil**
> (uso general: CU-01…CU-07) y una **aplicación web de administración** (RNF-15). Los casos de uso
> de administración **CU-08 (gestionar tickets)** y **CU-09 (consultar estadísticas)**, más el ajuste
> de parámetros de seguridad, se realizan **solo desde la web**; el actor «Administración» se precisa
> como **PDI/PTGAS y Servicio de Seguridad** con cuenta autorizada. El detalle de estos casos de uso
> web se amplía en la tarea de nuevos CU de administración (hoja de ruta #13).

## 4. Caso de uso extendido CU-03 — Realizar trayecto con modo «Voy contigo»

- **Actores:** Usuario (principal); Contacto de confianza, Voluntario, Servicio de Seguridad (secundarios); LumenSmart (sistema externo).
- **Precondiciones:** usuario autenticado (CU-01); ruta calculada (CU-02); contacto de confianza configurado o voluntarios disponibles; dispositivo con conexión y ubicación activas [S-03].
- **Postcondiciones (éxito):** el trayecto finaliza; la compartición de ubicación cesa; el historial se elimina a las 24 h al no haber incidencia (RNF-02).

**Flujo principal:**
1. El usuario activa el modo «Voy contigo» antes de iniciar el trayecto (RF-06).
2. El sistema le ofrece elegir destinatario: contacto de confianza o solicitud a voluntario (RF-07, RF-08).
3. El usuario elige contacto de confianza; el sistema inicia la compartición de ubicación en tiempo real (RF-07).
4. El usuario inicia el trayecto siguiendo la ruta marcada.
5. El sistema supervisa la posición respecto a la ruta y los umbrales configurados [S-05].
6. El usuario llega al destino; el sistema detecta la finalización, detiene la compartición y notifica el fin del trayecto al contacto.

**Flujos alternativos:**
- 3a. El usuario solicita acompañamiento a un voluntario; el sistema difunde la solicitud a voluntarios inscritos; un voluntario acepta y pasa a recibir la ubicación (RF-08, CU-07). Si nadie acepta en un tiempo prudencial, el sistema lo informa y ofrece continuar con contacto de confianza.
- 5a. El usuario solicita una ruta nueva durante el trayecto (RF-13): el sistema recalcula, sustituye la ruta activa, re-ancla la supervisión a la nueva SIN emitir prealerta por el cambio, y notifica la ruta nueva al contacto [S-06].
- 5b. LumenSmart notifica un apagón en un tramo de la ruta activa (RF-05): el sistema penaliza el tramo y ofrece proactivamente una ruta alternativa.

**Excepciones:**
- E1. El usuario se detiene o desvía superando los umbrales (RF-11): el sistema emite prealerta (vibración + notificación). Si el usuario confirma «estoy bien» en ≤ 30 s, la supervisión continúa. Si no confirma (RF-12): el sistema envía alerta con última ubicación conocida al contacto seleccionado o al Servicio de Seguridad, y mantiene la compartición activa. El trayecto queda marcado con incidencia (retención según RNF-02/[S-09]).
- E2. El usuario pulsa el botón SOS en cualquier momento (RF-14, CU-04): alerta inmediata a Seguridad y contacto, sin esperar prealerta ni ventana de confirmación.
- E3. Pérdida de conexión del dispositivo [S-03, corregido en Entrevista 1]: la pérdida de cobertura se trata como disparador de alerta; la ruta se conserva en el móvil y el contacto ve la última ubicación recibida con su marca de tiempo; al recuperar la cobertura se reanuda con normalidad.

## 5. Trazabilidad con supuestos

CU-03 depende de: S-03 (conexión), S-05 (umbrales), S-06 (re-anclaje del recálculo),
S-09 (retención con incidencia), y S-04 vía la excepción E2. Si el cliente corrige alguno,
este caso de uso se actualiza en el paso correspondiente.

## 6. Interfaces externas (IEEE 29148 — requisitos de interfaz)

> Añadido 25/08/2026 (hoja de ruta #3, #3a, #3b). Fuente: **ficha técnica oficial LumenSmart
> LC-400/LC-200** que Sergio entregó en la Entrevista 1 (resumen en `../ficha-lumensmart-resumen.md`).
> Precisa los requisitos RF-04 y RF-05, que hasta ahora describían la integración sin detalle.
> El detalle de la interfaz de autenticación de usuarios (SSO/LDAP, RF-01) se especificará junto a
> los requisitos nuevos de la entrevista (hoja de ruta #10).

### 6.1. Interfaz con LumenSmart — API LumenConnect v2

| ID | Requisito de interfaz | Fuente | Cubre |
|----|-----------------------|--------|-------|
| IEXT-01 | El sistema se integrará con LumenSmart mediante su API REST LumenConnect v2 sobre HTTPS (TLS 1.3), con datos en JSON (UTF-8) | Ficha §5.1 | RF-04 |
| IEXT-02 | El sistema se autenticará ante la API con OAuth 2.0 (client credentials); los tokens de acceso caducan a la hora y se renuevan de forma transparente | Ficha §5.1, §9 | RF-04 |
| IEXT-03 | El sistema obtendrá por consulta (polling) el estado de las luminarias y la afluencia por zona: `GET /luminarias` (estado, intensidad, iluminancia en lux), `GET /zonas/{campus}/afluencia` (índice 0-100, celdas 50×50 m), `GET /alertas` y `GET /luminarias/{id}/historico` | Ficha §5.2 | RF-04 |
| IEXT-04 | El sistema recibirá en tiempo real los eventos relevantes mediante webhooks suscritos: `zona.apagon` (≥3 farolas, <10 s), `luminaria.averia`, `zona.afluencia.update` (cada 5 min) y `mantenimiento.programado`; validará la firma HMAC-SHA256 de cada notificación | Ficha §5.3 | RF-04, RF-05 |
| IEXT-05 | Al recibir un evento `zona.apagon` o un estado `APAGADA`/`AVERIADA`, el sistema penalizará el tramo afectado en el cálculo de rutas | Ficha §5.3 + Enunciado | RF-05 |
| IEXT-06 | El sistema respetará los límites del servicio: 1.000 peticiones/minuto y la retención de histórico de 90 días de la API; asumirá la disponibilidad SLA 99,95 % del proveedor | Ficha §5.1, §4 | RNF-09 |
| IEXT-07 | Si LumenSmart no responde o deja de enviar datos, el sistema informará de que no puede garantizar rutas seguras en ese momento, en lugar de calcular con datos obsoletos | Entrevista 1 | RF-03, RNF-09 |
| IEXT-08 | El desarrollo y las pruebas de integración se realizarán contra el entorno sandbox de LumenSmart (50 luminarias simuladas) antes de conectar con el entorno real | Ficha §10 | (proceso) — decisión D-K |

### 6.2. Datos consumidos de cada luminaria (catálogo — #3a)

Referencia completa en `../ficha-lumensmart-resumen.md` §2. Los que usa Senda URJC:

| Dato | Frecuencia | Uso en Senda URJC |
|------|-----------|-------------------|
| Estado operativo (ENCENDIDA/APAGADA/AVERIADA/EN_MANTENIMIENTO) | 60 s | Penalización de tramo (IEXT-05) y componente «entorno» del índice |
| Iluminancia ambiental (lux) | 60 s | Componente «iluminación» del índice (umbrales UNE-EN 13201) |
| Índice de afluencia por zona (0-100) | 5 min | Componente «afluencia» del índice |
| Alerta de avería / evento `zona.apagon` | evento | Recálculo y penalización inmediata (RF-05) |

> **Limitación declarada (#4a):** el sensor de presencia **cuenta activaciones, no personas**; la
> afluencia es un índice relativo del proveedor, no un conteo absoluto. Se documenta como amenaza a
> la validez del índice.

### 6.3. Criterios de verificación de la interfaz

| ID | Criterio |
|----|----------|
| IEXT-01/02 | Con credenciales OAuth válidas se obtiene respuesta 200 de la API; token caducado se renueva sin intervención del usuario |
| IEXT-03 | Una consulta a `/zonas/{campus}/afluencia` devuelve el índice 0-100 esperado en el sandbox |
| IEXT-04 | Un evento `zona.apagon` simulado en el sandbox llega al sistema en <10 s y su firma HMAC se valida correctamente |
| IEXT-05 | Tras un `zona.apagon`, las rutas nuevas evitan o penalizan el tramo afectado |
| IEXT-07 | Cortada la conexión con la API, el sistema muestra el aviso de servicio no garantizado y no ofrece rutas con datos caducados |

### 6.4. Severidad de incidencias y su relación con LumenSmart (#9a)

Conviven dos esquemas de severidad, y hay que distinguirlos:

| Origen | Esquema | Quién lo fija | Ejemplos |
|--------|---------|---------------|----------|
| Incidencia reportada por un usuario (RF-15, ticket RF-18) | **grave / media** | El administrador al revisar el ticket | Obstáculo en la vía, zona solitaria/miedo, punto con dificultad |
| Alerta de alumbrado de LumenSmart (IEXT-04) | **CRÍTICA / ALTA / MEDIA / BAJA** | LumenSmart (ficha §7) | Apagón de zona = CRÍTICA; avería en vía principal = ALTA |

- La clasificación **grave/media** de los tickets es la que indicó el cliente (Entrevista 1).
- **Mapeo propuesto (a validar):** cuando una incidencia de usuario tipo «farola fundida» se
  corresponde con una avería/apagón que LumenSmart ya notifica, el ticket **hereda la severidad de
  LumenSmart** (p. ej. apagón → grave; degradación → media); las incidencias no relacionadas con el
  alumbrado las clasifica el administrador manualmente. Este cruce es una propuesta de
  especificación, no algo fijado por el cliente.

### 6.5. Cartografía y red de rutas — decisión D-A

El cálculo de rutas (RF-02) necesita una red de caminos. Se combinan dos fuentes, ambas open source (RNF-08):

| ID | Requisito de interfaz | Fuente | Cubre |
|----|-----------------------|--------|-------|
| IEXT-09 | El sistema importará el GeoJSON (RFC 7946) que LumenSmart entrega por campus, con las capas de **zonas** (polígonos), **luminarias** (puntos) y **rutas peatonales** (líneas); esa red interna es la base para trazar trayectos dentro del recinto | Ficha §8 | RF-02, RF-03 |
| IEXT-10 | El sistema usará **OpenStreetMap** como cartografía base y para el entorno exterior al campus (calles, metro, paradas de bus y aparcamientos en el radio de 500 m) | Entrevista 1 + Enunciado | RF-02, RNF-08, RNF-11 |

**Resolución de D-A:** la ficha de LumenSmart aclara que el GeoJSON **ya incluye las rutas peatonales** del campus, así que **no hace falta digitalizarlas a mano** salvo huecos residuales (caminos que ni el GeoJSON ni OpenStreetMap recojan). Esto corrige la hipótesis previa («a mano») con un dato objetivo de la ficha. ⚠️ **A confirmar con Sergio en la 2ª entrevista:** de palabra dijo que había que hacerlos a mano, lo que contradice lo que documenta su propio proveedor.

| ID | Criterio de verificación |
|----|--------------------------|
| IEXT-09/10 | Cargados el GeoJSON del campus y la capa de OpenStreetMap, el sistema traza una ruta continua entre un punto interior del campus y un punto de interés exterior (p. ej. Aulario II → Metro Móstoles) |

## 7. Trazabilidad de la integración

- IEXT-01…08 concretan RF-04 y RF-05 (antes descritos sin detalle técnico) y se apoyan en RNF-09;
  IEXT-09/10 (cartografía) concretan la red de rutas de RF-02/03 con fuentes open source (RNF-08).
- Fuente única de los valores técnicos: `../ficha-lumensmart-resumen.md` (extracto de la ficha oficial).
- Pendiente de decisión: **D-K** (uso del sandbox, IEXT-08). **D-A** resuelta en §6.5 como hipótesis de
  trabajo (GeoJSON de LumenSmart + OpenStreetMap), a confirmar con Sergio. Pendiente de otra tarea:
  interfaz SSO/LDAP de usuarios (RF-01), que se especifica con los requisitos nuevos de la entrevista (#10).

## 8. Cálculo del Índice de Seguridad Percibida (RF-03)

> Añadido 25/08/2026 (hoja de ruta #4 y #4a). **La fórmula NO está fijada por el enunciado ni por
> el cliente**: Sergio solo pidió que fuera parametrizable (S-08). Es una **decisión de diseño del
> analista**, adoptada como **extensión del supuesto S-08 y PENDIENTE DE VALIDAR** con el cliente.
> Se elige la opción más simple y verificable (media ponderada), a propósito no sofisticada.

### 8.1. Componentes (cada uno normalizado a 0-100)

- **I — Iluminación:** a partir de la iluminancia en lux del luxómetro (IEXT-03), según UNE-EN 13201:
  `lux ≥ 15 → 100`, `lux ≤ 3 → 0`, interpolación lineal entre ambos. (Umbrales firmes, de la norma.)
- **A — Afluencia:** índice 0-100 que entrega LumenSmart por zona (`GET /zonas/{campus}/afluencia`,
  IEXT-03); se usa tal cual (más afluencia = más seguridad percibida).
  ⚠️ **Limitación (#4a):** el sensor cuenta activaciones, no personas → A es una estimación relativa,
  no un conteo. Se declara como amenaza a la validez del índice.
- **E — Entorno:** parte de 100 y resta penalizaciones por farolas apagadas/averiadas e incidencias
  activas en el tramo; un evento `zona.apagon` (IEXT-05) lleva E del tramo a 0.

### 8.2. Índice por tramo

```
ISP(tramo) = round( w_ilum · I  +  w_aflu · A  +  w_ent · E )        [0–100]
   con   w_ilum + w_aflu + w_ent = 1
```
Los pesos son **configurables desde administración por campus, día y hora** (S-08); por defecto
**⅓ cada uno**.

### 8.3. Índice por ruta

```
ISP(ruta) = media de los ISP de sus tramos
   EXCEPCIÓN: si algún tramo tiene ISP < umbral_crítico → la ruta se marca «no segura»
              y se excluye de las recomendadas
```
El sistema ofrece las **3 rutas de mayor ISP** (RF-02, RF-03); la excepción evita que un tramo malo
quede escondido por la media (el «eslabón más débil»).

### 8.4. Parámetros a validar (decisión D-B)

| Parámetro | Valor propuesto | Estado |
|-----------|-----------------|--------|
| Pesos por defecto (w_ilum / w_aflu / w_ent) | ⅓ / ⅓ / ⅓ | S-08 (validado como parametrizable; valores a confirmar) |
| Umbrales de iluminación | 15 lux (bueno) / 3 lux (crítico) | Firme (UNE-EN 13201) |
| Umbral_crítico de tramo | ISP < 30 | Propuesto — a validar |
| Penalización por incidencia | subjetiva: grado que fija el administrador (S-12); objetiva (apagón/avería): automática vía LumenSmart | Grado manual firme (S-12); magnitud a afinar (D-B) |

### 8.5. Verificación

- **Reproducibilidad:** dados I, A y E de un tramo, el ISP se recalcula a mano y coincide con el del sistema.
- **Sensibilidad:** al recibir `zona.apagon`, el ISP del tramo cae y las rutas recomendadas cambian.
- **Trazabilidad:** RF-03 (índice) ← IEXT-03/04/05 (datos de LumenSmart) ← S-08 (parametrización).
