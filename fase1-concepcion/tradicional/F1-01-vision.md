# F1-01 — Documento de visión (rama tradicional)

## 1. Definición del problema

Parte de la comunidad universitaria pasa miedo en sus desplazamientos por el campus,
especialmente al volver a casa. El problema afecta sobre todo a las mujeres, en horario
nocturno y al atravesar zonas oscuras y poco transitadas. Si no se actúa, esa sensación
de inseguridad seguirá presente en el día a día de quienes recorren los campus.

## 2. Objetivos del sistema

**Objetivo general:** que la comunidad universitaria conozca y utilice rutas más seguras
en sus desplazamientos, especialmente al volver a casa.

**Objetivos del producto:**

1. Calcular rutas priorizando la seguridad del trayecto.
2. Avisar al usuario cuando corresponda durante el trayecto.
3. Permitir compartir la ubicación en tiempo real.
4. Permitir pedir ayuda desde la propia aplicación.

## 3. Usuarios objetivo

- **Estudiantes, PDI y PTGAS:** volver a casa seguros y disponer de rutas por el campus.
- **Voluntarios:** ayudar a otros usuarios acompañándolos en sus trayectos.
- **Contacto de confianza:** recibe la ubicación del usuario y notificaciones si pasa algo.
- **Servicio de Seguridad del campus:** recibe las alertas y acude a ayudar si hace falta.

## 4. Principales restricciones

*(Extracción literal del enunciado — sección 3 del PDF; entre comillas, la frase que la respalda.)*

- **Autenticación corporativa (SSO):** "los usuarios deberán autenticarse mediante el Sistema de Autenticación Centralizada (SSO) de la universidad, utilizando sus credenciales corporativas (@urjc.es o @alumnos.urjc.es)".
- **Retención limitada del historial (RGPD):** "El historial de rutas de los usuarios no debe guardarse más de 24 horas, salvo que haya habido una incidencia de seguridad reportada".
- **Estadísticas anonimizadas:** "las estadísticas se mostrarán de forma anonimizada [...] garantizando que no se exponga información individualizada de los usuarios".
- **Cumplimiento de protección de datos:** "el sistema debe cumplir rigurosamente con las leyes y reglamentos de protección de datos".
- **Interfaz inclusiva y usable bajo estrés:** "los botones de emergencia o contacto rápido deben ser accesibles con una sola mano y sin necesidad de mirar la pantalla fijamente, pensando en situaciones de estrés".
- **Identidad visual corporativa:** "debe cumplir con el manual de identidad visual corporativo de la URJC más reciente".
- **Bilingüe:** "es fundamental que la aplicación esté disponible en español y en inglés".
- **Disponibilidad 24/7 con redundancia:** "el sistema es crítico en horario nocturno. Se requiere una disponibilidad 24/7, con mecanismos de redundancia en el servidor de cálculo de rutas".
- **Tecnologías open source:** "se priorizará el uso de tecnologías Open Source [...] con comunidades de desarrolladores activas y soporte consolidado".
- **Especificación normalizada e inclusiva:** ERS "siguiendo el formato establecido en el estándar IEEE-STD-29148-2018" con lenguaje según "las directrices marcadas por el Grupo de Innovación Docente [INGENIA]".
- **Plataformas:** aplicación móvil "disponible en Android e iOS".

## 5. Criterios de éxito

*(El enunciado no fija métricas; criterios propuestos por el analista — [PROPUESTO — validar con cliente].)*

- Los usuarios valoran positivamente la aplicación y afirman que les funciona (percepción de utilidad). [PROPUESTO]
- La app se convierte en un estándar de uso entre los alumnos de la universidad (adopción generalizada). [PROPUESTO]
- El proyecto obtiene reconocimiento externo y visibilidad más allá de la universidad (medios, otras instituciones). [PROPUESTO]

## Preguntas abiertas para el cliente

El analista no registró preguntas abiertas en esta sesión ("todo muy claro").
