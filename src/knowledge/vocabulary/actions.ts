import type { Action } from '../model'

/**
 * Vocabulario compartido de acciones.
 *
 * Es el lenguaje común entre los ejercicios, la estudiante y la app: si un
 * enunciado dice "Corta el string...", la estudiante puede buscar
 * String → Cortar. El orden de esta lista es el orden en que se muestran.
 *
 * Una acción solo aparece para un tipo de dato si al menos un concepto de ese
 * tipo la usa, así que agregar o quitar acciones no requiere tocar la UI.
 */
export const actions: Action[] = [
  {
    id: 'create',
    label: 'Crear o escribir',
    hint: 'Escribir un valor nuevo de este tipo',
    synonyms: ['crear', 'escribir', 'declarar', 'guardar un valor', 'hacer un salto de línea'],
  },
  {
    id: 'access',
    label: 'Acceder a una posición',
    hint: 'Obtener un carácter o un elemento usando su posición',
    synonyms: ['acceder', 'obtener el elemento de una posición', 'sacar un elemento', 'tomar las primeras posiciones', 'sacar de una sola vez'],
  },
  {
    id: 'count',
    label: 'Contar',
    hint: 'Saber cuántos elementos hay',
    synonyms: ['contar', 'saber cuántos hay', 'obtener el tamaño', 'obtener el largo'],
  },
  {
    id: 'search',
    label: 'Buscar',
    hint: 'Encontrar algo o comprobar si está',
    synonyms: ['buscar', 'encontrar', 'localizar', 'comprobar si existe', 'verificar si está'],
  },
  {
    id: 'cut',
    label: 'Cortar',
    hint: 'Obtener solo una parte',
    synonyms: ['cortar', 'obtener una parte', 'extraer una parte', 'recortar un fragmento'],
  },
  {
    id: 'split',
    label: 'Separar',
    hint: 'Dividir en partes',
    synonyms: ['separar', 'dividir', 'partir', 'separar por palabras'],
  },
  {
    id: 'join',
    label: 'Unir o combinar',
    hint: 'Juntar varias partes en una sola',
    synonyms: ['unir', 'juntar', 'combinar', 'concatenar', 'armar un texto'],
  },
  {
    id: 'add',
    label: 'Agregar',
    hint: 'Añadir elementos',
    synonyms: ['agregar', 'añadir', 'insertar', 'meter en la lista'],
  },
  {
    id: 'remove',
    label: 'Eliminar',
    hint: 'Quitar elementos',
    synonyms: ['eliminar', 'quitar', 'sacar de la lista', 'borrar'],
  },
  {
    id: 'replace',
    label: 'Reemplazar',
    hint: 'Cambiar una parte por otra',
    synonyms: ['reemplazar', 'sustituir', 'cambiar una parte por otra'],
  },
  {
    id: 'reverse',
    label: 'Invertir el orden',
    hint: 'Poner los elementos al revés',
    synonyms: ['invertir', 'revertir', 'voltear', 'poner al revés'],
  },
  {
    id: 'change-case',
    label: 'Mayúsculas o minúsculas',
    hint: 'Cambiar las letras a mayúsculas o a minúsculas',
    synonyms: ['convertir a mayúsculas', 'convertir a minúsculas', 'cambiar el formato de las letras'],
  },
  {
    id: 'trim',
    label: 'Quitar espacios',
    hint: 'Eliminar espacios en blanco al inicio o al final',
    synonyms: ['quitar espacios', 'limpiar el texto', 'recortar espacios en blanco'],
  },
  {
    id: 'repeat',
    label: 'Repetir',
    hint: 'Repetir varias veces',
    synonyms: ['repetir', 'duplicar', 'repetir varias veces', 'hacer algo varias veces', 'repetir un código', 'repetir mientras se cumpla una condición'],
  },
  {
    id: 'iterate',
    label: 'Recorrer',
    hint: 'Pasar por cada elemento de una lista, uno por uno',
    synonyms: ['recorrer', 'recorrer un arreglo', 'pasar por cada elemento', 'hacer algo con cada elemento', 'iterar'],
  },
  {
    id: 'stop',
    label: 'Detener o saltar',
    hint: 'Terminar un bucle antes de tiempo o saltar una repetición',
    synonyms: ['detener el bucle', 'salir del bucle', 'saltar una iteración', 'omitir un elemento', 'pasar a la siguiente'],
  },
  {
    id: 'convert',
    label: 'Convertir a otro tipo',
    hint: 'Pasar de un tipo de dato a otro',
    synonyms: ['convertir', 'transformar en', 'pasar de texto a número', 'pasar de texto a arreglo', 'pasar de arreglo a texto'],
  },
  {
    id: 'check-type',
    label: 'Saber el tipo de dato',
    hint: 'Averiguar de qué tipo es un valor',
    synonyms: ['saber de qué tipo es', 'comprobar el tipo', 'qué tipo de dato es', 'revisar si es un número o un texto'],
  },
  {
    id: 'calculate',
    label: 'Calcular',
    hint: 'Hacer operaciones matemáticas',
    synonyms: ['calcular', 'sumar', 'restar', 'multiplicar', 'dividir', 'obtener el residuo', 'elevar a una potencia'],
  },
  {
    id: 'update',
    label: 'Actualizar una variable',
    hint: 'Cambiar el valor guardado: aumentar, disminuir, acumular',
    synonyms: ['actualizar', 'incrementar', 'decrementar', 'acumular', 'sumar uno', 'restar uno'],
  },
  {
    id: 'round',
    label: 'Redondear',
    hint: 'Quitar o ajustar los decimales',
    synonyms: ['redondear', 'quitar decimales', 'conservar decimales', 'obtener la parte entera'],
  },
  {
    id: 'min-max',
    label: 'Obtener el mayor o el menor',
    hint: 'Encontrar el número más grande o el más pequeño',
    synonyms: ['el mayor', 'el menor', 'el máximo', 'el mínimo'],
  },
  {
    id: 'random',
    label: 'Generar un número aleatorio',
    hint: 'Obtener un número al azar',
    synonyms: ['aleatorio', 'al azar', 'número random'],
  },
  {
    id: 'compare',
    label: 'Comparar',
    hint: 'Saber si dos valores son iguales, diferentes o cuál es mayor',
    synonyms: ['comparar', 'saber si es igual', 'saber si es diferente', 'saber si es mayor'],
  },
  {
    id: 'combine-conditions',
    label: 'Combinar condiciones',
    hint: 'Revisar varias condiciones al mismo tiempo',
    synonyms: ['combinar condiciones', 'varias comparaciones a la vez', 'que se cumplan todas', 'que se cumpla al menos una'],
  },
  {
    id: 'decide',
    label: 'Tomar decisiones',
    hint: 'Ejecutar un código u otro según una condición',
    synonyms: ['decidir', 'si pasa algo, hacer...', 'si no...', 'elegir entre dos opciones'],
  },
  {
    id: 'call',
    label: 'Llamar una función',
    hint: 'Ejecutar el código de una función, con o sin datos',
    synonyms: ['llamar', 'invocar', 'ejecutar una función', 'pasarle datos a una función', 'usar una función'],
  },
  {
    id: 'return',
    label: 'Devolver un resultado',
    hint: 'Entregar un valor desde una función para usarlo después',
    synonyms: ['retornar', 'devolver', 'regresar un valor', 'obtener el resultado de una función'],
  },
  {
    id: 'inspect',
    label: 'Revisar valores',
    hint: 'Ver qué valores tiene el programa mientras se ejecuta',
    synonyms: ['depurar', 'mostrar en la consola', 'ver el valor de una variable', 'pausar el código', 'revisar paso a paso'],
  },
  {
    id: 'fix-error',
    label: 'Entender un error',
    hint: 'Saber qué dice un mensaje de error y qué lo causa',
    synonyms: ['leer un error', 'mensaje en rojo', 'qué significa este error', 'corregir un error'],
  },
  {
    id: 'understand',
    label: 'Entender el concepto',
    hint: 'Qué es y cómo funciona',
    synonyms: ['qué es', 'repasar', 'cómo funciona'],
    group: 'concept',
  },
]
