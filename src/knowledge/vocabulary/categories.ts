import type { Category } from '../model'

/**
 * Tipos de dato y categorías habilitadas.
 * Para agregar una nueva (por ejemplo "Objetos" o "Ciclos"), añade una entrada
 * aquí y usa su `id` en los conceptos.
 */
export const categories: Category[] = [
  {
    id: 'string',
    label: 'String',
    description: 'Texto',
    group: 'dataType',
    sample: '"hola"',
    accent: 'emerald',
  },
  {
    id: 'number',
    label: 'Number',
    description: 'Números',
    group: 'dataType',
    sample: '42',
    accent: 'sky',
  },
  {
    id: 'array',
    label: 'Array',
    description: 'Listas de elementos',
    group: 'dataType',
    sample: '[1, 2, 3]',
    accent: 'violet',
  },
  {
    id: 'variables',
    label: 'Variables y tipos de datos',
    description: 'Guardar datos y saber de qué tipo son',
    group: 'topic',
    sample: 'let x = 1',
    accent: 'cyan',
  },
  {
    id: 'logic',
    label: 'Condicionales y lógica',
    description: 'Comparar valores y tomar decisiones',
    group: 'topic',
    sample: 'if ( )',
    accent: 'amber',
  },
  {
    id: 'loops',
    label: 'Bucles',
    description: 'Repetir un código o recorrer una lista',
    group: 'topic',
    sample: 'for ( )',
    accent: 'indigo',
  },
  {
    id: 'functions',
    label: 'Funciones',
    description: 'Bloques de código que se pueden reutilizar',
    group: 'topic',
    sample: 'function ( )',
    accent: 'fuchsia',
  },
  {
    id: 'debugging',
    label: 'Depuración',
    description: 'Encontrar y entender errores en el código',
    group: 'topic',
    sample: 'console.log( )',
    accent: 'rose',
  },
]
