# Wiki del resumen de unidades de TripleTen

Preguntas y respuestas construidas a partir de `resumen triple ten unidades.docx.md`. Están **pendientes de revisar con la estudiante** antes de pasarlas a JavaScript Helper.

## Temas, en el orden del curso

| Archivo | Tema | Preguntas |
| --- | --- | --- |
| [figma-y-producto.md](figma-y-producto.md) | Producto digital, especificaciones, Figma y trabajo con diseñadores | 16 |
| [diseno-responsivo.md](diseno-responsivo.md) | Responsivo vs. adaptativo, unidades relativas, imágenes, meta viewport, media queries, DevTools | 28 |
| [css.md](css.md) | Flujo normal, fuentes con @font-face, Grid Layout y sombras | 23 |
| [terminal.md](terminal.md) | Atajos, navegación, cp, mv, cat, nano y Vim | 13 |
| [git.md](git.md) | Staging, log, diff, amend, reset, HEAD, ramas, merge y pull requests | 24 |
| [fundamentos-js.md](fundamentos-js.md) | `<script>`, tipos de datos, conversiones, variables, let/const, null, undefined y NaN | 17 |
| [condicionales.md](condicionales.md) | Comparación, igualdad, if/else, else if y operadores lógicos | 11 |
| [bucles.md](bucles.md) | Operaciones abreviadas, while, for, break/continue y acumuladores | 24 |
| [arrays.md](arrays.md) | Crear, acceder, recorrer, mínimo, push/pop y arrays anidados | 17 |
| [funciones.md](funciones.md) | Declarar, llamar, parámetros, return y funciones que llaman a otras | 12 |
| [depuracion.md](depuracion.md) | Consola, tipos de error y el depurador | 12 |
| [strings.md](strings.md) | length, índices, indexOf, includes, startsWith/endsWith y mayúsculas | 11 |

## Temas que se repiten con la wiki original

- `strings.md` repite temas de `../string.md` (indexOf, includes, toUpperCase/toLowerCase, corchetes).
- `arrays.md` repite temas de `../array.md` (corchetes, length, push, pop).
- `condicionales.md` y `bucles.md` repiten partes de `../numbers.md` (==, ===, if/else, &&, ||, ++, +=).

Al pasar el contenido a la app habría que unirlos para no duplicar conceptos.

## Correcciones respecto al resumen

| Archivo | Pregunta | En el resumen | Corregido |
| --- | --- | --- | --- |
| fundamentos-js | 13 | La segunda salida dice "5 artículos: $30" | "3 artículos: $30" |
| fundamentos-js | 16 | `typeof null` devuelve "objeto" | Devuelve `"object"` |
| condicionales | 8 | Usa una variable `newPrice` que no existe, y `discount` guarda el precio final | Una sola variable, `finalPrice` |
| bucles | 6 | `"Procesando pedido... faltan ${orders}"` con comillas dobles (no interpola) | Comillas invertidas |
| arrays | 6 | `Students[i]` con mayúscula (ReferenceError) | `students[i]` |
| arrays | 14–16 | Las edades cambian entre ejemplos (32 y 22) | Mismos datos en todos |
| funciones | 7, 12 | `calculeArea`, `greetingUser` | `calculateArea`, `greetUser` |
| funciones | 11 | Dice que es obligatorio declarar `calculateShipping()` antes | Con `function` no es obligatorio; se deja como buena práctica |
| depuracion | 7 | "Cannot read properties of null" y `.length()` | `undefined` y `.length` (es una propiedad) |
| strings | 6 | `"Triple Peaks".indexOf("T")` sin resultado | `0` |
| strings | 10 | "activa el bloqueo…", "DESACTIVA EL BLOQUEO…" | "activar…", "DESACTIVAR…" |
| diseno-responsivo | 2 | `display` con valor `visible` | `visible` no existe en `display`; se usa, por ejemplo, `block` |
| diseno-responsivo | 14 | `<object>` solo funciona en Microsoft Edge | No es así; se deja solo que casi no se usa |
| diseno-responsivo | 25 | Device Toolbar en macOS: ⌘+Option+M | ⌘+Shift+M |
| css | 10 | `format('eot')` | `format("embedded-opentype")` |
| git | 7 | `git diff` compara con el último commit | Compara con el área de staging |
| git | 9 | Se puede usar `--amend` después de empujar el commit | Es para commits que aún no se subieron |
| git | 23 | La pull request se fusiona "en la rama de origen" | En la rama de destino |
| figma-y-producto | 7 | Ancho base de tabletas: 760 | 768, como el resto del documento |

Todos los bloques de JavaScript se ejecutaron para comprobar que los resultados escritos en los comentarios (`// 158`, `// "HOLA"`) son los reales.

## Qué no se incluyó

- Las imágenes del resumen (capturas y diagramas). Cuando aportaban contenido, como la lista de operadores de comparación, se pasaron a texto.
- Los enlaces a lecciones, videos y recursos del curso.
- En el ejercicio del acróstico, el poema original no estaba en el resumen; se usa un array corto de ejemplo.
