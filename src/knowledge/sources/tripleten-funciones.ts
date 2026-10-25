import type { KnowledgeSource } from '../model'

/** Contenido de wiki/tripleten/funciones.md. Los ejercicios están en practice/pending.ts. */
const funciones: KnowledgeSource = {
  id: 'tripleten-funciones',
  title: 'Funciones (TripleTen)',
  file: 'wiki/tripleten/funciones.md',
  order: 90,
  concepts: [
    {
      id: 'functions.basics',
      name: 'Función',
      aka: 'Un bloque de código reutilizable',
      kind: 'concept',
      categories: ['functions'],
      actions: ['understand'],
      phrases: ['qué es una función', 'un miniprograma', 'reutilizar código', 'no repetir código'],
      summary: 'Es un bloque de código reutilizable que se ejecuta cuando lo llamamos. Es como un miniprograma dentro del programa.',
      tables: [
        {
          title: 'Lo que hay que saber',
          headers: ['Idea', 'Qué es'],
          rows: [
            ['Declarar', 'Darle un nombre y escribir qué hace.'],
            ['Llamar', 'Ejecutarla escribiendo su nombre con paréntesis y, si los necesita, sus argumentos.'],
            ['Parámetros y argumentos', 'Los parámetros son los nombres de la declaración; los argumentos, los valores que se pasan al llamarla.'],
            ['Retornar', 'Devolver un valor con return para usarlo en otra parte del programa.'],
          ],
        },
      ],
      keyPoints: [
        'Hace que el código sea más ordenado, evita repetirlo y permite decidir exactamente cuándo se ejecuta cada parte.',
        'Una función puede llamar a otra. console.log() también es una función, pero viene incluida en JavaScript.',
        'Dividir una tarea grande en funciones pequeñas hace el código más limpio, reutilizable y fácil de leer.',
      ],
      examples: [
        {
          title: 'Declarar, llamar y usar el resultado',
          fromNotes: true,
          code: `
            function add(a, b) {
              return a + b
            }

            const sum = add(2, 3) // 5
          `,
        },
        {
          title: 'Reutilizar la misma función',
          code: `
            function add(a, b) {
              return a + b
            }

            add(10, 5) // 15
            add(1, 1) // 2
          `,
        },
      ],
      related: ['functions.declaration', 'functions.call', 'functions.parameters', 'functions.return'],
      highlight: [],
      sections: ['1', '10', '12'],
    },
    {
      id: 'functions.declaration',
      name: 'function',
      aka: 'Declarar una función',
      kind: 'statement',
      categories: ['functions'],
      actions: ['create'],
      phrases: ['declarar una función', 'crear una función', 'definir una función', 'nombrar una función'],
      summary:
        'Declara una función con la palabra clave function, seguida del nombre, paréntesis y llaves con el cuerpo, es decir, el código que ejecuta la función.',
      syntax: [
        `
          function nombreDeLaFuncion() {
            // cuerpo
          }
        `,
        `
          function nombreDeLaFuncion(parametro1, parametro2) {
            // cuerpo
          }
        `,
      ],
      keyPoints: [
        'Declararla no la ejecuta: queda esperando a que la llamen.',
        'El nombre se escribe en camelCase, igual que las variables.',
        'El nombre debe ser un verbo (o una frase con un verbo) que describa lo que hace la función.',
      ],
      examples: [
        {
          title: 'Declarar una función',
          fromNotes: true,
          code: `
            function greet() {
              console.log("¡Hola, mundo!")
            }
          `,
          explanation: 'Esto solo la declara: todavía no muestra nada.',
        },
        {
          title: 'Nombres con verbos que describen lo que hace',
          fromNotes: true,
          code: `
            function playMusic() {
              console.log("🎵 🎶 🎼")
            }

            function greetStudents() {
              console.log("¡Te damos la bienvenida a TripleTen!")
            }
          `,
        },
        {
          title: 'Declarar no es lo mismo que ejecutar',
          code: `
            function avisar() {
              console.log("Se ejecutó")
            }
            // hasta aquí no se muestra nada

            avisar() // muestra: Se ejecutó
          `,
        },
      ],
      related: ['functions.call', 'functions.parameters', 'functions.return', 'variables.naming'],
      highlight: ['function'],
      sections: ['2', '4'],
    },
    {
      id: 'functions.call',
      name: 'nombre()',
      aka: 'Llamar (invocar) una función',
      kind: 'syntax',
      categories: ['functions'],
      actions: ['call'],
      phrases: ['llamar una función', 'invocar una función', 'ejecutar una función', 'usar una función'],
      summary: 'Para llamar (invocar) una función se escribe su nombre seguido de paréntesis. Se puede llamar todas las veces que se quiera.',
      syntax: ['nombreDeLaFuncion()', 'nombreDeLaFuncion(argumento1, argumento2)'],
      keyPoints: [
        'Si la función tiene parámetros, los argumentos van entre los paréntesis.',
        'Una función puede llamar a otra dentro de su cuerpo.',
      ],
      examples: [
        {
          title: 'Llamar una función',
          fromNotes: true,
          code: `
            function greet() {
              console.log("¡Hola, mundo!")
            }

            greet() // muestra: ¡Hola, mundo!
          `,
        },
        {
          title: 'Llamarla varias veces',
          code: `
            function greet() {
              console.log("¡Hola, mundo!")
            }

            greet()
            greet()
            // muestra el saludo dos veces
          `,
        },
        {
          title: 'Llamar una función con un argumento',
          fromNotes: true,
          code: `
            function greetUser(name) {
              console.log("¡Hola, " + name + "!")
            }

            greetUser("Daniel") // muestra: ¡Hola, Daniel!
          `,
        },
        {
          title: 'Una función que llama a otra',
          code: `
            function double(number) {
              return number * 2
            }

            function quadruple(number) {
              return double(double(number))
            }

            quadruple(3) // 12
          `,
          explanation: 'quadruple() usa double() dos veces, en lugar de repetir la multiplicación.',
        },
      ],
      related: ['functions.declaration', 'functions.parameters', 'functions.return'],
      highlight: [],
      sections: ['3', '10'],
    },
    {
      id: 'functions.parameters',
      name: 'Parámetros y argumentos',
      aka: 'Pasarle datos a una función',
      kind: 'concept',
      categories: ['functions'],
      actions: ['create', 'call'],
      phrases: ['pasarle datos a una función', 'que la función reciba un valor', 'diferencia entre parámetro y argumento'],
      summary:
        'Los parámetros son los nombres que se escriben entre paréntesis al declarar la función; funcionan como variables dentro de ella. Los argumentos son los valores reales que se pasan al llamarla, y se asignan a los parámetros.',
      syntax: [
        `
          function nombre(parametro) {
            // parametro funciona como una variable
          }

          nombre(argumento)
        `,
      ],
      tables: [
        {
          headers: ['Término', 'Dónde se escribe', 'Qué es'],
          rows: [
            ['Parámetro', 'Al declarar la función', 'Un nombre que funciona como variable dentro de la función.'],
            ['Argumento', 'Al llamar la función', 'El valor real que se pasa y se asigna al parámetro.'],
          ],
        },
      ],
      keyPoints: ['Si hay varios, se separan con comas y los argumentos se asignan a los parámetros en el mismo orden.'],
      examples: [
        {
          title: 'Un parámetro y un argumento',
          fromNotes: true,
          code: `
            function greetUser(name) { // name es el parámetro
              console.log("¡Hola, " + name + "!")
            }

            greetUser("Daniel") // el argumento es "Daniel"; muestra: ¡Hola, Daniel!
          `,
        },
        {
          title: 'Varios parámetros',
          fromNotes: true,
          code: `
            function calculateArea(length, width) {
              return length * width
            }

            calculateArea(5, 7) // 35
          `,
          explanation: '5 se asigna a length y 7 a width.',
        },
        {
          title: 'La misma función con distintos argumentos',
          code: `
            function greetUser(name) {
              return "¡Hola, " + name + "!"
            }

            greetUser("Laura") // "¡Hola, Laura!"
            greetUser("Tomás") // "¡Hola, Tomás!"
          `,
        },
      ],
      related: ['functions.declaration', 'functions.call'],
      highlight: [],
      sections: ['6'],
    },
    {
      id: 'functions.return',
      name: 'return',
      aka: 'Devolver un valor desde una función',
      kind: 'statement',
      categories: ['functions'],
      actions: ['return'],
      phrases: ['devolver un resultado', 'retornar un valor', 'guardar el resultado de una función', 'terminar una función antes'],
      summary:
        'Devuelve un valor a la parte del programa que llamó a la función. Así el resultado se puede guardar y usar después, en lugar de solo mostrarlo en la consola. Cuando se ejecuta, la función se detiene.',
      syntax: ['return valor', 'return'],
      keyPoints: [
        'No es obligatorio guardar el resultado en una variable: se puede usar directamente.',
        'Una función sin return devuelve undefined. También devuelve undefined si tiene un return sin ningún valor.',
        'Cuando se ejecuta un return, la función se detiene: el código que sigue no se ejecuta.',
        'Un return sin valor deja claro que la función solo hace una acción (mostrar algo, actualizar la interfaz) y no calcula un resultado.',
      ],
      examples: [
        {
          title: 'Devolver un resultado y guardarlo',
          fromNotes: true,
          code: `
            function calculateArea(length, width) {
              return length * width
            }

            const area = calculateArea(5, 7)
            console.log(area) // 35
          `,
        },
        {
          title: 'Usar el resultado directamente',
          fromNotes: true,
          code: `
            function calculateArea(length, width) {
              return length * width
            }

            console.log(calculateArea(5, 7)) // 35
          `,
        },
        {
          title: 'Una función sin return devuelve undefined',
          fromNotes: true,
          code: `
            function greet(name) {
              console.log(\`¡Hola, \${name}!\`)
            }

            const message = greet("Laura") // muestra: ¡Hola, Laura!
            console.log(message) // undefined
          `,
        },
        {
          title: 'return detiene la función',
          fromNotes: true,
          code: `
            function checkAccess(isAdmin) {
              if (!isAdmin) {
                console.log("Acceso denegado.")
                return // la función termina aquí si no es admin
              }
              console.log("Tienes acceso de administrador.")
            }

            checkAccess(false) // muestra: Acceso denegado.
            checkAccess(true) // muestra: Tienes acceso de administrador.
          `,
        },
        {
          title: 'Mostrar no es lo mismo que devolver',
          code: `
            function showDouble(n) {
              console.log(n * 2)
            }

            function getDouble(n) {
              return n * 2
            }

            showDouble(4) // undefined
            getDouble(4) // 8
          `,
          explanation: 'Las dos calculan el doble, pero solo getDouble() lo devuelve para usarlo después. showDouble() lo muestra y devuelve undefined.',
        },
      ],
      related: ['functions.declaration', 'functions.call', 'variables.undefined'],
      highlight: ['return'],
      sections: ['7', '8', '9'],
    },
  ],
}

export default funciones
