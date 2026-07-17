# Documento de Visión del Proyecto
## Senda URJC — Aplicación Móvil de Movilidad Segura para la Comunidad Universitaria

**Versión:** 1.0
**Fecha:** 20 de julio de 2026
**Elaborado por:** Análisis de Requisitos
**Referencia normativa:** IEEE-STD-29148-2018 (Systems and software engineering — Life cycle processes — Requirements engineering)

---

## 1. Definición del problema

### 1.1 Contexto
El proyecto de investigación **PERSEIDAS** (Percepción de Seguridad del Estudiantado en sus Itinerarios de Desplazamiento a las Aulas), impulsado por el Observatorio del Estudiante de la URJC, ha identificado que la percepción de seguridad en los campus universitarios y sus accesos no es homogénea, sino que varía en función de:

- El nivel de **iluminación** de las vías y espacios.
- El **horario** del desplazamiento (con especial criticidad en horario nocturno).
- La **afluencia de personas** en la zona transitada.
- El **género** de la persona usuaria, siendo las mujeres quienes reportan una mayor sensación de vulnerabilidad en zonas poco transitadas o con obstáculos visuales.

### 1.2 Enunciado del problema

| Elemento | Descripción |
|---|---|
| **El problema de** | La inseguridad percibida (no necesariamente objetiva) en los itinerarios peatonales dentro y en los accesos a los campus de la URJC, agravada por falta de iluminación, baja afluencia y falta de perspectiva de género en las soluciones de movilidad existentes. |
| **Afecta a** | Estudiantes, Personal Docente e Investigador (PDI) y Personal Técnico, de Gestión y de Administración y Servicios (PTGAS) de la URJC, con especial incidencia en colectivos que reportan mayor vulnerabilidad (p. ej., mujeres en trayectos solitarios). |
| **El impacto de lo cual es** | Ansiedad, evitación de determinados itinerarios u horarios, reducción de la sensación de bienestar y seguridad de la comunidad universitaria, y riesgo real ante incidentes no detectados a tiempo. |
| **Una solución exitosa** | Debe ofrecer una alternativa de navegación que priorice la seguridad percibida y real sobre la rapidez, integre información en tiempo real del entorno físico (iluminación, afluencia, incidencias) y proporcione mecanismos de acompañamiento y alerta temprana ante situaciones de riesgo. |

### 1.3 Motivación institucional
El Vicerrectorado de Responsabilidad Social, Cultura y Deporte, en colaboración con la Unidad de Igualdad, impulsa **Senda URJC** como respuesta directa a los hallazgos de PERSEIDAS, con el objetivo declarado de que la aplicación "no solo guíe a los usuarios a su destino, sino que lo haga priorizando la seguridad personal y la tranquilidad del usuario".

---

## 2. Objetivos del sistema

### 2.1 Objetivo general
Desarrollar y desplegar una aplicación móvil multiplataforma (Android e iOS) que calcule y recomiende **rutas seguras** dentro de los campus de la URJC y sus accesos inmediatos, priorizando la seguridad percibida frente al criterio tradicional de tiempo/distancia.

### 2.2 Objetivos específicos

1. **OE-1 — Cálculo de rutas seguras:** Ofrecer alternativas de ruta calificadas mediante un "Índice de Seguridad Percibida" calculado en tiempo real a partir de tres parámetros: iluminación, afluencia de personas y estado del entorno (obras, obstáculos, deterioro).
2. **OE-2 — Integración con infraestructura de alumbrado inteligente:** Consumir en tiempo real los datos del sistema de LumenSmart S.A. (estado y intensidad de farolas, sensores de presencia) para penalizar dinámicamente tramos afectados por apagones o baja afluencia.
3. **OE-3 — Acompañamiento y reducción de la ansiedad en trayectos solitarios:** Implementar el modo "Voy contigo", que permite compartir ubicación en tiempo real con un contacto de confianza o solicitar acompañamiento de voluntarios registrados.
4. **OE-4 — Detección y gestión de incidencias durante el trayecto:** Detectar paradas inesperadas o desvíos bruscos, emitir una prealerta al usuario y, en ausencia de confirmación en 30 segundos, escalar automáticamente una alerta al contacto de confianza o al Servicio de Seguridad del campus con la última ubicación conocida.
5. **OE-5 — Recálculo de ruta bajo demanda:** Permitir al usuario solicitar una nueva ruta antes o durante el trayecto si la actual no le resulta adecuada.
6. **OE-6 — Reporte comunitario de incidencias:** Habilitar el reporte de incidencias tipificadas ("Farola fundida", "Zona solitaria/miedo", "Obstáculo en la vía", "Punto con dificultad") que retroalimenten el algoritmo de rutas y generen tickets en un panel de administración.
7. **OE-7 — Autenticación institucional:** Garantizar el acceso mediante el Sistema de Autenticación Centralizada (SSO) de la URJC con credenciales corporativas (@urjc.es / @alumnos.urjc.es).
8. **OE-8 — Cumplimiento normativo de protección de datos:** Asegurar el tratamiento adecuado de datos de ubicación sensibles, con purga automática del historial de rutas a las 24 horas (salvo incidencia reportada) y estadísticas anonimizadas.
9. **OE-9 — Accesibilidad e inclusión:** Ofrecer una interfaz inclusiva, con controles de emergencia operables con una sola mano y sin necesidad de mirar la pantalla, disponible en español e inglés, y conforme al manual de identidad visual corporativo de la URJC.
10. **OE-10 — Disponibilidad crítica:** Garantizar un servicio 24/7 mediante mecanismos de redundancia en el servidor de cálculo de rutas, dada la criticidad del sistema en horario nocturno.

---

## 3. Usuarios objetivo

| Perfil | Descripción | Necesidades clave |
|---|---|---|
| **Estudiantes** | Comunidad estudiantil de los distintos campus de la URJC, principal colectivo destinatario de las conclusiones de PERSEIDAS. | Rutas seguras, modo acompañamiento, reporte de incidencias, uso en horario nocturno. |
| **Personal Docente e Investigador (PDI)** | Profesorado e investigadores que se desplazan por los campus en distintos horarios. | Rutas seguras, autenticación corporativa, disponibilidad del servicio. |
| **Personal Técnico, de Gestión y de Administración y Servicios (PTGAS)** | Personal de administración y servicios de la universidad. | Rutas seguras, accesibilidad de la interfaz. |
| **Voluntarios de acompañamiento** | Miembros de la comunidad universitaria inscritos para acompañar a otros usuarios en el modo "Voy contigo". | Recepción de solicitudes de acompañamiento, disponibilidad configurable. |
| **Contactos de confianza** | Personas designadas por el usuario para recibir su ubicación en tiempo real o alertas de incidencia. | Recepción de notificaciones de ubicación y alertas. |
| **Servicio de Seguridad del campus** | Personal responsable de la respuesta ante alertas de incidencia escaladas automáticamente. | Recepción de alertas con última ubicación conocida, panel de gestión de tickets. |
| **Administradores del sistema** | Personal técnico/institucional responsable de la gestión de incidencias reportadas. | Panel de administración para resolución de tickets de incidencias. |

### Actores externos (integraciones)
- **LumenSmart S.A.:** proveedor del sistema de alumbrado inteligente, fuente de datos en tiempo real sobre estado de farolas y sensores de presencia.
- **Sistema SSO de la URJC:** proveedor de autenticación centralizada.

---

## 4. Principales restricciones

### 4.1 Restricciones normativas y de proceso
- La especificación de requisitos debe seguir el estándar **IEEE-STD-29148-2018**.
- El lenguaje empleado en la documentación y en la propia aplicación debe seguir las directrices del **Grupo de Innovación Docente Consolidado en Acciones Educativas para la Inclusión y la Igualdad de Género en la Informática**, coordinador de PERSEIDAS.

### 4.2 Restricciones legales y de privacidad
- Cumplimiento riguroso de la normativa de protección de datos aplicable a datos de ubicación (categoría sensible).
- El historial de rutas no debe conservarse más de **24 horas**, salvo que exista una incidencia de seguridad reportada asociada.
- Las estadísticas deben mostrarse **anonimizadas**, sin exponer información individualizada de los usuarios.

### 4.3 Restricciones tecnológicas
- Priorización de **tecnologías Open Source**, con comunidades de desarrolladores activas y soporte consolidado.
- Disponibilidad nativa en **Android e iOS**.
- Autenticación exclusiva mediante el **SSO corporativo de la URJC** (credenciales @urjc.es / @alumnos.urjc.es).
- Integración obligatoria con el sistema externo de **LumenSmart S.A.** para datos de iluminación y afluencia en tiempo real.

### 4.4 Restricciones de diseño e interfaz
- Interfaz **inclusiva** y conforme al **manual de identidad visual corporativo de la URJC** más reciente.
- Controles de emergencia/contacto rápido accesibles **con una sola mano** y **sin necesidad de mirar fijamente la pantalla** (diseño pensado para situaciones de estrés).
- Disponibilidad del sistema en **español e inglés**.

### 4.5 Restricciones operativas
- **Disponibilidad 24/7**, con criticidad especial en horario nocturno.
- **Redundancia** obligatoria en el servidor de cálculo de rutas.
- Tiempo de respuesta ante ausencia de confirmación de "prealerta": escalado automático de alerta en **30 segundos**.

---

## 5. Criterios de éxito

| Criterio | Descripción | Indicador propuesto |
|---|---|---|
| **CE-1** | El algoritmo prioriza correctamente la seguridad percibida frente a la rapidez. | % de rutas recomendadas con mayor Índice de Seguridad Percibida frente a la ruta más rápida disponible. |
| **CE-2** | Reacción efectiva ante cambios en la iluminación. | Tiempo transcurrido entre la notificación de un apagón por parte de LumenSmart y la actualización de la penalización del tramo en el cálculo de rutas. |
| **CE-3** | Efectividad del modo "Voy contigo". | Tasa de alertas de incidencia correctamente escaladas al contacto de confianza o Servicio de Seguridad dentro del plazo de 30 segundos establecido. |
| **CE-4** | Participación comunitaria en el reporte de incidencias. | Volumen de incidencias reportadas por los usuarios y porcentaje resuelto/atendido a través del panel de administración. |
| **CE-5** | Cumplimiento normativo de protección de datos. | Auditoría de retención de datos (purga a las 24h salvo incidencia) y verificación de anonimización de estadísticas. |
| **CE-6** | Accesibilidad e inclusión de la interfaz. | Resultados de pruebas de usabilidad con usuarios reales, incluyendo pruebas de uso de botones de emergencia con una sola mano y sin mirar la pantalla. |
| **CE-7** | Disponibilidad del servicio. | Porcentaje de uptime del servidor de cálculo de rutas (objetivo: disponibilidad 24/7 con redundancia activa). |
| **CE-8** | Adopción por parte de la comunidad universitaria. | Número de usuarios activos (estudiantes, PDI, PTGAS) autenticados vía SSO y frecuencia de uso de la aplicación. |
| **CE-9** | Percepción subjetiva de seguridad mejorada. | Comparativa de encuestas de percepción de seguridad (tipo PERSEIDAS) antes y después del despliegue de la aplicación. |
| **CE-10** | Reducción de la brecha de género en la percepción de seguridad. | Comparativa diferenciada por género de la percepción de seguridad y del uso de funcionalidades como "Voy contigo". |

---

## 6. Resumen de trazabilidad problema → objetivo

| Problema identificado (PERSEIDAS) | Objetivo del sistema asociado |
|---|---|
| Falta de iluminación como factor crítico de inseguridad | OE-1, OE-2 |
| Mayor vulnerabilidad percibida por mujeres en trayectos solitarios | OE-3, OE-4, CE-10 |
| Ausencia de perspectiva de seguridad en navegadores tradicionales | OE-1, OE-5 |
| Falta de canal para reportar el estado real del entorno | OE-6 |
| Necesidad de control institucional del acceso | OE-7 |
| Sensibilidad de los datos de ubicación | OE-8 |
| Necesidad de uso inclusivo y en situaciones de estrés | OE-9 |
| Criticidad nocturna del sistema | OE-10 |

---

*Documento elaborado como punto de partida para la posterior especificación de requisitos software (SRS) conforme a IEEE-STD-29148-2018.*
