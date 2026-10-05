import vm from 'node:vm'
import { isDeepStrictEqual } from 'node:util'
import { describe, expect, it } from 'vitest'
import { annotatedLines, isResultComment } from '../lib/highlight'
import { knowledgeBase } from './index'

/**
 * Verifica que los resultados escritos en los comentarios de los ejemplos
 * (`texto.slice(0, 4) // "Hola"`) coincidan con lo que JavaScript produce.
 *
 * Reglas para escribir ejemplos verificables:
 * - Un comentario que empieza con un valor ("texto", 4, [1, 2], true, NaN...)
 *   es un resultado y debe ser un literal exacto.
 * - Un comentario que empieza con palabras ("por ejemplo...", "se muestra...")
 *   es una explicación y no se verifica.
 */

interface Check {
  id: number
  line: number
  source: string
  expected: string
}

function instrument(code: string) {
  const lines = code.split('\n')
  const checks: Check[] = []
  const problems: string[] = []

  for (const annotated of annotatedLines(code)) {
    if (!isResultComment(`// ${annotated.comment}`)) continue
    const statement = annotated.code.trim().replace(/;$/, '')
    const indent = lines[annotated.line].match(/^\s*/)![0]
    const id = checks.length
    const log = /^console\.log\((.*)\)$/.exec(statement)
    const declaration = /^(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=/.exec(statement)

    let replacement: string
    if (log) replacement = `__check(${id}, (${log[1]}))`
    else if (declaration) replacement = `${statement}; __check(${id}, ${declaration[1]})`
    else if (/^(?:(?:const|let|var|if|else|for|while)\b|[{}])/.test(statement)) {
      problems.push(`línea ${annotated.line + 1}: no se puede verificar "${statement}"`)
      continue
    } else replacement = `__check(${id}, (${statement}))`

    checks.push({ id, line: annotated.line + 1, source: statement, expected: annotated.comment })
    lines[annotated.line] = indent + replacement
  }
  return { code: lines.join('\n'), checks, problems }
}

function verify(code: string): string[] {
  const { code: instrumented, checks, problems } = instrument(code)
  const actual = new Map<number, unknown>()
  const context = vm.createContext({
    console: { log: () => {} },
    __check: (id: number, value: unknown) => actual.set(id, value),
  })
  try {
    vm.runInContext(instrumented, context)
  } catch (error) {
    return [...problems, `el código lanza un error: ${(error as Error).message}`]
  }
  for (const check of checks) {
    let expected: unknown
    try {
      expected = vm.runInContext(`(${check.expected})`, context)
    } catch {
      problems.push(`línea ${check.line}: el comentario "// ${check.expected}" no es un valor válido`)
      continue
    }
    const value = actual.get(check.id)
    if (!isDeepStrictEqual(value, expected)) {
      problems.push(`línea ${check.line}: ${check.source} da ${JSON.stringify(value) ?? String(value)}, no ${check.expected}`)
    }
  }
  return problems
}

describe('el verificador', () => {
  it('detecta resultados incorrectos', () => {
    expect(verify('"Hola Jeni".repeat(3) // "holaholahola"')).toHaveLength(1)
    expect(verify('2 - "5" // 3')).toHaveLength(1)
    expect(verify('let division = 20\ndivision /= 3 // 6.6666667')).toHaveLength(1)
  })

  it('acepta resultados correctos y explicaciones en texto', () => {
    expect(verify('"Hola Jeni".repeat(2) // "Hola JeniHola Jeni"')).toEqual([])
    expect(verify('Math.random() // por ejemplo 0.25')).toEqual([])
  })
})

describe('los resultados de los ejemplos son correctos', () => {
  for (const concept of knowledgeBase.concepts) {
    for (const example of concept.examples) {
      it(`${concept.id} › ${example.title}`, () => {
        expect(verify(example.code)).toEqual([])
      })
    }
  }
})

describe('los ejemplos verifican al menos un resultado cuando lo muestran', () => {
  it('cuenta cuántas anotaciones se verificaron', () => {
    let total = 0
    for (const concept of knowledgeBase.concepts) {
      for (const example of concept.examples) total += instrument(example.code).checks.length
    }
    expect(total).toBeGreaterThan(150)
  })
})

describe('las tablas comparativas son correctas', () => {
  for (const grid of knowledgeBase.comparisons) {
    it(grid.id, () => {
      const problems: string[] = []
      for (const row of grid.rows) {
        grid.columns.forEach((column, index) => {
          const expression = column.template.replace(/\$(\d)/g, (_, n: string) => row.inputs[Number(n) - 1])
          const context = vm.createContext({})
          const value = vm.runInContext(expression, context)
          const expected = vm.runInContext(`(${row.results[index]})`, context)
          if (!isDeepStrictEqual(value, expected)) {
            problems.push(`${expression} da ${JSON.stringify(value) ?? String(value)}, no ${row.results[index]}`)
          }
        })
      }
      expect(problems).toEqual([])
    })
  }
})
