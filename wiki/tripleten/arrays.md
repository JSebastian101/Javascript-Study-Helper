# MÓDULO ARRAYS

## 1. ¿Qué es un array y para qué sirve?

Es una estructura de datos que guarda **varios valores en una sola variable**, en forma de lista. Así no hace falta crear una variable para cada dato:

```js
// sin array: una variable por cada elemento
const chips = "papas";
const lemonade = "limonada";
const grapefruit = "pomelo";
```

---

## 2. ¿Cómo creo un array?

Con corchetes `[]`, separando los elementos con comas (sintaxis de array literal). Puede guardar cualquier tipo de dato, incluso mezclados u otros arrays:

```js
const groceries = ["papas", "limonada", "pomelo", "naranja", "jugo", "leche", "huevos", "galletas", "banana", "queso"];
const evenNumbersLessThanTen = [0, 2, 4, 6, 8];
const quizAnswers = [true, false, false, true, true, false];
const randomData = ["papas", 12, [], undefined, false];
```

---

## 3. ¿Cómo accedo a un elemento de un array?

Con su **índice** entre corchetes. Los índices empiezan en **0**: el primer elemento tiene índice 0, el segundo 1, y así sucesivamente.

```js
const groceries = ["papas", "limonada", "pomelo", "naranja", "jugo"];

groceries[0] // "papas"
groceries[1] // "limonada"
groceries[4] // "jugo"
```

---

## 4. ¿Cómo cambio o agrego un elemento usando su índice?

Asignándole un valor a ese índice:

```js
const groceries = ["papas", "limonada", "pomelo"];
groceries[0] = "zanahoria";
console.log(groceries) // ["zanahoria", "limonada", "pomelo"]

let empty = [];
empty[0] = "primero";
empty[1] = "segundo";
console.log(empty) // ["primero", "segundo"]
```

---

## 5. ¿Cómo sé cuántos elementos tiene un array y cómo obtengo el último?

Con la propiedad `length`. Como los índices empiezan en 0, el último elemento está en la posición `length - 1`:

```js
const groceries = ["papas", "limonada", "pomelo", "naranja", "jugo", "leche", "huevos", "galletas", "banana", "queso"];

groceries.length // 10
groceries[groceries.length - 1] // "queso"
```

---

## 6. ¿Cómo recorro un array con un bucle for?

Usando el índice `i`, desde 0 hasta el último elemento:

```js
const students = ["Isabel", "Elisa", "Tomás"];

for (let i = 0; i < students.length; i++) {
  console.log("¡Te damos la bienvenida a TripleTen, " + students[i] + "!");
}
```

---

## 7. ¿Cómo recorro un array con for...of?

`for...of` recorre directamente cada elemento, sin necesidad de una variable para el índice. Su sintaxis es más corta:

```js
const students = ["Isabel", "Elisa", "Tomás"];

for (let student of students) {
  console.log("¡Te damos la bienvenida a TripleTen, " + student + "!");
}
```

---

## 8. ¿Cómo encuentro el valor mínimo de un array con un bucle?

1. Guardo el primer elemento como mínimo provisional.
2. Recorro el array y, si encuentro un número menor que el mínimo actual, lo guardo como nuevo mínimo.

```js
const numbers = [8, 14, 5, 3, 20];
let minimum = numbers[0];

for (let number of numbers) {
  if (number < minimum) {
    minimum = number;
  }
}

console.log(minimum) // 3
```

Para encontrar el máximo se usa la misma idea, cambiando la comparación por `>`.

---

## 9. Ejercicio: calcula la suma de todos los números de un array

```js
const numbers = [-35, 3, -21, 32, -54, -69, 85, 61, 88, 68];
let sum = 0;

for (let number of numbers) {
  sum += number;
}

console.log(sum) // 158
```

---

## 10. ¿Cómo agrego un elemento al final con push()?

`push()` agrega uno o más elementos al final del array y **devuelve la nueva longitud**:

```js
let students = ["Isabel", "Elisa", "Tomás"];

students.push("Andrés") // 4
console.log(students) // ["Isabel", "Elisa", "Tomás", "Andrés"]
```

---

## 11. ¿Cómo elimino el último elemento con pop()?

`pop()` elimina el último elemento y **devuelve el elemento eliminado**. No recibe argumentos:

```js
let students = ["Isabel", "Elisa", "Tomás", "Andrés"];

students.pop() // "Andrés"
console.log(students) // ["Isabel", "Elisa", "Tomás"]
```

---

## 12. Ejercicio: pon el teléfono en la bandeja del control de seguridad y luego sácalo

```js
const phone = 'iPhone';
const screeningBin = [];

screeningBin.push(phone);
console.log(screeningBin) // ["iPhone"]

screeningBin.pop();
console.log(screeningBin) // []
```

---

## 13. Ejercicio: separa los números pares y los impares en dos arrays

```js
const numbers = [35, 3, 21, 32, 54, 69, 85, 61, 88, 68];
const evenNumbers = [];
const oddNumbers = [];

for (const number of numbers) {
  if (number % 2 === 0) {
    evenNumbers.push(number);
  } else {
    oddNumbers.push(number);
  }
}

console.log(evenNumbers) // [32, 54, 88, 68]
console.log(oddNumbers) // [35, 3, 21, 69, 85, 61]
```

---

## 14. ¿Qué es un array anidado?

Es un array que contiene otros arrays. Sirve para guardar varios datos de cada elemento, como si fuera una tabla:

```js
let students = [
  ["Isabel", "Santos", 32],
  ["Elisa", "Gonzalez", 24],
  ["Tomás", "Pérez", 41]
];
```

---

## 15. ¿Cómo accedo a un elemento de un array anidado?

Con dos índices: `array[fila][columna]`. El primero elige el array interno (la fila) y el segundo, el elemento dentro de él (la columna).

```js
let students = [
  ["Isabel", "Santos", 32],
  ["Elisa", "Gonzalez", 24],
  ["Tomás", "Pérez", 41]
];

students[0] // ["Isabel", "Santos", 32]
students[0][1] // "Santos"
```

---

## 16. ¿Cómo recorro un array anidado?

Igual que un array normal; la diferencia es que cada elemento es otro array.

```js
let students = [
  ["Isabel", "Santos", 32],
  ["Elisa", "Gonzalez", 24],
  ["Tomás", "Pérez", 41]
];

// con for
for (let i = 0; i < students.length; i++) {
  console.log(`¡Te damos la bienvenida, ${students[i][0]} ${students[i][1]}!`);
}

// con for...of
for (let student of students) {
  console.log(`¡Te damos la bienvenida, ${student[0]} ${student[1]}!`);
}
```

Los dos hacen lo mismo; `for...of` es un poco más fácil de leer.

---

## 17. Ejercicio: muestra solo los libros publicados después de 1950

```js
const books = [
  ["Matar a un ruiseñor", "Harper Lee", 1960],
  ["El gran Gatsby", "F. Scott Fitzgerald", 1925],
  ["Cien años de soledad", "Gabriel García Márquez", 1967]
];

for (let book of books) {
  if (book[2] > 1950) {
    console.log(`Título: ${book[0]}, Autor: ${book[1]}, Año de publicación: ${book[2]}`);
  }
}
// Título: Matar a un ruiseñor, Autor: Harper Lee, Año de publicación: 1960
// Título: Cien años de soledad, Autor: Gabriel García Márquez, Año de publicación: 1967
```
