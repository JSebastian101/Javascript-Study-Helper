# MÓDULO CONDICIONALES

## 1. ¿Para qué sirven las sentencias condicionales?

Para que el programa tome decisiones según los datos. Por ejemplo, al iniciar sesión en un sitio: si el usuario y la contraseña son correctos, se entra al panel; si no, aparece un mensaje de error.

---

## 2. ¿Cuáles son los operadores de comparación?

`>` (mayor que), `<` (menor que), `>=` (mayor o igual que) y `<=` (menor o igual que). Comparan dos valores y devuelven un booleano:

```js
7 > 6 // true
7 < 6 // false
7 >= 6 // true
7 <= 6 // false
```

---

## 3. ¿Cuál es la diferencia entre == y ===?

- `==` compara solo el **valor**; si los tipos son distintos, los convierte.
- `===` compara el **valor y el tipo** de dato (igualdad estricta).

```js
"42" == 42 // true
"42" === 42 // false
```

---

## 4. ¿Qué hace el operador ! y cuáles son los operadores de desigualdad?

`!` es el operador **NOT**, que indica negación. Los operadores de desigualdad son:

- `!=`: compara solo los valores.
- `!==`: compara los valores y los tipos.

```js
7 != 6 // true
"42" !== 42 // true
```

`7 != 6` se lee "7 no es igual a 6", y eso es verdadero.

---

## 5. ¿Cómo funciona la sentencia if?

Ejecuta su **cuerpo** (el código entre llaves) solo si la condición es `true`. No hace falta poner punto y coma después de las llaves.

```js
if (condición) {
  // se ejecuta si la condición es verdadera
}
```

```js
let happy = true;

if (happy) {
  console.log("😃");
}
// 😃
```

---

## 6. ¿Cómo ejecuto otro código cuando la condición es falsa?

Con `else`:

```js
let happy = false;

if (happy) {
  console.log("😃");
} else {
  console.log("😐");
}
// 😐
```

---

## 7. ¿Cómo reviso varias condiciones con else if?

Agregando cláusulas `else if` entre el `if` y el `else` final:

```js
let stockPrice = 644;

if (stockPrice > 800) {
  console.log("Hora de vender");
} else if (stockPrice > 650) {
  console.log("Aguanta y espera a que suba el precio");
} else if (stockPrice > 500) {
  console.log("Muy barato, debes comprar más acciones");
} else {
  console.log("Juégatelo todo");
}
// Muy barato, debes comprar más acciones
```

Las condiciones se revisan **en orden**. Solo se ejecuta el bloque de la **primera** condición verdadera y las demás se ignoran, por eso el orden importa.

---

## 8. Ejercicio: aplica un descuento según el precio de un producto

- Más de $500: 10% de descuento.
- Entre $300 y $500 (ambos incluidos): 5% de descuento.
- El resto: 2% de descuento.

```js
let price = 120;
let finalPrice = 0;

if (price > 500) {
  finalPrice = price - (price * 0.10);
  console.log("Se ha aplicado un descuento del 10%. Precio final: " + finalPrice + " dólares.");
} else if (price >= 300) {
  finalPrice = price - (price * 0.05);
  console.log("Se ha aplicado un descuento del 5%. Precio final: " + finalPrice + " dólares.");
} else {
  finalPrice = price - (price * 0.02);
  console.log("Se ha aplicado un descuento del 2%. Precio final: " + finalPrice + " dólares.");
}
// Se ha aplicado un descuento del 2%. Precio final: 117.6 dólares.
```

- Primero se revisa `price > 500`, porque es la condición más estricta y la del mayor descuento.
- En el `else if` basta con `price >= 300`, porque los precios mayores a 500 ya se descartaron.
- El `else` no necesita condición: si el programa llega ahí, el precio es menor que 300.

Conviene probar con varios precios (600, 350 y 120) para comprobar que cada condición funciona.

---

## 9. ¿Qué son los operadores lógicos &&, || y !?

Permiten hacer operaciones con booleanos:

- `!` (NOT): invierte el valor; `true` pasa a ser `false` y viceversa.
- `&&` (AND): es `true` solo si **los dos** lados son `true`.
- `||` (OR): es `true` si **al menos uno** de los lados es `true`.

```js
let isSunny = true;
let isRaining = false;

!isSunny // false
!isRaining // true
isSunny && isRaining // false
isSunny || isRaining // true
```

---

## 10. ¿Cómo uso operadores lógicos dentro de un if?

Para combinar varias condiciones en una sola:

```js
let temperature = 36.7;

if (temperature > 36.6 && temperature <= 37) {
  console.log("Todo parece normal.");
} else {
  console.log("¡Ve al médico lo antes posible!");
}
// Todo parece normal.
```

---

## 11. ¿Cuál será el resultado del siguiente código?

```js
let isCold = true;
let isSnowing = false;

console.log(isCold && isSnowing);
console.log(isCold || isSnowing);
console.log(isCold && !isSnowing);
console.log(!isCold || isSnowing);
```

**Escribir el resultado:**

```txt
false
true
true
false
```

1. `&&` necesita que los dos sean `true`, y `isSnowing` es `false`.
2. `||` necesita al menos un `true`, e `isCold` es `true`.
3. `!isSnowing` es `true`, y `true && true` es `true`.
4. `!isCold` es `false`, y `false || false` es `false`.
