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

## Enlaces rápidos

**Página principal (índice de todo):** https://adrianpalacio.github.io/tfg-senda-urjc/

### Aplicación funcional (v1)

Prototipo funcional del sistema desarrollado íntegramente con IA. Para entrar, escribe
cualquier correo `@urjc.es` (por ejemplo `sergio.cavero@urjc.es`); la contraseña es opcional.

- **Aplicación:** https://adrianpalacio.github.io/tfg-senda-urjc/v1-funcional/
- **Panel de administración:** https://adrianpalacio.github.io/tfg-senda-urjc/v1-funcional/admin.html

### Prototipos comparados (fase de prototipado)

- **Tradicional (hecho a mano):** https://adrianpalacio.github.io/tfg-senda-urjc/fase4-validacion/prototipo-tradicional/index.html
- **ChatGPT:** https://adrianpalacio.github.io/tfg-senda-urjc/fase4-validacion/prototipos-llm/chatgpt.html
- **Gemini:** https://adrianpalacio.github.io/tfg-senda-urjc/fase4-validacion/prototipos-llm/gemini.html
- **Claude:** https://adrianpalacio.github.io/tfg-senda-urjc/fase4-validacion/prototipos-llm/claude.html

### Conversaciones con los modelos (enlaces públicos de solo lectura)

| Fase | ChatGPT | Gemini | Claude |
|---|---|---|---|
| 1 · Concepción | [chat](https://chatgpt.com/share/6a5b4bfc-1994-83eb-bb72-65593c687bb7) | [chat](https://share.gemini.google/rUvA0G6XNflB) | [chat](https://claude.ai/share/4be74864-6123-458f-8e5d-0c97f9f83873) |
| 2 · Extracción | [chat](https://chatgpt.com/share/6a91ce14-9e20-83ed-9738-c87f2d532cad) | [chat](https://share.gemini.google/raEmcQmhZqeq) | [chat](https://claude.ai/share/e3c7aa02-b6b9-4f81-a5c4-72abe30128b0) |
| 3 · Especificación | [chat](https://chatgpt.com/share/6a929fca-d53c-83eb-9dd4-c4198ab6a020) | [chat](https://share.gemini.google/PPCzPuxxoKcJ) | (continúa en el chat de la fase 2) |
| 4 · Validación | [chat](https://chatgpt.com/share/6a92af59-8f40-83eb-a7ba-c8f0f0c4727b) | [chat](https://share.gemini.google/cl1oGbDr3jU0) | (continúa en el chat de la fase 2) |
| 5 · Prototipado | [chat](https://chatgpt.com/share/6a932ba2-104c-83eb-aff8-d37a4159ede6) | [chat](https://share.gemini.google/GpZqrOnlOAc2) | [chat](https://claude.ai/share/6ab1edc5-65fe-4fe7-a31e-c6aa50465ed8) |

En la configuración con Claude, las fases 2 a 4 se ejecutaron en una misma conversación,
por lo que comparten el mismo enlace.

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
