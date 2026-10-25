## 1. ¿Qué es un string?

**R/** Un string es un tipo de dato que se usa para representar un texto usando comillas, por ejemplo:

```js
const texto = "hola mundo"
```

Hay diferentes tipos de comillas que pueden usarse, por ejemplo:

- Comillas dobles: `""`
- Comillas simples: `''`
- Comillas invertidas: ``````

## 2. ¿Qué es la notación de corchetes?

Se usa para acceder a un carácter, usando un número que se conoce como index.

```js
const texto = "hola mundo"
texto[0]
```

## 3. En un string de comillas dobles, ¿cómo hago un salto de línea?

Usando un carácter de escape, con `\n`.

```js
const poema = `las rosas son rojas \n las violetas azules \n y los girasoles amarillos`
```

## 4. ¿Cuál es la diferencia entre las comillas simples/dobles y las comillas invertidas?

Hay 2 diferencias principales:

1. Las comillas invertidas permiten hacer interpolación de strings.
2. No se necesitan caracteres de escape para hacer un salto de línea.

```js
const texto = "redonda"
const frase = `las rosas están en la mesa ${texto}`
const poema = `las rosas están
en la mesa redonda`
```

## 5. ¿Qué es el método `indexOf`?

Permite conocer el index de la palabra que se desee buscar. Si la palabra está en el string, retorna un número y si la palabra no está en el string, retorna `-1`.

```js
const poema = "las rosas son rojas \n las violetas azules \n y los girasoles amarillos"

console.log(poema.indexOf("rosas")) // 4
console.log(poema.indexOf("papel")) // -1
```

## 6. ¿Qué es el método `includes`?

El método `includes` sirve para verificar si una palabra está incluida en el string. Retorna un booleano: si la palabra está en el string devuelve `true` y si no, devuelve `false`.

```js
const poema = "las rosas son rojas \n las violetas azules \n y los girasoles amarillos"

console.log(poema.includes("rosas")) // true
console.log(poema.includes("papel")) // false
```

## 7. ¿Qué es el método `slice`?

El método `slice` sirve para cortar el string, usando argumentos de tipo número para indicar un inicio y final. Retorna el string cortado.

```js
const poema = "las rosas son rojas \n las violetas azules \n y los girasoles amarillos"

console.log(poema.slice(4)) // rosas son rojas \n las violetas azul…
console.log(poema.slice(10, 20)) // on rojas
console.log(poema.slice(-9)) // amarillos
```

## 8. ¿Cómo convertir un string a mayúsculas y a minúsculas?

Para poder convertir un string a mayúsculas necesitamos usar la variable seguida de `.toUpperCase()` y para convertir el string en minúsculas se usa la variable seguida de `.toLowerCase()`.

Estos métodos no reciben argumentos. `toUpperCase()` retorna un string en mayúsculas y `toLowerCase()` retorna un string en minúsculas.

```js
const poema = "las rosas son rojas \n las violetas azules \n y los girasoles amarillos"

console.log(poema.toUpperCase()) // ROSAS SON ROJAS…
console.log(poema.toLowerCase()) // las rosas son rojas…
```

## 9. ¿Qué es el método `replace`?

El método `replace` sirve para reemplazar una palabra del string. Se deben usar dos argumentos:

1. La palabra que se quiere reemplazar.
2. La palabra nueva.

Retorna el string con la palabra reemplazada.

```js
const frase = "los perros y los gatos no se llevan bien";

console.log(frase.replace("no", "si"))
// "los perros y los gatos si se llevan bien"
```

## 10. ¿Cuál será el resultado del siguiente código?

```js
const frase = "los perros y los gatos no se llevan bien";

console.log(frase.replace("los", "sus"))
```

**Escribir el resultado:**

```txt
sus perros y los gatos no se llevan bien
```

## 11. ¿Cuál será el resultado del siguiente código?

```js
const frase = "los perros y los gatos no se llevan bien";

console.log(frase.replaceAll("los", "sus"))
```

**Escribir el resultado:**

```txt
sus perros y sus gatos no se llevan bien
```

## 12. ¿Qué es el método `repeat`?

El método `repeat` sirve para repetir todo el string las veces que quiera y retorna el string completo según las veces que quiero que se repita.

```js
const frase = "Hola Jeni";

console.log(frase.repeat(3)) // holaholahola
```

## 13. ¿Qué es el método `trim` y cuáles son sus variaciones?

El método `trim` sirve para recortar los espacios en blanco del inicio y final del string.

```js
const frase = "    Hola Jeni    ";

console.log(frase.trim()) // "Hola Jeni"
console.log(frase.trimStart()) // "Hola Jeni    "
console.log(frase.trimEnd()) // "    Hola Jeni"
```

## Puntaje

A cada pregunta le vas a dar un puntaje del 1 al 4.

1. **No recuerdas el concepto**
2. **Recuerdas un poco**
3. **Tienes en su mayoría claridad**
4. **Claridad concepto**

**2 3 4 1 2 3 4**