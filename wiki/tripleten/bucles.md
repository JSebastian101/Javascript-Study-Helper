# MÓDULO BUCLES

## 1. ¿Qué son las operaciones abreviadas?

Son formas cortas de aumentar o disminuir el valor de una variable, algo muy común al contar puntos, tiempo o elementos:

| Operador | Qué hace | Ejemplo | Es igual a |
| --- | --- | --- | --- |
| `++` | Aumenta el valor en 1 | `i++` | `i = i + 1` |
| `--` | Disminuye el valor en 1 | `i--` | `i = i - 1` |
| `+= N` | Aumenta el valor en N | `i += 2` | `i = i + 2` |
| `-= N` | Disminuye el valor en N | `i -= 5` | `i = i - 5` |

---

## 2. ¿Cuál será el resultado del siguiente código?

```js
let counter = 7;
counter++;
counter -= 2;
console.log(counter);
```

**Escribir el resultado:**

```txt
6
```

El contador sube a 8 y después se le restan 2.

---

## 3. ¿Cuál será el resultado del siguiente código?

```js
let points = 4;
points += 3;
points--;
points--;
console.log(points);
```

**Escribir el resultado:**

```txt
5
```

`+= 3` lo deja en 7, y los dos `--` lo bajan a 5.

---

## 4. ¿Qué es un bucle?

Es una estructura que repite el mismo código mientras una condición siga siendo verdadera.

- **Condición:** lo que se revisa antes de cada repetición.
- **Cuerpo:** el código que se repite.
- **Iteración:** cada vez que se ejecuta el cuerpo.

Los dos bucles más usados son `while` y `for`.

---

## 5. ¿Cómo funciona el bucle while?

Repite el cuerpo **mientras** la condición sea `true`:

```js
while (condición) {
  // cuerpo
}
```

La condición tiene que dejar de cumplirse en algún momento; si no, el bucle se repite para siempre y el navegador se bloquea.

```js
// muestra los números pares del 10 al 20
let number = 10;

while (number <= 20) {
  console.log(number);
  number += 2;
}
// 10, 12, 14, 16, 18, 20
```

En cada iteración se muestra `number` y se le suman 2. Después de 6 iteraciones `number` vale 22, la condición deja de cumplirse y el bucle termina.

---

## 6. Ejemplo: procesar pedidos con while

```js
let orders = 5;

while (orders > 0) {
  console.log(`Procesando pedido... faltan ${orders}`);
  orders--;
}

console.log("¡Todos los pedidos han sido procesados!");
```

Mientras queden pedidos, procesa uno y resta 1 al contador. Cuando `orders` llega a 0, el bucle se detiene solo.

---

## 7. ¿Cuál es el último número que se mostrará en la consola?

```js
let i = 0;

while (i < 5) {
  i++;
  console.log(i);
}
```

**Escribir el resultado:**

```txt
5
```

La última iteración empieza con `i = 4`, pero `i` aumenta antes de mostrarse.

---

## 8. ¿Cómo funciona el bucle for?

Repite el cuerpo un número determinado de veces. Entre paréntesis lleva tres partes separadas por punto y coma:

```js
for (inicialización; condición; incremento) {
  // cuerpo
}
```

1. **Inicialización:** crea la variable contador (normalmente `i`) con su valor inicial.
2. **Condición:** mientras sea verdadera, el bucle sigue repitiéndose.
3. **Incremento:** cómo cambia el contador después de cada iteración.

```js
// muestra los números del 0 al 100
for (let i = 0; i <= 100; i++) {
  console.log(i);
}
```

---

## 9. ¿Cuál es el último número que se mostrará en la consola?

```js
for (let i = 1; i <= 3; i++) {
  console.log(i);
}
```

**Escribir el resultado:**

```txt
3
```

Empieza en 1 e incluye el 3, así que muestra 1, 2 y 3.

---

## 10. Escribe un bucle for que muestre los enteros del 3 al 8, en orden

```js
for (let i = 3; i <= 8; i++) {
  console.log(i);
}
```

---

## 11. Escribe un bucle for que muestre los números del 1 al 100

```js
for (let i = 1; i <= 100; i++) {
  console.log(i);
}
```

---

## 12. Ejercicio: anuncia las paradas del tren "TripleTen Express"

El tren para cada 10 km, desde los 10 km hasta los 100 km.

```js
console.log('¡El "TripleTen Express" está saliendo! Próximas paradas:');

for (let km = 10; km <= 100; km += 10) {
  console.log(`Parada a los ${km} km`);
}

console.log('¡El "TripleTen Express" ha llegado a su destino final!');
```

---

## 13. Ejercicio: muestra del 1 al 100 si cada número es par o impar

```js
for (let i = 1; i <= 100; i++) {
  if (i % 2 === 0) {
    console.log(`${i} es par`);
  } else {
    console.log(`${i} es impar`);
  }
}
// 1 es impar
// 2 es par
// ...
```

---

## 14. ¿Para qué sirve un if dentro de un bucle?

Para repetir un código pero hacer algo solo cuando se cumple una condición: mostrar solo los números pares, hacer algo especial con un valor, omitir elementos, etc.

```js
for (let i = 1; i <= 5; i++) {
  if (i === 3) {
    console.log("¡Encontrado el número 3!");
  }
}
```

El bucle se repite 5 veces, pero el mensaje aparece una sola vez.

---

## 15. ¿Qué se mostrará en la consola al ejecutar este código?

```js
for (let i = 1; i <= 5; i++) {
  if (i % 2 !== 0) {
    console.log(i);
  }
}
```

**Escribir el resultado:**

```txt
1
3
5
```

`i % 2 !== 0` solo es verdadero con los números impares.

---

## 16. ¿Qué hacen break y continue?

- `break`: **detiene** el bucle por completo.
- `continue`: **salta** el resto de la iteración actual y pasa a la siguiente, como saltar una canción en una lista de reproducción.

```js
for (let i = 0; i <= 10; i++) {
  if (i === 5) {
    break;
  }
  console.log(i);
}
// 0, 1, 2, 3, 4

for (let i = 0; i <= 10; i++) {
  if (i === 5) {
    continue;
  }
  console.log(i);
}
// 0, 1, 2, 3, 4, 6, 7, 8, 9, 10
```

---

## 17. ¿Cuántas veces se llama a console.log() en este código?

```js
for (let i = 0; i <= 5; i++) {
  console.log(i);
  if (i === 2) {
    continue;
  }
}
```

**Escribir el resultado:**

```txt
6 veces: muestra 0, 1, 2, 3, 4 y 5
```

El `console.log()` está antes del `continue`, así que el 2 también se muestra.

---

## 18. ¿Cómo acumulo un valor dentro de un bucle?

Con una variable que se actualiza en cada iteración, como una alcancía a la que se le agrega una moneda cada día. No se crea una variable nueva cada vez: se va actualizando la misma. Sirve para totales, puntajes, tiempo, intereses o incluso strings.

---

## 19. ¿Cuándo uso while y cuándo uso for?

- **while:** cuando **no sé** cuántas repeticiones hacen falta; repito hasta que se cumpla una condición.
- **for:** cuando **sé** cuántas veces hay que repetir.

---

## 20. Ejercicio: ¿cuántos años tarda un ahorro en llegar a la meta?

Empiezo con $1000, gano un 10% de interés al año y quiero llegar a $2000. No sé cuántos años serán, así que uso `while`.

```js
let startAmount = 1000;
let percent = 10;
let targetAmount = 2000;
let years = 0;

while (startAmount < targetAmount) {
  startAmount = startAmount + (startAmount * percent / 100);
  years++;
}

console.log(`Tomará ${years} años ahorrar ${targetAmount} dólares.`);
// Tomará 8 años ahorrar 2000 dólares.
```

`startAmount * percent / 100` calcula el 10% del monto actual; se suma al monto y el resultado pasa a ser el nuevo `startAmount`.

---

## 21. Ejercicio: ¿cuánto dinero habrá en la cuenta después de 5 años?

Ahora sé cuántas veces hay que repetir (una por año), así que uso `for`.

```js
let startAmount = 1000;
let percent = 10;
let years = 5;

for (let i = 0; i < years; i++) {
  startAmount = startAmount + (startAmount * percent / 100);
}

console.log(`Después de ${years} años, la cuenta tendrá ${startAmount} dólares.`);
// Después de 5 años, la cuenta tendrá 1610.51 dólares.
```

---

## 22. Ejercicio: muestra los ganadores de un concurso

Hay 10 participantes, numerados del 1 al 10. Gana quien tenga un número par **o** divisible entre 5.

```js
for (let i = 1; i <= 10; i++) {
  if (i % 2 === 0 || i % 5 === 0) {
    console.log(`¡El participante número ${i} es un ganador!`);
  }
}
// ganadores: 2, 4, 5, 6, 8 y 10
```

---

## 23. Ejercicio: suma todos los números enteros de start a end

```js
let start = 3;
let end = 7;
let total = 0;

for (let i = start; i <= end; i++) {
  total += i;
}

console.log(`La suma de los números del ${start} al ${end} es ${total}`);
// La suma de los números del 3 al 7 es 25
```

---

## 24. Ejercicio: omite a los participantes descalificados

Hay 10 participantes y los números 3 y 7 están descalificados. Los demás pueden competir.

```js
for (let i = 1; i <= 10; i++) {
  if (i === 3 || i === 7) {
    continue;
  }
  console.log(`El participante ${i} puede competir`);
}
// pueden competir: 1, 2, 4, 5, 6, 8, 9 y 10
```
