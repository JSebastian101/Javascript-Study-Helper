import type { Action, Category, KnowledgeBase, ResolvedComparison, ResolvedConcept } from './model'

export interface CategoryOption {
  category: Category
  count: number
}

export interface ActionOption {
  action: Action
  count: number
}

export interface Location {
  categoryId: string
  actionId: string
}

/**
 * Consultas sobre el modelo de conocimiento. No sabe nada de la UI: recibe
 * ids y devuelve datos. Todo lo que se muestra en los filtros se deriva del
 * contenido, así que agregar conceptos no requiere cambiar esta lógica.
 */
export function createQuery(kb: KnowledgeBase) {
  const conceptById = new Map(kb.concepts.map((c) => [c.id, c]))
  const categoryById = new Map(kb.categories.map((c) => [c.id, c]))
  const actionById = new Map(kb.actions.map((a) => [a.id, a]))

  const inCategory = (categoryId: string) => kb.concepts.filter((c) => c.categories.includes(categoryId))

  const categoryOptions: CategoryOption[] = kb.categories
    .map((category) => ({ category, count: inCategory(category.id).length }))
    .filter((option) => option.count > 0)

  function actionsFor(categoryId: string): ActionOption[] {
    const concepts = inCategory(categoryId)
    return kb.actions
      .map((action) => ({ action, count: concepts.filter((c) => c.actions.includes(action.id)).length }))
      .filter((option) => option.count > 0)
  }

  function conceptsFor(categoryId: string, actionId: string): ResolvedConcept[] {
    return kb.concepts.filter((c) => c.categories.includes(categoryId) && c.actions.includes(actionId))
  }

  /** Tablas comparativas que aplican cuando al menos dos de sus conceptos están en los resultados. */
  function comparisonsFor(concepts: ResolvedConcept[]): ResolvedComparison[] {
    const present = new Set(concepts.map((c) => c.id))
    return kb.comparisons.filter((grid) => grid.concepts.filter((id) => present.has(id)).length >= 2)
  }

  function related(concept: ResolvedConcept): ResolvedConcept[] {
    return (concept.related ?? []).map((id) => conceptById.get(id)).filter((c): c is ResolvedConcept => c !== undefined)
  }

  /**
   * Dónde mostrar un concepto. Respeta la categoría y la acción actuales si el
   * concepto pertenece a ellas, para no sacar a la estudiante de contexto.
   */
  function locate(conceptId: string, preferred?: Partial<Location>): Location | undefined {
    const concept = conceptById.get(conceptId)
    if (!concept) return undefined
    const categoryId =
      preferred?.categoryId && concept.categories.includes(preferred.categoryId) ? preferred.categoryId : concept.categories[0]
    const actionId =
      preferred?.actionId && concept.actions.includes(preferred.actionId)
        ? preferred.actionId
        : (concept.actions.find((id) => actionById.get(id)?.group !== 'concept') ?? concept.actions[0])
    return { categoryId, actionId }
  }

  return {
    categories: () => categoryOptions,
    actionsFor,
    conceptsFor,
    comparisonsFor,
    related,
    locate,
    getCategory: (id: string) => categoryById.get(id),
    getAction: (id: string) => actionById.get(id),
    getConcept: (id: string) => conceptById.get(id),
    totalConcepts: kb.concepts.length,
  }
}

export type KnowledgeQuery = ReturnType<typeof createQuery>
