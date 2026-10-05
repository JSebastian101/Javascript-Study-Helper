import { buildKnowledgeBase } from './build'
import type { KnowledgeSource } from './model'
import { actions } from './vocabulary/actions'
import { categories } from './vocabulary/categories'

/**
 * Todas las fuentes de `sources/` se cargan automáticamente, sean .ts o .json.
 * Para incorporar un tema nuevo basta con crear un archivo ahí que exporte
 * (por defecto) un objeto `KnowledgeSource`.
 */
const modules = import.meta.glob<{ default: KnowledgeSource }>('./sources/*.{ts,json}', { eager: true })

export const sources: KnowledgeSource[] = Object.values(modules).map((module) => module.default)

export const knowledgeBase = buildKnowledgeBase({ categories, actions, sources })

export type * from './model'
