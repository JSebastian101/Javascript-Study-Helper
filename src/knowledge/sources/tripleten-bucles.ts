import type { KnowledgeSource } from '../model'

/**
 * Contenido de wiki/tripleten/bucles.md. Las operaciones abreviadas (++, +=)
 * enriquecen los conceptos de numbers.ts; los ejercicios están en
 * practice/pending.ts.
 */
const bucles: KnowledgeSource = {
  id: 'tripleten-bucles',
  title: 'Bucles (TripleTen)',
  file: 'wiki/tripleten/bucles.md',
  order: 70,
  concepts: [
    {
      id: 'loops.basics',
      name: 'Bucle',
      aka: 'Repetir el mismo código mientras se cumpla una condición',
      kind: 'concept',
      categories: ['loops'],
      actions: ['understand'],
      phrases: ['qué es un bucle', 'ciclo', 'repetir un código', 'iteración'],
      summary:
        'Es una estructura que repite el mismo código mientras una condición siga siendo verdadera. Los dos bucles más usados son while y for.',
      tables: [
        {
          title: 'Partes de un bucle',
          headers: ['Parte', 'Qué es'],
          rows: [
            ['Condición', 'Lo que se revisa antes de cada repetición.'],
            ['Cuerpo', 'El código que se repite.'],
            ['Iteración', 'Cada vez que se ejecuta el cuerpo.'],
          ],
        },
        {
          title: '¿while o for?',
          headers: ['Bucle', 'Cuándo usarlo'],
          rows: [
            ['while', 'Cuando no sé cuántas repeticiones hacen falta: repito hasta que se cumpla una condición.'],
            ['for', 'Cuando sé cuántas veces hay que repetir.'],
          ],
          codeColumns: [0],
        },
      ],
      examples: [
        {
          title: 'El mismo conteo con while y con for',
          code: `
            let n = 1
            while (n <= 3) {
              console.log(n)
              n++
            }
            // muestra: 1, 2, 3

            for (let i = 1; i <= 3; i++) {
              console.log(i)
            }
            // muestra: 1, 2, 3
          `,
        },
        {
          title: 'Contar las iteraciones',
          code: `
            let iteraciones = 0

            for (let i = 0; i < 4; i++) {
              iteraciones++
            }

            console.log(iteraciones) // 4
          `,
          explanation: 'El cuerpo se ejecutó 4 veces: con i valiendo 0, 1, 2 y 3.',
        },
      ],
      related: ['loops.while', 'loops.for', 'loops.for-of'],
      highlight: [],
      sections: ['4', '19'],
    },
    {
      id: 'loops.while',
      name: 'while',
      aka: 'Repetir mientras una condición sea verdadera',
      kind: 'statement',
      categories: ['loops'],
      actions: ['repeat'],
      phrases: ['repetir mientras', 'repetir hasta que', 'no sé cuántas veces hay que repetir', 'repetir hasta llegar a una meta'],
      summary: 'Repite el cuerpo mientras la condición sea true. Se usa cuando no sabes cuántas repeticiones hacen falta.',
      syntax: [
        `
          while (condición) {
            // cuerpo
          }
        `,
      ],
      keyPoints: [
        'La condición se revisa antes de cada repetición.',
        'La condición tiene que dejar de cumplirse en algún momento; si no, el bucle se repite para siempre y el navegador se bloquea.',
        'Por eso, dentro del cuerpo normalmente se cambia la variable de la condición, por ejemplo con ++, -- o +=.',
        'Úsalo cuando no sabes cuántas repeticiones hacen falta; si lo sabes, usa for.',
      ],
      examples: [
        {
          title: 'Mostrar los números pares del 10 al 20',
          fromNotes: true,
          code: `
            let number = 10

            while (number <= 20) {
              console.log(number)
              number += 2
            }
            // muestra: 10, 12, 14, 16, 18, 20

            console.log(number) // 22
          `,
          explanation: 'Después de 6 iteraciones number vale 22, la condición deja de cumplirse y el bucle termina.',
        },
        {
          title: 'Repetir hasta que un contador llegue a 0',
          fromNotes: true,
          code: `
            let orders = 5

            while (orders > 0) {
              console.log(\`Procesando pedido... faltan \${orders}\`)
              orders--
            }

            console.log("¡Todos los pedidos han sido procesados!")
            console.log(orders) // 0
          `,
          explanation: 'Mientras queden pedidos, procesa uno y resta 1 al contador. Cuando orders llega a 0, el bucle se detiene solo.',
        },
        {
          title: 'El orden dentro del cuerpo importa',
          fromNotes: true,
          code: `
            let i = 0

            while (i < 5) {
              i++
              console.log(i)
            }
            // muestra: 1, 2, 3, 4, 5
          `,
          explanation: 'La última iteración empieza con i = 4, pero i aumenta antes de mostrarse, por eso el último número es 5.',
        },
        {
          title: 'Si la condición es false desde el principio',
          code: `
            let intentos = 10

            while (intentos < 3) {
              console.log("Esto no se muestra")
              intentos++
            }

            console.log(intentos) // 10
          `,
          explanation: 'La condición se revisa antes de la primera repetición, así que el cuerpo no se ejecuta ni una vez.',
        },
      ],
      related: ['loops.for', 'loops.basics', 'loops.break', 'number.increment'],
      highlight: ['while'],
      sections: ['5', '6', '7', '19'],
    },
    {
      id: 'loops.for',
      name: 'for',
      aka: 'Repetir un número determinado de veces',
      kind: 'statement',
      categories: ['loops'],
      actions: ['repeat'],
      phrases: ['repetir un número de veces', 'contar desde un número hasta otro', 'sé cuántas veces hay que repetir', 'usar un contador'],
      summary:
        'Repite el cuerpo un número determinado de veces. Entre paréntesis lleva tres partes separadas por punto y coma: inicialización, condición e incremento.',
      syntax: [
        `
          for (inicialización; condición; incremento) {
            // cuerpo
          }
        `,
      ],
      tables: [
        {
          title: 'Las tres partes',
          headers: ['Parte', 'Ejemplo', 'Qué hace'],
          rows: [
            ['Inicialización', 'let i = 0', 'Crea la variable contador (normalmente i) con su valor inicial.'],
            ['Condición', 'i <= 100', 'Mientras sea verdadera, el bucle sigue repitiéndose.'],
            ['Incremento', 'i++', 'Cómo cambia el contador después de cada iteración.'],
          ],
          codeColumns: [1],
        },
      ],
      keyPoints: [
        'Úsalo cuando sabes cuántas veces hay que repetir; si no lo sabes, usa while.',
        'Con <= el último número se incluye; con < no.',
        'El incremento no tiene que ser i++: también puede ser i--, i += 2…',
        'La variable i declarada con let dentro del for solo existe dentro del bucle.',
      ],
      examples: [
        {
          title: 'Mostrar los números del 0 al 100',
          fromNotes: true,
          code: `
            for (let i = 0; i <= 100; i++) {
              console.log(i)
            }
            // muestra: 0, 1, 2… hasta 100
          `,
        },
        {
          title: 'Con <= se incluye el último número',
          fromNotes: true,
          code: `
            for (let i = 1; i <= 3; i++) {
              console.log(i)
            }
            // muestra: 1, 2, 3
          `,
          explanation: 'Empieza en 1 e incluye el 3, así que el último número que muestra es 3.',
        },
        {
          title: 'Con < el último número no se incluye',
          code: `
            for (let i = 1; i < 3; i++) {
              console.log(i)
            }
            // muestra: 1, 2
          `,
        },
        {
          title: 'Contar hacia atrás',
          code: `
            for (let i = 3; i >= 1; i--) {
              console.log(i)
            }
            // muestra: 3, 2, 1
          `,
        },
      ],
      related: ['loops.while', 'loops.for-of', 'array.for-loop', 'loops.basics', 'variables.block-scope'],
      highlight: ['for'],
      sections: ['8', '9', '19'],
      alsoIn: [{ file: 'wiki/tripleten/depuracion.md', title: 'Depuración (TripleTen)', sections: ['11'] }],
    },
    {
      id: 'loops.if-inside',
      name: 'if dentro de un bucle',
      aka: 'Hacer algo solo en algunas repeticiones',
      kind: 'pattern',
      categories: ['loops', 'logic'],
      actions: ['decide'],
      phrases: ['hacer algo solo cuando se cumple una condición', 'repetir pero solo con algunos', 'mostrar solo algunos valores', 'omitir algunos elementos'],
      summary:
        'Combina un bucle con un if para repetir un código pero hacer algo solo cuando se cumple una condición: mostrar solo algunos valores, hacer algo especial con uno, omitir elementos, etc.',
      syntax: [
        `
          for (let i = inicio; i <= fin; i++) {
            if (condición) {
              // solo se ejecuta cuando la condición es true
            }
          }
        `,
      ],
      keyPoints: ['El bucle se repite todas las veces, pero el código del if solo se ejecuta cuando la condición es true.'],
      examples: [
        {
          title: 'Hacer algo especial con un solo valor',
          fromNotes: true,
          code: `
            for (let i = 1; i <= 5; i++) {
              if (i === 3) {
                console.log("¡Encontrado el número 3!")
              }
            }
            // muestra el mensaje una sola vez
          `,
          explanation: 'El bucle se repite 5 veces, pero el mensaje aparece una sola vez.',
        },
        {
          title: 'Mostrar solo los números impares',
          fromNotes: true,
          code: `
            for (let i = 1; i <= 5; i++) {
              if (i % 2 !== 0) {
                console.log(i)
              }
            }
            // muestra: 1, 3, 5
          `,
          explanation: 'i % 2 !== 0 solo es verdadero con los números impares.',
        },
        {
          title: 'Contar cuántas veces se cumple la condición',
          code: `
            const edades = [12, 25, 17, 40]
            let mayores = 0

            for (const edad of edades) {
              if (edad >= 18) {
                mayores++
              }
            }

            console.log(mayores) // 2
          `,
        },
      ],
      related: ['loops.for', 'logic.if-else', 'loops.continue', 'number.modulo'],
      highlight: ['for', 'if'],
      sections: ['14', '15'],
    },
    {
      id: 'loops.break',
      name: 'break',
      aka: 'Detener el bucle por completo',
      kind: 'statement',
      categories: ['loops'],
      actions: ['stop'],
      phrases: ['detener el bucle', 'salir del bucle', 'terminar antes de tiempo', 'parar cuando se cumpla algo'],
      summary: 'Detiene el bucle por completo: las iteraciones que faltaban ya no se ejecutan.',
      syntax: ['break'],
      keyPoints: [
        'Normalmente va dentro de un if, para detener el bucle solo cuando se cumple una condición.',
        'No es lo mismo que continue: continue solo salta la iteración actual y el bucle sigue.',
      ],
      examples: [
        {
          title: 'Detener el bucle al llegar a un número',
          fromNotes: true,
          code: `
            for (let i = 0; i <= 10; i++) {
              if (i === 5) {
                break
              }
              console.log(i)
            }
            // muestra: 0, 1, 2, 3, 4
          `,
        },
        {
          title: 'El bucle termina antes de lo previsto',
          code: `
            let vueltas = 0

            for (let i = 1; i <= 100; i++) {
              vueltas++
              if (i === 3) {
                break
              }
            }

            console.log(vueltas) // 3
          `,
          explanation: 'Aunque el for podía llegar a 100, break lo detuvo en la tercera iteración.',
        },
        {
          title: 'Detener un while',
          code: `
            let numero = 1

            while (numero <= 10) {
              if (numero * numero > 20) {
                break
              }
              numero++
            }

            console.log(numero) // 5
          `,
        },
      ],
      related: ['loops.continue', 'loops.for', 'loops.while'],
      highlight: ['break'],
      sections: ['16'],
    },
    {
      id: 'loops.continue',
      name: 'continue',
      aka: 'Saltar a la siguiente iteración',
      kind: 'statement',
      categories: ['loops'],
      actions: ['stop'],
      phrases: ['saltar una iteración', 'omitir un valor', 'pasar al siguiente', 'saltar una canción'],
      summary:
        'Salta el resto de la iteración actual y pasa a la siguiente, como saltar una canción en una lista de reproducción. El bucle no se detiene.',
      syntax: ['continue'],
      keyPoints: [
        'Solo se salta el código que está después de continue, en esa iteración.',
        'El código que está antes de continue sí se ejecuta.',
        'No es lo mismo que break: break detiene el bucle por completo.',
      ],
      examples: [
        {
          title: 'Saltar un número',
          fromNotes: true,
          code: `
            for (let i = 0; i <= 10; i++) {
              if (i === 5) {
                continue
              }
              console.log(i)
            }
            // muestra: 0, 1, 2, 3, 4, 6, 7, 8, 9, 10
          `,
        },
        {
          title: 'Lo que está antes de continue sí se ejecuta',
          fromNotes: true,
          code: `
            let llamadas = 0

            for (let i = 0; i <= 5; i++) {
              console.log(i)
              llamadas++
              if (i === 2) {
                continue
              }
            }

            console.log(llamadas) // 6
          `,
          explanation: 'console.log() está antes del continue, así que el 2 también se muestra: se llama 6 veces.',
        },
      ],
      related: ['loops.break', 'loops.if-inside'],
      highlight: ['continue'],
      sections: ['16', '17'],
    },
    {
      id: 'loops.accumulator',
      name: 'Acumulador',
      aka: 'Acumular un valor dentro de un bucle',
      kind: 'pattern',
      categories: ['loops'],
      actions: ['update'],
      phrases: ['acumular en un bucle', 'llevar un total', 'ir sumando en cada vuelta', 'juntar un resultado'],
      summary:
        'Es una variable que se actualiza en cada iteración, como una alcancía a la que se le agrega una moneda cada día. Sirve para totales, puntajes, tiempo, intereses o incluso strings.',
      syntax: [
        `
          let acumulador = valorInicial

          for (…) {
            acumulador += valor
          }
        `,
      ],
      keyPoints: [
        'La variable se declara antes del bucle, con let y con un valor inicial.',
        'No se crea una variable nueva en cada iteración: se va actualizando la misma.',
      ],
      examples: [
        {
          title: 'Una alcancía que crece cada día',
          code: `
            let alcancia = 0

            for (let dia = 1; dia <= 7; dia++) {
              alcancia += 1000
            }

            console.log(alcancia) // 7000
          `,
        },
        {
          title: 'Acumular un texto',
          code: `
            let linea = ""

            for (let i = 0; i < 3; i++) {
              linea += "-*"
            }

            console.log(linea) // "-*-*-*"
          `,
        },
        {
          title: 'Si la variable se declara dentro del bucle, no acumula',
          code: `
            for (let dia = 1; dia <= 3; dia++) {
              let alcancia = 0
              alcancia += 1000
              console.log(alcancia)
            }
            // muestra: 1000, 1000, 1000
          `,
          explanation: 'En cada iteración se crea una alcancía nueva que empieza en 0.',
        },
      ],
      related: ['number.compound-assignment', 'number.increment', 'loops.for', 'loops.while'],
      highlight: ['+='],
      sections: ['18'],
    },
  ],
}

export default bucles
