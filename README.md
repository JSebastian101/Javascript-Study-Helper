# JavaScript Helper

Herramienta de consulta para recordar los métodos, operadores y conceptos de
JavaScript que ya se estudiaron. Sigue siempre el mismo recorrido:

```text
¿Qué tipo de dato tengo?  →  ¿Qué necesito hacer?  →  ¿Qué herramientas conozco?
        String                     Cortar                   slice()
```

La app no resuelve ejercicios ni decide qué método usar: muestra las opciones
relacionadas con lo que reciben, hacen y retornan, para que la estudiante las
compare y decida.

## Uso

```bash
npm install
npm run dev      # servidor de desarrollo
npm test         # valida el contenido y ejecuta todos los ejemplos
npm run build    # chequeo de tipos + build de producción en dist/
```

Requiere Node 22.12 o superior.

## Arquitectura

```text
src/
  knowledge/                 ← todo el conocimiento, sin nada de UI
    model.ts                 tipos del modelo común (Concept, Action, Category…)
    vocabulary/
      categories.ts          tipos de dato y categorías (String, Number, Array, Lógica)
      actions.ts             vocabulario de acciones en lenguaje natural
    sources/                 una fuente por archivo de apuntes (.ts o .json)
      strings.ts             ← wiki/string.md
      numbers.ts             ← wiki/numbers.md
      logic.ts               ← wiki/numbers.md (comparaciones y condicionales)
      arrays.ts              ← wiki/array.md
    build.ts                 combina las fuentes y valida las referencias
    query.ts                 filtrado: tipo → acciones → conceptos
    index.ts                 carga automática de sources/ con import.meta.glob
  lib/                       resaltado de código, estado en la URL, colores
  components/                interfaz (solo consume el modelo)
```

- **El contenido está desacoplado de la UI.** Los componentes reciben un
  `KnowledgeBase` a través de `KnowledgeProvider`. Si mañana el contenido viene
  de una API o de un CMS, basta con construir ese mismo objeto.
- **Los filtros se derivan del contenido.** Una acción aparece para un tipo
  de dato solo si algún concepto de ese tipo la usa. Agregar conceptos no
  requiere tocar `query.ts` ni los componentes.
- **El modelo no asume que todo es un método.** `kind` puede ser `method`,
  `property`, `function`, `operator`, `statement`, `syntax`, `object`,
  `concept` o `pattern`, y las tarjetas muestran solo las secciones que aplican
  (un operador no tiene "¿Qué recibe?" y una sentencia no tiene "¿Qué retorna?").

## Cómo agregar un tema nuevo

1. Escribe y revisa los apuntes (por ejemplo `wiki/objects.md`).
2. Si el tema es un tipo de dato o una categoría nueva, agrégalo en
   `vocabulary/categories.ts`.
3. Si hace falta un verbo nuevo, agrégalo en `vocabulary/actions.ts` con sus
   sinónimos.
4. Crea `knowledge/sources/objects.ts` (o `objects.json`) exportando por
   defecto un `KnowledgeSource`:

   ```ts
   import type { KnowledgeSource } from '../model'

   const objects: KnowledgeSource = {
     id: 'objects',
     title: 'Objetos',
     file: 'wiki/objects.md',
     order: 50,
     concepts: [
       {
         id: 'object.keys',
         name: 'Object.keys()',
         kind: 'method',
         categories: ['object'],
         actions: ['convert'],
         phrases: ['obtener las llaves', 'listar las propiedades'],
         summary: '…',
         syntax: ['Object.keys(objeto)'],
         parameters: [{ name: 'objeto', description: '…' }],
         returns: { type: 'array', description: '…' },
         examples: [{ title: '…', code: `Object.keys({ a: 1 }) // ["a"]` }],
         sections: ['3'],
       },
     ],
   }

   export default objects
   ```

5. Ejecuta `npm test`. Los tests validan que todas las referencias existan y
   ejecutan cada ejemplo para comprobar los resultados escritos en los
   comentarios.

No hace falta registrar el archivo en ningún otro lugar: se carga
automáticamente.

## Reglas del contenido

**Clasificación por tipo de dato.** Un método va en el tipo sobre el que se
llama: `split()` está en String aunque produzca un arreglo, y `join()` está en
Array aunque produzca un string. Las funciones de conversión que no se llaman
sobre un valor (`Number()`, `Number.parseInt()`, `+texto`) aparecen tanto en
String como en Number. Las conversiones muestran una etiqueta `String → Array`.

**Mismo nombre, conceptos distintos.** `slice()` e `includes()` existen en
String y en Array con comportamientos diferentes, así que son entradas
separadas (`string.slice`, `array.slice`) enlazadas entre sí.

**Ejemplos verificables.** En los ejemplos, un comentario que empieza con un
valor (`// "Hola"`, `// 4`, `// [1, 2]`, `// true`, `// NaN`) es un
resultado y debe ser exacto: `npm test` lo verifica ejecutando el código. Un
comentario que empieza con palabras (`// por ejemplo…`, `// se muestra…`) es
una explicación y no se verifica. `fromNotes: true` marca los ejemplos que
vienen de los apuntes; se muestran con la insignia "De tus apuntes".

**Tablas comparativas.** `comparisons` define tablas con la misma entrada
pasada por varias herramientas (por ejemplo, `"12.98 decimal"` en `Number()`,
`parseFloat()` y `parseInt()`). Se muestran cuando al menos dos de sus
conceptos están en los resultados, y cada celda también se verifica en los
tests.

## Diferencias con los apuntes

El contenido se construyó a partir de `wiki/`. Estos resultados de los
apuntes no coinciden con lo que hace JavaScript y se corrigieron en la app:

| Apuntes | Pregunta | Dice | Resultado real |
| --- | --- | --- | --- |
| string.md | 7 | `poema.slice(10, 20) // on rojas` | `"son rojas "` |
| string.md | 8 | `poema.toUpperCase() // ROSAS SON ROJAS…` | `"LAS ROSAS SON ROJAS…"` |
| string.md | 12 | `"Hola Jeni".repeat(3) // holaholahola` | `"Hola JeniHola JeniHola Jeni"` |
| numbers.md | 1 | No decimales = Float, Decimal = Int | Al revés: entero = Int, decimal = Float |
| numbers.md | 3 | `2 - "5" // 3` | `-3` |
| numbers.md | 6 | `division /= 3 // 6.6666667` | `6.666666666666667` |
| array.md | 8 | `frutas.push("uva") // ["manzana", "pera", "uva"]` | `push` retorna `3`; el arreglo queda así |
| numbers.md | 11 | El ternario usa `>` y el if/else original usa `>=` | En la app los dos usan `>=` |

Elementos que aparecen en los apuntes pero no se incluyeron como conceptos,
porque se usan sin explicarse: `console.log`, `const`/`let`. Tampoco están
`<` ni `<=`, porque no aparecen en los apuntes (sí `>` y `>=`, que se usan en
las respuestas de if/else y del ternario). Se pueden agregar cuando se revisen.
