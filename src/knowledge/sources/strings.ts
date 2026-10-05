import type { KnowledgeSource } from '../model'

/** Contenido de wiki/string.md */
const strings: KnowledgeSource = {
  id: 'strings',
  title: 'Strings',
  file: 'wiki/string.md',
  order: 10,
  concepts: [
    {
      id: 'string.basics',
      name: 'String',
      aka: 'Tipo de dato para representar texto',
      kind: 'concept',
      categories: ['string'],
      actions: ['understand', 'create'],
      phrases: ['escribir un texto', 'guardar un texto en una variable', 'crear un string', 'usar comillas'],
      summary: 'Un string es un tipo de dato que se usa para representar un texto. Se escribe entre comillas.',
      syntax: ['"texto"', "'texto'", '`texto`'],
      keyPoints: [
        'Hay tres tipos de comillas: dobles " ", simples \' \' e invertidas ` `.',
        'Las comillas invertidas tienen funciones extra: interpolación y saltos de línea directos.',
        'Cada carácter del string tiene una posición (index) que empieza en 0.',
      ],
      examples: [
        {
          title: 'Crear un string y guardarlo en una variable',
          fromNotes: true,
          code: `const texto = "hola mundo"`,
        },
        {
          title: 'Los tres tipos de comillas',
          code: `
            const dobles = "hola mundo"
            const simples = 'hola mundo'
            const invertidas = \`hola mundo\`

            dobles === invertidas // true
          `,
          explanation: 'Las tres variables guardan exactamente el mismo texto.',
        },
      ],
      related: ['string.template-literal', 'string.bracket-notation', 'string.escape-newline'],
      highlight: [],
      sections: ['1'],
    },
    {
      id: 'string.bracket-notation',
      name: 'texto[index]',
      aka: 'Notación de corchetes',
      kind: 'syntax',
      categories: ['string'],
      actions: ['access'],
      phrases: ['obtener un carácter', 'acceder a una letra', 'obtener la letra de una posición', 'obtener el primer carácter'],
      summary: 'Permite acceder a un carácter del string usando un número que indica su posición, llamado index.',
      syntax: ['texto[index]'],
      parameters: [{ name: 'index', description: 'Número de la posición del carácter. El primer carácter está en la posición 0.' }],
      returns: { type: 'string', description: 'El carácter que está en esa posición.' },
      keyPoints: ['Las posiciones empiezan en 0: el primer carácter es texto[0].', 'Los espacios también ocupan una posición.'],
      examples: [
        {
          title: 'Obtener el primer carácter',
          fromNotes: true,
          code: `
            const texto = "hola mundo"
            texto[0] // "h"
          `,
        },
        {
          title: 'Obtener el carácter de otra posición',
          code: `
            const texto = "hola mundo"
            texto[5] // "m"
            texto[4] // " "
          `,
          explanation: 'El espacio de la posición 4 también cuenta como un carácter.',
        },
        {
          title: 'Usar una variable como posición',
          code: `
            const texto = "hola mundo"
            const posicion = 2
            texto[posicion] // "l"
          `,
        },
      ],
      related: ['array.bracket-access', 'string.indexOf', 'string.slice'],
      highlight: [],
      sections: ['2'],
    },
    {
      id: 'string.escape-newline',
      name: '\\n',
      aka: 'Salto de línea (carácter de escape)',
      kind: 'syntax',
      categories: ['string'],
      actions: ['create'],
      phrases: ['hacer un salto de línea', 'escribir en varias líneas', 'pasar a la siguiente línea', 'carácter de escape'],
      summary: 'Es un carácter de escape. Dentro de un string con comillas dobles o simples, inserta un salto de línea.',
      syntax: ['"primera línea\\nsegunda línea"'],
      keyPoints: [
        'Se escribe con una barra invertida \\ seguida de la letra n.',
        'Con comillas invertidas no hace falta: puedes hacer el salto de línea directamente con Enter.',
      ],
      examples: [
        {
          title: 'Un poema en varias líneas',
          fromNotes: true,
          code: `
            const poema = "las rosas son rojas\\nlas violetas azules\\ny los girasoles amarillos"
            console.log(poema)
            // las rosas son rojas
            // las violetas azules
            // y los girasoles amarillos
          `,
        },
        {
          title: 'Un mensaje de dos líneas',
          code: `
            const mensaje = "Hola Jeni\\nBienvenida"
            console.log(mensaje)
            // Hola Jeni
            // Bienvenida
          `,
        },
      ],
      related: ['string.template-literal', 'string.basics'],
      highlight: [],
      sections: ['3'],
    },
    {
      id: 'string.template-literal',
      name: '`${ }`',
      aka: 'Comillas invertidas: interpolación y varias líneas',
      kind: 'syntax',
      categories: ['string'],
      actions: ['create', 'join'],
      phrases: [
        'insertar una variable en un texto',
        'interpolar',
        'combinar texto con variables',
        'armar un mensaje',
        'escribir en varias líneas sin \\n',
      ],
      summary:
        'Los strings con comillas invertidas permiten insertar variables dentro del texto con ${ } (interpolación) y hacer saltos de línea sin caracteres de escape.',
      syntax: ['`texto ${variable} más texto`'],
      returns: { type: 'string', description: 'Un string con los valores ya insertados.' },
      keyPoints: [
        'Lo que escribes dentro de ${ } se reemplaza por su valor.',
        'Solo funciona con comillas invertidas. Con comillas dobles o simples, ${ } se queda como texto.',
      ],
      examples: [
        {
          title: 'Insertar una variable en un texto',
          fromNotes: true,
          code: `
            const texto = "redonda"
            const frase = \`las rosas están en la mesa \${texto}\`
            console.log(frase) // "las rosas están en la mesa redonda"
          `,
        },
        {
          title: 'Escribir un texto en varias líneas',
          fromNotes: true,
          code: `
            const poema = \`las rosas están
            en la mesa redonda\`
            console.log(poema)
            // las rosas están
            // en la mesa redonda
          `,
        },
        {
          title: 'Armar un mensaje con varias variables',
          code: `
            const nombre = "Jeni"
            const cantidad = 3
            const mensaje = \`Hola \${nombre}, tienes \${cantidad} tareas\`
            console.log(mensaje) // "Hola Jeni, tienes 3 tareas"
          `,
        },
        {
          title: 'Con comillas dobles no hay interpolación',
          code: `
            const nombre = "Jeni"
            const conDobles = "Hola \${nombre}"
            const conInvertidas = \`Hola \${nombre}\`
            console.log(conDobles) // "Hola \${nombre}"
            console.log(conInvertidas) // "Hola Jeni"
          `,
        },
      ],
      related: ['string.basics', 'string.escape-newline'],
      highlight: [],
      sections: ['4'],
    },
    {
      id: 'string.indexOf',
      name: 'indexOf()',
      kind: 'method',
      categories: ['string'],
      actions: ['search'],
      phrases: ['buscar', 'encontrar la posición', 'localizar una palabra', 'saber en qué posición está', 'obtener el index'],
      summary:
        'Busca un texto dentro del string y retorna el número de la posición (index) donde aparece. Si no lo encuentra, retorna -1.',
      syntax: ['texto.indexOf(textoABuscar)'],
      parameters: [{ name: 'textoABuscar', description: 'La palabra o el carácter que quieres buscar.' }],
      returns: { type: 'number', description: 'La posición donde empieza el texto buscado, o -1 si no está.' },
      keyPoints: [
        'Retorna un número, no true o false.',
        'Si el texto no está en el string, retorna -1.',
        'Si el texto está al principio, retorna 0. Ese 0 significa que sí lo encontró, en la primera posición.',
        'Si el texto aparece varias veces, retorna la posición de la primera vez.',
      ],
      examples: [
        {
          title: 'Encontrar la posición de una palabra',
          fromNotes: true,
          code: `
            const poema = "las rosas son rojas"
            poema.indexOf("rosas") // 4
          `,
        },
        {
          title: 'Cuando el texto no está',
          fromNotes: true,
          code: `
            const poema = "las rosas son rojas"
            poema.indexOf("papel") // -1
          `,
        },
        {
          title: 'Cuando el texto está al principio',
          code: `
            const poema = "las rosas son rojas"
            poema.indexOf("las") // 0
          `,
          explanation: 'Retorna 0 porque "las" empieza en la primera posición. Encontrarlo en la posición 0 sí cuenta como encontrado.',
        },
        {
          title: 'Si el texto aparece varias veces',
          code: `
            const frase = "mi gato y tu gato"
            frase.indexOf("gato") // 3
          `,
          explanation: 'Retorna la posición del primer "gato". El segundo no se tiene en cuenta.',
        },
        {
          title: 'Buscar un solo carácter',
          code: `
            const correo = "jeni@correo.com"
            correo.indexOf("@") // 4
          `,
        },
      ],
      related: ['string.includes', 'string.slice', 'string.bracket-notation'],
      sections: ['5'],
    },
    {
      id: 'string.includes',
      name: 'includes()',
      kind: 'method',
      categories: ['string'],
      actions: ['search'],
      phrases: ['comprobar si existe', 'verificar si contiene', 'saber si una palabra está incluida', '¿está o no está?'],
      summary: 'Verifica si un texto está incluido dentro del string. Retorna un booleano: true si está y false si no está.',
      syntax: ['texto.includes(textoABuscar)'],
      parameters: [{ name: 'textoABuscar', description: 'La palabra o el carácter que quieres comprobar.' }],
      returns: { type: 'boolean', description: 'true si el texto está en el string; false si no está.' },
      keyPoints: [
        'Solo dice si está o no está; no dice en qué posición.',
        'Distingue mayúsculas de minúsculas: "Jeni" y "jeni" son diferentes.',
      ],
      examples: [
        {
          title: 'Comprobar si una palabra está en el string',
          fromNotes: true,
          code: `
            const poema = "las rosas son rojas"
            poema.includes("rosas") // true
            poema.includes("papel") // false
          `,
        },
        {
          title: 'Comprobar si tiene un carácter',
          code: `
            const correo = "jeni@correo.com"
            correo.includes("@") // true
          `,
        },
        {
          title: 'Distingue mayúsculas de minúsculas',
          code: `
            const saludo = "Hola Jeni"
            saludo.includes("jeni") // false

            const enMinusculas = saludo.toLowerCase()
            enMinusculas.includes("jeni") // true
          `,
        },
        {
          title: 'Usar el resultado en una condición',
          code: `
            const frase = "me gusta el chocolate"

            if (frase.includes("chocolate")) {
              console.log("Habla de chocolate")
            }
          `,
        },
      ],
      related: ['string.indexOf', 'array.includes'],
      sections: ['6'],
    },
    {
      id: 'string.slice',
      name: 'slice()',
      kind: 'method',
      categories: ['string'],
      actions: ['cut'],
      phrases: [
        'cortar',
        'obtener una parte',
        'extraer una parte',
        'obtener caracteres entre posiciones',
        'obtener los primeros caracteres',
        'obtener los últimos caracteres',
      ],
      summary: 'Corta el string usando números que indican un inicio y un final. Retorna la parte cortada.',
      syntax: ['texto.slice(inicio)', 'texto.slice(inicio, fin)'],
      parameters: [
        {
          name: 'inicio',
          description: 'Posición donde empieza el corte. Ese carácter sí se incluye. Si es negativo, se cuenta desde el final.',
        },
        {
          name: 'fin',
          optional: true,
          description: 'Posición donde termina el corte. Ese carácter no se incluye. Si no lo pones, corta hasta el final.',
        },
      ],
      returns: { type: 'string', description: 'Un nuevo string con la parte cortada.' },
      mutates: false,
      keyPoints: [
        'El carácter de la posición fin no queda incluido.',
        'Con un número negativo se cuenta desde el final: -1 es el último carácter.',
        'El string original no cambia.',
      ],
      examples: [
        {
          title: 'Obtener los primeros caracteres',
          code: `
            const texto = "Hola mundo"
            texto.slice(0, 4) // "Hola"
          `,
        },
        {
          title: 'Extraer una parte entre dos posiciones',
          fromNotes: true,
          code: `
            const poema = "las rosas son rojas"
            poema.slice(4, 9) // "rosas"
          `,
          explanation: 'Empieza en la posición 4 (la "r") y se detiene antes de la posición 9.',
        },
        {
          title: 'Desde una posición hasta el final',
          fromNotes: true,
          code: `
            const poema = "las rosas son rojas"
            poema.slice(4) // "rosas son rojas"
          `,
        },
        {
          title: 'Obtener los últimos caracteres',
          fromNotes: true,
          code: `
            const poema = "las rosas son rojas"
            poema.slice(-5) // "rojas"
          `,
        },
        {
          title: 'El string original no cambia',
          code: `
            const texto = "Hola mundo"
            const parte = texto.slice(5)
            console.log(parte) // "mundo"
            console.log(texto) // "Hola mundo"
          `,
        },
        {
          title: 'Usar una posición guardada en una variable',
          code: `
            const frase = "nombre: Jeni"
            const posicion = frase.indexOf(":")
            frase.slice(posicion + 2) // "Jeni"
          `,
          explanation: 'indexOf() encuentra los dos puntos (posición 6). Se suma 2 para saltar los dos puntos y el espacio.',
        },
      ],
      related: ['array.slice', 'string.indexOf', 'string.bracket-notation'],
      sections: ['7'],
    },
    {
      id: 'string.toUpperCase',
      name: 'toUpperCase()',
      kind: 'method',
      categories: ['string'],
      actions: ['change-case'],
      phrases: ['convertir a mayúsculas', 'poner en mayúsculas', 'pasar todo a mayúsculas'],
      summary: 'Convierte todas las letras del string a mayúsculas.',
      syntax: ['texto.toUpperCase()'],
      parameters: [],
      returns: { type: 'string', description: 'Un nuevo string con todas las letras en mayúsculas.' },
      mutates: false,
      keyPoints: ['No recibe argumentos, pero sí lleva paréntesis.', 'Los números, espacios y signos no cambian.'],
      examples: [
        {
          title: 'Convertir un texto a mayúsculas',
          fromNotes: true,
          code: `
            const poema = "las rosas son rojas"
            poema.toUpperCase() // "LAS ROSAS SON ROJAS"
          `,
        },
        {
          title: 'Solo cambian las letras',
          code: `"abc 123!".toUpperCase() // "ABC 123!"`,
        },
        {
          title: 'El string original no cambia',
          code: `
            const nombre = "jeni"
            const enMayusculas = nombre.toUpperCase()
            console.log(enMayusculas) // "JENI"
            console.log(nombre) // "jeni"
          `,
        },
        {
          title: 'Comparar sin importar cómo se escribió',
          code: `
            const respuesta = "Sí"
            respuesta.toUpperCase() === "SÍ" // true
          `,
        },
      ],
      related: ['string.toLowerCase'],
      sections: ['8'],
    },
    {
      id: 'string.toLowerCase',
      name: 'toLowerCase()',
      kind: 'method',
      categories: ['string'],
      actions: ['change-case'],
      phrases: ['convertir a minúsculas', 'poner en minúsculas', 'pasar todo a minúsculas'],
      summary: 'Convierte todas las letras del string a minúsculas.',
      syntax: ['texto.toLowerCase()'],
      parameters: [],
      returns: { type: 'string', description: 'Un nuevo string con todas las letras en minúsculas.' },
      mutates: false,
      keyPoints: ['No recibe argumentos, pero sí lleva paréntesis.', 'Los números, espacios y signos no cambian.'],
      examples: [
        {
          title: 'Convertir un texto a minúsculas',
          fromNotes: true,
          code: `
            const frase = "LAS ROSAS SON ROJAS"
            frase.toLowerCase() // "las rosas son rojas"
          `,
        },
        {
          title: 'Con mayúsculas y minúsculas mezcladas',
          code: `"Hola Jeni".toLowerCase() // "hola jeni"`,
        },
        {
          title: 'Pasar a minúsculas antes de buscar',
          code: `
            const frase = "Me Gusta El Café"
            const enMinusculas = frase.toLowerCase()
            enMinusculas.includes("café") // true
          `,
        },
      ],
      related: ['string.toUpperCase', 'string.includes'],
      sections: ['8'],
    },
    {
      id: 'string.replace',
      name: 'replace()',
      kind: 'method',
      categories: ['string'],
      actions: ['replace'],
      phrases: ['reemplazar', 'cambiar una palabra por otra', 'sustituir', 'reemplazar la primera vez'],
      summary: 'Reemplaza una palabra del string por otra. Solo reemplaza la primera vez que encuentra la palabra.',
      syntax: ['texto.replace(palabraAReemplazar, palabraNueva)'],
      parameters: [
        { name: 'palabraAReemplazar', description: 'La palabra que se quiere reemplazar.' },
        { name: 'palabraNueva', description: 'La palabra que va en su lugar.' },
      ],
      returns: { type: 'string', description: 'Un nuevo string con la palabra reemplazada.' },
      mutates: false,
      keyPoints: ['Solo cambia la primera coincidencia; las demás quedan igual.', 'Si la palabra no está, retorna el string sin cambios.'],
      examples: [
        {
          title: 'Reemplazar una palabra',
          fromNotes: true,
          code: `
            const frase = "los perros y los gatos no se llevan bien"
            frase.replace("no", "si") // "los perros y los gatos si se llevan bien"
          `,
        },
        {
          title: 'Solo cambia la primera vez',
          fromNotes: true,
          code: `
            const frase = "los perros y los gatos no se llevan bien"
            frase.replace("los", "sus") // "sus perros y los gatos no se llevan bien"
          `,
          explanation: 'El segundo "los" se queda igual.',
        },
        {
          title: 'Eliminar una palabra reemplazándola por un string vacío',
          code: `
            const saludo = "Hola querida Jeni"
            saludo.replace("querida ", "") // "Hola Jeni"
          `,
        },
        {
          title: 'Si la palabra no está',
          code: `"Hola Jeni".replace("Ana", "Luisa") // "Hola Jeni"`,
        },
      ],
      related: ['string.replaceAll'],
      sections: ['9', '10'],
    },
    {
      id: 'string.replaceAll',
      name: 'replaceAll()',
      kind: 'method',
      categories: ['string'],
      actions: ['replace'],
      phrases: ['reemplazar todas las veces', 'cambiar todas las coincidencias', 'sustituir en todo el texto'],
      summary: 'Reemplaza todas las veces que aparece una palabra en el string.',
      syntax: ['texto.replaceAll(palabraAReemplazar, palabraNueva)'],
      parameters: [
        { name: 'palabraAReemplazar', description: 'La palabra que se quiere reemplazar.' },
        { name: 'palabraNueva', description: 'La palabra que va en su lugar.' },
      ],
      returns: { type: 'string', description: 'Un nuevo string con todas las coincidencias reemplazadas.' },
      mutates: false,
      examples: [
        {
          title: 'Reemplazar todas las coincidencias',
          fromNotes: true,
          code: `
            const frase = "los perros y los gatos no se llevan bien"
            frase.replaceAll("los", "sus") // "sus perros y sus gatos no se llevan bien"
          `,
        },
        {
          title: 'Cambiar un carácter en todo el texto',
          code: `
            const fecha = "2026-10-02"
            fecha.replaceAll("-", "/") // "2026/10/02"
          `,
        },
        {
          title: 'Quitar todos los espacios',
          code: `"h o l a".replaceAll(" ", "") // "hola"`,
        },
      ],
      related: ['string.replace'],
      sections: ['11'],
    },
    {
      id: 'string.repeat',
      name: 'repeat()',
      kind: 'method',
      categories: ['string'],
      actions: ['repeat'],
      phrases: ['repetir', 'repetir varias veces', 'duplicar un texto', 'hacer una línea de caracteres'],
      summary: 'Repite el string completo la cantidad de veces que le indiques.',
      syntax: ['texto.repeat(veces)'],
      parameters: [{ name: 'veces', description: 'Número de veces que se repite el string.' }],
      returns: { type: 'string', description: 'Un nuevo string con el texto repetido.' },
      mutates: false,
      keyPoints: ['Repite el string tal cual, sin agregar espacios entre las repeticiones.'],
      examples: [
        {
          title: 'Repetir un texto',
          fromNotes: true,
          code: `
            const frase = "Hola Jeni"
            frase.repeat(3) // "Hola JeniHola JeniHola Jeni"
          `,
          explanation: 'No agrega espacios entre cada repetición.',
        },
        {
          title: 'Repetir un carácter para hacer una línea',
          code: `"-".repeat(10) // "----------"`,
        },
        {
          title: 'Incluir el espacio en el texto que se repite',
          code: `"ja ".repeat(3) // "ja ja ja "`,
        },
        {
          title: 'Usar una variable con la cantidad',
          code: `
            const estrellas = 4
            "*".repeat(estrellas) // "****"
          `,
        },
      ],
      sections: ['12'],
    },
    {
      id: 'string.trim',
      name: 'trim()',
      kind: 'method',
      categories: ['string'],
      actions: ['trim'],
      phrases: ['quitar espacios al inicio y al final', 'limpiar el texto', 'recortar espacios en blanco'],
      summary: 'Recorta los espacios en blanco del inicio y del final del string.',
      syntax: ['texto.trim()'],
      parameters: [],
      returns: { type: 'string', description: 'Un nuevo string sin espacios al inicio ni al final.' },
      mutates: false,
      keyPoints: ['Los espacios que están entre palabras no se eliminan.'],
      examples: [
        {
          title: 'Quitar los espacios de los dos lados',
          fromNotes: true,
          code: `
            const frase = "    Hola Jeni    "
            frase.trim() // "Hola Jeni"
          `,
        },
        {
          title: 'Los espacios del medio se conservan',
          code: `"  Hola   Jeni  ".trim() // "Hola   Jeni"`,
        },
        {
          title: 'Limpiar un texto escrito por una persona',
          code: `
            const nombreEscrito = "  jeni "
            const nombreLimpio = nombreEscrito.trim()
            console.log(nombreLimpio) // "jeni"
          `,
        },
      ],
      related: ['string.trimStart', 'string.trimEnd'],
      sections: ['13'],
    },
    {
      id: 'string.trimStart',
      name: 'trimStart()',
      kind: 'method',
      categories: ['string'],
      actions: ['trim'],
      phrases: ['quitar espacios solo al inicio', 'limpiar el principio del texto'],
      summary: 'Recorta solo los espacios en blanco del inicio del string.',
      syntax: ['texto.trimStart()'],
      parameters: [],
      returns: { type: 'string', description: 'Un nuevo string sin espacios al inicio.' },
      mutates: false,
      examples: [
        {
          title: 'Quitar solo los espacios del inicio',
          fromNotes: true,
          code: `
            const frase = "    Hola Jeni    "
            frase.trimStart() // "Hola Jeni    "
          `,
        },
      ],
      related: ['string.trim', 'string.trimEnd'],
      sections: ['13'],
    },
    {
      id: 'string.trimEnd',
      name: 'trimEnd()',
      kind: 'method',
      categories: ['string'],
      actions: ['trim'],
      phrases: ['quitar espacios solo al final', 'limpiar el final del texto'],
      summary: 'Recorta solo los espacios en blanco del final del string.',
      syntax: ['texto.trimEnd()'],
      parameters: [],
      returns: { type: 'string', description: 'Un nuevo string sin espacios al final.' },
      mutates: false,
      examples: [
        {
          title: 'Quitar solo los espacios del final',
          fromNotes: true,
          code: `
            const frase = "    Hola Jeni    "
            frase.trimEnd() // "    Hola Jeni"
          `,
        },
      ],
      related: ['string.trim', 'string.trimStart'],
      sections: ['13'],
    },
  ],
  comparisons: [
    {
      id: 'string.search',
      title: 'El mismo texto, dos formas de buscar',
      description: 'Fíjate en el tipo de valor que retorna cada una.',
      concepts: ['string.indexOf', 'string.includes'],
      inputHeaders: ['texto', 'buscar'],
      columns: [
        { header: 'texto.indexOf(buscar)', template: '$1.indexOf($2)' },
        { header: 'texto.includes(buscar)', template: '$1.includes($2)' },
      ],
      rows: [
        { inputs: ['"las rosas son rojas"', '"rosas"'], results: ['4', 'true'] },
        { inputs: ['"las rosas son rojas"', '"papel"'], results: ['-1', 'false'] },
        { inputs: ['"las rosas son rojas"', '"las"'], results: ['0', 'true'] },
      ],
    },
    {
      id: 'string.replace-vs-all',
      title: 'Reemplazar una vez o todas las veces',
      concepts: ['string.replace', 'string.replaceAll'],
      inputHeaders: ['texto'],
      columns: [
        { header: 'texto.replace("los", "sus")', template: '$1.replace("los", "sus")' },
        { header: 'texto.replaceAll("los", "sus")', template: '$1.replaceAll("los", "sus")' },
      ],
      rows: [
        {
          inputs: ['"los perros y los gatos"'],
          results: ['"sus perros y los gatos"', '"sus perros y sus gatos"'],
        },
      ],
    },
    {
      id: 'string.case',
      title: 'Mayúsculas y minúsculas',
      concepts: ['string.toUpperCase', 'string.toLowerCase'],
      inputHeaders: ['texto'],
      columns: [
        { header: 'texto.toUpperCase()', template: '$1.toUpperCase()' },
        { header: 'texto.toLowerCase()', template: '$1.toLowerCase()' },
      ],
      rows: [
        { inputs: ['"Hola Jeni"'], results: ['"HOLA JENI"', '"hola jeni"'] },
        { inputs: ['"abc 123"'], results: ['"ABC 123"', '"abc 123"'] },
      ],
    },
    {
      id: 'string.trim-variants',
      title: '¿De qué lado se quitan los espacios?',
      concepts: ['string.trim', 'string.trimStart', 'string.trimEnd'],
      inputHeaders: ['texto'],
      columns: [
        { header: 'texto.trim()', template: '$1.trim()' },
        { header: 'texto.trimStart()', template: '$1.trimStart()' },
        { header: 'texto.trimEnd()', template: '$1.trimEnd()' },
      ],
      rows: [{ inputs: ['"    Hola Jeni    "'], results: ['"Hola Jeni"', '"Hola Jeni    "', '"    Hola Jeni"'] }],
    },
  ],
}

export default strings
