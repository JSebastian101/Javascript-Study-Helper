import type { KnowledgeSource } from '../model'

/** Contenido de wiki/tripleten/depuracion.md. */
const depuracion: KnowledgeSource = {
  id: 'tripleten-depuracion',
  title: 'Depuración (TripleTen)',
  file: 'wiki/tripleten/depuracion.md',
  order: 100,
  concepts: [
    {
      id: 'debugging.console',
      name: 'Consola del navegador',
      aka: 'Un laboratorio para probar código',
      kind: 'concept',
      categories: ['debugging'],
      actions: ['understand', 'inspect'],
      phrases: ['abrir la consola', 'probar código', 'DevTools', 'dónde veo los errores'],
      summary:
        'La consola es como un laboratorio: allí puedes escribir y probar cualquier código JavaScript. Se ejecuta en el mismo entorno que la página, como si estuviera dentro de una etiqueta <script>.',
      tables: [
        {
          title: 'Cómo abrirla',
          headers: ['Sistema', 'Atajo'],
          rows: [
            ['Windows y Linux', 'Ctrl + Shift + I'],
            ['Mac', 'Cmd + Option + I'],
          ],
        },
      ],
      keyPoints: [
        'El atajo abre las DevTools; después se elige la pestaña Consola (Console).',
        'Ahí aparecen los mensajes de console.log() y los errores, en rojo.',
      ],
      examples: [
        {
          title: 'Probar una expresión',
          code: `
            2 + 3 // 5
            "hola".toUpperCase() // "HOLA"
          `,
          explanation: 'Al escribir una expresión en la consola y presionar Enter, se muestra su resultado.',
        },
        {
          title: 'Probar varias líneas de código',
          code: `
            let total = 0
            total += 10
            total += 5

            console.log(total) // 15
          `,
        },
      ],
      related: ['debugging.console-log', 'debugging.error-message'],
      highlight: [],
      sections: ['1'],
    },
    {
      id: 'debugging.console-log',
      name: 'console.log()',
      kind: 'method',
      categories: ['debugging'],
      actions: ['inspect'],
      phrases: ['mostrar un valor en la consola', 'ver qué vale una variable', 'registrar valores', 'encontrar un error de lógica'],
      summary:
        'Muestra valores en la consola. Si lo pones dentro del código, te deja ver los valores mientras se ejecuta y encontrar en qué paso algo sale mal.',
      syntax: ['console.log(valor)', 'console.log("etiqueta:", valor)'],
      parameters: [{ name: 'valores', description: 'Uno o varios valores para mostrar, separados por comas.' }],
      returns: { type: 'undefined', description: 'No devuelve nada: solo muestra los valores en la consola.' },
      keyPoints: [
        'Mostrar solo el resultado final dice que hay un error, pero no dónde. Mostrar valores dentro del código (por ejemplo, en cada iteración de un bucle) ayuda a ver en qué paso falla.',
        'Se pueden mostrar varios valores separados por comas, con un texto que diga qué es cada uno.',
      ],
      examples: [
        {
          title: 'Ver un valor en la consola',
          code: `
            const total = 10 * 3
            console.log(total) // 30
          `,
        },
        {
          title: 'Mostrar varios valores con etiquetas',
          code: `
            const nombre = "Jeni"
            const edad = 25

            console.log("nombre:", nombre, "edad:", edad)
            // muestra: nombre: Jeni edad: 25
          `,
        },
        {
          title: 'Encontrar un error de lógica dentro de un bucle',
          fromNotes: true,
          code: `
            function convertTemps(temps) {
              const result = []
              for (let i = 0; i <= temps.length; i++) {
                console.log("i:", i, "temps[i]:", temps[i]) // registro agregado
                const celsius = (temps[i] - 32) * 5 / 9
                result.push(celsius)
              }
              return result
            }

            convertTemps([32, 50, 68]) // [0, 10, 20, NaN]
            // i: 0 temps[i]: 32
            // i: 1 temps[i]: 50
            // i: 2 temps[i]: 68
            // i: 3 temps[i]: undefined
          `,
          explanation:
            'El registro muestra que el bucle da una vuelta de más: por el <=, llega a i = 3, y temps[3] es undefined. La solución es cambiar la condición a i < temps.length.',
        },
      ],
      related: ['debugging.debugger', 'debugging.console', 'array.for-loop'],
      sections: ['2'],
    },
    {
      id: 'debugging.error-message',
      name: 'Mensaje de error',
      aka: 'Tipo, mensaje y ubicación',
      kind: 'concept',
      categories: ['debugging'],
      actions: ['fix-error', 'understand'],
      phrases: ['mensaje en rojo', 'leer un error', 'excepción', 'en qué línea está el error'],
      summary:
        'Un error (o excepción) es un mensaje en rojo que aparece en la consola cuando el navegador encuentra código que no entiende o que no puede ejecutar. Tiene tres partes: el tipo de error, el mensaje y la ubicación.',
      tables: [
        {
          title: 'Partes del mensaje',
          headers: ['Parte', 'Ejemplo', 'Qué dice'],
          rows: [
            ['Tipo de error', 'ReferenceError', 'Qué clase de problema es. ReferenceError: se usa una variable o función que no existe.'],
            ['Mensaje', 'myVariable is not defined', 'Qué pasó exactamente: la variable no se creó.'],
            ['Ubicación', 'script.js:42', 'El archivo y la línea. A veces hay un segundo número (:42:12), que indica el carácter dentro de esa línea.'],
          ],
          codeColumns: [1],
        },
      ],
      keyPoints: [
        'Antes de corregirlo, pregúntate: ¿qué tipo de error es?, ¿en qué archivo y en qué línea ocurrió? y ¿qué dice el mensaje sobre el estado del programa en ese momento?',
      ],
      examples: [
        {
          title: 'Usar una variable que no existe',
          fromNotes: true,
          throws: 'ReferenceError',
          code: `
            console.log(myVariable)
            // Uncaught ReferenceError: myVariable is not defined        script.js:42
          `,
          explanation: 'Tipo: ReferenceError. Mensaje: myVariable is not defined. Ubicación: línea 42 del archivo script.js.',
        },
        {
          title: 'Leer las partes de otro error',
          throws: 'TypeError',
          code: `
            let hut = "Refugio"
            hut("Ratón")
            // Uncaught TypeError: hut is not a function
          `,
          explanation: 'Tipo: TypeError. Mensaje: hut is not a function, es decir, se usó como función algo que no lo es.',
        },
      ],
      related: ['debugging.syntax-error', 'debugging.reference-error', 'debugging.type-error', 'debugging.console'],
      highlight: [],
      sections: ['3', '4'],
    },
    {
      id: 'debugging.syntax-error',
      name: 'SyntaxError',
      aka: 'Error de sintaxis: el código está mal escrito',
      kind: 'concept',
      categories: ['debugging'],
      actions: ['fix-error'],
      phrases: ['código mal escrito', 'sobra o falta un carácter', 'Unexpected token'],
      summary:
        'Es un error de sintaxis: el código está mal escrito, por ejemplo tiene un carácter de más o le falta algo. El programa ni siquiera llega a ejecutarse.',
      keyPoints: ['El mensaje "Unexpected token" dice qué carácter o palabra no esperaba JavaScript en ese lugar.'],
      examples: [
        {
          title: 'Sobra un paréntesis de cierre',
          fromNotes: true,
          throws: 'SyntaxError',
          code: `
            function bugFunction(sum) {
              return sum + sum
            });
            // Uncaught SyntaxError: Unexpected token ')'
          `,
        },
        {
          title: 'Un punto y coma antes de else',
          fromNotes: true,
          throws: 'SyntaxError',
          code: `
            if (true) {
              console.log("Todo es correcto")
            }; else {
              console.log("Algo está mal")
            }
            // Uncaught SyntaxError: Unexpected token 'else'
          `,
          explanation: 'El punto y coma antes de else hace que JavaScript piense que el if ya terminó, y no entiende qué hace ahí el else.',
        },
      ],
      related: ['debugging.error-message', 'debugging.reference-error', 'debugging.type-error', 'logic.if-else'],
      highlight: [],
      sections: ['5'],
    },
    {
      id: 'debugging.reference-error',
      name: 'ReferenceError',
      aka: 'Se usa algo que no existe',
      kind: 'concept',
      categories: ['debugging'],
      actions: ['fix-error'],
      phrases: ['is not defined', 'una variable que no existe', 'un nombre mal escrito'],
      summary:
        'Aparece cuando usas una variable que no está declarada o que no está disponible en ese lugar del código, o cuando llamas a una función que no existe.',
      keyPoints: [
        'El mensaje dice "… is not defined".',
        'Revisa si el nombre está bien escrito: una letra de más o de menos basta para que JavaScript no lo encuentre.',
        'También aparece al usar una variable declarada con let fuera del bloque donde se declaró.',
      ],
      examples: [
        {
          title: 'Un nombre de función mal escrito',
          fromNotes: true,
          throws: 'ReferenceError',
          code: `
            function numberFunc(num) {
              if (num > 0) {
                return num
              } else if (num < 0) {
                return -num
              } else {
                return 0
              }
            }

            numdberFnc(12)
            // Uncaught ReferenceError: numdberFnc is not defined
          `,
          explanation: 'Al llamarla se escribió numdberFnc en lugar de numberFunc.',
        },
        {
          title: 'Una variable que no se declaró',
          throws: 'ReferenceError',
          code: `
            const total = 100
            console.log(totla)
            // Uncaught ReferenceError: totla is not defined
          `,
        },
        {
          title: 'Usar una variable fuera de su bloque',
          fromNotes: true,
          throws: 'ReferenceError',
          code: `
            function countToNumber(num) {
              for (let i = 0; i <= num; i++) {
                console.log(i)
              }
              return i
            }

            countToNumber(5)
            // Uncaught ReferenceError: i is not defined
          `,
          explanation: 'i se declaró con let dentro del for, así que solo existe dentro de ese bloque.',
        },
      ],
      related: ['debugging.error-message', 'variables.block-scope', 'debugging.type-error'],
      highlight: [],
      sections: ['6', '11'],
    },
    {
      id: 'debugging.type-error',
      name: 'TypeError',
      aka: 'Un valor se usa de una forma que no corresponde a su tipo',
      kind: 'concept',
      categories: ['debugging'],
      actions: ['fix-error'],
      phrases: ['is not a function', 'Cannot read properties of undefined', 'usar un valor de forma incorrecta'],
      summary:
        'Aparece cuando un valor se usa de una forma que no corresponde a su tipo: por ejemplo, al llamar como función algo que no lo es, o al leer una propiedad de un valor que no la tiene.',
      keyPoints: [
        '"… is not a function": se están poniendo paréntesis después de algo que no es una función.',
        '"Cannot read properties of undefined": se intenta leer una propiedad (como length) de un valor undefined, que no tiene propiedades.',
        'También aparece al intentar reasignar una constante.',
      ],
      examples: [
        {
          title: 'Llamar como función algo que no lo es',
          fromNotes: true,
          throws: 'TypeError',
          code: `
            let hut = "Refugio"
            let mouse = hut("Ratón")
            // Uncaught TypeError: hut is not a function
          `,
        },
        {
          title: 'Leer una propiedad de undefined',
          fromNotes: true,
          throws: 'TypeError',
          code: `
            let string
            string.length
            // Uncaught TypeError: Cannot read properties of undefined (reading 'length')
          `,
          explanation: 'string se declaró pero nunca recibió un valor, así que es undefined, y undefined no tiene propiedades.',
        },
        {
          title: 'Reasignar una constante',
          throws: 'TypeError',
          code: `
            const MAX_USERS = 100
            MAX_USERS = 200
            // Uncaught TypeError: Assignment to constant variable.
          `,
        },
      ],
      related: ['debugging.error-message', 'debugging.reference-error', 'variables.undefined', 'variables.const'],
      highlight: [],
      sections: ['7'],
    },
    {
      id: 'debugging.debugger',
      name: 'debugger',
      aka: 'Pausar el código para revisarlo paso a paso',
      kind: 'statement',
      categories: ['debugging'],
      actions: ['inspect'],
      phrases: ['pausar el código', 'revisar paso a paso', 'usar el depurador', 'ver las variables en un punto del código'],
      summary:
        'Pausa la ejecución en el lugar donde la escribes y abre el depurador, una herramienta del navegador para revisar el código paso a paso. Es más práctico que console.log() cuando hay muchas variables o no sabes qué valores revisar.',
      syntax: ['debugger'],
      tables: [
        {
          title: 'Partes del panel del depurador',
          headers: ['Parte', 'Para qué sirve'],
          rows: [
            ['Navegador de archivos', 'Abrir cualquier archivo del proyecto.'],
            ['Editor de código', 'Ver el código del archivo abierto.'],
            [
              'Pila de llamadas (Call stack)',
              'La lista de funciones que se llamaron hasta llegar al punto actual, con la más reciente arriba. Ayuda a entender cómo llegó el programa al lugar del error.',
            ],
            ['Alcance (Scope)', 'Las variables disponibles en ese punto y sus valores.'],
          ],
        },
        {
          title: 'Avanzar paso a paso',
          headers: ['Acción', 'Qué hace'],
          rows: [
            ['Step over (F10)', 'Ejecuta la línea actual y pasa a la siguiente.'],
            ['Pasar el cursor sobre una variable', 'Muestra su valor en ese momento.'],
          ],
        },
      ],
      keyPoints: [
        'Solo se pausa con las DevTools abiertas. Al pausarse, se abre la pestaña Fuentes (Sources); si no aparece, recarga la página con las DevTools abiertas.',
        'Antes de publicar el sitio hay que borrar todas las sentencias debugger.',
      ],
      examples: [
        {
          title: 'Pausar al empezar una función',
          fromNotes: true,
          code: `
            function logCharacters(str) {
              debugger
              for (let index = 0; index < str.length; index += 1) {
                console.log(str[index])
              }
            }

            logCharacters("SEGAAAAAA")
          `,
          explanation: 'Con las DevTools abiertas, el código se detiene en la línea de debugger y desde ahí se puede avanzar línea por línea.',
        },
        {
          title: 'Revisar cómo cambia una variable',
          fromNotes: true,
          code: `
            function countToNumber(num) {
              debugger
              let i
              for (i = 0; i <= num; i++) {
                console.log(i)
              }
              return i
            }

            countToNumber(5) // 6
          `,
          explanation: 'Al avanzar con Step over, la sección Alcance muestra el valor de i en cada iteración.',
        },
      ],
      related: ['debugging.console-log', 'variables.block-scope'],
      highlight: ['debugger'],
      sections: ['8', '9', '10', '11'],
    },
    {
      id: 'variables.block-scope',
      name: 'Alcance de bloque',
      aka: 'Dónde existe una variable declarada con let',
      kind: 'concept',
      categories: ['variables', 'debugging'],
      actions: ['understand'],
      phrases: ['dónde existe una variable', 'variable dentro de un bloque', 'la variable no existe fuera del for', 'scope'],
      summary:
        'Una variable declarada con let dentro de un bloque (por ejemplo, el de un for) solo existe dentro de ese bloque. Cuando el bloque termina, la variable deja de existir, y usarla afuera produce un ReferenceError.',
      keyPoints: ['Si necesitas usar la variable después del bloque, declárala antes, fuera de él.'],
      examples: [
        {
          title: 'La variable del for no existe afuera',
          fromNotes: true,
          throws: 'ReferenceError',
          code: `
            function countToNumber(num) {
              for (let i = 0; i <= num; i++) {
                console.log(i)
              }
              return i // aquí ocurre el error
            }

            countToNumber(5)
            // Uncaught ReferenceError: i is not defined
          `,
        },
        {
          title: 'Declarar la variable fuera del bloque',
          fromNotes: true,
          code: `
            function countToNumber(num) {
              let i
              for (i = 0; i <= num; i++) {
                console.log(i)
              }
              return i
            }

            countToNumber(5) // 6
          `,
          explanation: 'Ahora i existe en toda la función, así que se puede devolver después del bucle.',
        },
        {
          title: 'Una variable declarada dentro de un if',
          throws: 'ReferenceError',
          code: `
            if (true) {
              let mensaje = "hola"
            }

            console.log(mensaje)
            // Uncaught ReferenceError: mensaje is not defined
          `,
        },
      ],
      related: ['variables.let', 'debugging.reference-error', 'loops.for'],
      highlight: ['let'],
      sections: ['11', '12'],
    },
  ],
}

export default depuracion
