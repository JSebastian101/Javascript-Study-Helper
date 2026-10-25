import type { KnowledgeSource } from '../model'

/**
 * Contenido de wiki/tripleten/arrays.md. Crear, acceder, length, push y pop
 * enriquecen los conceptos de arrays.ts; los ejercicios están en
 * practice/pending.ts.
 */
const arrays: KnowledgeSource = {
  id: 'tripleten-arrays',
  title: 'Arrays (TripleTen)',
  file: 'wiki/tripleten/arrays.md',
  order: 80,
  concepts: [
    {
      id: 'array.for-loop',
      name: 'Recorrer un arreglo con for',
      aka: 'Usar el índice i desde 0 hasta el último elemento',
      kind: 'pattern',
      categories: ['array', 'loops'],
      actions: ['iterate'],
      phrases: ['recorrer un arreglo', 'pasar por cada elemento', 'hacer algo con cada elemento', 'recorrer con el índice'],
      summary: 'Usa un bucle for con el índice i, desde 0 hasta el último elemento, para pasar por cada elemento del arreglo.',
      syntax: [
        `
          for (let i = 0; i < arreglo.length; i++) {
            // arreglo[i] es el elemento de esta iteración
          }
        `,
      ],
      keyPoints: [
        'La condición es i < arreglo.length, con <. Con <= el bucle da una vuelta de más y el último valor es undefined.',
        'Da el elemento (arreglo[i]) y también su posición (i).',
        'Si no necesitas la posición, for...of es más corto.',
      ],
      examples: [
        {
          title: 'Hacer algo con cada elemento',
          fromNotes: true,
          code: `
            const students = ["Isabel", "Elisa", "Tomás"]

            for (let i = 0; i < students.length; i++) {
              console.log("¡Te damos la bienvenida a TripleTen, " + students[i] + "!")
            }
            // muestra un mensaje para cada estudiante
          `,
        },
        {
          title: 'Usar la posición y el elemento a la vez',
          code: `
            const tareas = ["leer", "escribir", "repasar"]

            for (let i = 0; i < tareas.length; i++) {
              console.log(\`\${i + 1}. \${tareas[i]}\`)
            }
            // muestra: 1. leer, 2. escribir, 3. repasar
          `,
          explanation: 'Se suma 1 a la posición para numerar desde 1, porque las posiciones empiezan en 0.',
        },
        {
          title: 'Con <= el bucle da una vuelta de más',
          fromNotes: true,
          code: `
            const temps = [32, 50, 68]

            for (let i = 0; i <= temps.length; i++) {
              console.log(i, temps[i])
            }
            // muestra: 0 32, 1 50, 2 68 y 3 undefined
          `,
          explanation: 'temps tiene 3 elementos, así que la última posición es 2. Con <=, i llega a 3 y temps[3] es undefined.',
        },
      ],
      related: ['loops.for', 'loops.for-of', 'array.length', 'array.bracket-access'],
      highlight: ['for', 'length'],
      sections: ['6'],
      alsoIn: [
        { file: 'wiki/tripleten/funciones.md', title: 'Funciones (TripleTen)', sections: ['11'] },
        { file: 'wiki/tripleten/depuracion.md', title: 'Depuración (TripleTen)', sections: ['2'] },
      ],
    },
    {
      id: 'loops.for-of',
      name: 'for...of',
      aka: 'Recorrer cada elemento sin usar el índice',
      kind: 'statement',
      categories: ['loops', 'array'],
      actions: ['iterate'],
      phrases: ['recorrer cada elemento', 'para cada elemento de la lista', 'recorrer sin índice'],
      summary:
        'Recorre directamente cada elemento del arreglo, sin necesidad de una variable para el índice. Su sintaxis es más corta que la del for clásico.',
      syntax: [
        `
          for (let elemento of arreglo) {
            // elemento es el valor de esta iteración
          }
        `,
      ],
      keyPoints: [
        'En cada iteración, la variable recibe el siguiente elemento del arreglo.',
        'La variable se puede declarar con let o con const.',
        'No da la posición del elemento. Si la necesitas (por ejemplo, para numerar), usa el for clásico.',
      ],
      examples: [
        {
          title: 'Hacer algo con cada elemento',
          fromNotes: true,
          code: `
            const students = ["Isabel", "Elisa", "Tomás"]

            for (let student of students) {
              console.log("¡Te damos la bienvenida a TripleTen, " + student + "!")
            }
            // muestra un mensaje para cada estudiante
          `,
        },
        {
          title: 'Declarar la variable con const',
          code: `
            const colores = ["rojo", "verde"]

            for (const color of colores) {
              console.log(color.toUpperCase())
            }
            // muestra: ROJO, VERDE
          `,
        },
        {
          title: 'Lo mismo con for y con for...of',
          code: `
            const numeros = [10, 20, 30]

            for (let i = 0; i < numeros.length; i++) {
              console.log(numeros[i])
            }

            for (const numero of numeros) {
              console.log(numero)
            }
            // los dos muestran: 10, 20, 30
          `,
          explanation: 'for...of no necesita i ni length: la variable numero ya es cada elemento.',
        },
      ],
      related: ['array.for-loop', 'loops.for', 'array.nested'],
      highlight: ['for', 'of'],
      sections: ['7', '16'],
      alsoIn: [{ file: 'wiki/tripleten/funciones.md', title: 'Funciones (TripleTen)', sections: ['11'] }],
    },
    {
      id: 'array.min-loop',
      name: 'Buscar el mínimo con un bucle',
      aka: 'Comparar cada elemento con el menor encontrado hasta ahora',
      kind: 'pattern',
      categories: ['array'],
      actions: ['min-max'],
      phrases: ['encontrar el número más pequeño de un arreglo', 'valor mínimo de una lista', 'valor máximo de una lista'],
      summary:
        'Guarda el primer elemento como mínimo provisional y recorre el arreglo: si encuentra un número menor que el mínimo actual, lo guarda como nuevo mínimo.',
      syntax: [
        `
          let minimum = arreglo[0]

          for (let elemento of arreglo) {
            if (elemento < minimum) {
              minimum = elemento
            }
          }
        `,
      ],
      keyPoints: [
        'Se empieza con el primer elemento del arreglo como mínimo provisional.',
        'Para encontrar el máximo se usa la misma idea, cambiando la comparación por >.',
      ],
      examples: [
        {
          title: 'Encontrar el mínimo',
          fromNotes: true,
          code: `
            const numbers = [8, 14, 5, 3, 20]
            let minimum = numbers[0]

            for (let number of numbers) {
              if (number < minimum) {
                minimum = number
              }
            }

            console.log(minimum) // 3
          `,
        },
        {
          title: 'Encontrar el máximo cambiando < por >',
          code: `
            const numbers = [8, 14, 5, 3, 20]
            let maximum = numbers[0]

            for (let number of numbers) {
              if (number > maximum) {
                maximum = number
              }
            }

            console.log(maximum) // 20
          `,
        },
      ],
      related: ['loops.for-of', 'logic.less', 'number.math-min', 'number.math-max'],
      highlight: ['<', '>'],
      sections: ['8'],
    },
    {
      id: 'array.nested',
      name: 'Arreglo anidado',
      aka: 'Un arreglo que contiene otros arreglos',
      kind: 'concept',
      categories: ['array'],
      actions: ['create', 'access', 'iterate'],
      phrases: ['arreglo dentro de otro', 'guardar datos como una tabla', 'filas y columnas', 'acceder con dos índices'],
      summary: 'Es un arreglo que contiene otros arreglos. Sirve para guardar varios datos de cada elemento, como si fuera una tabla.',
      syntax: ['arreglo[fila][columna]'],
      keyPoints: [
        'Se accede con dos índices: el primero elige el arreglo interno (la fila) y el segundo, el elemento dentro de él (la columna).',
        'Se recorre igual que un arreglo normal; la diferencia es que cada elemento es otro arreglo.',
      ],
      examples: [
        {
          title: 'Guardar varios datos de cada elemento',
          fromNotes: true,
          code: `
            let students = [
              ["Isabel", "Santos", 32],
              ["Elisa", "Gonzalez", 24],
              ["Tomás", "Pérez", 41]
            ]

            students.length // 3
          `,
          explanation: 'Hay 3 elementos, y cada uno es un arreglo con nombre, apellido y edad.',
        },
        {
          title: 'Acceder con dos índices',
          fromNotes: true,
          code: `
            let students = [
              ["Isabel", "Santos", 32],
              ["Elisa", "Gonzalez", 24],
              ["Tomás", "Pérez", 41]
            ]

            students[0] // ["Isabel", "Santos", 32]
            students[0][1] // "Santos"
            students[2][2] // 41
          `,
        },
        {
          title: 'Recorrer con for',
          fromNotes: true,
          code: `
            let students = [
              ["Isabel", "Santos", 32],
              ["Elisa", "Gonzalez", 24]
            ]

            for (let i = 0; i < students.length; i++) {
              console.log(\`¡Te damos la bienvenida, \${students[i][0]} \${students[i][1]}!\`)
            }
            // muestra: ¡Te damos la bienvenida, Isabel Santos! y ¡Te damos la bienvenida, Elisa Gonzalez!
          `,
        },
        {
          title: 'Recorrer con for...of',
          fromNotes: true,
          code: `
            let students = [
              ["Isabel", "Santos", 32],
              ["Elisa", "Gonzalez", 24]
            ]

            for (let student of students) {
              console.log(\`¡Te damos la bienvenida, \${student[0]} \${student[1]}!\`)
            }
            // muestra lo mismo que con for
          `,
          explanation: 'Los dos hacen lo mismo; for...of es un poco más fácil de leer.',
        },
      ],
      related: ['array.bracket-access', 'loops.for-of', 'array.for-loop'],
      highlight: [],
      sections: ['14', '15', '16'],
    },
  ],
}

export default arrays
