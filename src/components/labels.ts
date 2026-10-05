import type { ConceptKind } from '../knowledge/model'

export const kindLabels: Record<ConceptKind, string> = {
  method: 'Método',
  property: 'Propiedad',
  function: 'Función',
  operator: 'Operador',
  statement: 'Sentencia',
  syntax: 'Sintaxis',
  object: 'Objeto',
  concept: 'Concepto',
  pattern: 'Combinación',
}

/** Tipos cuyo nombre se escribe como código. */
export const codeNamedKinds = new Set<ConceptKind>(['method', 'property', 'function', 'operator', 'statement', 'syntax', 'object'])

const callable = new Set<ConceptKind>(['method', 'function', 'property'])

/** "Recibe" tiene sentido para métodos y funciones; para el resto, "Necesita". */
export function parametersLabel(kind: ConceptKind): string {
  return kind === 'method' || kind === 'function' ? '¿Qué recibe?' : '¿Qué necesita?'
}

/** Un método retorna; un operador o una sintaxis dan un resultado. */
export function returnsLabel(kind: ConceptKind): string {
  return callable.has(kind) ? '¿Qué retorna?' : 'Resultado'
}

export function isCallable(kind: ConceptKind): boolean {
  return callable.has(kind)
}

export function plural(count: number, singular: string, pluralForm: string): string {
  return `${count} ${count === 1 ? singular : pluralForm}`
}
