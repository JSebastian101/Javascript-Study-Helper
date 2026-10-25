import type { KnowledgeSource } from '../model'

/**
 * Contenido de wiki/tripleten/strings.md. Corchetes, indexOf(), includes() y
 * las mayúsculas enriquecen los conceptos de strings.ts; el acróstico está en
 * practice/pending.ts.
 */
const strings: KnowledgeSource = {
  id: 'tripleten-strings',
  title: 'Strings (TripleTen)',
  file: 'wiki/tripleten/strings.md',
  order: 110,
  concepts: [
    {
      id: 'string.length',
      name: '.length',
      aka: 'Cantidad de caracteres',
      kind: 'property',
      categories: ['string'],
      actions: ['count'],
      phrases: ['contar caracteres', 'saber cuántos caracteres tiene', 'obtener el largo del texto', 'medir un texto'],
      summary: 'Indica cuántos caracteres tiene el string.',
      syntax: ['texto.length'],
      returns: { type: 'number', description: 'El número de caracteres del string.' },
      keyPoints: [
        'Es una propiedad: se escribe sin paréntesis.',
        'Los espacios también cuentan como caracteres.',
        'El último carácter está en la posición length - 1.',
      ],
      examples: [
        { title: 'Contar los caracteres de un texto', fromNotes: true, code: `"ABCDEFGHIJKLMNOPQRSTUVWXYZ".length // 26` },
        {
          title: 'Con un texto guardado en una variable',
          fromNotes: true,
          code: `
            const username = "isabel"
            console.log(username.length) // 6
          `,
        },
        {
          title: 'Funciona con cualquier alfabeto',
          fromNotes: true,
          code: `
            const greekAlphabet = "αβγδεζηθικλμνξοπρστυφχψω"
            greekAlphabet.length // 24
          `,
        },
        { title: 'Los espacios también cuentan', code: `"hola mundo".length // 10` },
        {
          title: 'Obtener el último carácter',
          code: `
            const palabra = "café"
            palabra[palabra.length - 1] // "é"
          `,
        },
      ],
      related: ['array.length', 'string.bracket-notation'],
      sections: ['1', '2'],
    },
    {
      id: 'string.startsWith',
      name: 'startsWith()',
      kind: 'method',
      categories: ['string'],
      actions: ['search'],
      phrases: ['comprobar si empieza con', 'saber cómo empieza un texto', 'verificar el inicio'],
      summary: 'Comprueba si el string empieza con el texto indicado. Devuelve true o false.',
      syntax: ['texto.startsWith(textoABuscar)'],
      parameters: [{ name: 'textoABuscar', description: 'El texto con el que debería empezar el string.' }],
      returns: { type: 'boolean', description: 'true si el string empieza con ese texto; false si no.' },
      keyPoints: ['Solo revisa el inicio: si el texto está en otra parte, devuelve false.', 'Distingue mayúsculas de minúsculas.'],
      examples: [
        {
          title: 'Comprobar con qué empieza un texto',
          fromNotes: true,
          code: `
            "Vendetta".startsWith("V") // true
            "La cita perfecta".startsWith("Cena y película") // false
          `,
        },
        {
          title: 'Si el texto está en otra parte, da false',
          code: `
            const frase = "me gusta el café"

            frase.startsWith("café") // false
            frase.includes("café") // true
          `,
        },
        { title: 'Distingue mayúsculas de minúsculas', code: `"Vendetta".startsWith("v") // false` },
      ],
      related: ['string.endsWith', 'string.includes', 'string.indexOf'],
      sections: ['9'],
    },
    {
      id: 'string.endsWith',
      name: 'endsWith()',
      kind: 'method',
      categories: ['string'],
      actions: ['search'],
      phrases: ['comprobar si termina con', 'saber cómo termina un texto', 'verificar el final'],
      summary: 'Comprueba si el string termina con el texto indicado. Devuelve true o false.',
      syntax: ['texto.endsWith(textoABuscar)'],
      parameters: [{ name: 'textoABuscar', description: 'El texto con el que debería terminar el string.' }],
      returns: { type: 'boolean', description: 'true si el string termina con ese texto; false si no.' },
      keyPoints: ['Solo revisa el final: si el texto está en otra parte, devuelve false.', 'Distingue mayúsculas de minúsculas.'],
      examples: [
        {
          title: 'Comprobar con qué termina un texto',
          fromNotes: true,
          code: `
            const theRealEnd = "Este no es el final"
            theRealEnd.endsWith("final") // true
          `,
        },
        {
          title: 'Si el texto está en otra parte, da false',
          code: `
            const saludo = "Hola Jeni"

            saludo.endsWith("Hola") // false
            saludo.startsWith("Hola") // true
          `,
        },
        {
          title: 'Comprobar la extensión de un archivo',
          code: `
            const archivo = "script.js"
            archivo.endsWith(".js") // true
          `,
        },
      ],
      related: ['string.startsWith', 'string.includes'],
      sections: ['9'],
    },
  ],
  comparisons: [
    {
      id: 'string.starts-ends',
      title: '¿En qué parte del texto está?',
      description: 'includes() busca en cualquier parte; startsWith() solo al inicio y endsWith() solo al final.',
      concepts: ['string.includes', 'string.startsWith', 'string.endsWith'],
      inputHeaders: ['texto', 'buscar'],
      columns: [
        { header: 'texto.includes(buscar)', template: '$1.includes($2)' },
        { header: 'texto.startsWith(buscar)', template: '$1.startsWith($2)' },
        { header: 'texto.endsWith(buscar)', template: '$1.endsWith($2)' },
      ],
      rows: [
        { inputs: ['"Este no es el final"', '"Este"'], results: ['true', 'true', 'false'] },
        { inputs: ['"Este no es el final"', '"final"'], results: ['true', 'false', 'true'] },
        { inputs: ['"Este no es el final"', '"es el"'], results: ['true', 'false', 'false'] },
        { inputs: ['"Este no es el final"', '"Final"'], results: ['false', 'false', 'false'] },
      ],
    },
  ],
}

export default strings
