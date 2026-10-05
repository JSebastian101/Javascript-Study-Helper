import type {
  Action,
  Category,
  Concept,
  KnowledgeBase,
  KnowledgeSource,
  ResolvedComparison,
  ResolvedConcept,
} from './model'

/** Quita la indentación común y las líneas vacías de los extremos. */
export function dedent(text: string): string {
  const lines = text.replace(/\t/g, '  ').split('\n')
  while (lines.length > 0 && lines[0].trim() === '') lines.shift()
  while (lines.length > 0 && lines[lines.length - 1].trim() === '') lines.pop()
  const indents = lines.filter((line) => line.trim() !== '').map((line) => line.match(/^ */)![0].length)
  const common = indents.length > 0 ? Math.min(...indents) : 0
  return lines.map((line) => line.slice(common)).join('\n')
}

function normalizeConcept(concept: Concept): Concept {
  return {
    ...concept,
    syntax: concept.syntax?.map(dedent),
    examples: concept.examples.map((example) => ({ ...example, code: dedent(example.code) })),
  }
}

export class KnowledgeValidationError extends Error {
  constructor(public readonly problems: string[]) {
    super(`El contenido de conocimiento tiene ${problems.length} problema(s):\n- ${problems.join('\n- ')}`)
    this.name = 'KnowledgeValidationError'
  }
}

interface BuildInput {
  categories: Category[]
  actions: Action[]
  sources: KnowledgeSource[]
}

/**
 * Combina varias fuentes en un único modelo común y valida que todas las
 * referencias (categorías, acciones, relacionados) existan.
 */
export function buildKnowledgeBase({ categories, actions, sources }: BuildInput): KnowledgeBase {
  const problems: string[] = []
  const categoryIds = new Set(categories.map((c) => c.id))
  const actionIds = new Set(actions.map((a) => a.id))

  const ordered = [...sources].sort((a, b) => (a.order ?? 100) - (b.order ?? 100))

  const concepts: ResolvedConcept[] = []
  const comparisons: ResolvedComparison[] = []
  const seenConcepts = new Set<string>()
  const seenComparisons = new Set<string>()

  for (const source of ordered) {
    const info = { id: source.id, title: source.title, file: source.file }
    for (const raw of source.concepts) {
      const where = `${source.id} → ${raw.id}`
      if (seenConcepts.has(raw.id)) problems.push(`${where}: id de concepto repetido`)
      seenConcepts.add(raw.id)
      if (raw.categories.length === 0) problems.push(`${where}: no tiene categorías`)
      if (raw.actions.length === 0) problems.push(`${where}: no tiene acciones`)
      if (raw.examples.length === 0) problems.push(`${where}: no tiene ejemplos`)
      for (const id of raw.categories) {
        if (!categoryIds.has(id)) problems.push(`${where}: categoría desconocida "${id}"`)
      }
      for (const id of raw.actions) {
        if (!actionIds.has(id)) problems.push(`${where}: acción desconocida "${id}"`)
      }
      if (raw.converts) {
        for (const id of [raw.converts.from, raw.converts.to]) {
          if (!categoryIds.has(id)) problems.push(`${where}: conversión con categoría desconocida "${id}"`)
        }
      }
      concepts.push({ ...normalizeConcept(raw), source: info })
    }
    for (const grid of source.comparisons ?? []) {
      const where = `${source.id} → tabla ${grid.id}`
      if (seenComparisons.has(grid.id)) problems.push(`${where}: id de tabla repetido`)
      seenComparisons.add(grid.id)
      for (const row of grid.rows) {
        if (row.inputs.length !== grid.inputHeaders.length) problems.push(`${where}: una fila no tiene todas las entradas`)
        if (row.results.length !== grid.columns.length) problems.push(`${where}: una fila no tiene todos los resultados`)
      }
      comparisons.push({ ...grid, source: info })
    }
  }

  for (const concept of concepts) {
    for (const id of concept.related ?? []) {
      if (!seenConcepts.has(id)) problems.push(`${concept.id}: relacionado desconocido "${id}"`)
    }
  }
  for (const grid of comparisons) {
    for (const id of grid.concepts) {
      if (!seenConcepts.has(id)) problems.push(`tabla ${grid.id}: concepto desconocido "${id}"`)
    }
  }

  if (problems.length > 0) throw new KnowledgeValidationError(problems)

  return { categories, actions, concepts, comparisons }
}
