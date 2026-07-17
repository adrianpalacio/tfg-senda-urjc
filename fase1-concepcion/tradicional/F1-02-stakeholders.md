# F1-02 — Registro de stakeholders (rama tradicional)

## Stakeholders identificados

Repasando el enunciado y pensando en quién más hay detrás, me salen catorce. Los siete primeros aparecen nombrados en el texto; del octavo en adelante están los decisores y los organismos; y los tres últimos, marcados como [IMPLÍCITO], no están escritos pero el enunciado los da por hechos. De cada uno anoto su influencia y su interés en el proyecto (alta / media / baja) y qué aporta a la toma de requisitos.

1. **Estudiantes** (usuario directo). Influencia baja pero interés alto: son el usuario principal, el que necesita rutas seguras para volver a casa. El enunciado habla de una app "diseñada para la comunidad universitaria, Estudiantes...".
2. **PDI**, Personal Docente e Investigador (usuario directo). Influencia e interés medios; aportan las necesidades de uso en sus propios desplazamientos. Sale nombrado en el enunciado.
3. **PTGAS**, Personal Técnico, de Gestión y de Administración y Servicios (usuario directo). Igual que el PDI: influencia e interés medios, necesidades de uso en sus desplazamientos.
4. **Voluntarios** (usuario directo). Influencia baja, interés alto. De ellos salen los requisitos del acompañamiento del modo "Voy contigo"; el enunciado menciona "solicitar acompañamiento a alguno de los voluntarios que previamente se haya apuntado".
5. **Contacto de confianza** (usuario directo). Influencia baja, interés medio. Marca los requisitos de recepción de ubicación y alertas; el enunciado habla de "compartir su ubicación en tiempo real con un 'Contacto de confianza'".
6. **Servicio de Seguridad del campus** (usuario directo / operación). Influencia media, interés alto. De aquí sale el protocolo de alertas y actuación: "el sistema enviará automáticamente una alerta [...] o al Servicio de Seguridad del campus".
7. **LumenSmart S.A.** (externo). Influencia e interés medios. Aporta los requisitos de la integración (datos de farolas y afluencia); la app "se integrará con la información proporcionada por LumenSmart S.A.".
8. **Vicerrectorado de Responsabilidad Social, Cultura y Deporte** (decisor). Influencia e interés altos: es quien impulsa y financia el proyecto ("el Vicerrectorado [...] ha lanzado el proyecto 'Senda URJC'"). De él salen los objetivos de negocio.
9. **Unidad de Igualdad** (decisor / indirecto). Influencia e interés medios; aporta los requisitos de perspectiva de género. El proyecto se hace "en colaboración con la Unidad de Igualdad".
10. **Observatorio del Estudiante** (indirecto). Influencia e interés medios. Es la fuente del estudio PERSEIDAS y consumidor de estadísticas ("proyecto de investigación PERSEIDAS impulsado por el Observatorio del Estudiante").
11. **Grupo INGENIA**, innovación docente (externo / normativo). Influencia e interés medios. De él vienen las directrices de lenguaje inclusivo de la especificación ("el lenguaje debe seguir las directrices marcadas por el Grupo de Innovación Docente...").
12. **Servicio de mantenimiento del campus** (operación). Influencia e interés medios. [IMPLÍCITO] El enunciado no lo nombra, pero las incidencias reportadas ("farola fundida", "obstáculo") generan tickets que alguien tiene que resolver; si la farola está dentro del campus, le toca a mantenimiento de la universidad.
13. **Ayuntamientos de los municipios de los campus** (externo). Influencia e interés medios. [IMPLÍCITO] Si la incidencia cae fuera del campus (accesos, calles), la infraestructura es municipal y tendría que actuar el ayuntamiento.
14. **Responsable de protección de datos de la URJC** (legal). Influencia e interés medios. [IMPLÍCITO] El enunciado exige cumplir rigurosamente con la protección de datos (ubicaciones en tiempo real, retención de 24 h, anonimización); eso lo tiene que supervisar alguien de la universidad.

## Preguntas abiertas para el cliente

*(Surgidas del razonamiento del analista durante la sesión.)*

- Si la incidencia está fuera del recinto del campus (accesos, calles municipales), ¿quién la resuelve? ¿Existe o se prevé acuerdo con los ayuntamientos?
- ¿Qué figura de la universidad supervisará el cumplimiento de protección de datos? ¿Participa en el proyecto desde el inicio?

> **Respondido en la Entrevista 1 (25/08/2026):** la resolución de incidencias se deriva a
> mantenimiento URJC o a LumenSmart (farolas), fuera de la app; Sergio **no** planteó acuerdo con
> los ayuntamientos → el stakeholder #13 (ayuntamientos) queda como hipótesis del analista **no
> confirmada** (se conserva como registro histórico de la Concepción). El responsable de protección
> de datos es el **DPO de la URJC** (#14 confirmado). El Servicio de Seguridad (#6) opera con
> **cuentas genéricas** (`seguridad1@…`).
