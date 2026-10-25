# MÓDULO FUNCIONES

## 1. ¿Qué es una función y para qué sirve?

Es un bloque de código reutilizable que se ejecuta cuando lo llamamos. Es como un miniprograma dentro del programa: hace que el código sea más ordenado, evita repetirlo y permite decidir exactamente cuándo se ejecuta cada parte.

---

## 2. ¿Cómo declaro una función?

Con la palabra clave `function`, seguida de:

1. El nombre de la función.
2. Paréntesis `()`.
3. Llaves `{}` con el **cuerpo**, es decir, el código que ejecuta la función.

```js
function greet() {
  console.log("¡Hola, mundo!");
}
```

Declararla no la ejecuta: queda esperando a que la llamen.

---

## 3. ¿Cómo llamo (invoco) una función?

Escribiendo su nombre seguido de paréntesis. Se puede llamar todas las veces que se quiera:

```js
function greet() {
  console.log("¡Hola, mundo!");
}

greet(); // muestra: ¡Hola, mundo!
```

---

## 4. ¿Qué reglas siguen los nombres de las funciones?

1. Se escriben en **camelCase**, igual que las variables.
2. Deben ser **verbos** (o frases con un verbo) que describan lo que hace la función.

```js
function playMusic() {
  console.log("🎵 🎶 🎼");
}

function greetStudents() {
  console.log("¡Te damos la bienvenida a TripleTen!");
}
```

---

## 5. Ejercicio: usa un bucle for para llamar a la función 10 veces

```js
let counter = 0;

function increaseCounter() {
  counter++;
}

for (let index = 0; index < 10; index++) {
  increaseCounter();
}

console.log(counter) // 10
```

---

## 6. ¿Qué son los parámetros y los argumentos?

- **Parámetros:** los nombres que se escriben entre paréntesis al **declarar** la función. Funcionan como variables dentro de ella.
- **Argumentos:** los valores reales que se pasan al **llamar** a la función. Se asignan a los parámetros.

```js
function greetUser(name) { // name es el parámetro
  console.log("¡Hola, " + name + "!");
}

greetUser("Daniel"); // el argumento es "Daniel"; muestra: ¡Hola, Daniel!
```

---

## 7. ¿Qué es un valor de retorno?

Es el valor que una función **devuelve** a la parte del programa que la llamó, usando `return`. Así el resultado se puede guardar y usar después, en lugar de solo mostrarlo en la consola.

```js
function calculateArea(length, width) {
  return length * width;
}

const area = calculateArea(5, 7);
console.log(area) // 35

console.log(calculateArea(5, 7)) // 35
```

No es obligatorio guardar el resultado en una variable: se puede usar directamente, como en el último `console.log()`.

---

## 8. ¿Qué devuelve una función que no tiene return?

Devuelve `undefined`. También devuelve `undefined` si tiene un `return` sin ningún valor.

```js
function greet(name) {
  console.log(`¡Hola, ${name}!`);
}

const message = greet("Laura"); // muestra: ¡Hola, Laura!
console.log(message) // undefined
```

Un `return` sin valor sirve para dejar claro que la función solo hace una acción (mostrar algo, actualizar la interfaz) y no calcula un resultado:

```js
function logUserActivity(activity) {
  console.log(`El usuario hizo: ${activity}`);
  return;
}
```

---

## 9. ¿Qué pasa cuando se ejecuta un return?

La función **se detiene** en ese momento; el código que sigue no se ejecuta.

```js
function checkAccess(isAdmin) {
  if (!isAdmin) {
    console.log("Acceso denegado.");
    return; // la función termina aquí si no es admin
  }
  console.log("Tienes acceso de administrador.");
}

checkAccess(false); // muestra: Acceso denegado.
checkAccess(true); // muestra: Tienes acceso de administrador.
```

---

## 10. ¿Una función puede llamar a otra?

Sí. De hecho, ya lo hacemos al usar `console.log()` dentro de nuestras funciones; la diferencia es que `console.log()` viene incluida en JavaScript. Dividir una tarea grande en funciones pequeñas hace el código más limpio, reutilizable y fácil de leer.

---

## 11. Ejercicio: calculadora de envíos

La tienda cobra 5 unidades por kilogramo. Hay que calcular el costo de envío de cada artículo de una lista y mostrar un resumen.

1. Una función calcula el costo de **un** artículo, así la fórmula se escribe una sola vez.
2. Otra función recorre la lista y llama a la primera para cada artículo.

```js
// calcula el costo de envío de un artículo
function calculateShipping(weight) {
  const ratePerKg = 5;
  return weight * ratePerKg;
}

// recorre los pesos y muestra el costo de cada uno
function processShipping(weights) {
  for (let i = 0; i < weights.length; i++) {
    const shippingCost = calculateShipping(weights[i]);
    console.log(`Artículo ${i + 1}: peso ${weights[i]} kg — costo de envío ${shippingCost} dólares`);
  }
}

const itemWeights = [2, 5, 1.5];
processShipping(itemWeights);
// Artículo 1: peso 2 kg — costo de envío 10 dólares
// Artículo 2: peso 5 kg — costo de envío 25 dólares
// Artículo 3: peso 1.5 kg — costo de envío 7.5 dólares
```

Aquí se usa el `for` clásico en lugar de `for...of` porque da el elemento (`weights[i]`) y también su posición (`i`), que se necesita para numerar los artículos.

Es buena práctica declarar `calculateShipping()` antes de `processShipping()`, que es la que la usa.

---

## 12. Resumen: ¿qué hay que saber de las funciones?

- **Declarar:** darle un nombre y escribir qué hace.
- **Llamar:** ejecutarla escribiendo su nombre con paréntesis y, si los necesita, sus argumentos.
- **Parámetros y argumentos:** los parámetros son los nombres de la declaración; los argumentos, los valores que se pasan al llamarla.
- **Retornar:** devolver un valor con `return` para usarlo en otra parte del programa.

```js
function add(a, b) {
  return a + b;
}

const sum = add(2, 3); // 5
```
