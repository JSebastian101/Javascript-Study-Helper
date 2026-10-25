# MÓDULO DEPURACIÓN

## 1. ¿Cómo abro la consola del navegador y para qué sirve?

Abro las DevTools con **Ctrl + Shift + I** (Windows, Linux) o **Cmd + Option + I** (Mac) y elijo la pestaña **Consola** (Console).

La consola es como un laboratorio: allí puedo escribir y probar cualquier código JavaScript. Se ejecuta en el mismo entorno que la página, como si estuviera dentro de una etiqueta `<script>`.

```js
// suma de los números del 1 al 10
let sum = 0;
let n = 10;

for (let i = n; i >= 1; i--) {
  sum += i;
}

console.log(sum) // 55
```

---

## 2. ¿Cómo me ayuda console.log() a encontrar errores de lógica?

Mostrando valores **dentro** del código mientras se ejecuta, para ver en qué paso algo sale mal. Mostrar solo el resultado final dice *que* hay un error, pero no *dónde*.

Esta función debería convertir temperaturas de Fahrenheit a Celsius, pero el resultado es incorrecto:

```js
function convertTemps(temps) {
  const result = [];
  for (let i = 0; i <= temps.length; i++) {
    console.log('i:', i, 'temps[i]:', temps[i]); // registro agregado
    const celsius = (temps[i] - 32) * 5 / 9;
    result.push(celsius);
  }
  return result;
}

convertTemps([32, 50, 68]) // [0, 10, 20, NaN]
// i: 0 temps[i]: 32
// i: 1 temps[i]: 50
// i: 2 temps[i]: 68
// i: 3 temps[i]: undefined
```

El registro muestra que el bucle da una vuelta de más: por el `<=`, llega a `i = 3`, y `temps[3]` es `undefined`. La solución es cambiar la condición a `i < temps.length`.

---

## 3. ¿Qué es un error y qué debo preguntarme al verlo?

Un **error** (o excepción) es un mensaje en rojo que aparece en la consola cuando el navegador encuentra código que no entiende o que no puede ejecutar. Para corregirlo, primero hay que responder:

- ¿Qué tipo de error es?
- ¿En qué archivo y en qué línea ocurrió?
- ¿Qué dice el mensaje sobre el estado del programa en ese momento?

---

## 4. ¿Qué partes tiene un mensaje de error?

```txt
Uncaught ReferenceError: myVariable is not defined        script.js:42
```

- **Tipo de error:** qué clase de problema es (`ReferenceError`: se usa una variable o función que no existe).
- **Mensaje:** qué pasó exactamente (`myVariable is not defined`: la variable no se creó).
- **Ubicación:** el archivo y la línea (`script.js:42`). A veces hay un segundo número (`:42:12`), que indica el carácter dentro de esa línea.

---

## 5. ¿Qué es un SyntaxError?

Es un error de **sintaxis**: el código está mal escrito, por ejemplo tiene un carácter de más o le falta algo. El programa ni siquiera llega a ejecutarse.

```js
function bugFunction(sum) {
  return sum + sum;
});
// Uncaught SyntaxError: Unexpected token ')'
```

Sobra un paréntesis de cierre al final.

```js
if (true) {
  console.log('Todo es correcto');
}; else {
  console.log('Algo está mal');
}
// Uncaught SyntaxError: Unexpected token 'else'
```

El punto y coma antes de `else` hace que JavaScript piense que el `if` ya terminó, y no entiende qué hace ahí el `else`.

---

## 6. ¿Qué es un ReferenceError?

Aparece cuando:

- Uso una variable que no está declarada o que no está disponible en ese lugar del código.
- Llamo a una función que no existe.

```js
function numberFunc(num) {
  if (num > 0) {
    return num;
  } else if (num < 0) {
    return -num;
  } else {
    return 0;
  }
}

numdberFnc(12);
// ReferenceError: numdberFnc is not defined
```

El nombre de la función está mal escrito al llamarla: `numdberFnc` en lugar de `numberFunc`.

---

## 7. ¿Qué es un TypeError?

Aparece cuando un valor se usa de una forma que no corresponde a su tipo. Por ejemplo, al llamar como función algo que no lo es:

```js
let hut = 'Refugio';
let mouse = hut('Ratón');
// Uncaught TypeError: hut is not a function
```

O al leer una propiedad de un valor que no la tiene:

```js
let string;
string.length;
// Uncaught TypeError: Cannot read properties of undefined (reading 'length')
```

`string` se declaró pero nunca recibió un valor, así que es `undefined`, y `undefined` no tiene propiedades.

---

## 8. ¿Qué es el depurador y cómo uso la sentencia debugger?

El **depurador** es una herramienta del navegador que pausa el código para revisarlo paso a paso. Es más práctico que `console.log()` cuando hay muchas variables o no sé qué valores revisar.

Para usarlo, escribo `debugger` en el lugar donde quiero que se pause la ejecución:

```js
function logCharacters(str) {
  debugger;
  for (let index = 0; index < str.length; index += 1) {
    console.log(str[index]);
  }
}

logCharacters('SEGAAAAAA');
```

Con las DevTools abiertas, el código se detiene en esa línea y se abre la pestaña **Fuentes** (Sources). Si no aparece, recargo la página con las DevTools abiertas.

**Antes de publicar el sitio hay que borrar todas las sentencias `debugger`.**

---

## 9. ¿Qué partes tiene el panel del depurador?

- Un **navegador de archivos** para abrir cualquier archivo del proyecto.
- Un **editor de código**.
- Un **panel de depuración** con herramientas para inspeccionar el código. Ahí está la **pila de llamadas** (call stack): la lista de funciones que se llamaron hasta llegar al punto actual, con la más reciente arriba. Ayuda a entender cómo llegó el programa al lugar del error.

---

## 10. ¿Cómo avanzo paso a paso con el depurador?

- **Step over** (F10): ejecuta la línea actual y pasa a la siguiente.
- Al pasar el cursor sobre una variable veo su valor en ese momento.
- La sección **Alcance** (Scope) muestra las variables disponibles en ese punto y sus valores.

---

## 11. Ejemplo: ¿por qué este código da "ReferenceError: i is not defined"?

```js
function countToNumber(num) {
  debugger;
  for (let i = 0; i <= num; i++) {
    console.log(i);
  }
  return i; // aquí ocurre el error
}

countToNumber(5);
// Uncaught ReferenceError: i is not defined
```

Recorriendo el código con el depurador se ve que, al terminar el bucle, `i` desaparece de la sección Alcance. Como `i` se declaró con `let` dentro del `for`, **solo existe dentro de ese bloque**. Al intentar devolverla fuera del bucle, ya no existe.

Una solución es declarar `i` fuera del bucle:

```js
function countToNumber(num) {
  let i;
  for (i = 0; i <= num; i++) {
    console.log(i);
  }
  return i;
}

countToNumber(5) // 6
```

La otra, si no hace falta devolver `i`, es borrar la línea del `return`.

---

## 12. ¿Qué es el alcance de bloque de let?

Una variable declarada con `let` dentro de un bloque (por ejemplo, el de un `for`) solo existe dentro de ese bloque. Cuando el bloque termina, la variable deja de existir, y usarla afuera produce un `ReferenceError`.
