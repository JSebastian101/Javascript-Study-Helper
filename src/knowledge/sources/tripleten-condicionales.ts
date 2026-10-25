import type { KnowledgeSource } from '../model'

/**
 * Contenido de wiki/tripleten/condicionales.md. Las preguntas sobre ==, ===,
 * !=, !==, >, >=, if/else, && y || enriquecen los conceptos de logic.ts.
 */
const condicionales: KnowledgeSource = {
  id: 'tripleten-condicionales',
  title: 'Condicionales (TripleTen)',
  file: 'wiki/tripleten/condicionales.md',
  order: 60,
  concepts: [
    {
      id: 'logic.less',
      name: '<',
      aka: 'Menor que',
      kind: 'operator',
      categories: ['logic', 'number'],
      actions: ['compare'],
      phrases: ['saber si es menor', 'menor que', 'no llegar a un valor'],
      summary: 'Compara si el valor de la izquierda es menor que el de la derecha. Devuelve un booleano.',
      syntax: ['a < b'],
      returns: { type: 'boolean', description: 'true si a es menor que b; false si no.' },
      keyPoints: ['Si los dos valores son iguales, el resultado es false.'],
      examples: [
        {
          title: 'Comparar dos números',
          fromNotes: true,
          code: `
            7 < 6 // false
            6 < 7 // true
          `,
        },
        { title: 'Cuando los valores son iguales', code: `5 < 5 // false` },
        {
          title: 'Comparar con un valor guardado',
          code: `
            const temperatura = 12
            temperatura < 15 // true
          `,
        },
      ],
      related: ['logic.less-equal', 'logic.greater'],
      sections: ['2'],
    },
    {
      id: 'logic.less-equal',
      name: '<=',
      aka: 'Menor o igual que',
      kind: 'operator',
      categories: ['logic', 'number'],
      actions: ['compare'],
      phrases: ['menor o igual', 'como máximo', 'no pasar de un valor'],
      summary: 'Compara si el valor de la izquierda es menor o igual que el de la derecha. Devuelve un booleano.',
      syntax: ['a <= b'],
      returns: { type: 'boolean', description: 'true si a es menor o igual que b; false si es mayor.' },
      keyPoints: ['A diferencia de <, si los dos valores son iguales el resultado es true.'],
      examples: [
        { title: 'Comparar dos números', fromNotes: true, code: `7 <= 6 // false` },
        {
          title: 'La diferencia con <',
          code: `
            5 <= 5 // true
            5 < 5 // false
          `,
        },
        {
          title: 'Comprobar un límite',
          code: `
            const invitados = 30
            invitados <= 30 // true
          `,
        },
      ],
      related: ['logic.less', 'logic.greater-equal'],
      sections: ['2'],
    },
    {
      id: 'logic.not',
      name: '!',
      aka: 'NOT: invierte un booleano',
      kind: 'operator',
      categories: ['logic'],
      actions: ['combine-conditions'],
      phrases: ['negar una condición', 'lo contrario', 'invertir true y false', 'que no se cumpla'],
      summary: 'Es el operador NOT, que indica negación: invierte el valor de un booleano. true pasa a ser false y false pasa a ser true.',
      syntax: ['!condición'],
      returns: { type: 'boolean', description: 'El valor contrario: false si la condición es true, y true si es false.' },
      keyPoints: [
        'Va delante del valor que se quiere negar.',
        'También forma parte de los operadores de desigualdad: != y !== se leen "no es igual a".',
        'Se puede combinar con && y ||.',
      ],
      examples: [
        {
          title: 'Invertir un booleano',
          fromNotes: true,
          code: `
            let isSunny = true
            let isRaining = false

            !isSunny // false
            !isRaining // true
          `,
        },
        {
          title: 'Combinar ! con && y ||',
          fromNotes: true,
          code: `
            let isCold = true
            let isSnowing = false

            console.log(isCold && !isSnowing) // true
            console.log(!isCold || isSnowing) // false
          `,
          explanation: '!isSnowing es true, y true && true es true. !isCold es false, y false || false es false.',
        },
        {
          title: 'Negar una comparación',
          code: `
            const edad = 15
            !(edad >= 18) // true
          `,
        },
        {
          title: 'Dentro de un if',
          code: `
            const tieneEntrada = false

            if (!tieneEntrada) {
              console.log("Primero compra la entrada")
            }
          `,
        },
      ],
      related: ['logic.and', 'logic.or', 'logic.strict-inequality', 'variables.boolean'],
      highlight: ['!'],
      sections: ['4', '9', '11'],
    },
  ],
}

export default condicionales
