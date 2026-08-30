# TFG — Uso de Modelos de Lenguaje (LLM) en la Ingeniería del Software

Material del estudio práctico del Trabajo Fin de Grado de **Adrián Palacio Álvarez**
(Grado en Ingeniería Informática, Universidad Rey Juan Carlos).
Tutor: **Sergio Cavero Díaz**.

## De qué va

El TFG propone una metodología para usar LLMs como apoyo en la documentación de
requisitos software y la valida con un estudio comparativo sobre un caso real
(**Senda URJC**, una aplicación de rutas seguras por los campus): el mismo caso se
resuelve con un enfoque tradicional (entrevistas con el cliente) y con tres modelos
de lenguaje (ChatGPT, Gemini y Claude), comparando los resultados de los dos
enfoques y de los distintos modelos entre sí.

Este repositorio recoge el material generado durante el estudio, para que cualquiera
pueda revisar las evidencias: conversaciones con los modelos, artefactos de análisis,
prototipos, transcripciones de entrevistas y diagramas.

## Estructura

```
fase1-concepcion/
  tradicional/        Artefactos del enfoque tradicional (visión, stakeholders,
                      riesgos, alcance)
  llm/                Conversaciones con los tres modelos (enlaces públicos)
fase2-extraccion/     Transcripción de la entrevista con el cliente, requisitos
                      extraídos y conversaciones con los modelos
fase3-especificacion/ Especificación tradicional (ISO/IEC/IEEE 29148), casos de uso,
                      diagramas UML y conversaciones con los modelos
fase4-validacion/     Los cuatro prototipos navegables y las conversaciones de
                      validación y prototipado
enunciado/            Enunciado del caso de estudio
```

El estudio consta de cinco fases (concepción, extracción, especificación, validación
y prototipado) ejecutadas en las cuatro configuraciones; el material de validación y
prototipado se agrupa aquí en `fase4-validacion/`. Cada carpeta tiene su propio
README con el detalle de su contenido.

## Metodología y memoria

La metodología completa, el protocolo del estudio comparativo y el análisis de los
resultados están en la memoria del TFG. Este repositorio es el anexo de evidencias.
