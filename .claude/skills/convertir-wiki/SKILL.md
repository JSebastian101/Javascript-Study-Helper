---
name: convertir-wiki
description: Convierte archivos de la wiki de preguntas y respuestas (wiki/**/*.md) en contenido de JavaScript Helper (src/knowledge/). Úsala cuando haya que transformar, integrar o actualizar el contenido de la app a partir de una wiki nueva o modificada. Lee lo que ya existe en la app para no duplicar conceptos y enriquecer los que ya están.
argument-hint: <archivo(s) de la wiki>
---

# Convertir una wiki al contenido de JavaScript Helper

Las wikis (`wiki/**/*.md`) son preguntas y respuestas que se construyen con la estudiante; son la fuente de verdad. La app consume un modelo de conocimiento en `src/knowledge/`. Esta skill integra una o varias wikis a ese modelo.

**No es una traducción 1 a 1.** Cada pregunta se evalúa frente a lo que ya existe en la app. Puede terminar como concepto nuevo, como enriquecimiento de un concepto existente, como ejercicio pendiente, o sin transformar por una razón explícita. El objetivo es que el contenido de la app mejore con cada wiki, no que crezca con repeticiones.

## Reglas que no se rompen

1. **La wiki solo se lee.** Nunca edites archivos de `wiki/`. Los errores, las repeticiones y las preguntas que no encajan se reportan para que una persona decida.
2. **Alcance.** Solo entra a la app lo que aparece en la wiki que se procesa (o ya estaba en la app). No agregues métodos, operadores ni conceptos que la wiki no mencione, aunque sean útiles.
3. **La app no resuelve ejercicios.** Los ejercicios con solución van a `src/knowledge/practice/pending.ts`, no a las fichas. Los ejemplos de las fichas son genéricos y no deben parecerse a soluciones de ejercicios ni de proyectos del curso.
4. **Los ids no cambian.** Un id existente (`string.slice`) se usa en enlaces y relacionados: nunca lo renombres ni lo borres.
5. **Lo que ya está se conserva.** No borres ejemplos con `fromNotes: true` ni puntos clave existentes.
6. **Todo resultado escrito se verifica.** `npm test` ejecuta cada ejemplo. Si falla, se corrige el contenido, nunca el test.
7. **No inventes ni corrijas en silencio.** Si la wiki tiene un error, en la app va lo correcto y en el reporte va la corrección sugerida para la wiki.

## Paso 1. Leer lo que ya existe

Antes de escribir nada, lee completos:

- `src/knowledge/model.ts`: los tipos (`Concept`, `Example`, `ComparisonGrid`, `NoteRef`, `PendingExercise`) y qué significa cada campo.
- `src/knowledge/vocabulary/categories.ts` y `src/knowledge/vocabulary/actions.ts`: las categorías y el vocabulario de acciones.
- Todos los archivos de `src/knowledge/sources/`: conceptos existentes, sus ids, ejemplos y tablas comparativas.
- `src/knowledge/practice/pending.ts`: los ejercicios ya guardados.
- La wiki o las wikis a procesar, completas, y el `README.md` de su carpeta si existe (puede listar correcciones conocidas).

Y ejecuta `npm run wiki:coverage -- <archivo>` para ver qué preguntas de esa wiki ya están representadas.

## Paso 2. Inventario: decidir el destino de cada pregunta

Para cada `## N.` de la wiki, decide un destino y anótalo; lo necesitas para el reporte.

| Destino | Cuándo |
| --- | --- |
| **Concepto nuevo** | Trata un elemento de JavaScript (método, propiedad, operador, sintaxis, sentencia, concepto) que no existe en la app. |
| **Enriquecer existente** | El elemento ya existe y la pregunta aporta algo: un escenario nuevo, un detalle de comportamiento, una explicación más clara, otra forma de describirlo. |
| **Ya cubierto** | El elemento existe y la pregunta no aporta nada nuevo. Igual se registra la referencia en `alsoIn`, para que la cobertura la cuente. |
| **Ejercicio pendiente** | Pide resolver un problema combinando varias herramientas (un bucle con condiciones, funciones que llaman a otras…). |
| **Fuera de alcance** | No es JavaScript (HTML, CSS, Git, terminal, diseño) mientras la app no tenga una sección para eso. |
| **No transformable** | Es JavaScript, pero su formato no encaja: una explicación sin un elemento concreto, algo que depende de una imagen, etc. Explica por qué y qué habría que cambiar en la wiki. |

### ¿Concepto nuevo o uno que ya existe?

- **Mismo elemento, mismo tipo = mismo concepto**, aunque la wiki use otro nombre ("arreglo" y "array", "cadena" y "string").
- **Mismo nombre, distinto tipo = conceptos distintos.** `slice()` de String y `slice()` de Array son entradas separadas, enlazadas con `related`.
- **Variantes de una misma sintaxis = un concepto.** Las formas de desestructurar, o `+= -= *=`, van juntas, con una tabla de variantes.
- **Elementos que la estudiante debe distinguir entre sí = conceptos separados**, aunque aparezcan en la misma pregunta (`==` y `===`; `trim()` y `trimStart()`), para que la comparación rápida los muestre lado a lado.
- **Una técnica hecha con herramientas conocidas** (acumular en un bucle, buscar el mínimo) es un concepto `pattern` solo si la wiki la enseña como técnica. Si la plantea como problema a resolver, es un ejercicio.
- **Una pregunta "¿qué se mostrará?"** cuyo resultado depende de una sola herramienta es un buen ejemplo de esa herramienta. Si exige seguir un algoritmo de varios pasos, es un ejercicio.

## Paso 3. Escribir

### Fuentes

Cada archivo de wiki tiene su fuente en `src/knowledge/sources/`. Para `wiki/tripleten/bucles.md`: `sources/tripleten-bucles.ts`, con `id: 'tripleten-bucles'`, `title: 'Bucles (TripleTen)'`, `file: 'wiki/tripleten/bucles.md'` y un `order` que respete el orden del curso. Se carga sola; no hay que registrarla.

Un concepto nuevo va en la fuente de la wiki de la que sale. Un concepto que se enriquece **se queda en su fuente original**: no se copia.

### Concepto nuevo

Sigue `model.ts` y el estilo de las fuentes existentes:

- `id`: `<categoría>.<nombre>`, único y estable. Métodos en camelCase (`string.indexOf`); el resto con guiones (`loops.for-of`).
- `name`: como se escribe o se reconoce: `slice()`, `===`, `for...of`, `while`.
- `aka`: subtítulo opcional (otro nombre o una descripción del nombre).
- `kind`: `method`, `property`, `function`, `operator`, `statement`, `syntax`, `object`, `concept` o `pattern`.
- `categories`: un método va en el tipo sobre el que se llama. Las funciones de conversión que no se llaman sobre un valor (`Number()`) van en el tipo de origen y en el de destino.
- `actions`: ids del vocabulario.
- `phrases`: cómo lo diría una persona, con las palabras de la wiki.
- `summary`: "¿Qué hace?" en una o dos frases, con la redacción de la wiki cuando sea posible.
- `syntax`, `parameters` (`[]` = no recibe argumentos; omitir si no aplica), `returns` (con un `type` corto: `number`, `boolean`, `string`, `array`, `el elemento`…), `mutates`, `converts`, `keyPoints`, `tables`, `related`, `highlight`: solo cuando aplican.
- `sections`: los números de las preguntas de la wiki de las que sale.
- `examples`: entre 2 y 6, con escenarios variados (ver "Ejemplos").

### Enriquecer un concepto existente

Abre el concepto en su fuente y:

1. Agrega la referencia en `alsoIn: [{ file, title, sections }]`. Si ya hay una entrada para ese archivo, suma la pregunta a sus `sections`.
2. Agrega solo lo que aporta:
   - **Ejemplos** con un escenario que todavía no está: otro tipo de entrada, un caso límite, un uso distinto. Si el escenario ya existe, no lo repitas. Márcalos con `fromNotes: true`.
   - **Puntos clave** con comportamientos que no estaban explicados.
   - **Frases** nuevas que describan el concepto.
   - **Parámetros o retorno**, si estaban incompletos.
   - **Acciones**, si la wiki usa el concepto para otra acción que ya existe en el vocabulario.
3. Reescribe `summary`, `aka` u otro texto existente **solo si la wiki nueva lo corrige o lo completa en algo esencial**. Conserva la redacción anterior cuando se pueda y anota cada reescritura en el reporte (antes → después y por qué).
4. Para cada agregado, pregúntate: *¿esto le ayuda a la estudiante a reconocer la herramienta o a distinguirla de otra parecida?* Si no, no lo agregues.
5. Si un concepto ya tiene 7 ejemplos o más, agrega uno nuevo solo si cubre un escenario realmente distinto. Nunca quites ejemplos con `fromNotes: true`.

### Categorías y acciones

- Reutiliza las categorías y acciones existentes siempre que una describa la idea en lenguaje natural.
- Los temas de código que no son un tipo de dato (variables y tipos, bucles, funciones, depuración…) tienen **su propia categoría de tema** (`group: 'topic'`), como `logic` ("Condicionales y lógica"). Créala en `categories.ts` con `id` en inglés (`loops`, `functions`, `variables`, `debugging`), `label` y `description` en español, un `sample` de código corto que la identifique y un `accent` sin usar. Si no quedan colores, agrega uno a `AccentName` en `model.ts` y a `src/lib/accents.ts` con las mismas claves.
- Crea una acción nueva solo si ninguna existente sirve. Tiene que ser un verbo o frase que una persona usaría ("Recorrer", "Repetir hasta que…"), con `hint` y `synonyms` tomados de cómo lo dice la wiki, y ubicada en un lugar lógico de `actions.ts`. Repórtala.
- Cada categoría debe tener conceptos y cada acción del vocabulario debe usarse (los tests lo exigen).

### Ejemplos

- `title`: el escenario en lenguaje natural ("Obtener los últimos caracteres").
- El código es corto y autocontenido, y se ejecuta en los tests (en Node). No uses `document`, `alert` ni `prompt`.
- Un comentario que empieza con un valor (`// "Hola"`, `// 4`, `// [1, 2]`, `// true`, `// NaN`, `// undefined`) es un **resultado exacto** y se verifica. Ponlo junto a una expresión, a una declaración (`const total = suma(2, 3) // 5`) o a un `console.log(x) // valor`.
- Un comentario que empieza con palabras (`// muestra: …`, `// por ejemplo …`) es una explicación y no se verifica. Úsalo para salidas de varias líneas o aleatorias.
- Si el ejemplo lanza un error a propósito, ponle `throws: 'ReferenceError'` (o el nombre que corresponda): el test verifica que lance ese error y la ficha lo muestra. Escribe el mensaje como comentario con palabras: `// Uncaught ReferenceError: x is not defined`.
- El código va dentro de un template literal de TypeScript, así que hay que escapar `` \` `` y `\${`, y escribir `\\n` para que se vea `\n`.
- `title` y `explanation` en español; nombres de variables como en la wiki.

### Tablas comparativas

Cuando dos o más conceptos de una misma acción se distinguen mejor pasando la misma entrada por cada uno (como `indexOf()` y `includes()`), agrega un `ComparisonGrid` en `comparisons` de la fuente. `template` usa `$1`, `$2`…; `results` son literales exactos; los tests calculan cada celda.

### Ejercicios pendientes

Agrégalos a `src/knowledge/practice/pending.ts`:

```ts
{
  id: 'loops.ganadores-concurso',
  title: 'Ganadores de un concurso',
  categories: ['loops'],
  actions: ['…'],
  statement: 'Hay 10 participantes numerados del 1 al 10. Gana quien tenga un número par o divisible entre 5…',
  solution: `…código de la wiki, con resultados verificables…`,
  uses: ['loops.for', 'number.modulo', 'logic.or'],
  from: { file: 'wiki/tripleten/bucles.md', title: 'Bucles (TripleTen)', sections: ['22'] },
}
```

`uses` solo puede nombrar conceptos que existan en la app. Las soluciones también se ejecutan en los tests.

## Paso 4. Verificar

```bash
npm test
npm run typecheck
npm run wiki:coverage -- <archivo procesado>
```

Repite hasta que todo pase. Si un ejemplo falla, comprueba el resultado con Node antes de cambiarlo. Si puedes, abre la app (`npm run dev`) y revisa las fichas nuevas en su tipo y acción.

## Paso 5. Reporte

Termina con este reporte, en español:

1. **Archivos procesados.** Por archivo: total de preguntas y cuántas quedaron como concepto nuevo, enriquecimiento, ya cubiertas, ejercicio, fuera de alcance y sin transformar. Indica si la transformación fue **completa** o **parcial**.
2. **Conceptos nuevos**: id y nombre.
3. **Conceptos enriquecidos**: id, qué se agregó y, si algo se reescribió, antes → después y por qué.
4. **Categorías y acciones nuevas**, con su justificación.
5. **Ejercicios guardados.**
6. **Preguntas sin transformar**: archivo, número, título y razón. Para las de formato, qué habría que cambiar en la wiki para poder incluirlas.
7. **Correcciones sugeridas para la wiki**: archivo, pregunta, qué dice y qué es lo correcto.
8. **Verificación**: resultado de `npm test`, `npm run typecheck` y `npm run wiki:coverage`.

## Temas que no son código

HTML, CSS, Git, terminal y diseño quedan fuera de alcance hasta que la app tenga una sección para ellos. Cuando exista, esta skill se actualiza con su formato.
