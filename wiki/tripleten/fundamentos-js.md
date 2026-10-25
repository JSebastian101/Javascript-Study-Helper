# MÓDULO FUNDAMENTOS DE JAVASCRIPT

## 1. ¿Cómo agrego JavaScript a una página web?

Con la etiqueta `<script>`, de dos formas:

1. Escribiendo el código entre `<script>` y `</script>` dentro del HTML.
2. Escribiendo el código en un archivo aparte (con extensión `.js`) y conectándolo con el atributo `src`.

Normalmente se usa un archivo aparte, porque mantiene el proyecto ordenado:

```html
<script src="script.js"></script>
```

---

## 2. ¿En qué se diferencia la etiqueta <script> de la etiqueta <link>?

- `<link>` se cierra sola y usa el atributo `href`.
- `<script>` necesita etiqueta de cierre y usa el atributo `src`.

La etiqueta `<script>` se coloca al final del `<body>`, justo antes de `</body>`, para que la página cargue antes de ejecutar el código.

---

## 3. ¿Cuáles son los tipos de datos de JavaScript?

Se dividen en dos categorías: **primitivos** y **objetos**. Los siete tipos primitivos son:

| Tipo | Qué representa |
| --- | --- |
| Number | Números enteros (3, 21) y decimales (3.14, 25.468) |
| String | Texto |
| Boolean | Uno de dos valores lógicos: `true` o `false` |
| Null | Ausencia intencional de un valor |
| Undefined | Una variable a la que no se le asignó valor |
| BigInt | Números enteros muy grandes (casi nunca se usan) |
| Symbol | Valores anónimos y únicos |

---

## 4. ¿Qué es un valor booleano?

Es un dato que solo puede tener dos valores: `true` (verdadero) o `false` (falso). Se usa mucho en las comparaciones. También se puede pensar como sí/no o encendido/apagado.

---

## 5. ¿Cómo sé de qué tipo es un dato?

Con el operador `typeof`, que devuelve un string con el tipo del dato:

```js
typeof(10) // "number"
typeof("¡Quiero pedir quesos exóticos!") // "string"
typeof(true) // "boolean"
typeof(undefined) // "undefined"
```

---

## 6. ¿Qué es la conversión implícita?

Es cuando JavaScript cambia el tipo de un dato automáticamente al hacer una operación.

- El operador `+` con un string **une** los valores como texto.
- Los demás operadores matemáticos convierten los strings en números, incluso si los dos valores son strings.

```js
100 + "500" // "100500"
"10" * 2 // 20
"15" - 5 // 10
"10" * "2" // 20
```

Es mejor evitarla: hace que el código sea confuso y puede causar errores difíciles de encontrar, porque no siempre aparecen en la consola.

---

## 7. ¿Cómo convierto un dato a otro tipo de forma explícita?

Con las funciones `String()`, `Number()` y `Boolean()`. Así se ve claramente en el código dónde cambia el tipo.

```js
String(2) // "2"
String(undefined) // "undefined"
String(null) // "null"
String(true) // "true"

Number("2") // 2
Number(null) // 0

Boolean(2) // true
Boolean(0) // false
Boolean("") // false
Boolean("cualquier string que no esté vacío") // true
```

---

## 8. ¿Qué es una variable?

Es como una caja con una etiqueta donde se guarda un dato para usarlo más adelante en el programa: un nombre de usuario, un número de teléfono, un total, etc.

---

## 9. ¿Cómo declaro una variable?

Con la palabra clave `let` seguida del nombre de la variable:

```js
let total;
```

---

## 10. ¿Qué reglas deben seguir los nombres de las variables?

- Empezar con una letra, un guion bajo (`_`) o un signo de dólar (`$`).
- No empezar con un número.
- No tener espacios ni guiones.
- Escribirse en **camelCase**: la primera palabra en minúscula y las siguientes con mayúscula inicial, todo junto.
- No usar palabras clave de JavaScript, como `let`, `const`, `if` o `return`.

Además, es buena práctica que sean **sustantivos** que describan lo que guardan (`sum`, `username`, `productId`) y escribirlos en inglés, que es el estándar en programación.

```js
// nombres correctos
let fullName;
let _privateVar;
let $configValue;

// nombres incorrectos
// let 2user;      no puede empezar con un número
// let user name;  no puede tener espacios
// let user-name;  no puede tener guiones
```

---

## 11. ¿Cómo asigno un valor a una variable?

Con el operador `=`. Antes de asignarle un valor, la variable vale `undefined`. Al asignar no se vuelve a escribir `let`, porque la variable ya está declarada:

```js
let total;
console.log(total) // undefined

total = 0;
console.log(total) // 0
```

También se puede declarar y asignar en la misma línea, o declarar primero y asignar después:

```js
let city = 'Londres';

let temperature; // undefined
temperature = 30;
```

---

## 12. ¿Cuál es la diferencia entre let y const?

- `let`: el valor **puede cambiar** más adelante.
- `const`: el valor **no se puede reasignar**. Sirve para datos que no cambian.

```js
let total = 0;
total = 500; // permitido con let

const MAX_USERS = 100;
// MAX_USERS = 200;  ¡Error! No se puede reasignar una constante
```

Las constantes con valores fijos y conocidos (ajustes de configuración, constantes matemáticas) suelen escribirse en MAYÚSCULAS.

---

## 13. ¿Cómo uso variables en operaciones y mensajes?

Las variables se pueden usar en operaciones matemáticas y combinar con texto para crear mensajes:

```js
const ITEM_PRICE = 10;
let quantity = 5;
let total = ITEM_PRICE * quantity;
console.log("Precio total de " + quantity + " artículos: $" + total);
// Precio total de 5 artículos: $50

quantity = 3;
total = ITEM_PRICE * quantity;
console.log("Precio total de " + quantity + " artículos: $" + total);
// Precio total de 3 artículos: $30
```

```js
let firstName = "Juan";
let lastName = "Pérez";
let fullName = firstName + " " + lastName;
console.log("Hola, " + fullName + ". ¡Bienvenido!");
// Hola, Juan Pérez. ¡Bienvenido!
```

---

## 14. ¿Qué es undefined?

Es el valor (y también el tipo) que tiene una variable declarada a la que todavía no se le asignó nada. JavaScript lo pone automáticamente.

```js
let meaningOfLife;
console.log(meaningOfLife) // undefined
typeof meaningOfLife // "undefined"
```

---

## 15. ¿Qué es null y en qué se diferencia de undefined?

`null` indica que un valor está vacío **a propósito**.

- `undefined`: todavía no se le dio un valor; lo pone JavaScript.
- `null`: se dejó vacío intencionalmente; lo pone quien programa.

```js
const meaningOfLife = null;
```

---

## 16. ¿Qué devuelve typeof null?

Devuelve `"object"`, aunque `null` no es un objeto. Es un error de la primera versión de JavaScript que nunca se corrigió, porque arreglarlo rompería muchísimos sitios que ya existen.

```js
const meaningOfLife = null;
typeof meaningOfLife // "object"
```

---

## 17. ¿Qué es NaN y cuándo aparece?

`NaN` ("Not a Number") es el resultado de una operación numérica que falla:

```js
"string" * 2 // NaN
0 / 0 // NaN
parseInt("hello") // NaN
Math.sqrt(-1) // NaN
```
