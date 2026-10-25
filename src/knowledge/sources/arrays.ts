import type { KnowledgeSource } from '../model'

/** Contenido de wiki/array.md */
const arrays: KnowledgeSource = {
  id: 'arrays',
  title: 'Arreglos',
  file: 'wiki/array.md',
  order: 40,
  concepts: [
    {
      id: 'array.basics',
      name: 'Array',
      aka: 'Arreglo: una lista de elementos',
      kind: 'concept',
      categories: ['array'],
      actions: ['understand', 'create'],
      phrases: ['crear una lista', 'guardar varios elementos', 'crear un arreglo', 'guardar varios valores en una sola variable'],
      summary: 'Un arreglo es un tipo de dato que actúa como una lista y puede tener varios elementos.',
      syntax: ['[elemento1, elemento2, elemento3]'],
      keyPoints: [
        'Se crea usando corchetes [ ].',
        'Los elementos están organizados y separados por comas.',
        'Cada elemento tiene una posición; la primera posición es 0.',
        'Guarda varios valores en una sola variable: así no hace falta crear una variable para cada dato.',
        'Puede guardar cualquier tipo de dato, incluso mezclados u otros arreglos.',
      ],
      examples: [
        {
          title: 'Una lista de textos',
          fromNotes: true,
          code: `const compras = ["avena", "arroz", "papa"]`,
        },
        {
          title: 'Una lista de números',
          fromNotes: true,
          code: `const numerosPares = [2, 4, 6, 8]`,
        },
        {
          title: 'Un arreglo vacío',
          code: `
            const pendientes = []
            pendientes.length // 0
          `,
          explanation: 'Un arreglo puede empezar sin elementos y llenarse después.',
        },
        {
          title: 'Sin arreglo: una variable por cada dato',
          fromNotes: true,
          code: `
            const chips = "papas"
            const lemonade = "limonada"
            const grapefruit = "pomelo"

            const groceries = ["papas", "limonada", "pomelo"]
          `,
          explanation: 'Con un arreglo, los tres datos quedan en una sola variable.',
        },
        {
          title: 'Datos de distintos tipos en un mismo arreglo',
          fromNotes: true,
          code: `
            const quizAnswers = [true, false, false, true]
            const randomData = ["papas", 12, [], undefined, false]

            randomData.length // 5
          `,
        },
      ],
      related: ['array.bracket-access', 'array.length', 'array.nested'],
      highlight: [],
      sections: ['1'],
      alsoIn: [{ file: 'wiki/tripleten/arrays.md', title: 'Arrays (TripleTen)', sections: ['1', '2'] }],
    },
    {
      id: 'array.bracket-access',
      name: 'arreglo[index]',
      aka: 'Acceder a un elemento por su posición',
      kind: 'syntax',
      categories: ['array'],
      actions: ['access', 'replace', 'add'],
      phrases: [
        'acceder a un elemento',
        'obtener el elemento de una posición',
        'obtener el primer elemento',
        'leer un elemento de la lista',
        'cambiar un elemento',
        'agregar un elemento en una posición',
      ],
      summary: 'Permite acceder a un elemento del arreglo usando su posición (index).',
      syntax: ['arreglo[index]'],
      parameters: [{ name: 'index', description: 'Número de la posición. El primer elemento está en la posición 0.' }],
      returns: { type: 'el elemento', description: 'El elemento que está en esa posición. Si la posición no existe, el resultado es undefined.' },
      keyPoints: [
        'La primera posición es 0, no 1.',
        'Si accedes a una posición que no existe, el resultado es undefined (no da error).',
        'También sirve para cambiar un elemento o agregar uno nuevo, asignándole un valor a esa posición: arreglo[index] = valor.',
      ],
      examples: [
        {
          title: 'Acceder a cada elemento',
          fromNotes: true,
          code: `
            const compras = ["avena", "arroz", "papa"]

            compras[0] // "avena"
            compras[1] // "arroz"
            compras[2] // "papa"
          `,
        },
        {
          title: 'Acceder a una posición que no existe',
          fromNotes: true,
          code: `
            const compras = ["avena", "arroz", "papa"]
            compras[10] // undefined
          `,
        },
        {
          title: 'Usar una variable como posición',
          code: `
            const compras = ["avena", "arroz", "papa"]
            const posicion = 1
            compras[posicion] // "arroz"
          `,
        },
        {
          title: 'Obtener el último elemento usando length',
          code: `
            const compras = ["avena", "arroz", "papa"]
            compras[compras.length - 1] // "papa"
          `,
          explanation: 'Como las posiciones empiezan en 0, la última posición es length - 1.',
        },
        {
          title: 'Cambiar un elemento',
          fromNotes: true,
          code: `
            const groceries = ["papas", "limonada", "pomelo"]
            groceries[0] = "zanahoria"

            console.log(groceries) // ["zanahoria", "limonada", "pomelo"]
          `,
        },
        {
          title: 'Agregar elementos en posiciones nuevas',
          fromNotes: true,
          code: `
            let empty = []
            empty[0] = "primero"
            empty[1] = "segundo"

            console.log(empty) // ["primero", "segundo"]
          `,
        },
      ],
      related: ['array.destructuring', 'array.length', 'string.bracket-notation', 'array.nested'],
      highlight: [],
      sections: ['2', '3'],
      alsoIn: [{ file: 'wiki/tripleten/arrays.md', title: 'Arrays (TripleTen)', sections: ['3', '4', '5'] }],
    },
    {
      id: 'array.length',
      name: '.length',
      aka: 'Cantidad de elementos',
      kind: 'property',
      categories: ['array'],
      actions: ['count'],
      phrases: ['contar elementos', 'saber cuántos elementos tiene', 'obtener el tamaño de la lista', 'saber si está vacío'],
      summary: 'Indica cuántos elementos tiene el arreglo.',
      syntax: ['arreglo.length'],
      returns: { type: 'number', description: 'La cantidad de elementos del arreglo.' },
      keyPoints: ['Es una propiedad: se escribe sin paréntesis.', 'Un arreglo vacío tiene length 0.', 'La última posición del arreglo es length - 1.'],
      examples: [
        {
          title: 'Saber cuántos elementos hay',
          fromNotes: true,
          code: `
            const compras = ["avena", "arroz", "papa"]
            compras.length // 3
          `,
        },
        {
          title: 'Un arreglo vacío',
          code: `
            const vacio = []
            vacio.length // 0
          `,
        },
        {
          title: 'El largo cambia al agregar elementos',
          code: `
            const frutas = ["manzana"]
            frutas.push("pera")
            frutas.length // 2
          `,
        },
        {
          title: 'Saber si un arreglo está vacío',
          code: `
            const pendientes = []
            pendientes.length === 0 // true
          `,
        },
        {
          title: 'Obtener la última posición',
          code: `
            const compras = ["avena", "arroz", "papa"]
            compras.length - 1 // 2
          `,
        },
      ],
      related: ['array.bracket-access', 'array.push', 'string.length'],
      sections: ['4'],
      alsoIn: [{ file: 'wiki/tripleten/arrays.md', title: 'Arrays (TripleTen)', sections: ['5'] }],
    },
    {
      id: 'array.destructuring',
      name: 'const [a, b] = arreglo',
      aka: 'Desestructuración de arreglos',
      kind: 'syntax',
      categories: ['array'],
      actions: ['access'],
      phrases: [
        'desestructurar',
        'sacar varios elementos a la vez',
        'guardar cada elemento en su propia variable',
        'tomar las primeras posiciones',
        'omitir un elemento',
        'guardar los elementos restantes',
      ],
      summary:
        'Permite sacar elementos de un arreglo y guardarlos en variables en una sola línea. Cada variable recibe el elemento de su misma posición.',
      syntax: ['const [primero, segundo, tercero] = arreglo', 'const [primero, , tercero] = arreglo', 'const [primero, ...resto] = arreglo'],
      returns: { description: 'Crea variables con los elementos del arreglo, según su posición.' },
      tables: [
        {
          title: 'Variantes',
          headers: ['Forma', 'Qué hace'],
          rows: [
            ['const [a, b] = arreglo', 'Guarda los primeros elementos en a y en b.'],
            ['const [a, , c] = arreglo', 'Deja un espacio vacío entre comas para omitir un elemento.'],
            ['const [a, ...resto] = arreglo', 'Guarda los elementos restantes en un nuevo arreglo.'],
          ],
          codeColumns: [0],
        },
      ],
      keyPoints: [
        'Las variables se asignan por posición, no por nombre.',
        'Para omitir un elemento, deja el espacio vacío entre comas.',
        'Con ...resto se guardan los elementos que faltan en un nuevo arreglo.',
        'Si una posición no existe, la variable queda con undefined.',
        'El arreglo original no cambia.',
      ],
      examples: [
        {
          title: 'Guardar cada elemento en su propia variable',
          fromNotes: true,
          code: `
            const colores = ["azul", "rojo", "cafe"]
            const [azul, rojo, cafe] = colores

            console.log(azul) // "azul"
            console.log(cafe) // "cafe"
          `,
        },
        {
          title: 'Omitir un elemento',
          fromNotes: true,
          code: `
            const colores = ["naranja", "azul", "negro"]
            const [naranja, , negro] = colores

            console.log(naranja) // "naranja"
            console.log(negro) // "negro"
          `,
        },
        {
          title: 'Guardar los elementos restantes',
          fromNotes: true,
          code: `
            const colores = ["naranja", "azul", "negro"]
            const [naranja, ...faltantes] = colores

            console.log(naranja) // "naranja"
            console.log(faltantes) // ["azul", "negro"]
          `,
        },
        {
          title: 'Tomar solo las dos primeras posiciones',
          code: `
            const numeros = [10, 20, 30, 40]
            const [primero, segundo] = numeros

            console.log(primero) // 10
            console.log(segundo) // 20
          `,
        },
        {
          title: 'Los nombres de las variables los eliges tú',
          code: `
            const frutas = ["mango", "uva"]
            const [favorita, otra] = frutas

            console.log(favorita) // "mango"
            console.log(otra) // "uva"
          `,
        },
        {
          title: 'Cuando hay menos elementos que variables',
          code: `
            const lista = ["solo uno"]
            const [primero, segundo] = lista

            console.log(primero) // "solo uno"
            console.log(segundo) // undefined
          `,
        },
      ],
      related: ['array.bracket-access'],
      highlight: ['...'],
      sections: ['5', '6', '7'],
    },
    {
      id: 'array.push',
      name: 'push()',
      kind: 'method',
      categories: ['array'],
      actions: ['add'],
      phrases: ['agregar al final', 'añadir un elemento al final', 'meter un elemento en la lista', 'poner en la cola'],
      summary: 'Agrega uno o varios elementos al final del arreglo.',
      syntax: ['arreglo.push(elemento)', 'arreglo.push(elemento1, elemento2)'],
      parameters: [{ name: 'elementos', description: 'El o los elementos que quieres agregar, separados por comas.' }],
      returns: { type: 'number', description: 'El nuevo largo del arreglo.' },
      mutates: true,
      keyPoints: ['Modifica el arreglo original.', 'Retorna el nuevo largo, no el arreglo.'],
      examples: [
        {
          title: 'Agregar un elemento al final',
          fromNotes: true,
          code: `
            const frutas = ["manzana", "pera"]

            frutas.push("uva") // 3
            console.log(frutas) // ["manzana", "pera", "uva"]
          `,
          explanation: 'push() retorna 3, el nuevo largo, y el arreglo queda con "uva" al final.',
        },
        {
          title: 'Agregar varios elementos a la vez',
          code: `
            const numeros = [1, 2]

            numeros.push(3, 4, 5) // 5
            console.log(numeros) // [1, 2, 3, 4, 5]
          `,
        },
        {
          title: 'Llenar un arreglo vacío',
          code: `
            const tareas = []
            tareas.push("estudiar")
            tareas.push("descansar")

            console.log(tareas) // ["estudiar", "descansar"]
          `,
        },
        {
          title: 'Guardar lo que retorna',
          code: `
            const colores = ["rojo"]
            const nuevoLargo = colores.push("azul")

            console.log(nuevoLargo) // 2
          `,
        },
      ],
      related: ['array.unshift', 'array.pop', 'array.splice', 'array.concat'],
      sections: ['8'],
      alsoIn: [{ file: 'wiki/tripleten/arrays.md', title: 'Arrays (TripleTen)', sections: ['10'] }],
    },
    {
      id: 'array.unshift',
      name: 'unshift()',
      kind: 'method',
      categories: ['array'],
      actions: ['add'],
      phrases: ['agregar al inicio', 'añadir un elemento al principio', 'poner de primero'],
      summary: 'Agrega uno o varios elementos al inicio del arreglo.',
      syntax: ['arreglo.unshift(elemento)', 'arreglo.unshift(elemento1, elemento2)'],
      parameters: [{ name: 'elementos', description: 'El o los elementos que quieres agregar, separados por comas.' }],
      returns: { type: 'number', description: 'El nuevo largo del arreglo.' },
      mutates: true,
      keyPoints: ['Modifica el arreglo original.', 'Retorna el nuevo largo, no el arreglo.', 'Los demás elementos se corren una posición.'],
      examples: [
        {
          title: 'Agregar un elemento al inicio',
          fromNotes: true,
          code: `
            const frutas = ["manzana", "pera"]

            frutas.unshift("mango") // 3
            console.log(frutas) // ["mango", "manzana", "pera"]
          `,
        },
        {
          title: 'Agregar varios elementos al inicio',
          code: `
            const numeros = [3, 4]

            numeros.unshift(1, 2) // 4
            console.log(numeros) // [1, 2, 3, 4]
          `,
        },
        {
          title: 'Las posiciones de los demás elementos cambian',
          code: `
            const letras = ["b", "c"]
            console.log(letras[0]) // "b"

            letras.unshift("a")
            console.log(letras[0]) // "a"
          `,
        },
      ],
      related: ['array.push', 'array.shift'],
      sections: ['8'],
    },
    {
      id: 'array.pop',
      name: 'pop()',
      kind: 'method',
      categories: ['array'],
      actions: ['remove'],
      phrases: ['eliminar el último', 'quitar el último elemento', 'sacar el último de la lista'],
      summary: 'Elimina el último elemento del arreglo.',
      syntax: ['arreglo.pop()'],
      parameters: [],
      returns: { type: 'el elemento', description: 'El elemento que se eliminó.' },
      mutates: true,
      keyPoints: ['No recibe argumentos: siempre elimina el último.', 'Retorna el elemento eliminado, así que puedes guardarlo en una variable.'],
      examples: [
        {
          title: 'Eliminar el último elemento',
          fromNotes: true,
          code: `
            const frutas = ["manzana", "pera", "uva"]

            frutas.pop() // "uva"
            console.log(frutas) // ["manzana", "pera"]
          `,
        },
        {
          title: 'Guardar el elemento eliminado',
          code: `
            const pila = ["libro 1", "libro 2", "libro 3"]
            const ultimo = pila.pop()

            console.log(ultimo) // "libro 3"
            console.log(pila) // ["libro 1", "libro 2"]
          `,
        },
        {
          title: 'Eliminar varias veces',
          code: `
            const numeros = [1, 2, 3]
            numeros.pop()
            numeros.pop()

            console.log(numeros) // [1]
          `,
        },
      ],
      related: ['array.shift', 'array.push', 'array.splice'],
      sections: ['8'],
      alsoIn: [{ file: 'wiki/tripleten/arrays.md', title: 'Arrays (TripleTen)', sections: ['11'] }],
    },
    {
      id: 'array.shift',
      name: 'shift()',
      kind: 'method',
      categories: ['array'],
      actions: ['remove'],
      phrases: ['eliminar el primero', 'quitar el primer elemento', 'sacar el primero de la lista'],
      summary: 'Elimina el primer elemento del arreglo.',
      syntax: ['arreglo.shift()'],
      parameters: [],
      returns: { type: 'el elemento', description: 'El elemento que se eliminó.' },
      mutates: true,
      keyPoints: ['No recibe argumentos: siempre elimina el primero.', 'Los demás elementos se corren una posición hacia el inicio.'],
      examples: [
        {
          title: 'Eliminar el primer elemento',
          fromNotes: true,
          code: `
            const frutas = ["mango", "manzana", "pera"]

            frutas.shift() // "mango"
            console.log(frutas) // ["manzana", "pera"]
          `,
        },
        {
          title: 'Guardar el elemento eliminado',
          code: `
            const fila = ["Ana", "Bruno", "Carla"]
            const primero = fila.shift()

            console.log(primero) // "Ana"
            console.log(fila) // ["Bruno", "Carla"]
          `,
        },
        {
          title: 'Los demás elementos se corren una posición',
          code: `
            const letras = ["a", "b", "c"]
            letras.shift()

            console.log(letras[0]) // "b"
          `,
        },
      ],
      related: ['array.pop', 'array.unshift', 'array.splice'],
      sections: ['8'],
    },
    {
      id: 'array.splice',
      name: 'splice()',
      kind: 'method',
      categories: ['array'],
      actions: ['add', 'remove', 'replace'],
      phrases: [
        'modificar el arreglo en cualquier posición',
        'eliminar un elemento de una posición',
        'insertar en medio',
        'reemplazar un elemento',
        'quitar un elemento específico',
      ],
      summary: 'Modifica el arreglo en cualquier punto: permite eliminar elementos, añadir elementos o reemplazarlos.',
      syntax: ['arreglo.splice(inicio, cantidadAEliminar)', 'arreglo.splice(inicio, cantidadAEliminar, elemento1, elemento2)'],
      parameters: [
        { name: 'inicio', description: 'Index desde el que se quiere modificar el arreglo.' },
        { name: 'cantidadAEliminar', description: 'Cuántos elementos eliminar a partir de inicio. Usa 0 si solo quieres agregar.' },
        { name: 'elementos', optional: true, description: 'Uno o varios elementos para agregar en esa posición.' },
      ],
      returns: { type: 'array', description: 'Un arreglo con los elementos que se eliminaron (vacío si no se eliminó ninguno).' },
      mutates: true,
      keyPoints: [
        'Modifica el arreglo original.',
        'Retorna lo que eliminó, no el arreglo modificado.',
        'Su nombre se parece a slice(), pero slice() no modifica el arreglo y splice() sí.',
      ],
      examples: [
        {
          title: 'Reemplazar un elemento',
          fromNotes: true,
          code: `
            const colores = ["rojo", "azul", "verde", "negro"]

            colores.splice(1, 1, "amarillo") // ["azul"]
            console.log(colores) // ["rojo", "amarillo", "verde", "negro"]
          `,
          explanation: 'Desde la posición 1 elimina 1 elemento ("azul") y pone "amarillo" en su lugar.',
        },
        {
          title: 'Eliminar un elemento de una posición',
          code: `
            const colores = ["rojo", "azul", "verde"]

            colores.splice(1, 1) // ["azul"]
            console.log(colores) // ["rojo", "verde"]
          `,
        },
        {
          title: 'Agregar sin eliminar nada',
          code: `
            const letras = ["a", "c"]

            letras.splice(1, 0, "b") // []
            console.log(letras) // ["a", "b", "c"]
          `,
          explanation: 'Con 0 en la cantidad a eliminar, solo agrega "b" en la posición 1.',
        },
        {
          title: 'Eliminar varios elementos seguidos',
          code: `
            const numeros = [1, 2, 3, 4, 5]
            const eliminados = numeros.splice(1, 3)

            console.log(eliminados) // [2, 3, 4]
            console.log(numeros) // [1, 5]
          `,
        },
      ],
      related: ['array.slice', 'array.push', 'array.pop', 'array.shift'],
      sections: ['9'],
    },
    {
      id: 'array.concat',
      name: 'concat()',
      kind: 'method',
      categories: ['array'],
      actions: ['join'],
      phrases: ['unir arreglos', 'juntar dos listas', 'combinar arreglos'],
      summary: 'Une dos o más arreglos y retorna un nuevo arreglo.',
      syntax: ['arreglo1.concat(arreglo2)', 'arreglo1.concat(arreglo2, arreglo3)'],
      parameters: [{ name: 'arreglos', description: 'El o los arreglos que quieres unir al final del primero.' }],
      returns: { type: 'array', description: 'Un nuevo arreglo con los elementos de todos los arreglos, en orden.' },
      mutates: false,
      keyPoints: ['Los arreglos originales no cambian.', 'El orden importa: los elementos del arreglo entre paréntesis quedan al final.'],
      examples: [
        {
          title: 'Unir dos arreglos',
          fromNotes: true,
          code: `
            const numerosPares = [2, 4, 6, 8]
            const numerosImpares = [1, 3, 5, 7]

            const numeros = numerosPares.concat(numerosImpares)
            console.log(numeros) // [2, 4, 6, 8, 1, 3, 5, 7]
          `,
        },
        {
          title: 'El orden importa',
          code: `
            const numerosPares = [2, 4, 6, 8]
            const numerosImpares = [1, 3, 5, 7]

            numerosImpares.concat(numerosPares) // [1, 3, 5, 7, 2, 4, 6, 8]
          `,
        },
        {
          title: 'Unir tres arreglos',
          code: `
            const a = ["a"]
            const b = ["b"]
            const c = ["c"]

            a.concat(b, c) // ["a", "b", "c"]
          `,
        },
        {
          title: 'Los arreglos originales no cambian',
          code: `
            const lista1 = [1, 2]
            const lista2 = [3]
            const unidos = lista1.concat(lista2)

            console.log(unidos) // [1, 2, 3]
            console.log(lista1) // [1, 2]
          `,
        },
      ],
      related: ['array.push', 'array.join'],
      sections: ['10'],
    },
    {
      id: 'array.slice',
      name: 'slice()',
      kind: 'method',
      categories: ['array'],
      actions: ['cut'],
      phrases: ['cortar una parte del arreglo', 'obtener algunos elementos', 'obtener los primeros elementos', 'obtener los últimos elementos', 'copiar una parte'],
      summary: 'Corta una parte del arreglo y la retorna en un nuevo arreglo.',
      syntax: ['arreglo.slice(inicio)', 'arreglo.slice(inicio, fin)'],
      parameters: [
        {
          name: 'inicio',
          description: 'Posición donde empieza el corte. Ese elemento sí se incluye. Si es negativo, se cuenta desde el final.',
        },
        {
          name: 'fin',
          optional: true,
          description: 'Posición donde termina el corte. Ese elemento no se incluye. Si no lo pones, corta hasta el final.',
        },
      ],
      returns: { type: 'array', description: 'Un nuevo arreglo con los elementos cortados.' },
      mutates: false,
      keyPoints: [
        'El elemento de la posición fin no queda incluido.',
        'Con números negativos se cuenta desde el final.',
        'El arreglo original no cambia.',
      ],
      examples: [
        {
          title: 'Cortar una parte del arreglo',
          fromNotes: true,
          code: `
            const numeros = [1, 2, 3, 4, 5]
            const resultado = numeros.slice(1, 2)

            console.log(resultado) // [2]
          `,
          explanation: 'Empieza en la posición 1 y se detiene antes de la posición 2, por eso solo queda un elemento.',
        },
        {
          title: 'Obtener los primeros elementos',
          code: `
            const numeros = [1, 2, 3, 4, 5]
            numeros.slice(0, 3) // [1, 2, 3]
          `,
        },
        {
          title: 'Desde una posición hasta el final',
          code: `
            const numeros = [1, 2, 3, 4, 5]
            numeros.slice(2) // [3, 4, 5]
          `,
        },
        {
          title: 'Obtener los últimos elementos',
          code: `
            const numeros = [1, 2, 3, 4, 5]
            numeros.slice(-2) // [4, 5]
          `,
        },
        {
          title: 'El arreglo original no cambia',
          code: `
            const letras = ["a", "b", "c", "d"]
            const parte = letras.slice(1, 3)

            console.log(parte) // ["b", "c"]
            console.log(letras) // ["a", "b", "c", "d"]
          `,
        },
      ],
      related: ['string.slice', 'array.splice', 'array.destructuring'],
      sections: ['11'],
    },
    {
      id: 'array.includes',
      name: 'includes()',
      kind: 'method',
      categories: ['array'],
      actions: ['search'],
      phrases: ['comprobar si un elemento está en la lista', 'verificar si existe', 'saber si el arreglo contiene un valor'],
      summary: 'Permite conocer si un elemento está dentro del arreglo. Retorna true o false.',
      syntax: ['arreglo.includes(elemento)'],
      parameters: [{ name: 'elemento', description: 'El elemento que quieres comprobar.' }],
      returns: { type: 'boolean', description: 'true si el elemento está en el arreglo; false si no está.' },
      keyPoints: [
        'Solo dice si está o no; no dice en qué posición.',
        'Compara elementos completos: "osc" no es lo mismo que "oscar".',
        'Distingue mayúsculas de minúsculas.',
      ],
      examples: [
        {
          title: 'Comprobar si un elemento está',
          fromNotes: true,
          code: `
            const nombres = ["marcela", "oscar", "mauricio"]
            nombres.includes("oscar") // true
          `,
        },
        {
          title: 'Cuando el elemento no está',
          code: `
            const nombres = ["marcela", "oscar", "mauricio"]
            nombres.includes("lucia") // false
          `,
        },
        {
          title: 'Compara elementos completos',
          code: `
            const nombres = ["marcela", "oscar", "mauricio"]
            nombres.includes("osc") // false
          `,
          explanation: 'A diferencia de includes() en un string, aquí se compara cada elemento completo del arreglo.',
        },
        {
          title: 'Con números',
          code: `
            const premiados = [3, 7, 21]
            premiados.includes(7) // true
          `,
        },
        {
          title: 'Usar el resultado en una condición',
          code: `
            const invitados = ["Ana", "Luis"]

            if (invitados.includes("Ana")) {
              console.log("Ana está invitada")
            }
          `,
        },
      ],
      related: ['string.includes'],
      sections: ['12'],
    },
    {
      id: 'string.split',
      name: 'split()',
      aka: 'Convertir un string en un arreglo',
      kind: 'method',
      categories: ['string'],
      actions: ['split', 'convert'],
      converts: { from: 'string', to: 'array' },
      phrases: ['convertir un string en arreglo', 'separar un texto', 'dividir en palabras', 'separar por comas', 'obtener cada carácter'],
      summary: 'Divide el string en partes usando un separador y retorna un arreglo con esas partes.',
      syntax: ['texto.split(separador)'],
      parameters: [
        {
          name: 'separador',
          description: 'El texto que indica dónde se divide el string, por ejemplo un espacio " " o una coma ",".',
        },
      ],
      returns: { type: 'array', description: 'Un arreglo con las partes del string.' },
      mutates: false,
      keyPoints: ['El separador no aparece en el resultado.', 'Si el separador es un string vacío "", separa cada carácter.'],
      examples: [
        {
          title: 'Separar un texto por espacios',
          fromNotes: true,
          code: `
            const libro = "princesa sapo estrella"
            libro.split(" ") // ["princesa", "sapo", "estrella"]
          `,
        },
        {
          title: 'Separar por comas',
          code: `
            const colores = "rojo,verde,azul"
            colores.split(",") // ["rojo", "verde", "azul"]
          `,
        },
        {
          title: 'Separar cada carácter',
          code: `"hola".split("") // ["h", "o", "l", "a"]`,
        },
        {
          title: 'Contar las palabras de una frase',
          code: `
            const frase = "me gusta programar"
            const palabras = frase.split(" ")

            console.log(palabras.length) // 3
          `,
        },
      ],
      related: ['array.join'],
      sections: ['13'],
    },
    {
      id: 'array.join',
      name: 'join()',
      aka: 'Convertir un arreglo en un string',
      kind: 'method',
      categories: ['array'],
      actions: ['join', 'convert'],
      converts: { from: 'array', to: 'string' },
      phrases: ['convertir un arreglo en string', 'unir los elementos en un texto', 'juntar la lista en una frase'],
      summary: 'Une todos los elementos del arreglo en un solo string.',
      syntax: ['arreglo.join(separador)'],
      parameters: [{ name: 'separador', description: 'El texto que se pone entre cada elemento al unirlos.' }],
      returns: { type: 'string', description: 'Un string con todos los elementos unidos.' },
      mutates: false,
      examples: [
        {
          title: 'Unir sin separador',
          fromNotes: true,
          code: `
            const papeleria = ["lapiz", "borrador", "cajas"]
            papeleria.join("") // "lapizborradorcajas"
          `,
        },
        {
          title: 'Unir con espacios',
          code: `
            const papeleria = ["lapiz", "borrador", "cajas"]
            papeleria.join(" ") // "lapiz borrador cajas"
          `,
        },
        {
          title: 'Unir con coma y espacio',
          code: `
            const papeleria = ["lapiz", "borrador", "cajas"]
            papeleria.join(", ") // "lapiz, borrador, cajas"
          `,
        },
        {
          title: 'Ida y vuelta con split()',
          code: `
            const frase = "hola mundo"
            const palabras = frase.split(" ")
            const deNuevo = palabras.join(" ")

            console.log(palabras) // ["hola", "mundo"]
            console.log(deNuevo) // "hola mundo"
          `,
        },
      ],
      related: ['string.split', 'array.concat'],
      sections: ['14'],
    },
    {
      id: 'array.reverse',
      name: 'reverse()',
      kind: 'method',
      categories: ['array'],
      actions: ['reverse'],
      phrases: ['invertir el orden', 'revertir un arreglo', 'poner la lista al revés', 'voltear el arreglo'],
      summary: 'Invierte el orden de los elementos del arreglo.',
      syntax: ['arreglo.reverse()'],
      parameters: [],
      returns: { type: 'array', description: 'El mismo arreglo, ya invertido.' },
      mutates: true,
      keyPoints: ['Modifica el arreglo original.', 'No recibe argumentos.'],
      examples: [
        {
          title: 'Revertir un arreglo',
          fromNotes: true,
          code: `
            const numeros1 = [1, 2, 3, 4]
            numeros1.reverse()

            console.log(numeros1) // [4, 3, 2, 1]
          `,
        },
        {
          title: 'Con textos',
          code: `
            const palabras = ["uno", "dos", "tres"]
            palabras.reverse() // ["tres", "dos", "uno"]
          `,
        },
        {
          title: 'El arreglo original cambia',
          code: `
            const letras = ["a", "b", "c"]
            const invertido = letras.reverse()

            console.log(invertido) // ["c", "b", "a"]
            console.log(letras) // ["c", "b", "a"]
          `,
          explanation: 'invertido y letras muestran lo mismo porque reverse() cambió el arreglo original.',
        },
      ],
      sections: ['15'],
    },
  ],
}

export default arrays
