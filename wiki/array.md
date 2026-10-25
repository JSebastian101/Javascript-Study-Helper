# MÓDULO ARREGLOS

## 1. ¿Qué es un arreglo?

Es un tipo de dato que actúa como una lista y puede tener varios elementos.

Los arreglos se crean usando corchetes. Los elementos de las listas están organizados y separados por comas.

Cada elemento dentro de la lista tiene una posición.

---

## 2. Dado el siguiente arreglo, ¿cómo acceder a cada uno de sus elementos?

```js
const compras = ["avena", "arroz", "papa"]

compras[0]
compras[1]
compras[2]
```

---

## 3. ¿Cuál es el resultado de acceder a una posición no válida en un arreglo?

```js
const compras = ["avena", "arroz", "papa"]

compras[10] // undefined
```

---

## 4. ¿Cómo puedo conocer cuántos elementos tiene un arreglo?

Para conocer cuántos elementos tiene un arreglo se puede utilizar `.length`.

```js
const compras = ["avena", "arroz", "papa"]

compras.length // 3
```

---

## 5. Cree un arreglo de 3 elementos y después desestructúrelo. **Repasar**

```js
const colores = ["azul", "rojo", "cafe"]

const [azul, rojo, cafe] = colores
```

---

## 6. Cree un arreglo de 3 elementos y después desestructure el primer y el último elemento. Omita el segundo elemento. **Repasar**

```js
const colores = ["naranja", "azul", "negro"]

const [naranja, , negro] = colores
```

---

## 7. Cree un arreglo de 3 elementos y después desestructure el primer elemento. Los elementos restantes guárdelos en una variable llamada `faltantes`. **Repasar**

```js
const colores = ["naranja", "azul", "negro"]

const [naranja, ...faltantes] = colores

console.log(naranja) // "naranja"
console.log(faltantes) // ["azul", "negro"]
```

---

## 8. ¿Cuáles son los métodos para agregar/eliminar elementos del principio y final de un arreglo? ¿Tienen argumentos? ¿Qué retornan?

- **`push`**: sirve para agregar elementos al final. Recibe como argumentos el o los elementos que se quieren agregar y retorna el nuevo largo del arreglo.

- **`unshift`**: sirve para agregar elementos al inicio. Recibe como argumentos el o los elementos que se quieren agregar y retorna el nuevo largo del arreglo.

- **`pop`**: sirve para eliminar el último elemento. No recibe argumentos y retorna el elemento eliminado.

- **`shift`**: sirve para eliminar el primer elemento. No recibe argumentos y retorna el elemento eliminado.

```js
const frutas = ["manzana", "pera"]

frutas.push("uva")
// ["manzana", "pera", "uva"]

frutas.unshift("mango")
// ["mango", "manzana", "pera", "uva"]

frutas.pop()
// "uva"

frutas.shift()
// "mango"
```

---

## 9. ¿Qué método me permite modificar el arreglo en cualquier punto?

Este método permite eliminar elementos, añadir elementos o reemplazarlos.

El método es `.splice()`.

Se le pasa el índice desde el que se quiere modificar el arreglo y la cantidad de elementos que se quieren eliminar.

Opcionalmente, se pueden pasar uno o varios elementos para agregarlos.

```js
const colores = ["rojo", "azul", "verde", "negro"]

colores.splice(1, 1, "amarillo")

console.log(colores)
// ["rojo", "amarillo", "verde", "negro"]
```

---

## 10. ¿Cómo funciona el método `concat`?

El método `concat` sirve para unir dos o más arreglos y retorna un nuevo arreglo.

```js
const numerosPares = [2, 4, 6, 8]

const numerosImpares = [1, 3, 5, 7]

const numeros = numerosPares.concat(numerosImpares)

console.log(numeros)
// [2, 4, 6, 8, 1, 3, 5, 7]
```

---

## 11. ¿Qué método me permite cortar una parte del arreglo? Incluir un ejemplo.

El método es `slice()`.

```js
const numeros = [1, 2, 3, 4, 5]

const resultado = numeros.slice(1, 2)

console.log(resultado) // [2]
```

---

## 12. ¿Qué método me permite conocer si un elemento está dentro del arreglo? Incluir un ejemplo.

El método es `includes()`.

```js
const nombres = ["marcela", "oscar", "mauricio"]

nombres.includes("oscar")

console.log(nombres.includes("oscar")) // true
```

---

## 13. ¿Cómo puedo convertir un string en un arreglo?

Para convertir un string en un arreglo necesito el método `.split()`.

```js
const libro = "princesa sapo estrella"

libro.split(" ")
```

El argumento de `split()` es el separador que se utilizará para dividir el string.

---

## 14. ¿Cómo puedo convertir un arreglo en un string?

Para convertir un arreglo en un string necesito el método `.join()`.

```js
const papeleria = ["lapiz", "borrador", "cajas"]

papeleria.join("")
```

El argumento de `join()` indica qué se utilizará para unir los elementos del arreglo.

---

## 15. ¿Cómo puedo revertir un arreglo?

```text
[1, 2, 3] -> [3, 2, 1]
```

Para revertir un arreglo usamos el método `.reverse()`.

```js
const numeros1 = [1, 2, 3, 4]

numeros1.reverse()

console.log(numeros1) // [4, 3, 2, 1]
```