import type { KnowledgeSource } from '../model'

/** Contenido de wiki/tripleten/fundamentos-js.md (las preguntas 1 y 2 son de HTML). */
const fundamentos: KnowledgeSource = {
  id: 'tripleten-fundamentos-js',
  title: 'Fundamentos de JavaScript (TripleTen)',
  file: 'wiki/tripleten/fundamentos-js.md',
  order: 50,
  concepts: [
    {
      id: 'variables.data-types',
      name: 'Tipos de datos',
      aka: 'Primitivos y objetos',
      kind: 'concept',
      categories: ['variables'],
      actions: ['understand'],
      phrases: ['qué tipos de datos hay', 'tipos primitivos', 'number, string, boolean…'],
      summary: 'Los tipos de datos de JavaScript se dividen en dos categorías: primitivos y objetos. Hay siete tipos primitivos.',
      tables: [
        {
          title: 'Los siete tipos primitivos',
          headers: ['Tipo', 'Qué representa'],
          rows: [
            ['Number', 'Números enteros (3, 21) y decimales (3.14, 25.468)'],
            ['String', 'Texto'],
            ['Boolean', 'Uno de dos valores lógicos: true o false'],
            ['Null', 'Ausencia intencional de un valor'],
            ['Undefined', 'Una variable a la que no se le asignó valor'],
            ['BigInt', 'Números enteros muy grandes (casi nunca se usan)'],
            ['Symbol', 'Valores anónimos y únicos'],
          ],
        },
      ],
      keyPoints: ['Con el operador typeof puedes saber de qué tipo es un dato.'],
      examples: [
        {
          title: 'Un dato de cada tipo',
          code: `
            const precio = 3.14 // tipo: Number
            const nombre = "Jeni" // tipo: String
            const activo = true // tipo: Boolean
            const vacio = null // tipo: Null
            let sinValor // tipo: Undefined
          `,
        },
        {
          title: 'Comprobar el tipo con typeof',
          code: `
            typeof 3.14 // "number"
            typeof "Jeni" // "string"
            typeof true // "boolean"
          `,
          explanation: 'typeof devuelve el nombre del tipo en minúsculas, como un string.',
        },
      ],
      related: ['variables.typeof', 'variables.boolean', 'variables.null', 'variables.undefined', 'number.types', 'string.basics'],
      highlight: [],
      sections: ['3'],
    },
    {
      id: 'variables.boolean',
      name: 'Boolean',
      aka: 'Valor booleano: true o false',
      kind: 'concept',
      categories: ['variables', 'logic'],
      actions: ['understand'],
      phrases: ['verdadero o falso', 'sí o no', 'encendido o apagado', 'valor lógico'],
      summary: 'Es un dato que solo puede tener dos valores: true (verdadero) o false (falso). Se usa mucho en las comparaciones.',
      syntax: ['true', 'false'],
      keyPoints: [
        'También se puede pensar como sí/no o encendido/apagado.',
        'Las comparaciones (>, <, ===…) dan como resultado un booleano.',
        'true y false se escriben sin comillas. "true" entre comillas es un string.',
      ],
      examples: [
        {
          title: 'Guardar un booleano en una variable',
          code: `
            const encendido = true
            const tieneDescuento = false
          `,
        },
        {
          title: 'Una comparación da un booleano',
          code: `
            7 > 6 // true
            typeof (7 > 6) // "boolean"
          `,
        },
        {
          title: 'Entre comillas ya no es un booleano',
          code: `
            typeof true // "boolean"
            typeof "true" // "string"
          `,
        },
      ],
      related: ['variables.Boolean', 'logic.not', 'logic.if-else', 'variables.data-types'],
      highlight: ['true', 'false'],
      sections: ['4'],
    },
    {
      id: 'variables.typeof',
      name: 'typeof',
      aka: 'Saber de qué tipo es un dato',
      kind: 'operator',
      categories: ['variables'],
      actions: ['check-type'],
      phrases: ['saber de qué tipo es un dato', 'comprobar el tipo', 'ver si es un número o un texto'],
      summary: 'Es un operador que devuelve un string con el tipo del dato.',
      syntax: ['typeof valor', 'typeof(valor)'],
      returns: { type: 'string', description: 'El nombre del tipo en minúsculas: "number", "string", "boolean", "undefined"…' },
      keyPoints: [
        'Siempre devuelve un string.',
        'Se puede escribir con o sin paréntesis: typeof(10) y typeof 10 dan lo mismo.',
        'typeof null devuelve "object", aunque null no es un objeto. Es un error de la primera versión de JavaScript que nunca se corrigió.',
      ],
      examples: [
        {
          title: 'Saber el tipo de distintos datos',
          fromNotes: true,
          code: `
            typeof(10) // "number"
            typeof("¡Quiero pedir quesos exóticos!") // "string"
            typeof(true) // "boolean"
            typeof(undefined) // "undefined"
          `,
        },
        {
          title: 'Con una variable que no tiene valor',
          fromNotes: true,
          code: `
            let meaningOfLife
            typeof meaningOfLife // "undefined"
          `,
        },
        {
          title: 'Con null da "object"',
          fromNotes: true,
          code: `
            const meaningOfLife = null
            typeof meaningOfLife // "object"
          `,
          explanation: 'Es un error histórico de JavaScript: null no es un objeto.',
        },
        {
          title: 'Un número entre comillas es un string',
          code: `
            typeof 42 // "number"
            typeof "42" // "string"
          `,
        },
      ],
      related: ['variables.data-types', 'variables.null', 'variables.undefined'],
      sections: ['5', '14', '16'],
    },
    {
      id: 'string.String',
      name: 'String()',
      kind: 'function',
      categories: ['string', 'number', 'variables'],
      actions: ['convert'],
      converts: { from: 'number', to: 'string' },
      phrases: ['convertir a string', 'convertir a texto', 'pasar de número a texto', 'conversión explícita'],
      summary: 'Convierte un valor a string. Es una conversión explícita: se ve claramente en el código dónde cambia el tipo.',
      syntax: ['String(valor)'],
      parameters: [{ name: 'valor', description: 'El valor que quieres convertir: un número, un booleano, null, undefined…' }],
      returns: { type: 'string', description: 'El valor convertido en texto.' },
      keyPoints: ['Funciona con cualquier valor, también con null y undefined.', 'Se escribe con S mayúscula.'],
      examples: [
        { title: 'Convertir un número a string', fromNotes: true, code: `String(2) // "2"` },
        {
          title: 'Convertir otros valores',
          fromNotes: true,
          code: `
            String(undefined) // "undefined"
            String(null) // "null"
            String(true) // "true"
          `,
        },
        {
          title: 'Después de convertir, + une en lugar de sumar',
          code: `
            const cantidad = 5

            cantidad + 1 // 6
            String(cantidad) + 1 // "51"
          `,
        },
      ],
      related: ['number.Number', 'variables.Boolean', 'number.coercion', 'number.toFixed'],
      highlight: ['String'],
      sections: ['7'],
    },
    {
      id: 'variables.Boolean',
      name: 'Boolean()',
      kind: 'function',
      categories: ['variables', 'number', 'string'],
      actions: ['convert'],
      phrases: ['convertir a booleano', 'convertir a true o false', 'saber si un valor cuenta como true o false'],
      summary: 'Convierte un valor a booleano: true o false. Es una conversión explícita.',
      syntax: ['Boolean(valor)'],
      parameters: [{ name: 'valor', description: 'El valor que quieres convertir.' }],
      returns: { type: 'boolean', description: 'true o false, según el valor.' },
      keyPoints: [
        'El número 0 y el string vacío "" se convierten en false.',
        'Un número distinto de 0 y un string que no esté vacío se convierten en true.',
      ],
      examples: [
        {
          title: 'Convertir números',
          fromNotes: true,
          code: `
            Boolean(2) // true
            Boolean(0) // false
          `,
        },
        {
          title: 'Convertir strings',
          fromNotes: true,
          code: `
            Boolean("") // false
            Boolean("cualquier string que no esté vacío") // true
          `,
        },
        {
          title: 'Un espacio no es un string vacío',
          code: `
            Boolean("") // false
            Boolean(" ") // true
          `,
        },
      ],
      related: ['variables.boolean', 'string.String', 'number.Number'],
      highlight: ['Boolean'],
      sections: ['7'],
    },
    {
      id: 'variables.variable',
      name: 'Variable',
      aka: 'Una caja con etiqueta para guardar un dato',
      kind: 'concept',
      categories: ['variables'],
      actions: ['understand', 'create'],
      phrases: ['guardar un dato', 'guardar un valor para usarlo después', 'darle un nombre a un valor'],
      summary:
        'Es como una caja con una etiqueta donde se guarda un dato para usarlo más adelante en el programa: un nombre de usuario, un número de teléfono, un total, etc.',
      syntax: ['let nombre = valor', 'const nombre = valor'],
      keyPoints: [
        'Se declara con let si el valor va a cambiar, o con const si no va a cambiar.',
        'Las variables se pueden usar en operaciones matemáticas y combinar con texto para crear mensajes.',
      ],
      examples: [
        {
          title: 'Guardar un dato y usarlo después',
          code: `
            const username = "jeni"
            console.log(username) // "jeni"
          `,
        },
        {
          title: 'Usar variables en una operación',
          fromNotes: true,
          code: `
            const ITEM_PRICE = 10
            let quantity = 5
            let total = ITEM_PRICE * quantity
            console.log(total) // 50

            quantity = 3
            total = ITEM_PRICE * quantity
            console.log(total) // 30
          `,
          explanation: 'Al cambiar quantity, total no cambia solo: hay que volver a calcularlo.',
        },
      ],
      related: ['variables.let', 'variables.const', 'variables.assignment', 'variables.naming'],
      highlight: [],
      sections: ['8', '13'],
    },
    {
      id: 'variables.let',
      name: 'let',
      aka: 'Declarar una variable que puede cambiar',
      kind: 'statement',
      categories: ['variables'],
      actions: ['create'],
      phrases: ['declarar una variable', 'crear una variable', 'variable que va a cambiar'],
      summary: 'Declara una variable. Con let, el valor puede cambiar más adelante.',
      syntax: ['let nombre', 'let nombre = valor'],
      keyPoints: [
        'Antes de asignarle un valor, la variable vale undefined.',
        'Para cambiar el valor no se vuelve a escribir let, porque la variable ya está declarada.',
        'Usa let cuando el valor vaya a cambiar; si no cambia, usa const.',
      ],
      examples: [
        {
          title: 'Declarar una variable',
          fromNotes: true,
          code: `
            let total
            console.log(total) // undefined
          `,
        },
        {
          title: 'Cambiar el valor más adelante',
          fromNotes: true,
          code: `
            let total = 0
            total = 500 // permitido con let

            console.log(total) // 500
          `,
        },
        {
          title: 'Actualizar un contador',
          code: `
            let intentos = 0
            intentos = intentos + 1
            intentos = intentos + 1

            console.log(intentos) // 2
          `,
        },
      ],
      related: ['variables.const', 'variables.assignment', 'variables.block-scope', 'variables.undefined'],
      highlight: ['let'],
      sections: ['9', '12'],
    },
    {
      id: 'variables.const',
      name: 'const',
      aka: 'Declarar una constante',
      kind: 'statement',
      categories: ['variables'],
      actions: ['create'],
      phrases: ['declarar una constante', 'guardar un valor que no cambia', 'variable que no se puede reasignar'],
      summary: 'Declara una variable cuyo valor no se puede reasignar. Sirve para datos que no cambian.',
      syntax: ['const nombre = valor'],
      keyPoints: [
        'Si intentas reasignarla, da un error.',
        'Las constantes con valores fijos y conocidos (ajustes de configuración, constantes matemáticas) suelen escribirse en MAYÚSCULAS.',
      ],
      examples: [
        {
          title: 'Guardar un valor que no cambia',
          fromNotes: true,
          code: `
            const MAX_USERS = 100
            console.log(MAX_USERS) // 100
          `,
        },
        {
          title: 'Intentar reasignar una constante',
          fromNotes: true,
          throws: 'TypeError',
          code: `
            const MAX_USERS = 100
            MAX_USERS = 200
            // Uncaught TypeError: Assignment to constant variable.
          `,
        },
        {
          title: 'Usar una constante en una operación',
          fromNotes: true,
          code: `
            const ITEM_PRICE = 10
            ITEM_PRICE * 3 // 30
          `,
        },
      ],
      related: ['variables.let', 'variables.naming', 'debugging.type-error'],
      highlight: ['const'],
      sections: ['12'],
    },
    {
      id: 'variables.naming',
      name: 'Nombres de variables',
      aka: 'Reglas y camelCase',
      kind: 'concept',
      categories: ['variables'],
      actions: ['understand', 'create'],
      phrases: ['cómo nombrar una variable', 'camelCase', 'qué nombre ponerle a una variable'],
      summary: 'Los nombres de las variables siguen unas reglas: no pueden empezar con un número, no tienen espacios ni guiones y se escriben en camelCase.',
      keyPoints: [
        'Empiezan con una letra, un guion bajo (_) o un signo de dólar ($). No pueden empezar con un número.',
        'No pueden tener espacios ni guiones.',
        'Se escriben en camelCase: la primera palabra en minúscula y las siguientes con mayúscula inicial, todo junto.',
        'No pueden ser palabras clave de JavaScript, como let, const, if o return.',
        'Es buena práctica que sean sustantivos que describan lo que guardan (sum, username, productId) y escribirlos en inglés, que es el estándar en programación.',
      ],
      examples: [
        {
          title: 'Nombres correctos',
          fromNotes: true,
          code: `
            let fullName
            let _privateVar
            let $configValue
          `,
        },
        {
          title: 'Un nombre que empieza con un número',
          fromNotes: true,
          throws: 'SyntaxError',
          code: `
            let 2user
            // Uncaught SyntaxError: Invalid or unexpected token
          `,
        },
        {
          title: 'Un nombre con espacios',
          fromNotes: true,
          throws: 'SyntaxError',
          code: `
            let user name
            // Uncaught SyntaxError: Unexpected identifier 'name'
          `,
        },
        {
          title: 'Un nombre con guiones',
          fromNotes: true,
          throws: 'SyntaxError',
          code: `
            let user-name
            // Uncaught SyntaxError: Unexpected token '-'
          `,
        },
        {
          title: 'Nombres que describen lo que guardan',
          code: `
            const productId = 1042
            const username = "jeni"
            let sum = 0
          `,
        },
      ],
      related: ['variables.let', 'variables.const', 'functions.declaration'],
      highlight: [],
      sections: ['10'],
    },
    {
      id: 'variables.assignment',
      name: '=',
      aka: 'Asignación: guardar un valor en una variable',
      kind: 'operator',
      categories: ['variables'],
      actions: ['create', 'update'],
      phrases: ['asignar un valor', 'guardar un valor en una variable', 'cambiar el valor de una variable', 'reasignar'],
      summary: 'Asigna un valor a una variable. Antes de asignarle un valor, la variable vale undefined.',
      syntax: ['variable = valor', 'let variable = valor'],
      keyPoints: [
        'Al asignar no se vuelve a escribir let, porque la variable ya está declarada.',
        'Se puede declarar y asignar en la misma línea, o declarar primero y asignar después.',
        'Un solo = asigna un valor; para comparar dos valores se usa === (o ==).',
      ],
      examples: [
        {
          title: 'Asignar un valor después de declarar',
          fromNotes: true,
          code: `
            let total
            console.log(total) // undefined

            total = 0
            console.log(total) // 0
          `,
        },
        {
          title: 'Declarar y asignar en la misma línea',
          fromNotes: true,
          code: `
            let city = "Londres"
            console.log(city) // "Londres"
          `,
        },
        {
          title: 'Declarar primero y asignar después',
          fromNotes: true,
          code: `
            let temperature
            temperature = 30

            console.log(temperature) // 30
          `,
        },
        {
          title: 'Asignar el resultado de una operación',
          code: `
            let total = 0
            total = 1500 + 300

            console.log(total) // 1800
          `,
        },
      ],
      related: ['variables.let', 'logic.strict-equality', 'number.compound-assignment'],
      highlight: ['='],
      sections: ['11'],
    },
    {
      id: 'string.concatenation',
      name: '+',
      aka: 'Concatenar: unir textos',
      kind: 'operator',
      categories: ['string'],
      actions: ['join'],
      phrases: ['unir textos', 'concatenar', 'armar un mensaje con variables', 'pegar un texto con otro'],
      summary: 'Con strings, el operador + une los valores como texto (concatena). Sirve para combinar texto con variables y crear mensajes.',
      syntax: ['texto1 + texto2', '"texto " + variable + " más texto"'],
      returns: { type: 'string', description: 'Un nuevo string con los valores unidos.' },
      keyPoints: [
        'No agrega espacios: si los necesitas, inclúyelos dentro de las comillas.',
        'Si uno de los valores es un número, también se une como texto (conversión implícita).',
      ],
      examples: [
        {
          title: 'Unir dos textos con un espacio en medio',
          fromNotes: true,
          code: `
            let firstName = "Juan"
            let lastName = "Pérez"
            let fullName = firstName + " " + lastName

            console.log("Hola, " + fullName + ". ¡Bienvenido!") // "Hola, Juan Pérez. ¡Bienvenido!"
          `,
        },
        {
          title: 'Armar un mensaje con números',
          fromNotes: true,
          code: `
            const ITEM_PRICE = 10
            let quantity = 5
            let total = ITEM_PRICE * quantity

            console.log("Precio total de " + quantity + " artículos: $" + total) // "Precio total de 5 artículos: $50"
          `,
        },
        {
          title: 'Sin espacios, los textos quedan pegados',
          code: `"Hola" + "Jeni" // "HolaJeni"`,
        },
        {
          title: 'Un número se une como texto',
          fromNotes: true,
          code: `100 + "500" // "100500"`,
        },
      ],
      related: ['string.template-literal', 'number.add', 'number.coercion'],
      highlight: ['+'],
      sections: ['6', '13'],
    },
    {
      id: 'variables.undefined',
      name: 'undefined',
      aka: 'Variable sin valor asignado',
      kind: 'concept',
      categories: ['variables'],
      actions: ['understand'],
      phrases: ['variable sin valor', 'todavía no tiene valor', 'por qué sale undefined'],
      summary:
        'Es el valor (y también el tipo) que tiene una variable declarada a la que todavía no se le asignó nada. JavaScript lo pone automáticamente.',
      keyPoints: [
        'Lo pone JavaScript, no quien programa. Para dejar un valor vacío a propósito se usa null.',
        'typeof de una variable sin valor devuelve "undefined".',
        'También aparece al acceder a una posición que no existe en un arreglo o en un string.',
      ],
      examples: [
        {
          title: 'Una variable declarada sin valor',
          fromNotes: true,
          code: `
            let meaningOfLife
            console.log(meaningOfLife) // undefined
            typeof meaningOfLife // "undefined"
          `,
        },
        {
          title: 'Acceder a una posición que no existe',
          code: `
            const letras = ["a", "b"]
            letras[5] // undefined
          `,
        },
      ],
      related: ['variables.null', 'variables.typeof', 'variables.let'],
      highlight: ['undefined'],
      sections: ['14'],
    },
    {
      id: 'variables.null',
      name: 'null',
      aka: 'Valor vacío a propósito',
      kind: 'concept',
      categories: ['variables'],
      actions: ['understand'],
      phrases: ['dejar una variable vacía a propósito', 'sin valor intencionalmente', 'diferencia entre null y undefined'],
      summary: 'null indica que un valor está vacío a propósito. Lo pone quien programa.',
      tables: [
        {
          title: 'null y undefined',
          headers: ['Valor', 'Qué significa', 'Quién lo pone'],
          rows: [
            ['undefined', 'Todavía no se le dio un valor', 'JavaScript, automáticamente'],
            ['null', 'Se dejó vacío intencionalmente', 'Quien programa'],
          ],
          codeColumns: [0],
        },
      ],
      keyPoints: [
        'typeof null devuelve "object", aunque null no es un objeto. Es un error de la primera versión de JavaScript que nunca se corrigió, porque arreglarlo rompería muchísimos sitios que ya existen.',
      ],
      examples: [
        {
          title: 'Dejar una variable vacía a propósito',
          fromNotes: true,
          code: `
            const meaningOfLife = null
            console.log(meaningOfLife) // null
          `,
        },
        {
          title: 'typeof null devuelve "object"',
          fromNotes: true,
          code: `
            const meaningOfLife = null
            typeof meaningOfLife // "object"
          `,
        },
        {
          title: 'null y undefined no son lo mismo',
          code: `
            let sinAsignar
            const vacio = null

            sinAsignar === vacio // false
          `,
        },
      ],
      related: ['variables.undefined', 'variables.typeof'],
      highlight: ['null'],
      sections: ['15', '16'],
    },
    {
      id: 'number.NaN',
      name: 'NaN',
      aka: 'Not a Number: una operación numérica que falla',
      kind: 'concept',
      categories: ['number', 'variables'],
      actions: ['understand'],
      phrases: ['no es un número', 'por qué sale NaN', 'una operación que falla'],
      summary: 'NaN ("Not a Number") es el resultado de una operación numérica que falla.',
      keyPoints: [
        'Aparece, por ejemplo, al multiplicar un texto que no es un número, al dividir 0 entre 0 o al convertir a número un texto con letras.',
      ],
      examples: [
        {
          title: 'Operaciones que dan NaN',
          fromNotes: true,
          code: `
            "string" * 2 // NaN
            0 / 0 // NaN
            parseInt("hello") // NaN
            Math.sqrt(-1) // NaN
          `,
        },
        {
          title: 'Convertir un texto que no es un número',
          code: `
            Number("hola") // NaN
            Number("12 manzanas") // NaN
          `,
        },
      ],
      related: ['number.coercion', 'number.Number', 'number.parseInt'],
      highlight: ['NaN'],
      sections: ['17'],
    },
  ],
  comparisons: [
    {
      id: 'variables.explicit-conversion',
      title: 'El mismo valor con cada función de conversión',
      description: 'String(), Number() y Boolean() convierten de forma explícita: se ve en el código dónde cambia el tipo.',
      concepts: ['string.String', 'number.Number', 'variables.Boolean'],
      inputHeaders: ['valor'],
      columns: [
        { header: 'String(valor)', template: 'String($1)' },
        { header: 'Number(valor)', template: 'Number($1)' },
        { header: 'Boolean(valor)', template: 'Boolean($1)' },
      ],
      rows: [
        { inputs: ['2'], results: ['"2"', '2', 'true'] },
        { inputs: ['"2"'], results: ['"2"', '2', 'true'] },
        { inputs: ['0'], results: ['"0"', '0', 'false'] },
        { inputs: ['""'], results: ['""', '0', 'false'] },
        { inputs: ['null'], results: ['"null"', '0', 'false'] },
      ],
    },
  ],
}

export default fundamentos
