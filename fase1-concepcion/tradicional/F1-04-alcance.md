# F1-04 — Delimitación del alcance (rama tradicional)

## Dentro del alcance

Lo que el sistema tiene que hacer, con su prioridad (alta / media / baja) y por qué entra:

- **Calcular rutas con el Índice de Seguridad Percibida**, ofreciendo alternativas al pedir un trayecto. Prioridad alta: es el núcleo del propósito de la app según el enunciado.
- **Integración con LumenSmart** (estado de farolas y afluencia en tiempo real). Alta: es la fuente de datos del índice, sin ella no hay cálculo veraz.
- **Modo "Voy contigo"** (ubicación compartida, voluntarios, prealerta y alerta a los 30 s). Alta: es la funcionalidad estrella de la perspectiva de género del enunciado.
- **Recálculo de ruta a petición**, antes o durante el trayecto. Media: complementa al cálculo de rutas.
- **Reporte de incidencias** (farola fundida, zona solitaria o de miedo, obstáculo, punto con dificultad). Alta: los usuarios "son parte activa de la seguridad" y esto alimenta el algoritmo.
- **Panel de administración con tickets** de incidencias. Media: hace falta para resolverlas, pero no es de cara al usuario final.
- **Estadísticas anonimizadas.** Baja: tienen valor institucional, pero no son críticas para el usuario en la primera versión.
- **Autenticación con el SSO corporativo de la URJC.** Alta: es la puerta de entrada obligatoria según el enunciado.

## Fuera del alcance

- **La versión web de la aplicación.** El enunciado solo pide app móvil (Android/iOS), así que de momento la dejo fuera.

## Frontera difusa (lo decide el cliente)

Tres cosas que no me atrevo a meter ni a sacar por mi cuenta; van con mi recomendación a las preguntas para el cliente:

- **Las zonas fuera del recinto del campus** (accesos, calles municipales) y la coordinación con los ayuntamientos que eso implicaría. Preguntar al cliente: condiciona el mapa, las incidencias y el modo "Voy contigo".
- **Los usuarios sin cuenta corporativa URJC** (visitantes, estudiantes de intercambio). No está claro si quedan dentro; preguntar al cliente.
- **[PROPUESTA DEL ANALISTA] Incorporar datos de criminalidad por zonas** (obtenidos mediante IA o fuentes externas) como factor adicional del índice de seguridad. Es una novedad que no está en el enunciado; proponérsela al cliente.

## Preguntas abiertas para el cliente

- ¿Se contempla una versión web en fases futuras, o la app móvil es el único canal?
- ¿La cobertura incluye los alrededores del campus (paradas de metro/tren, aparcamientos) o solo el recinto? ¿Habría coordinación con los ayuntamientos?
- ¿Los visitantes o estudiantes de intercambio sin cuenta @urjc.es podrán usar la app?
- ¿Interesaría añadir datos de criminalidad por zonas como factor del índice (propuesta del analista)?
