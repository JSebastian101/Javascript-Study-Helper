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
    id: 'logic',
    label: 'Condicionales y lógica',
    description: 'Comparar valores y tomar decisiones',
    group: 'topic',
    sample: 'if ( )',
    accent: 'amber',
  },
]
