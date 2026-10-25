import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { buildKnowledgeBase, dedent, KnowledgeValidationError } from './build'
import { knowledgeBase } from './index'
import type { NoteRef } from './model'
import { pendingExercises } from './practice/pending'
import { createQuery } from './query'
import { actions } from './vocabulary/actions'
import { categories } from './vocabulary/categories'

const query = createQuery(knowledgeBase)
const ids = (list: { id: string }[]) => list.map((item) => item.id)

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')

/** Números de las preguntas de un archivo de la wiki ("## 6. ..." → "6"). */
function questionNumbers(file: string): Set<string> | undefined {
  const fullPath = path.join(repoRoot, file)
  if (!fs.existsSync(fullPath)) return undefined
  const text = fs.readFileSync(fullPath, 'utf8')
  return new Set([...text.matchAll(/^## (\d+)\./gm)].map((match) => match[1]))
}

function checkRefs(owner: string, refs: Pick<NoteRef, 'file' | 'sections'>[], problems: string[]) {
  for (const ref of refs) {
    const questions = questionNumbers(ref.file)
    if (!questions) {
      problems.push(`${owner}: no existe ${ref.file}`)
      continue
    }
    for (const section of ref.sections) {
      if (!questions.has(section)) problems.push(`${owner}: ${ref.file} no tiene la pregunta ${section}`)
    }
  }
}

describe('modelo de conocimiento', () => {
  it('cada concepto apunta a preguntas que existen en su wiki', () => {
    const problems: string[] = []
    for (const concept of knowledgeBase.concepts) {
      checkRefs(concept.id, [{ file: concept.source.file, sections: concept.sections }, ...(concept.alsoIn ?? [])], problems)
    }
    expect(problems).toEqual([])
  })

  it('los ejercicios pendientes usan categorías, acciones, conceptos y preguntas que existen', () => {
    const problems: string[] = []
    const categoryIds = new Set(knowledgeBase.categories.map((c) => c.id))
    const actionIds = new Set(knowledgeBase.actions.map((a) => a.id))
    const conceptIds = new Set(knowledgeBase.concepts.map((c) => c.id))
    const seen = new Set<string>()
    for (const exercise of pendingExercises) {
      if (seen.has(exercise.id)) problems.push(`${exercise.id}: id repetido`)
      seen.add(exercise.id)
      for (const id of exercise.categories) if (!categoryIds.has(id)) problems.push(`${exercise.id}: categoría ${id}`)
      for (const id of exercise.actions) if (!actionIds.has(id)) problems.push(`${exercise.id}: acción ${id}`)
      for (const id of exercise.uses) if (!conceptIds.has(id)) problems.push(`${exercise.id}: concepto ${id}`)
      checkRefs(exercise.id, [exercise.from], problems)
    }
    expect(problems).toEqual([])
  })

  it('cada categoría tiene conceptos', () => {
    for (const category of knowledgeBase.categories) {
      expect(query.actionsFor(category.id).length, category.id).toBeGreaterThan(0)
    }
  })

  it('cada acción del vocabulario se usa en algún concepto', () => {
    const used = new Set(knowledgeBase.concepts.flatMap((c) => c.actions))
    const unused = knowledgeBase.actions.filter((a) => !used.has(a.id)).map((a) => a.id)
    expect(unused).toEqual([])
  })

  it('no hay dos conceptos con el mismo nombre en la misma categoría', () => {
    const seen = new Set<string>()
    for (const concept of knowledgeBase.concepts) {
      for (const category of concept.categories) {
        const key = `${category}:${concept.name}`
        expect(seen.has(key), key).toBe(false)
        seen.add(key)
      }
    }
  })

  it('los métodos y funciones dicen qué reciben y qué retornan', () => {
    for (const concept of knowledgeBase.concepts) {
      if (concept.kind === 'method' || concept.kind === 'function') {
        expect(concept.syntax?.length, concept.id).toBeGreaterThan(0)
        expect(concept.parameters, concept.id).toBeDefined()
        expect(concept.returns, concept.id).toBeDefined()
      }
    }
  })

  it('los títulos de ejemplos no se repiten dentro de un concepto', () => {
    for (const concept of knowledgeBase.concepts) {
      const titles = concept.examples.map((e) => e.title)
      expect(new Set(titles).size, concept.id).toBe(titles.length)
    }
  })

  it('rechaza referencias a categorías o acciones que no existen', () => {
    const broken = {
      id: 'roto',
      title: 'Roto',
      file: 'roto.md',
      concepts: [
        {
          id: 'x.y',
          name: 'y()',
          kind: 'method' as const,
          categories: ['objeto'],
          actions: ['volar'],
          phrases: [],
          summary: '',
          examples: [{ title: 't', code: 'y()' }],
          related: ['no.existe'],
          sections: [],
        },
      ],
    }
    expect(() => buildKnowledgeBase({ categories, actions, sources: [broken] })).toThrow(KnowledgeValidationError)
  })

  it('normaliza la indentación del código', () => {
    expect(dedent('\n    const a = 1\n      a + 1\n  ')).toBe('const a = 1\n  a + 1')
  })
})

describe('filtrado', () => {
  it('String → Buscar muestra indexOf, includes, startsWith y endsWith', () => {
    expect(ids(query.conceptsFor('string', 'search'))).toEqual(['string.indexOf', 'string.includes', 'string.startsWith', 'string.endsWith'])
  })

  it('Array → Buscar muestra includes de arreglos, no el de strings', () => {
    expect(ids(query.conceptsFor('array', 'search'))).toEqual(['array.includes'])
  })

  it('String → Cortar y Array → Cortar son conceptos distintos', () => {
    expect(ids(query.conceptsFor('string', 'cut'))).toEqual(['string.slice'])
    expect(ids(query.conceptsFor('array', 'cut'))).toEqual(['array.slice'])
  })

  it('una acción puede devolver varios conceptos', () => {
    expect(ids(query.conceptsFor('array', 'remove'))).toEqual(['array.pop', 'array.shift', 'array.splice'])
  })

  it('las acciones se derivan del contenido de cada tipo', () => {
    const numberActions = query.actionsFor('number').map((o) => o.action.id)
    expect(numberActions).not.toContain('cut')
    expect(numberActions).toContain('round')
    expect(query.actionsFor('string').find((o) => o.action.id === 'search')?.count).toBe(4)
  })

  it('String → Convertir incluye split y las funciones que convierten texto a número', () => {
    expect(ids(query.conceptsFor('string', 'convert'))).toEqual(
      expect.arrayContaining(['string.split', 'number.Number', 'number.parseInt', 'number.parseFloat', 'number.unary-plus']),
    )
  })

  it('muestra una tabla comparativa cuando hay al menos dos de sus conceptos', () => {
    expect(ids(query.comparisonsFor(query.conceptsFor('string', 'search')))).toEqual(['string.search', 'string.starts-ends'])
    expect(ids(query.comparisonsFor(query.conceptsFor('string', 'compare')))).toEqual(['logic.equality'])
    expect(query.comparisonsFor(query.conceptsFor('array', 'cut'))).toEqual([])
  })

  it('ubica un concepto respetando el contexto actual cuando puede', () => {
    expect(query.locate('array.slice', { categoryId: 'string', actionId: 'cut' })).toEqual({ categoryId: 'array', actionId: 'cut' })
    expect(query.locate('logic.strict-equality', { categoryId: 'string' })).toEqual({ categoryId: 'string', actionId: 'compare' })
    expect(query.locate('array.basics')).toEqual({ categoryId: 'array', actionId: 'create' })
  })
})
