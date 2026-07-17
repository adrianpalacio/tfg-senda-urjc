# F1-03 — Análisis preliminar de riesgos (rama tradicional)

## Riesgos identificados

He repasado el enunciado buscando qué cosas pueden torcer el proyecto o la toma de requisitos. Me salen cinco. Los pongo de más a menos preocupante según lo veo:

1. **Que LumenSmart falle.** Es la única fuente externa de la que sacamos la iluminación y la afluencia. Si se cae, corta los datos o los manda mal, la app se queda sin base para calcular el índice de seguridad, y eso choca de lleno con que tiene que estar disponible 24/7. Probabilidad media e impacto medio. Para mitigarlo: respaldos y redundancia en sitios distintos, y avisar al usuario de que el servicio no está disponible solo como último recurso.

2. **Que se filtren los datos de ubicación.** Alguien podría interceptarlos en tránsito, escalar privilegios o colarse en los servidores. Lo veo poco probable, pero el impacto sería alto. Mitigación: cifrar en tránsito (HTTPS) y guardar lo mínimo imprescindible, solo las 24 horas que marca el enunciado.

3. **Que no la use nadie.** La app puede funcionar bien y aun así no calar entre la gente si no se promociona. Probabilidad media e impacto alto. Ayudaría promocionarla como proyecto de la universidad y publicar el código en abierto, para que los estudiantes puedan aportar y la sientan como suya (además encaja con la preferencia por open source del enunciado).

4. **Que pase algo malo en una ruta marcada como "segura".** El daño sería para la persona, y la responsabilidad y la reputación, para la universidad. Probabilidad media e impacto medio. Hay que dejar muy claro, en los términos de uso y en la propia app, que el índice es una recomendación y no una garantía: el usuario tiene que seguir atento y la usa bajo su responsabilidad.

5. **Descoordinación con terceros** (los ayuntamientos y el programa de voluntarios). Sin reglas claras ni buena coordinación, esas dos patas pueden atascar el proyecto. Es el que veo más probable de todos, aunque con impacto bajo. Cómo mitigarlo está todavía por definir; lo paso a las preguntas para el cliente.

## Preguntas abiertas para el cliente

*(Derivadas del riesgo 5, identificado como el más probable por el analista.)*

- ¿Qué reglas de funcionamiento tendrá el programa de voluntarios (alta, verificación, coordinación, responsabilidades)?
- ¿Cómo se articulará la coordinación con los ayuntamientos para las incidencias fuera del recinto? ¿Existe algún acuerdo previo?
