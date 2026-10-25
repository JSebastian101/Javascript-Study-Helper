# MÓDULO STRINGS

## 1. ¿Cómo sé cuántos caracteres tiene un string?

Con la propiedad `length`, que devuelve el número de caracteres:

```js
"ABCDEFGHIJKLMNOPQRSTUVWXYZ".length // 26

const greekAlphabet = 'αβγδεζηθικλμνξοπρστυφχψω';
greekAlphabet.length // 24
```

---

## 2. La variable username guarda un nombre de usuario. ¿Cómo muestro en la consola cuántos caracteres tiene?

```js
const username = "isabel";
console.log(username.length) // 6
```

---

## 3. ¿Cómo accedo a un carácter de un string?

Con su índice entre corchetes, igual que en un array. El primer carácter tiene índice 0. Si el índice es mayor que la cantidad de caracteres, el resultado es `undefined`.

```js
"espresso"[0] // "e"

const wrongWord = "expresso";
wrongWord[1] // "x"

"expresso"[20] // undefined
```

---

## 4. La variable language guarda "JavaScript". ¿Cómo muestro su versión corta, "JS"?

```js
const language = "JavaScript";
console.log(language[0] + language[4]) // "JS"
```

---

## 5. Ejercicio: arma la palabra oculta de un acróstico

Un acróstico es un poema en el que las primeras letras de cada línea forman una palabra. Si cada línea es un elemento de un array, hay que juntar el primer carácter de cada string. Para eso se usan dos índices: `acrostic[i]` es la línea y `acrostic[i][0]` es su primera letra.

```js
const acrostic = [
  "Hoy el sol brilla",
  "Otra vez en el cielo",
  "La tarde es tranquila",
  "Amanece despacio"
];

let hiddenWord = "";

for (let i = 0; i < acrostic.length; i += 1) {
  hiddenWord += acrostic[i][0];
}

console.log(hiddenWord) // "HOLA"
```

---

## 6. ¿Qué hace el método indexOf()?

Devuelve el índice de la **primera** vez que aparece un carácter o un texto dentro del string. Si no lo encuentra, devuelve `-1`. Con un texto de varios caracteres, devuelve el índice de su primer carácter. Distingue mayúsculas de minúsculas.

```js
"Triple Peaks".indexOf("T") // 0
"espresso".indexOf("s") // 1
"espresso".indexOf("x") // -1

const elements = "Tierra, Aire, Fuego, Agua";
elements.indexOf("Fuego") // 14

"Repasar".indexOf("R") // 0
"Repasar".indexOf("r") // 6
```

---

## 7. ¿Qué se mostrará en la consola?

```js
console.log("true true true false true true".indexOf("false"));
```

**Escribir el resultado:**

```txt
15
```

---

## 8. ¿Cómo compruebo si un string contiene un texto?

Con el método `includes()`, que devuelve `true` o `false`:

```js
"Harry Potter y el prisionero de Azkaban".includes("Harry Potter") // true
"Cooperar".includes("I") // false
```

Antes se hacía comparando el resultado de `indexOf()` con `-1`. Funciona, pero `includes()` es más claro:

```js
"sal y pimienta".indexOf("sal") !== -1 // true
"sal y pimienta".indexOf("azúcar") !== -1 // false
```

---

## 9. ¿Qué hacen startsWith() y endsWith()?

- `startsWith()` comprueba si el string **empieza** con el texto indicado.
- `endsWith()` comprueba si el string **termina** con el texto indicado.

Los dos devuelven `true` o `false`.

```js
"Vendetta".startsWith("V") // true
"La cita perfecta".startsWith("Cena y película") // false

const theRealEnd = "Este no es el final";
theRealEnd.endsWith("final") // true
```

---

## 10. ¿Qué hacen toLowerCase() y toUpperCase()?

Convierten todas las letras del string a minúsculas o a mayúsculas:

```js
"Activar el bloqueo de mayúsculas".toLowerCase() // "activar el bloqueo de mayúsculas"
"Desactivar el bloqueo de mayúsculas".toUpperCase() // "DESACTIVAR EL BLOQUEO DE MAYÚSCULAS"
```

Sirven para comparar dos strings sin importar las mayúsculas y minúsculas:

```js
const firstStr = "Esta verificación no funcionará";
const secondStr = "esTA vEriFicaCIón no funcionará";

firstStr === secondStr // false
firstStr.toLowerCase() === secondStr.toLowerCase() // true
```

---

## 11. ¿Qué se mostrará en la consola?

```js
const partOne = "Data";
const partTwo = "Entry";
const combined = partOne.toLowerCase() + "_" + partTwo.toUpperCase();

console.log(combined);
```

**Escribir el resultado:**

```txt
data_ENTRY
```
