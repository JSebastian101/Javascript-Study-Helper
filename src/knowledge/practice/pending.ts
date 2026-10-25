import type { PendingExercise } from '../model'

const CONDICIONALES = { file: 'wiki/tripleten/condicionales.md', title: 'Condicionales (TripleTen)' }
const BUCLES = { file: 'wiki/tripleten/bucles.md', title: 'Bucles (TripleTen)' }
const ARRAYS = { file: 'wiki/tripleten/arrays.md', title: 'Arrays (TripleTen)' }
const FUNCIONES = { file: 'wiki/tripleten/funciones.md', title: 'Funciones (TripleTen)' }
const STRINGS = { file: 'wiki/tripleten/strings.md', title: 'Strings (TripleTen)' }

/**
 * Ejercicios con solución tomados de las wikis. No se muestran en la consulta
 * (la app no da soluciones): quedan guardados para la futura sección de
 * práctica. Las soluciones se ejecutan en los tests como los ejemplos.
 */
export const pendingExercises: PendingExercise[] = [
  {
    id: 'logic.descuento-segun-precio',
    title: 'Descuento según el precio',
    categories: ['logic'],
    actions: ['decide', 'compare'],
    statement:
      'Aplica un descuento según el precio de un producto: más de $500, 10% de descuento; entre $300 y $500 (ambos incluidos), 5%; el resto, 2%. Muestra el precio final. Prueba con 600, 350 y 120.',
    solution: `
      let price = 120
      let finalPrice = 0

      if (price > 500) {
        finalPrice = price - (price * 0.10)
        console.log("Se ha aplicado un descuento del 10%. Precio final: " + finalPrice + " dólares.")
      } else if (price >= 300) {
        finalPrice = price - (price * 0.05)
        console.log("Se ha aplicado un descuento del 5%. Precio final: " + finalPrice + " dólares.")
      } else {
        finalPrice = price - (price * 0.02)
        console.log("Se ha aplicado un descuento del 2%. Precio final: " + finalPrice + " dólares.")
      }
      // muestra: Se ha aplicado un descuento del 2%. Precio final: 117.6 dólares.

      console.log(finalPrice) // 117.6
    `,
    uses: ['logic.if-else', 'logic.greater', 'logic.greater-equal', 'number.multiply', 'number.subtract', 'string.concatenation'],
    from: { ...CONDICIONALES, sections: ['8'] },
  },
  {
    id: 'loops.del-3-al-8',
    title: 'Del 3 al 8',
    categories: ['loops'],
    actions: ['repeat'],
    statement: 'Escribe un bucle for que muestre en la consola los enteros del 3 al 8, en orden.',
    solution: `
      for (let i = 3; i <= 8; i++) {
        console.log(i)
      }
      // muestra: 3, 4, 5, 6, 7, 8
    `,
    uses: ['loops.for', 'logic.less-equal'],
    from: { ...BUCLES, sections: ['10'] },
  },
  {
    id: 'loops.del-1-al-100',
    title: 'Del 1 al 100',
    categories: ['loops'],
    actions: ['repeat'],
    statement: 'Escribe un bucle for que muestre en la consola los números del 1 al 100.',
    solution: `
      for (let i = 1; i <= 100; i++) {
        console.log(i)
      }
      // muestra: 1, 2, 3… hasta 100
    `,
    uses: ['loops.for', 'logic.less-equal'],
    from: { ...BUCLES, sections: ['11'] },
  },
  {
    id: 'loops.paradas-del-tren',
    title: 'Las paradas del tren',
    categories: ['loops'],
    actions: ['repeat'],
    statement:
      'Anuncia las paradas del tren "TripleTen Express". El tren para cada 10 km, desde los 10 km hasta los 100 km. Muestra un mensaje de salida, uno por cada parada y uno de llegada.',
    solution: `
      console.log('¡El "TripleTen Express" está saliendo! Próximas paradas:')

      for (let km = 10; km <= 100; km += 10) {
        console.log(\`Parada a los \${km} km\`)
      }

      console.log('¡El "TripleTen Express" ha llegado a su destino final!')
      // muestra: Parada a los 10 km, Parada a los 20 km… hasta Parada a los 100 km
    `,
    uses: ['loops.for', 'number.compound-assignment', 'string.template-literal'],
    from: { ...BUCLES, sections: ['12'] },
  },
  {
    id: 'loops.par-o-impar',
    title: '¿Par o impar?',
    categories: ['loops'],
    actions: ['repeat', 'decide'],
    statement: 'Muestra los números del 1 al 100 y, para cada uno, si es par o impar.',
    solution: `
      for (let i = 1; i <= 100; i++) {
        if (i % 2 === 0) {
          console.log(\`\${i} es par\`)
        } else {
          console.log(\`\${i} es impar\`)
        }
      }
      // muestra: 1 es impar, 2 es par…
    `,
    uses: ['loops.for', 'loops.if-inside', 'logic.if-else', 'number.modulo', 'logic.strict-equality', 'string.template-literal'],
    from: { ...BUCLES, sections: ['13'] },
  },
  {
    id: 'loops.anos-para-la-meta',
    title: '¿Cuántos años para llegar a la meta?',
    categories: ['loops'],
    actions: ['repeat', 'update'],
    statement:
      'Empiezas con $1000, ganas un 10% de interés al año y quieres llegar a $2000. Calcula cuántos años tardará el ahorro en llegar a la meta.',
    solution: `
      let startAmount = 1000
      let percent = 10
      let targetAmount = 2000
      let years = 0

      while (startAmount < targetAmount) {
        startAmount = startAmount + (startAmount * percent / 100)
        years++
      }

      console.log(\`Tomará \${years} años ahorrar \${targetAmount} dólares.\`)
      // muestra: Tomará 8 años ahorrar 2000 dólares.
      console.log(years) // 8
    `,
    uses: ['loops.while', 'loops.accumulator', 'logic.less', 'number.increment', 'number.multiply', 'number.divide'],
    from: { ...BUCLES, sections: ['20'] },
  },
  {
    id: 'loops.ahorro-en-cinco-anos',
    title: 'El ahorro después de 5 años',
    categories: ['loops'],
    actions: ['repeat', 'update'],
    statement: 'Empiezas con $1000 y ganas un 10% de interés al año. Calcula cuánto dinero habrá en la cuenta después de 5 años.',
    solution: `
      let startAmount = 1000
      let percent = 10
      let years = 5

      for (let i = 0; i < years; i++) {
        startAmount = startAmount + (startAmount * percent / 100)
      }

      console.log(\`Después de \${years} años, la cuenta tendrá \${startAmount} dólares.\`)
      // muestra: Después de 5 años, la cuenta tendrá 1610.51 dólares.
      console.log(startAmount) // 1610.51
    `,
    uses: ['loops.for', 'loops.accumulator', 'number.multiply', 'number.divide'],
    from: { ...BUCLES, sections: ['21'] },
  },
  {
    id: 'loops.ganadores-concurso',
    title: 'Ganadores de un concurso',
    categories: ['loops'],
    actions: ['repeat', 'combine-conditions'],
    statement: 'Hay 10 participantes, numerados del 1 al 10. Gana quien tenga un número par o divisible entre 5. Muestra los ganadores.',
    solution: `
      for (let i = 1; i <= 10; i++) {
        if (i % 2 === 0 || i % 5 === 0) {
          console.log(\`¡El participante número \${i} es un ganador!\`)
        }
      }
      // ganadores: 2, 4, 5, 6, 8 y 10
    `,
    uses: ['loops.for', 'loops.if-inside', 'number.modulo', 'logic.or', 'logic.strict-equality'],
    from: { ...BUCLES, sections: ['22'] },
  },
  {
    id: 'loops.suma-de-start-a-end',
    title: 'Sumar los enteros de start a end',
    categories: ['loops'],
    actions: ['repeat', 'update'],
    statement: 'Suma todos los números enteros desde start hasta end (por ejemplo, del 3 al 7) y muestra el resultado.',
    solution: `
      let start = 3
      let end = 7
      let total = 0

      for (let i = start; i <= end; i++) {
        total += i
      }

      console.log(\`La suma de los números del \${start} al \${end} es \${total}\`)
      // muestra: La suma de los números del 3 al 7 es 25
      console.log(total) // 25
    `,
    uses: ['loops.for', 'loops.accumulator', 'number.compound-assignment'],
    from: { ...BUCLES, sections: ['23'] },
  },
  {
    id: 'loops.participantes-descalificados',
    title: 'Omitir a los descalificados',
    categories: ['loops'],
    actions: ['repeat', 'stop'],
    statement: 'Hay 10 participantes y los números 3 y 7 están descalificados. Muestra que los demás pueden competir.',
    solution: `
      for (let i = 1; i <= 10; i++) {
        if (i === 3 || i === 7) {
          continue
        }
        console.log(\`El participante \${i} puede competir\`)
      }
      // pueden competir: 1, 2, 4, 5, 6, 8, 9 y 10
    `,
    uses: ['loops.for', 'loops.continue', 'logic.or', 'logic.strict-equality'],
    from: { ...BUCLES, sections: ['24'] },
  },
  {
    id: 'array.suma-de-un-arreglo',
    title: 'La suma de un arreglo',
    categories: ['array', 'loops'],
    actions: ['iterate', 'update'],
    statement: 'Calcula la suma de todos los números del arreglo [-35, 3, -21, 32, -54, -69, 85, 61, 88, 68].',
    solution: `
      const numbers = [-35, 3, -21, 32, -54, -69, 85, 61, 88, 68]
      let sum = 0

      for (let number of numbers) {
        sum += number
      }

      console.log(sum) // 158
    `,
    uses: ['loops.for-of', 'loops.accumulator', 'number.compound-assignment'],
    from: { ...ARRAYS, sections: ['9'] },
  },
  {
    id: 'array.bandeja-de-seguridad',
    title: 'La bandeja del control de seguridad',
    categories: ['array'],
    actions: ['add', 'remove'],
    statement: 'Pon el teléfono en la bandeja del control de seguridad (un arreglo vacío) y luego sácalo.',
    solution: `
      const phone = "iPhone"
      const screeningBin = []

      screeningBin.push(phone)
      console.log(screeningBin) // ["iPhone"]

      screeningBin.pop()
      console.log(screeningBin) // []
    `,
    uses: ['array.push', 'array.pop'],
    from: { ...ARRAYS, sections: ['12'] },
  },
  {
    id: 'array.pares-e-impares',
    title: 'Separar pares e impares',
    categories: ['array', 'loops'],
    actions: ['iterate', 'add'],
    statement: 'Separa los números pares y los impares del arreglo [35, 3, 21, 32, 54, 69, 85, 61, 88, 68] en dos arreglos.',
    solution: `
      const numbers = [35, 3, 21, 32, 54, 69, 85, 61, 88, 68]
      const evenNumbers = []
      const oddNumbers = []

      for (const number of numbers) {
        if (number % 2 === 0) {
          evenNumbers.push(number)
        } else {
          oddNumbers.push(number)
        }
      }

      console.log(evenNumbers) // [32, 54, 88, 68]
      console.log(oddNumbers) // [35, 3, 21, 69, 85, 61]
    `,
    uses: ['loops.for-of', 'logic.if-else', 'number.modulo', 'logic.strict-equality', 'array.push'],
    from: { ...ARRAYS, sections: ['13'] },
  },
  {
    id: 'array.libros-despues-de-1950',
    title: 'Libros publicados después de 1950',
    categories: ['array', 'loops'],
    actions: ['iterate', 'decide'],
    statement:
      'Hay un arreglo de libros; cada libro es un arreglo con título, autor y año de publicación. Muestra solo los libros publicados después de 1950.',
    solution: `
      const books = [
        ["Matar a un ruiseñor", "Harper Lee", 1960],
        ["El gran Gatsby", "F. Scott Fitzgerald", 1925],
        ["Cien años de soledad", "Gabriel García Márquez", 1967]
      ]

      for (let book of books) {
        if (book[2] > 1950) {
          console.log(\`Título: \${book[0]}, Autor: \${book[1]}, Año de publicación: \${book[2]}\`)
        }
      }
      // muestra: Matar a un ruiseñor y Cien años de soledad
    `,
    uses: ['array.nested', 'loops.for-of', 'loops.if-inside', 'logic.greater', 'string.template-literal'],
    from: { ...ARRAYS, sections: ['17'] },
  },
  {
    id: 'functions.llamar-diez-veces',
    title: 'Llamar una función 10 veces',
    categories: ['functions', 'loops'],
    actions: ['call', 'repeat'],
    statement: 'Hay una variable counter que empieza en 0 y una función increaseCounter() que le suma 1. Usa un bucle for para llamar a la función 10 veces.',
    solution: `
      let counter = 0

      function increaseCounter() {
        counter++
      }

      for (let index = 0; index < 10; index++) {
        increaseCounter()
      }

      console.log(counter) // 10
    `,
    uses: ['functions.declaration', 'functions.call', 'loops.for', 'number.increment'],
    from: { ...FUNCIONES, sections: ['5'] },
  },
  {
    id: 'functions.calculadora-de-envios',
    title: 'Calculadora de envíos',
    categories: ['functions', 'array'],
    actions: ['call', 'return', 'iterate'],
    statement:
      'La tienda cobra 5 unidades por kilogramo. Calcula el costo de envío de cada artículo de una lista de pesos y muestra un resumen. Usa una función para el costo de un artículo y otra que recorra la lista y llame a la primera.',
    solution: `
      // calcula el costo de envío de un artículo
      function calculateShipping(weight) {
        const ratePerKg = 5
        return weight * ratePerKg
      }

      // recorre los pesos y muestra el costo de cada uno
      function processShipping(weights) {
        for (let i = 0; i < weights.length; i++) {
          const shippingCost = calculateShipping(weights[i])
          console.log(\`Artículo \${i + 1}: peso \${weights[i]} kg — costo de envío \${shippingCost} dólares\`)
        }
      }

      const itemWeights = [2, 5, 1.5]
      processShipping(itemWeights)
      // Artículo 1: peso 2 kg — costo de envío 10 dólares
      // Artículo 2: peso 5 kg — costo de envío 25 dólares
      // Artículo 3: peso 1.5 kg — costo de envío 7.5 dólares

      calculateShipping(1.5) // 7.5
    `,
    uses: [
      'functions.declaration',
      'functions.parameters',
      'functions.return',
      'functions.call',
      'array.for-loop',
      'number.multiply',
      'string.template-literal',
    ],
    from: { ...FUNCIONES, sections: ['11'] },
  },
  {
    id: 'string.acrostico',
    title: 'La palabra oculta de un acróstico',
    categories: ['string', 'array'],
    actions: ['access', 'join', 'iterate'],
    statement:
      'Un acróstico es un poema en el que las primeras letras de cada línea forman una palabra. Cada línea es un elemento de un arreglo: junta el primer carácter de cada string para armar la palabra oculta.',
    solution: `
      const acrostic = [
        "Hoy el sol brilla",
        "Otra vez en el cielo",
        "La tarde es tranquila",
        "Amanece despacio"
      ]

      let hiddenWord = ""

      for (let i = 0; i < acrostic.length; i += 1) {
        hiddenWord += acrostic[i][0]
      }

      console.log(hiddenWord) // "HOLA"
    `,
    uses: ['array.for-loop', 'string.bracket-notation', 'array.bracket-access', 'loops.accumulator', 'number.compound-assignment'],
    from: { ...STRINGS, sections: ['5'] },
  },
]
