# MÓDULO NÚMEROS

## 1. ¿Qué tipos de números existen en JavaScript? **Medio**

Existen dos tipos de números que son:

- **No decimales** - Float
- **Decimal** - Int

---

## 2. ¿Cuáles son las operaciones matemáticas básicas y sus operadores (símbolos)? **Bien**

- Suma: **+**
- Resta: **-**
- Multiplicación: **\***
- División: **/**
- Módulo: **%**
- Exponente: **\*\***

---

## 3. ¿Qué es la coerción de datos y cuáles son dos ejemplos? **Bien**

La coerción es cuando se convierte el tipo de un dato a otro diferente.

Los siguientes ejemplos son de coerción implícita, es decir, dejamos que el programa convierta los datos según corresponda.

```js
const resultado = 2 + "5" // "25"
const resultado2 = 2 - "5" // 3
const resultado3 = 2 * "5" // 10
const resultado4 = 20 / "5" // 4
const resultado5 = 2 - undefined // NaN
const resultado6 = 2 - null // 2
```

---

## 4. ¿Cuáles son los operadores de incremento y de decremento? **Medio**

Los operadores de incremento y decremento son `++` y `--`.

Pueden estar al principio o al final de la variable que se quiera actualizar.

```js
let increment = 0;
let decrement = 5;

increment++
decrement--

console.log(increment)
console.log(decrement)

++increment
--decrement

console.log(increment)
console.log(decrement)
```

---

## 5. ¿Qué son los operadores de operación y asignación? **Bien**

Son operadores que me permiten realizar una operación y asignar ese resultado a la variable.

---

## 6. ¿Cuáles son los operadores de operación y asignación? **Bien**

```js
let sum = 0

sum += 10 // 10

let resta = 10

resta -= 20 // -10

let multiplicacion = 23

multiplicacion *= 11 // 253

let division = 20

division /= 3 // 6.6666667

let modulo = 13

modulo %= 6 // 1

let exponente = 2

exponente **= 4 // 16
```

---

## 7. ¿Cuáles son los operadores de igualdad y cuál es la diferencia entre ellos? Usar un ejemplo. **Bien**

Los operadores de igualdad son `==` y `===`. Ambos dan como resultado un booleano.

`===` compara tipo de dato y valor, mientras que `==` compara el valor haciendo coerción.

```js
5 == "5" // true
5 === "5" // false
```

---

## 8. ¿Cuáles son los operadores de desigualdad y cuál es la diferencia entre ellos? Usar un ejemplo. **Bien**

Los operadores de desigualdad son `!=` y `!==`.

También dan como resultado un booleano.

`!==` no hace coerción. Comprueba el tipo y el valor.

`!=` sí hace coerción. Comprueba el valor.

```js
5 != "5" // false
5 !== "5" // true
```

---

## 9. ¿Cuál es el operador unario que me permite convertir un string a un número? **Bien**

**Pista:** un operador unario necesita solo de un operando.

```js
const str = "4"
const num = +str
```

El operador para convertir un string a un número es `+` colocado delante del string.

---

## 10. Escriba una estructura if-else revisando las siguientes condiciones

1. Si el puntaje es mayor o igual a 90, hacer `console.log` del mensaje `"obtuviste un 4.8"`.
2. Si el puntaje es mayor o igual a 80, hacer `console.log` del mensaje `"obtuviste un 4.3"`.
3. Si el puntaje es mayor o igual a 70, hacer `console.log` del mensaje `"obtuviste un 3.5"`.
4. Si no, mostrar en consola `"perdiste el examen"`.

```js
const puntaje = 72

if (puntaje >= 90) {
  console.log("obtuviste un 4.8")
} else if (puntaje >= 80) {
  console.log("obtuviste un 4.3")
} else if (puntaje >= 70) {
  console.log("obtuviste un 3.5")
} else {
  console.log("perdiste el examen")
}
```

---

## 11. Convierta el condicional en un ternario **Revisar**

```js
const temperatura = 25

let mensaje

if (temperatura >= 30) {
  mensaje = "Que día más soleado"
} else {
  mensaje = "Que día más frío"
}
```

### Ternario

```js
const temperatura = 25

let mensaje = temperatura > 30
  ? "Que día más soleado"
  : "Que día más frío"
```

La estructura de un ternario es:

```js
condición ? resultado verdadero : resultado falso
```

---

## 12. ¿Cómo puedo hacer múltiples comparaciones al mismo tiempo?

Para comparar múltiples condiciones usamos los operadores `||` y `&&`.

---

## 13. ¿Cuáles son las tablas de verdad? ¿Cuál es el resultado de usar `||` y `&&`?

### Operador `||`

| Condición | Resultado |
|---|---|
| `V || V` | `V` |
| `V || F` | `V` |
| `F || F` | `F` |
| `F || V` | `V` |

### Operador `&&`

| Condición | Resultado |
|---|---|
| `V && V` | `V` |
| `V && F` | `F` |
| `F && F` | `F` |
| `F && V` | `F` |

---

## 14. ¿Qué es el objeto `Math`? **Bien**

El objeto `Math` es un conjunto de funciones para operar números.

---

## 15. ¿Qué hace y cómo funciona el método `random`? **Repasar**

El método `Math.random()` sirve para generar un número aleatorio entre `0` y `1`.

```js
Math.random()
```

Retorna un número aleatorio.

---

## 16. Complete la fórmula para generar un número aleatorio que esté entre el mínimo y el máximo. **Repasar**

```js
const min = 0
const max = 100

const result = Math.floor(Math.random() * (max - min) + min)
```

---

## 17. ¿Qué hace y cómo funciona el método `Math.max()`? **Bien**

Retorna el número mayor de un listado de números.

```js
const mayor = Math.max(100, 50, 101) // 101
```

---

## 18. ¿Qué hace y cómo funciona el método `Math.min()`? **Bien**

Retorna el número menor de un listado de números.

```js
const menor = Math.min(80, 79, 81) // 79
```

---

## 19. ¿Cuáles son los métodos para redondear números y cuál es la diferencia entre ellos? Hacer un ejemplo para visualizar la diferencia. **Bien**

- `Math.round()` redondea al número entero más cercano.
- `Math.floor()` redondea hacia abajo.
- `Math.ceil()` redondea hacia arriba.

```js
const numeroRedondeado = 15.4

Math.ceil(numeroRedondeado) // 16
Math.round(numeroRedondeado) // 15
Math.floor(numeroRedondeado) // 15

const otroNumero = 15.5

Math.ceil(otroNumero) // 16
Math.round(otroNumero) // 16
Math.floor(otroNumero) // 15
```

---

## 20. ¿Qué hace el método `Math.trunc()`? **Bien**

El método `Math.trunc()` sirve para eliminar la parte decimal de un número y conservar únicamente la parte entera.

```js
const nuevo = 98.7654

Math.trunc(nuevo) // 98
```

---

## 21. ¿Qué hace el método `parseFloat` del objeto `Number`?

`Number.parseFloat()` sirve para convertir un string a un número decimal.

```js
const cadena = "15.098"

Number.parseFloat(cadena) // 15.098
```

---

## 22. ¿Qué hace el método `parseInt` del objeto `Number`?

`Number.parseInt()` sirve para convertir un string a un número entero.

```js
Number.parseInt("123.890") // 123
```

---

## 23. `Number.parseFloat()` y `Number.parseInt()` convierten strings a números. ¿Cuál es la diferencia entre convertir strings usando estos dos métodos en comparación con la función `Number`?

```js
Number.parseFloat("12.98 decimal") // 12.98
Number.parseInt("123.890 decimal") // 123
Number("12.3 decimal") // NaN
```

La diferencia es que `Number()` no puede convertir el string a número si este contiene letras.

En cambio, `Number.parseFloat()` y `Number.parseInt()` pueden convertir el string aunque tenga texto después del número.

La condición es que el texto debe venir después del número.

```js
Number.parseFloat("decimal 12.98") // NaN
Number.parseInt("decimal 123.890") // NaN
Number("decimal 12.3") // NaN
```

Si el texto viene antes del número, el resultado es `NaN`.

---

## 24. ¿Qué hace y cómo funciona el método `toFixed()`?

El método `toFixed()` sirve para indicar cuántos decimales queremos conservar.

Recibe como argumento un número que indica la cantidad de posiciones decimales.

```js
const decimal = 3256755.43563

decimal.toFixed(3) // "3256755.436"
```

Si no recibe argumentos, conserva cero posiciones decimales:

```js
const decimal = 3256755.43563

decimal.toFixed() // "3256755"
```