import type { KnowledgeSource } from '../model'

/** Contenido de wiki/numbers.md (preguntas 1–6, 9 y 14–24). */
const numbers: KnowledgeSource = {
  id: 'numbers',
  title: 'Números',
  file: 'wiki/numbers.md',
  order: 20,
  concepts: [
    {
      id: 'number.types',
      name: 'Tipos de números',
      aka: 'Enteros y decimales',
      kind: 'concept',
      categories: ['number'],
      actions: ['understand'],
      phrases: ['números enteros', 'números decimales', 'números con punto'],
      summary:
        'En JavaScript los números pueden ser enteros (sin parte decimal) o decimales (con parte decimal). Los dos son del tipo number.',
      tables: [
        {
          headers: ['Tipo', 'También se llama', 'Ejemplos'],
          rows: [
            ['Entero (sin decimales)', 'Int', '7, -20, 1500'],
            ['Decimal (con decimales)', 'Float', '3.5, -0.25, 9.99'],
          ],
          codeColumns: [2],
        },
      ],
      keyPoints: ['Los decimales se escriben con punto, no con coma: 3.5 y no 3,5.'],
      examples: [
        {
          title: 'Guardar un entero y un decimal',
          code: `
            const edad = 25
            const precio = 9.99
          `,
        },
        {
          title: 'Una operación entre enteros puede dar un decimal',
          code: `7 / 2 // 3.5`,
        },
      ],
      highlight: [],
      sections: ['1'],
    },
    {
      id: 'number.add',
      name: '+',
      aka: 'Suma',
      kind: 'operator',
      categories: ['number'],
      actions: ['calculate'],
      phrases: ['sumar', 'obtener el total', 'agregar una cantidad'],
      summary: 'Suma dos números.',
      syntax: ['a + b'],
      returns: { type: 'number', description: 'El resultado de la suma.' },
      keyPoints: ['Si uno de los valores es un string, + no suma: une los textos (coerción). 2 + "5" da "25".'],
      examples: [
        { title: 'Sumar dos números', code: `7 + 3 // 10` },
        {
          title: 'Sumar valores guardados en variables',
          code: `
            const precio = 1200
            const envio = 300
            const total = precio + envio

            console.log(total) // 1500
          `,
        },
        { title: 'Con decimales', code: `2.5 + 1.25 // 3.75` },
        {
          title: 'Cuidado: con un string, + une en lugar de sumar',
          fromNotes: true,
          code: `2 + "5" // "25"`,
        },
      ],
      related: ['number.coercion', 'number.compound-assignment'],
      sections: ['2', '3'],
    },
    {
      id: 'number.subtract',
      name: '-',
      aka: 'Resta',
      kind: 'operator',
      categories: ['number'],
      actions: ['calculate'],
      phrases: ['restar', 'descontar', 'quitar una cantidad', 'calcular la diferencia'],
      summary: 'Resta el segundo número al primero.',
      syntax: ['a - b'],
      returns: { type: 'number', description: 'El resultado de la resta.' },
      keyPoints: ['El resultado puede ser negativo.', 'Si uno de los valores es un string con un número, - lo convierte a número (coerción).'],
      examples: [
        { title: 'Restar dos números', code: `10 - 4 // 6` },
        { title: 'El resultado puede ser negativo', code: `3 - 8 // -5` },
        {
          title: 'Descontar de un valor guardado',
          code: `
            const puntos = 500
            const penalizacion = 120

            puntos - penalizacion // 380
          `,
        },
        { title: 'Con un string, - sí convierte a número', fromNotes: true, code: `2 - "5" // -3` },
      ],
      related: ['number.coercion', 'number.compound-assignment'],
      sections: ['2', '3'],
    },
    {
      id: 'number.multiply',
      name: '*',
      aka: 'Multiplicación',
      kind: 'operator',
      categories: ['number'],
      actions: ['calculate'],
      phrases: ['multiplicar', 'calcular el doble', 'calcular el triple', 'veces'],
      summary: 'Multiplica dos números.',
      syntax: ['a * b'],
      returns: { type: 'number', description: 'El resultado de la multiplicación.' },
      examples: [
        { title: 'Multiplicar dos números', code: `6 * 7 // 42` },
        {
          title: 'Calcular el doble',
          code: `
            const cantidad = 15
            cantidad * 2 // 30
          `,
        },
        {
          title: 'Precio por cantidad',
          code: `
            const precio = 2500
            const unidades = 3

            precio * unidades // 7500
          `,
        },
        { title: 'Con un string, * convierte a número', fromNotes: true, code: `2 * "5" // 10` },
      ],
      related: ['number.coercion', 'number.compound-assignment', 'number.power'],
      sections: ['2', '3'],
    },
    {
      id: 'number.divide',
      name: '/',
      aka: 'División',
      kind: 'operator',
      categories: ['number'],
      actions: ['calculate'],
      phrases: ['dividir', 'repartir en partes iguales', 'calcular la mitad'],
      summary: 'Divide el primer número entre el segundo.',
      syntax: ['a / b'],
      returns: { type: 'number', description: 'El resultado de la división. Puede tener decimales.' },
      keyPoints: ['El resultado puede tener decimales aunque los dos números sean enteros.'],
      examples: [
        { title: 'Dividir dos números', code: `20 / 4 // 5` },
        { title: 'El resultado puede tener decimales', code: `7 / 2 // 3.5` },
        {
          title: 'Calcular la mitad',
          code: `
            const total = 90
            total / 2 // 45
          `,
        },
        { title: 'Con un string, / convierte a número', fromNotes: true, code: `20 / "5" // 4` },
      ],
      related: ['number.modulo', 'number.math-round', 'number.math-floor'],
      sections: ['2', '3'],
    },
    {
      id: 'number.modulo',
      name: '%',
      aka: 'Módulo (residuo)',
      kind: 'operator',
      categories: ['number'],
      actions: ['calculate'],
      phrases: ['obtener el residuo', 'lo que sobra de una división', 'el resto de dividir'],
      summary: 'Divide dos números y da como resultado lo que sobra de esa división (el residuo).',
      syntax: ['a % b'],
      returns: { type: 'number', description: 'El residuo de dividir a entre b.' },
      keyPoints: ['No da el resultado de la división, sino lo que sobra.', 'Si la división es exacta, el residuo es 0.'],
      examples: [
        { title: 'Obtener el residuo', fromNotes: true, code: `13 % 6 // 1` },
        {
          title: 'Lo que sobra al repartir',
          code: `
            const dulces = 17
            const ninos = 5

            dulces % ninos // 2
          `,
          explanation: 'Al repartir 17 dulces entre 5 niños, a cada uno le tocan 3 y sobran 2.',
        },
        { title: 'Cuando la división es exacta, el residuo es 0', code: `10 % 5 // 0` },
      ],
      related: ['number.divide'],
      sections: ['2'],
    },
    {
      id: 'number.power',
      name: '**',
      aka: 'Exponente (potencia)',
      kind: 'operator',
      categories: ['number'],
      actions: ['calculate'],
      phrases: ['elevar a una potencia', 'elevar al cuadrado', 'elevar al cubo'],
      summary: 'Eleva un número a una potencia: multiplica el número por sí mismo las veces que indica el exponente.',
      syntax: ['base ** exponente'],
      returns: { type: 'number', description: 'El resultado de la potencia.' },
      examples: [
        { title: 'Elevar a una potencia', fromNotes: true, code: `2 ** 4 // 16` },
        { title: 'Elevar al cuadrado', code: `5 ** 2 // 25` },
        { title: 'Elevar al cubo', code: `3 ** 3 // 27` },
      ],
      related: ['number.multiply'],
      sections: ['2'],
    },
    {
      id: 'number.coercion',
      name: 'Coerción de datos',
      aka: 'Conversión automática de tipos',
      kind: 'concept',
      categories: ['number', 'string', 'variables'],
      actions: ['understand', 'convert'],
      phrases: ['conversión automática', 'mezclar texto y números', 'por qué 2 + "5" da "25"', 'coerción implícita', 'conversión implícita'],
      summary:
        'La coerción es cuando se convierte el tipo de un dato a otro diferente. En la coerción implícita, el programa convierte los datos automáticamente según la operación.',
      keyPoints: [
        'Con +, si uno de los valores es un string, los valores se unen como texto.',
        'Con -, * y /, el string se convierte a número.',
        'undefined se convierte en NaN y null se convierte en 0.',
        'NaN significa "Not a Number": el resultado no es un número válido.',
        'Es mejor evitarla: hace que el código sea confuso y puede causar errores difíciles de encontrar, porque no siempre aparecen en la consola.',
        'Para convertir de forma explícita, usa String(), Number() o Boolean().',
      ],
      examples: [
        {
          title: 'Ejemplos de coerción implícita',
          fromNotes: true,
          code: `
            const resultado = 2 + "5" // "25"
            const resultado2 = 2 - "5" // -3
            const resultado3 = 2 * "5" // 10
            const resultado4 = 20 / "5" // 4
            const resultado5 = 2 - undefined // NaN
            const resultado6 = 2 - null // 2
          `,
        },
        {
          title: 'La misma operación con + y con -',
          code: `
            "10" + 5 // "105"
            "10" - 5 // 5
          `,
        },
        {
          title: 'Coerción al comparar con ==',
          fromNotes: true,
          code: `
            5 == "5" // true
            5 === "5" // false
          `,
          explanation: '== hace coerción antes de comparar; === no.',
        },
        {
          title: 'Aunque los dos valores sean strings',
          fromNotes: true,
          code: `
            "10" * "2" // 20
            "15" - 5 // 10
          `,
          explanation: 'Con *, - y / los strings se convierten en números, incluso si los dos valores son strings.',
        },
      ],
      related: [
        'number.unary-plus',
        'number.Number',
        'logic.loose-equality',
        'logic.strict-equality',
        'string.concatenation',
        'string.String',
        'number.NaN',
      ],
      highlight: [],
      sections: ['3'],
      alsoIn: [{ file: 'wiki/tripleten/fundamentos-js.md', title: 'Fundamentos de JavaScript (TripleTen)', sections: ['6'] }],
    },
    {
      id: 'number.increment',
      name: '++ / --',
      aka: 'Incremento y decremento',
      kind: 'operator',
      categories: ['number', 'loops'],
      actions: ['update'],
      phrases: ['sumar uno', 'aumentar en 1', 'restar uno', 'disminuir en 1', 'incrementar', 'decrementar', 'llevar un contador'],
      summary: '++ suma 1 al valor de una variable y -- le resta 1. El nuevo valor queda guardado en la misma variable.',
      syntax: ['variable++', 'variable--', '++variable', '--variable'],
      keyPoints: [
        'Pueden ir al principio o al final de la variable.',
        'La variable debe declararse con let, porque su valor va a cambiar.',
        'Son muy comunes en los bucles, para aumentar el contador: i++.',
      ],
      examples: [
        {
          title: 'Incrementar y decrementar',
          fromNotes: true,
          code: `
            let increment = 0
            let decrement = 5

            increment++
            decrement--
            console.log(increment) // 1
            console.log(decrement) // 4

            ++increment
            --decrement
            console.log(increment) // 2
            console.log(decrement) // 3
          `,
        },
        {
          title: 'Llevar un contador',
          code: `
            let visitas = 0
            visitas++
            visitas++
            visitas++

            console.log(visitas) // 3
          `,
        },
        {
          title: 'Es lo mismo que sumar 1 y guardar',
          code: `
            let a = 10
            let b = 10

            a++
            b = b + 1

            console.log(a) // 11
            console.log(b) // 11
          `,
        },
        {
          title: 'Combinar ++ con -=',
          fromNotes: true,
          code: `
            let counter = 7
            counter++
            counter -= 2

            console.log(counter) // 6
          `,
          explanation: 'El contador sube a 8 y después se le restan 2.',
        },
      ],
      related: ['number.compound-assignment', 'loops.for'],
      highlight: ['++', '--'],
      sections: ['4'],
      alsoIn: [{ file: 'wiki/tripleten/bucles.md', title: 'Bucles (TripleTen)', sections: ['1', '2', '3'] }],
    },
    {
      id: 'number.compound-assignment',
      name: '+= -= *= /= %= **=',
      aka: 'Operadores de operación y asignación',
      kind: 'operator',
      categories: ['number', 'loops'],
      actions: ['update'],
      phrases: ['acumular', 'sumar a lo que ya tiene', 'actualizar un total', 'aumentar en una cantidad', 'descontar de una variable', 'operar y guardar'],
      summary: 'Realizan una operación con el valor de la variable y asignan el resultado a esa misma variable.',
      syntax: ['variable += valor', 'variable -= valor', 'variable *= valor', 'variable /= valor', 'variable %= valor', 'variable **= valor'],
      tables: [
        {
          title: 'Equivalencias',
          headers: ['Operador', 'Es lo mismo que'],
          rows: [
            ['x += 5', 'x = x + 5'],
            ['x -= 5', 'x = x - 5'],
            ['x *= 5', 'x = x * 5'],
            ['x /= 5', 'x = x / 5'],
            ['x %= 5', 'x = x % 5'],
            ['x **= 5', 'x = x ** 5'],
          ],
          codeColumns: [0, 1],
        },
      ],
      keyPoints: ['La variable debe declararse con let, porque su valor va a cambiar.', 'Es una forma corta de escribir variable = variable + valor.'],
      examples: [
        {
          title: 'Sumar y guardar (+=)',
          fromNotes: true,
          code: `
            let sum = 0
            sum += 10 // 10
          `,
        },
        {
          title: 'Restar y guardar (-=)',
          fromNotes: true,
          code: `
            let resta = 10
            resta -= 20 // -10
          `,
        },
        {
          title: 'Multiplicar y guardar (*=)',
          fromNotes: true,
          code: `
            let multiplicacion = 23
            multiplicacion *= 11 // 253
          `,
        },
        {
          title: 'Dividir y guardar (/=)',
          fromNotes: true,
          code: `
            let division = 20
            division /= 3 // 6.666666666666667
          `,
        },
        {
          title: 'Residuo y guardar (%=)',
          fromNotes: true,
          code: `
            let modulo = 13
            modulo %= 6 // 1
          `,
        },
        {
          title: 'Potencia y guardar (**=)',
          fromNotes: true,
          code: `
            let exponente = 2
            exponente **= 4 // 16
          `,
        },
        {
          title: 'Acumular un total',
          code: `
            let total = 0
            total += 1500
            total += 2500
            total += 1000

            console.log(total) // 5000
          `,
        },
      ],
      related: ['number.increment', 'number.add', 'number.subtract', 'loops.accumulator'],
      highlight: ['+=', '-=', '*=', '/=', '%=', '**='],
      sections: ['5', '6'],
      alsoIn: [{ file: 'wiki/tripleten/bucles.md', title: 'Bucles (TripleTen)', sections: ['1', '3'] }],
    },
    {
      id: 'number.unary-plus',
      name: '+valor',
      aka: 'Operador unario + (convierte a número)',
      kind: 'operator',
      categories: ['number', 'string'],
      actions: ['convert'],
      converts: { from: 'string', to: 'number' },
      phrases: ['convertir un string a número', 'pasar de texto a número', 'operador unario'],
      summary: 'Colocado delante de un string, lo convierte en número.',
      syntax: ['+texto'],
      returns: { type: 'number', description: 'El número que estaba escrito en el string, o NaN si no se puede convertir.' },
      keyPoints: [
        'Es un operador unario: necesita un solo operando.',
        'Va delante del valor, sin nada a su izquierda.',
        'Si el texto no es un número válido, el resultado es NaN.',
      ],
      examples: [
        {
          title: 'Convertir un string a número',
          fromNotes: true,
          code: `
            const str = "4"
            const num = +str

            console.log(num) // 4
          `,
        },
        { title: 'Con decimales', code: `+"3.5" // 3.5` },
        {
          title: 'Si el texto no es un número',
          code: `
            +"hola" // NaN
            +"12 manzanas" // NaN
          `,
        },
        {
          title: 'Diferencia con el + de la suma',
          code: `
            const texto = "4"

            texto + 1 // "41"
            +texto + 1 // 5
          `,
          explanation: 'Sin el + delante, "4" sigue siendo texto y se une con el 1.',
        },
      ],
      related: ['number.Number', 'number.parseInt', 'number.parseFloat', 'number.coercion'],
      highlight: [],
      sections: ['9'],
    },
    {
      id: 'number.math',
      name: 'Math',
      aka: 'Objeto con funciones para operar números',
      kind: 'object',
      categories: ['number'],
      actions: ['understand'],
      phrases: ['funciones matemáticas', 'objeto Math'],
      summary: 'El objeto Math es un conjunto de funciones para operar números.',
      syntax: ['Math.nombreDelMetodo(valores)'],
      keyPoints: ['Se escribe con M mayúscula.', 'Sus métodos se usan escribiendo Math, un punto y el nombre del método.'],
      tables: [
        {
          title: 'Métodos de Math que has estudiado',
          headers: ['Método', 'Qué hace'],
          rows: [
            ['Math.random()', 'Genera un número aleatorio entre 0 y 1.'],
            ['Math.max()', 'Retorna el número mayor.'],
            ['Math.min()', 'Retorna el número menor.'],
            ['Math.round()', 'Redondea al entero más cercano.'],
            ['Math.floor()', 'Redondea hacia abajo.'],
            ['Math.ceil()', 'Redondea hacia arriba.'],
            ['Math.trunc()', 'Elimina la parte decimal.'],
          ],
          codeColumns: [0],
        },
      ],
      examples: [
        {
          title: 'Usar métodos de Math',
          code: `
            Math.max(3, 9, 4) // 9
            Math.round(2.7) // 3
          `,
        },
      ],
      related: [
        'number.math-random',
        'number.math-max',
        'number.math-min',
        'number.math-round',
        'number.math-floor',
        'number.math-ceil',
        'number.math-trunc',
      ],
      sections: ['14'],
    },
    {
      id: 'number.math-random',
      name: 'Math.random()',
      kind: 'method',
      categories: ['number'],
      actions: ['random'],
      phrases: ['número aleatorio', 'número al azar', 'generar un número random'],
      summary: 'Genera un número aleatorio entre 0 y 1.',
      syntax: ['Math.random()'],
      parameters: [],
      returns: { type: 'number', description: 'Un número decimal aleatorio entre 0 y 1.' },
      keyPoints: [
        'No recibe argumentos.',
        'Cada vez que se ejecuta da un número diferente.',
        'Para obtener números enteros se combina con otros métodos de Math.',
      ],
      examples: [
        {
          title: 'Generar un número aleatorio',
          fromNotes: true,
          code: `Math.random() // por ejemplo 0.4728...`,
        },
        {
          title: 'Guardar el número aleatorio en una variable',
          code: `
            const azar = Math.random()
            console.log(azar) // cambia cada vez, por ejemplo 0.25
          `,
        },
        {
          title: 'Multiplicar para ampliar el rango',
          code: `Math.random() * 10 // un número entre 0 y 10, por ejemplo 7.31`,
        },
      ],
      related: ['number.random-range', 'number.math-floor'],
      sections: ['15'],
    },
    {
      id: 'number.random-range',
      name: 'Aleatorio entre un mínimo y un máximo',
      aka: 'Combinación de Math.random() y Math.floor()',
      kind: 'pattern',
      categories: ['number'],
      actions: ['random'],
      phrases: ['número aleatorio en un rango', 'número al azar entre dos valores', 'entero aleatorio'],
      summary: 'Combina Math.random() y Math.floor() para generar un número entero aleatorio entre un mínimo y un máximo.',
      syntax: ['Math.floor(Math.random() * (max - min) + min)'],
      returns: { type: 'number', description: 'Un número entero aleatorio desde min hasta max, sin incluir max.' },
      keyPoints: [
        'Math.random() * (max - min) da un número entre 0 y la distancia entre max y min.',
        'Al sumar min, el rango empieza en min.',
        'Math.floor() redondea hacia abajo, así que el resultado nunca llega a max.',
      ],
      examples: [
        {
          title: 'Entre 0 y 100',
          fromNotes: true,
          code: `
            const min = 0
            const max = 100

            const result = Math.floor(Math.random() * (max - min) + min)
            console.log(result) // un número entero desde 0 hasta 99
          `,
        },
        {
          title: 'Entre 10 y 20',
          code: `
            const min = 10
            const max = 20

            const numero = Math.floor(Math.random() * (max - min) + min)
            console.log(numero) // un número entero desde 10 hasta 19
          `,
        },
        {
          title: 'Paso a paso con un valor fijo',
          code: `
            const azar = 0.37
            const min = 10
            const max = 20

            azar * (max - min) // 3.7
            azar * (max - min) + min // 13.7
            Math.floor(azar * (max - min) + min) // 13
          `,
          explanation: 'Aquí se usa 0.37 en lugar de Math.random() para poder ver cada paso con un número fijo.',
        },
      ],
      related: ['number.math-random', 'number.math-floor'],
      highlight: ['random', 'floor'],
      sections: ['16'],
    },
    {
      id: 'number.math-max',
      name: 'Math.max()',
      kind: 'method',
      categories: ['number'],
      actions: ['min-max'],
      phrases: ['obtener el mayor', 'el número más grande', 'el máximo'],
      summary: 'Retorna el número mayor de un listado de números.',
      syntax: ['Math.max(numero1, numero2, numero3)'],
      parameters: [{ name: 'números', description: 'Los números que quieres comparar, separados por comas.' }],
      returns: { type: 'number', description: 'El número más grande del listado.' },
      examples: [
        { title: 'Obtener el mayor', fromNotes: true, code: `const mayor = Math.max(100, 50, 101) // 101` },
        {
          title: 'Con valores guardados en variables',
          code: `
            const nota1 = 3.5
            const nota2 = 4.2
            const nota3 = 3.9

            Math.max(nota1, nota2, nota3) // 4.2
          `,
        },
        { title: 'Con números negativos', code: `Math.max(-10, -3, -7) // -3` },
      ],
      related: ['number.math-min'],
      sections: ['17'],
    },
    {
      id: 'number.math-min',
      name: 'Math.min()',
      kind: 'method',
      categories: ['number'],
      actions: ['min-max'],
      phrases: ['obtener el menor', 'el número más pequeño', 'el mínimo'],
      summary: 'Retorna el número menor de un listado de números.',
      syntax: ['Math.min(numero1, numero2, numero3)'],
      parameters: [{ name: 'números', description: 'Los números que quieres comparar, separados por comas.' }],
      returns: { type: 'number', description: 'El número más pequeño del listado.' },
      examples: [
        { title: 'Obtener el menor', fromNotes: true, code: `const menor = Math.min(80, 79, 81) // 79` },
        {
          title: 'Con valores guardados en variables',
          code: `
            const precioA = 12000
            const precioB = 9500
            const precioC = 11000

            Math.min(precioA, precioB, precioC) // 9500
          `,
        },
        { title: 'Con números negativos', code: `Math.min(-10, -3, -7) // -10` },
      ],
      related: ['number.math-max'],
      sections: ['18'],
    },
    {
      id: 'number.math-round',
      name: 'Math.round()',
      kind: 'method',
      categories: ['number'],
      actions: ['round'],
      phrases: ['redondear', 'redondear al entero más cercano'],
      summary: 'Redondea al número entero más cercano.',
      syntax: ['Math.round(numero)'],
      parameters: [{ name: 'numero', description: 'El número que quieres redondear.' }],
      returns: { type: 'number', description: 'El entero más cercano.' },
      keyPoints: ['Si la parte decimal es .5 o más, redondea hacia arriba; si es menor, hacia abajo.'],
      examples: [
        {
          title: 'Redondear al más cercano',
          fromNotes: true,
          code: `
            Math.round(15.4) // 15
            Math.round(15.5) // 16
          `,
        },
        {
          title: 'Con un valor guardado en una variable',
          code: `
            const promedio = 3.76
            Math.round(promedio) // 4
          `,
        },
      ],
      related: ['number.math-floor', 'number.math-ceil', 'number.math-trunc', 'number.toFixed'],
      sections: ['19'],
    },
    {
      id: 'number.math-floor',
      name: 'Math.floor()',
      kind: 'method',
      categories: ['number'],
      actions: ['round'],
      phrases: ['redondear hacia abajo', 'quitar los decimales hacia abajo'],
      summary: 'Redondea un número hacia abajo.',
      syntax: ['Math.floor(numero)'],
      parameters: [{ name: 'numero', description: 'El número que quieres redondear.' }],
      returns: { type: 'number', description: 'El entero que queda al redondear hacia abajo.' },
      keyPoints: ['Siempre redondea hacia abajo, aunque la parte decimal sea grande.'],
      examples: [
        {
          title: 'Redondear hacia abajo',
          fromNotes: true,
          code: `
            Math.floor(15.4) // 15
            Math.floor(15.5) // 15
          `,
        },
        { title: 'Aunque el decimal sea grande', code: `Math.floor(15.9) // 15` },
        { title: 'Redondear el resultado de una división', code: `Math.floor(10 / 3) // 3` },
      ],
      related: ['number.math-round', 'number.math-ceil', 'number.math-trunc', 'number.random-range'],
      sections: ['19'],
    },
    {
      id: 'number.math-ceil',
      name: 'Math.ceil()',
      kind: 'method',
      categories: ['number'],
      actions: ['round'],
      phrases: ['redondear hacia arriba', 'subir al siguiente entero'],
      summary: 'Redondea un número hacia arriba.',
      syntax: ['Math.ceil(numero)'],
      parameters: [{ name: 'numero', description: 'El número que quieres redondear.' }],
      returns: { type: 'number', description: 'El entero que queda al redondear hacia arriba.' },
      keyPoints: ['Siempre redondea hacia arriba, aunque la parte decimal sea pequeña.', 'Si el número ya es entero, no cambia.'],
      examples: [
        {
          title: 'Redondear hacia arriba',
          fromNotes: true,
          code: `
            Math.ceil(15.4) // 16
            Math.ceil(15.5) // 16
          `,
        },
        { title: 'Aunque el decimal sea pequeño', code: `Math.ceil(15.1) // 16` },
        { title: 'Un número entero no cambia', code: `Math.ceil(15) // 15` },
      ],
      related: ['number.math-round', 'number.math-floor', 'number.math-trunc'],
      sections: ['19'],
    },
    {
      id: 'number.math-trunc',
      name: 'Math.trunc()',
      kind: 'method',
      categories: ['number'],
      actions: ['round'],
      phrases: ['eliminar la parte decimal', 'obtener la parte entera', 'cortar los decimales'],
      summary: 'Elimina la parte decimal de un número y conserva únicamente la parte entera.',
      syntax: ['Math.trunc(numero)'],
      parameters: [{ name: 'numero', description: 'El número al que le quieres quitar la parte decimal.' }],
      returns: { type: 'number', description: 'La parte entera del número.' },
      keyPoints: ['No redondea: simplemente quita los decimales.'],
      examples: [
        {
          title: 'Quitar la parte decimal',
          fromNotes: true,
          code: `
            const nuevo = 98.7654
            Math.trunc(nuevo) // 98
          `,
        },
        { title: 'No redondea', code: `Math.trunc(4.99) // 4` },
      ],
      related: ['number.math-floor', 'number.math-round', 'number.parseInt'],
      sections: ['20'],
    },
    {
      id: 'number.parseFloat',
      name: 'Number.parseFloat()',
      kind: 'method',
      categories: ['number', 'string'],
      actions: ['convert'],
      converts: { from: 'string', to: 'number' },
      phrases: ['convertir un string a número decimal', 'leer un número decimal de un texto', 'pasar de texto a decimal'],
      summary: 'Convierte un string a un número decimal.',
      syntax: ['Number.parseFloat(texto)'],
      parameters: [{ name: 'texto', description: 'El string que contiene el número.' }],
      returns: { type: 'number', description: 'El número decimal que está al principio del string, o NaN.' },
      keyPoints: ['Puede convertir aunque haya texto después del número.', 'Si el texto está antes del número, retorna NaN.'],
      examples: [
        {
          title: 'Convertir un string a decimal',
          fromNotes: true,
          code: `
            const cadena = "15.098"
            Number.parseFloat(cadena) // 15.098
          `,
        },
        {
          title: 'Con texto después del número',
          fromNotes: true,
          code: `Number.parseFloat("12.98 decimal") // 12.98`,
        },
        {
          title: 'Con texto antes del número',
          fromNotes: true,
          code: `Number.parseFloat("decimal 12.98") // NaN`,
        },
        { title: 'Un entero escrito como texto', code: `Number.parseFloat("42") // 42` },
      ],
      related: ['number.parseInt', 'number.Number', 'number.unary-plus'],
      highlight: ['parseFloat'],
      sections: ['21', '23'],
    },
    {
      id: 'number.parseInt',
      name: 'Number.parseInt()',
      kind: 'method',
      categories: ['number', 'string'],
      actions: ['convert'],
      converts: { from: 'string', to: 'number' },
      phrases: ['convertir un string a número entero', 'leer un número entero de un texto', 'pasar de texto a entero'],
      summary: 'Convierte un string a un número entero.',
      syntax: ['Number.parseInt(texto)'],
      parameters: [{ name: 'texto', description: 'El string que contiene el número.' }],
      returns: { type: 'number', description: 'El número entero que está al principio del string, o NaN.' },
      keyPoints: [
        'Ignora la parte decimal: no redondea.',
        'Puede convertir aunque haya texto después del número.',
        'Si el texto está antes del número, retorna NaN.',
      ],
      examples: [
        { title: 'Convertir un string a entero', fromNotes: true, code: `Number.parseInt("123.890") // 123` },
        { title: 'Con texto después del número', fromNotes: true, code: `Number.parseInt("123.890 decimal") // 123` },
        { title: 'Con texto antes del número', fromNotes: true, code: `Number.parseInt("decimal 123.890") // NaN` },
        { title: 'No redondea', code: `Number.parseInt("9.9") // 9` },
      ],
      related: ['number.parseFloat', 'number.Number', 'number.unary-plus', 'number.math-trunc'],
      highlight: ['parseInt'],
      sections: ['22', '23'],
    },
    {
      id: 'number.Number',
      name: 'Number()',
      kind: 'function',
      categories: ['number', 'string', 'variables'],
      actions: ['convert'],
      converts: { from: 'string', to: 'number' },
      phrases: ['convertir a número', 'pasar de texto a número'],
      summary: 'Convierte un valor a número. Si el string contiene letras, no lo puede convertir y retorna NaN.',
      syntax: ['Number(valor)'],
      parameters: [{ name: 'valor', description: 'El valor que quieres convertir, por ejemplo un string.' }],
      returns: { type: 'number', description: 'El número, o NaN si no se puede convertir.' },
      keyPoints: [
        'Si el string tiene letras, antes o después del número, retorna NaN.',
        'Conserva los decimales.',
        'null se convierte en 0.',
        'Es una conversión explícita: se ve claramente en el código dónde cambia el tipo.',
      ],
      examples: [
        {
          title: 'Convertir un string con un número',
          code: `
            Number("42") // 42
            Number("12.3") // 12.3
          `,
        },
        {
          title: 'Con texto después del número',
          fromNotes: true,
          code: `Number("12.3 decimal") // NaN`,
        },
        {
          title: 'Con texto antes del número',
          fromNotes: true,
          code: `Number("decimal 12.3") // NaN`,
        },
        {
          title: 'Convertir null',
          fromNotes: true,
          code: `Number(null) // 0`,
        },
      ],
      related: ['number.parseFloat', 'number.parseInt', 'number.unary-plus', 'string.String', 'variables.Boolean'],
      highlight: ['Number'],
      sections: ['23'],
      alsoIn: [{ file: 'wiki/tripleten/fundamentos-js.md', title: 'Fundamentos de JavaScript (TripleTen)', sections: ['7'] }],
    },
    {
      id: 'number.toFixed',
      name: 'toFixed()',
      kind: 'method',
      categories: ['number'],
      actions: ['round', 'convert'],
      converts: { from: 'number', to: 'string' },
      phrases: ['conservar decimales', 'mostrar con dos decimales', 'limitar los decimales', 'formatear un número'],
      summary: 'Sirve para indicar cuántos decimales quieres conservar. Retorna el resultado como string.',
      syntax: ['numero.toFixed(decimales)'],
      parameters: [
        {
          name: 'decimales',
          optional: true,
          description: 'Cantidad de posiciones decimales que quieres conservar. Si no lo pones, conserva 0.',
        },
      ],
      returns: { type: 'string', description: 'Un string con el número y la cantidad de decimales indicada.' },
      keyPoints: ['Retorna un string, no un número.', 'Redondea el último decimal que conserva.', 'Si faltan decimales, completa con ceros.'],
      examples: [
        {
          title: 'Conservar 3 decimales',
          fromNotes: true,
          code: `
            const decimal = 3256755.43563
            decimal.toFixed(3) // "3256755.436"
          `,
        },
        {
          title: 'Sin argumentos conserva 0 decimales',
          fromNotes: true,
          code: `
            const decimal = 3256755.43563
            decimal.toFixed() // "3256755"
          `,
        },
        {
          title: 'Mostrar un precio con dos decimales',
          code: `
            const precio = 5
            precio.toFixed(2) // "5.00"
          `,
        },
        {
          title: 'Redondea el último decimal',
          code: `
            const valor = 1.239
            const conDosDecimales = valor.toFixed(2)

            console.log(conDosDecimales) // "1.24"
          `,
        },
      ],
      related: ['number.math-round', 'number.parseFloat'],
      sections: ['24'],
    },
  ],
  comparisons: [
    {
      id: 'number.operators',
      title: 'Los mismos números con cada operador',
      concepts: ['number.add', 'number.subtract', 'number.multiply', 'number.divide', 'number.modulo', 'number.power'],
      inputHeaders: ['a', 'b'],
      columns: [
        { header: 'a + b', template: '$1 + $2' },
        { header: 'a - b', template: '$1 - $2' },
        { header: 'a * b', template: '$1 * $2' },
        { header: 'a / b', template: '$1 / $2' },
        { header: 'a % b', template: '$1 % $2' },
        { header: 'a ** b', template: '$1 ** $2' },
      ],
      rows: [
        { inputs: ['7', '2'], results: ['9', '5', '14', '3.5', '1', '49'] },
        { inputs: ['10', '5'], results: ['15', '5', '50', '2', '0', '100000'] },
      ],
    },
    {
      id: 'number.rounding',
      title: 'El mismo número con cada forma de redondear',
      description: 'Fíjate también en el tipo de resultado: toFixed() retorna un string.',
      concepts: ['number.math-round', 'number.math-floor', 'number.math-ceil', 'number.math-trunc', 'number.toFixed'],
      inputHeaders: ['número'],
      columns: [
        { header: 'Math.round()', template: 'Math.round($1)' },
        { header: 'Math.floor()', template: 'Math.floor($1)' },
        { header: 'Math.ceil()', template: 'Math.ceil($1)' },
        { header: 'Math.trunc()', template: 'Math.trunc($1)' },
        { header: 'toFixed(1)', template: '($1).toFixed(1)' },
      ],
      rows: [
        { inputs: ['15.4'], results: ['15', '15', '16', '15', '"15.4"'] },
        { inputs: ['15.5'], results: ['16', '15', '16', '15', '"15.5"'] },
        { inputs: ['98.7654'], results: ['99', '98', '99', '98', '"98.8"'] },
      ],
    },
    {
      id: 'number.min-max',
      title: 'El mismo listado, el mayor y el menor',
      concepts: ['number.math-max', 'number.math-min'],
      inputHeaders: ['números'],
      columns: [
        { header: 'Math.max()', template: 'Math.max($1)' },
        { header: 'Math.min()', template: 'Math.min($1)' },
      ],
      rows: [
        { inputs: ['100, 50, 101'], results: ['101', '50'] },
        { inputs: ['80, 79, 81'], results: ['81', '79'] },
        { inputs: ['-10, -3, -7'], results: ['-3', '-10'] },
      ],
    },
    {
      id: 'number.string-to-number',
      title: 'El mismo string con cada forma de convertir a número',
      description: 'La diferencia está en qué pasa cuando el string tiene texto además del número.',
      concepts: ['number.Number', 'number.parseFloat', 'number.parseInt', 'number.unary-plus'],
      inputHeaders: ['texto'],
      columns: [
        { header: 'Number()', template: 'Number($1)' },
        { header: 'Number.parseFloat()', template: 'Number.parseFloat($1)' },
        { header: 'Number.parseInt()', template: 'Number.parseInt($1)' },
        { header: '+texto', template: '+$1' },
      ],
      rows: [
        { inputs: ['"15.098"'], results: ['15.098', '15.098', '15', '15.098'] },
        { inputs: ['"12.98 decimal"'], results: ['NaN', '12.98', '12', 'NaN'] },
        { inputs: ['"decimal 12.98"'], results: ['NaN', 'NaN', 'NaN', 'NaN'] },
      ],
    },
  ],
}

export default numbers
