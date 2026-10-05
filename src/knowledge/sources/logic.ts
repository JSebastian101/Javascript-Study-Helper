import type { KnowledgeSource } from '../model'

/**
 * Contenido de wiki/numbers.md (preguntas 7, 8 y 10–13): comparaciones,
 * condicionales y operadores lógicos. Están en los apuntes de números, pero
 * conceptualmente forman su propia categoría.
 */
const logic: KnowledgeSource = {
  id: 'logic',
  title: 'Números',
  file: 'wiki/numbers.md',
  order: 30,
  concepts: [
    {
      id: 'logic.loose-equality',
      name: '==',
      aka: 'Igualdad (con coerción)',
      kind: 'operator',
      categories: ['logic', 'number', 'string'],
      actions: ['compare'],
      phrases: ['saber si son iguales', 'comparar el valor', 'igualdad con coerción'],
      summary: 'Compara si dos valores son iguales. Antes de comparar hace coerción: si los tipos son diferentes, los convierte.',
      syntax: ['a == b'],
      returns: { type: 'boolean', description: 'true si los valores son iguales después de convertirlos; false si no.' },
      keyPoints: ['Compara el valor haciendo coerción.', '5 == "5" es true porque convierte "5" en número antes de comparar.'],
      examples: [
        { title: 'Número y string con el mismo valor', fromNotes: true, code: `5 == "5" // true` },
        {
          title: 'Comparar dos números',
          code: `
            5 == 5 // true
            5 == 8 // false
          `,
        },
        { title: 'Comparar dos strings', code: `"hola" == "hola" // true` },
      ],
      related: ['logic.strict-equality', 'logic.loose-inequality', 'number.coercion'],
      sections: ['7'],
    },
    {
      id: 'logic.strict-equality',
      name: '===',
      aka: 'Igualdad estricta',
      kind: 'operator',
      categories: ['logic', 'number', 'string'],
      actions: ['compare'],
      phrases: ['saber si son exactamente iguales', 'comparar tipo y valor', 'igualdad estricta'],
      summary: 'Compara si dos valores son iguales en tipo de dato y en valor. No hace coerción.',
      syntax: ['a === b'],
      returns: { type: 'boolean', description: 'true si tienen el mismo tipo y el mismo valor; false si no.' },
      keyPoints: [
        'Compara el tipo de dato y el valor.',
        '5 === "5" es false porque uno es number y el otro es string.',
        'Al comparar strings, distingue mayúsculas de minúsculas.',
      ],
      examples: [
        { title: 'Número y string con el mismo valor', fromNotes: true, code: `5 === "5" // false` },
        { title: 'Mismo tipo y mismo valor', code: `5 === 5 // true` },
        {
          title: 'Comparar strings',
          code: `
            const color = "rojo"

            color === "rojo" // true
            "Rojo" === "rojo" // false
          `,
        },
        {
          title: 'Usarlo en una condición',
          code: `
            const respuesta = "si"

            if (respuesta === "si") {
              console.log("Confirmado")
            }
          `,
        },
      ],
      related: ['logic.loose-equality', 'logic.strict-inequality', 'logic.if-else'],
      sections: ['7'],
    },
    {
      id: 'logic.loose-inequality',
      name: '!=',
      aka: 'Desigualdad (con coerción)',
      kind: 'operator',
      categories: ['logic', 'number', 'string'],
      actions: ['compare'],
      phrases: ['saber si son diferentes', 'comparar si no son iguales'],
      summary: 'Compara si dos valores son diferentes. Hace coerción antes de comparar.',
      syntax: ['a != b'],
      returns: { type: 'boolean', description: 'true si los valores son diferentes después de convertirlos; false si son iguales.' },
      keyPoints: ['Comprueba el valor haciendo coerción.', '5 != "5" es false porque, después de convertir, los valores son iguales.'],
      examples: [
        { title: 'Número y string con el mismo valor', fromNotes: true, code: `5 != "5" // false` },
        { title: 'Valores diferentes', code: `5 != 8 // true` },
      ],
      related: ['logic.strict-inequality', 'logic.loose-equality'],
      sections: ['8'],
    },
    {
      id: 'logic.strict-inequality',
      name: '!==',
      aka: 'Desigualdad estricta',
      kind: 'operator',
      categories: ['logic', 'number', 'string'],
      actions: ['compare'],
      phrases: ['saber si son diferentes en tipo o valor', 'desigualdad estricta'],
      summary: 'Compara si dos valores son diferentes en tipo o en valor. No hace coerción.',
      syntax: ['a !== b'],
      returns: { type: 'boolean', description: 'true si el tipo o el valor son diferentes; false si son exactamente iguales.' },
      keyPoints: ['Comprueba el tipo y el valor, sin coerción.', '5 !== "5" es true porque los tipos son diferentes.'],
      examples: [
        { title: 'Número y string con el mismo valor', fromNotes: true, code: `5 !== "5" // true` },
        { title: 'Exactamente iguales', code: `5 !== 5 // false` },
        {
          title: 'Comprobar que un resultado no es -1',
          code: `
            const posicion = "hola".indexOf("z")
            posicion !== -1 // false
          `,
          explanation: 'indexOf() retorna -1 porque "z" no está, así que posicion !== -1 es false.',
        },
      ],
      related: ['logic.loose-inequality', 'logic.strict-equality'],
      sections: ['8'],
    },
    {
      id: 'logic.greater',
      name: '>',
      aka: 'Mayor que',
      kind: 'operator',
      categories: ['logic', 'number'],
      actions: ['compare'],
      phrases: ['saber si es mayor', 'mayor que', 'superar un valor'],
      summary: 'Compara si el valor de la izquierda es mayor que el de la derecha.',
      syntax: ['a > b'],
      returns: { type: 'boolean', description: 'true si a es mayor que b; false si no.' },
      keyPoints: ['Si los dos valores son iguales, el resultado es false.'],
      examples: [
        {
          title: 'Comparar dos números',
          code: `
            10 > 5 // true
            5 > 5 // false
          `,
        },
        {
          title: 'Comparar con un valor guardado',
          fromNotes: true,
          code: `
            const temperatura = 25
            temperatura > 30 // false
          `,
        },
        {
          title: 'Saber si un número es mayor que cero',
          code: `
            const cantidad = -50
            cantidad > 0 // false
          `,
        },
      ],
      related: ['logic.greater-equal', 'logic.if-else'],
      sections: ['11'],
    },
    {
      id: 'logic.greater-equal',
      name: '>=',
      aka: 'Mayor o igual que',
      kind: 'operator',
      categories: ['logic', 'number'],
      actions: ['compare'],
      phrases: ['mayor o igual', 'como mínimo', 'alcanzar un valor'],
      summary: 'Compara si el valor de la izquierda es mayor o igual que el de la derecha.',
      syntax: ['a >= b'],
      returns: { type: 'boolean', description: 'true si a es mayor o igual que b; false si es menor.' },
      keyPoints: ['A diferencia de >, si los dos valores son iguales el resultado es true.'],
      examples: [
        {
          title: 'Comparar con un valor guardado',
          fromNotes: true,
          code: `
            const puntaje = 72

            puntaje >= 70 // true
            puntaje >= 90 // false
          `,
        },
        {
          title: 'La diferencia con >',
          code: `
            5 >= 5 // true
            5 > 5 // false
          `,
        },
      ],
      related: ['logic.greater', 'logic.if-else'],
      sections: ['10'],
    },
    {
      id: 'logic.if-else',
      name: 'if / else',
      aka: 'Condicional: ejecutar código según una condición',
      kind: 'statement',
      categories: ['logic'],
      actions: ['decide'],
      phrases: [
        'si pasa algo, hacer algo',
        'si no, hacer otra cosa',
        'revisar varias condiciones en orden',
        'tomar una decisión',
        'validar antes de hacer algo',
      ],
      summary:
        'Ejecuta un bloque de código solo si una condición se cumple. Con else if se revisan más condiciones, y else se ejecuta cuando ninguna se cumplió.',
      syntax: [
        `
          if (condición) {
            // se ejecuta si la condición es true
          } else if (otraCondición) {
            // se ejecuta si la anterior fue false y esta es true
          } else {
            // se ejecuta si ninguna se cumplió
          }
        `,
      ],
      keyPoints: [
        'Las condiciones se revisan en orden, de arriba hacia abajo.',
        'Solo se ejecuta el primer bloque cuya condición sea true.',
        'else if y else son opcionales.',
      ],
      examples: [
        {
          title: 'Varias condiciones en orden',
          fromNotes: true,
          code: `
            const puntaje = 72

            if (puntaje >= 90) {
              console.log("obtuviste un 4.8")
            } else if (puntaje >= 80) {
              console.log("obtuviste un 4.3")
            } else if (puntaje >= 70) {
              console.log("obtuviste un 3.5")
            } else {
              console.log("perdiste el examen")
            }
            // se muestra: obtuviste un 3.5
          `,
          explanation: '72 no es mayor o igual a 90 ni a 80, pero sí a 70. Ese es el primer bloque que se ejecuta.',
        },
        {
          title: 'Solo if',
          code: `
            const edad = 20

            if (edad >= 18) {
              console.log("Es mayor de edad")
            }
          `,
        },
        {
          title: 'if con else',
          fromNotes: true,
          code: `
            const temperatura = 25
            let mensaje

            if (temperatura >= 30) {
              mensaje = "Que día más soleado"
            } else {
              mensaje = "Que día más frío"
            }

            console.log(mensaje) // "Que día más frío"
          `,
        },
        {
          title: 'Con una condición combinada',
          code: `
            const edad = 25
            const tieneEntrada = true

            if (edad >= 18 && tieneEntrada) {
              console.log("Puede entrar")
            } else {
              console.log("No puede entrar")
            }
          `,
        },
      ],
      related: ['logic.ternary', 'logic.and', 'logic.or'],
      highlight: ['if', 'else'],
      sections: ['10', '11'],
    },
    {
      id: 'logic.ternary',
      name: 'condición ? a : b',
      aka: 'Operador ternario',
      kind: 'operator',
      categories: ['logic'],
      actions: ['decide'],
      phrases: ['elegir entre dos valores', 'if/else en una línea', 'guardar un valor u otro según una condición'],
      summary: 'Es una forma corta de escribir un if/else cuando quieres elegir entre dos valores según una condición.',
      syntax: ['condición ? resultadoVerdadero : resultadoFalso'],
      returns: { description: 'El valor que está después del ? si la condición es true, o el que está después de los : si es false.' },
      keyPoints: [
        'Después del ? va el resultado si la condición es true.',
        'Después de los : va el resultado si la condición es false.',
        'Se usa para elegir un valor, por ejemplo para guardarlo en una variable.',
      ],
      examples: [
        {
          title: 'Convertir un if/else en ternario',
          fromNotes: true,
          code: `
            const temperatura = 25

            let mensaje = temperatura >= 30
              ? "Que día más soleado"
              : "Que día más frío"

            console.log(mensaje) // "Que día más frío"
          `,
        },
        {
          title: 'El mismo resultado con if/else y con ternario',
          code: `
            const edad = 15

            let tipo
            if (edad >= 18) {
              tipo = "adulto"
            } else {
              tipo = "menor"
            }

            const tipo2 = edad >= 18 ? "adulto" : "menor"

            console.log(tipo) // "menor"
            console.log(tipo2) // "menor"
          `,
        },
        {
          title: 'Dentro de un texto con comillas invertidas',
          code: `
            const cantidad = 1
            const texto = \`Tienes \${cantidad} \${cantidad === 1 ? "mensaje" : "mensajes"}\`

            console.log(texto) // "Tienes 1 mensaje"
          `,
        },
      ],
      related: ['logic.if-else'],
      highlight: ['?', ':'],
      sections: ['11'],
    },
    {
      id: 'logic.or',
      name: '||',
      aka: 'O: basta con que una condición se cumpla',
      kind: 'operator',
      categories: ['logic'],
      actions: ['combine-conditions'],
      phrases: ['que se cumpla al menos una', 'una condición u otra', 'cualquiera de las dos'],
      summary: 'Combina condiciones. El resultado es true si al menos una de ellas es true; solo es false cuando todas son false.',
      syntax: ['condición1 || condición2'],
      returns: { type: 'boolean', description: 'true si al menos una condición es true; false si todas son false.' },
      examples: [
        {
          title: 'Al menos una condición se cumple',
          code: `
            const esFinDeSemana = true
            const esFestivo = false

            esFinDeSemana || esFestivo // true
          `,
        },
        {
          title: 'Ninguna se cumple',
          fromNotes: true,
          code: `false || false // false`,
        },
        {
          title: 'Comparar con dos valores posibles',
          code: `
            const dia = "domingo"
            dia === "sábado" || dia === "domingo" // true
          `,
        },
        {
          title: 'Dentro de un if',
          code: `
            const metodoDePago = "efectivo"

            if (metodoDePago === "efectivo" || metodoDePago === "tarjeta") {
              console.log("Pago aceptado")
            }
          `,
        },
      ],
      related: ['logic.and', 'logic.if-else'],
      sections: ['12', '13'],
    },
    {
      id: 'logic.and',
      name: '&&',
      aka: 'Y: todas las condiciones deben cumplirse',
      kind: 'operator',
      categories: ['logic'],
      actions: ['combine-conditions'],
      phrases: ['que se cumplan todas', 'una condición y otra', 'las dos a la vez'],
      summary: 'Combina condiciones. El resultado es true solo si todas son true; si alguna es false, el resultado es false.',
      syntax: ['condición1 && condición2'],
      returns: { type: 'boolean', description: 'true si todas las condiciones son true; false si alguna es false.' },
      examples: [
        {
          title: 'Las dos condiciones se cumplen',
          code: `
            const edad = 20
            const tienePermiso = true

            edad >= 18 && tienePermiso // true
          `,
        },
        {
          title: 'Una sola condición falsa basta para que sea false',
          fromNotes: true,
          code: `true && false // false`,
        },
        {
          title: 'Revisar dos características a la vez',
          code: `
            const color = "rojo"
            const talla = "M"

            color === "rojo" && talla === "M" // true
          `,
        },
        {
          title: 'Dentro de un if',
          code: `
            const edad = 25
            const tieneEntrada = true

            if (edad >= 18 && tieneEntrada) {
              console.log("Puede entrar")
            }
          `,
        },
      ],
      related: ['logic.or', 'logic.if-else'],
      sections: ['12', '13'],
    },
  ],
  comparisons: [
    {
      id: 'logic.equality',
      title: 'Los mismos valores con cada operador de igualdad',
      description: 'Las versiones de tres símbolos (===, !==) no hacen coerción.',
      concepts: ['logic.loose-equality', 'logic.strict-equality', 'logic.loose-inequality', 'logic.strict-inequality'],
      inputHeaders: ['a', 'b'],
      columns: [
        { header: 'a == b', template: '$1 == $2' },
        { header: 'a === b', template: '$1 === $2' },
        { header: 'a != b', template: '$1 != $2' },
        { header: 'a !== b', template: '$1 !== $2' },
      ],
      rows: [
        { inputs: ['5', '"5"'], results: ['true', 'false', 'false', 'true'] },
        { inputs: ['5', '5'], results: ['true', 'true', 'false', 'false'] },
        { inputs: ['5', '8'], results: ['false', 'false', 'true', 'true'] },
      ],
    },
    {
      id: 'logic.greater',
      title: 'Mayor que y mayor o igual que',
      concepts: ['logic.greater', 'logic.greater-equal'],
      inputHeaders: ['a', 'b'],
      columns: [
        { header: 'a > b', template: '$1 > $2' },
        { header: 'a >= b', template: '$1 >= $2' },
      ],
      rows: [
        { inputs: ['10', '5'], results: ['true', 'true'] },
        { inputs: ['5', '5'], results: ['false', 'true'] },
        { inputs: ['3', '5'], results: ['false', 'false'] },
      ],
    },
    {
      id: 'logic.truth-table',
      title: 'Tablas de verdad',
      description: 'Todas las combinaciones posibles de dos condiciones.',
      concepts: ['logic.or', 'logic.and'],
      inputHeaders: ['a', 'b'],
      columns: [
        { header: 'a || b', template: '$1 || $2' },
        { header: 'a && b', template: '$1 && $2' },
      ],
      rows: [
        { inputs: ['true', 'true'], results: ['true', 'true'] },
        { inputs: ['true', 'false'], results: ['true', 'false'] },
        { inputs: ['false', 'false'], results: ['false', 'false'] },
        { inputs: ['false', 'true'], results: ['true', 'false'] },
      ],
    },
  ],
}

export default logic
