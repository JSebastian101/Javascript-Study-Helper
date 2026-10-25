import vm from 'node:vm'
import { inspect, isDeepStrictEqual } from 'node:util'
import { describe, expect, it } from 'vitest'
import { annotatedLines, isResultComment } from '../lib/highlight'
import { dedent } from './build'
import { knowledgeBase } from './index'
import { pendingExercises } from './practice/pending'

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

/** Representación estable de un valor, tomada en el momento en que se muestra. */
const snapshot = (value: unknown) => inspect(value, { depth: 10, breakLength: Infinity })

/**
 * Ejecuta un ejemplo y devuelve los problemas encontrados. Si `throws` tiene
 * el nombre de un error, el ejemplo debe lanzar exactamente ese error.
 */
function verify(code: string, throws?: string): string[] {
  const { code: instrumented, checks, problems } = instrument(code)
  const actual = new Map<number, string>()
  const context = vm.createContext({
    console: { log: () => {} },
    __check: (id: number, value: unknown) => actual.set(id, snapshot(value)),
  })
  try {
    vm.runInContext(instrumented, context)
    if (throws) problems.push(`debía lanzar ${throws}, pero no lanzó ningún error`)
  } catch (error) {
    const name = (error as Error).name
    if (!throws) return [...problems, `el código lanza un error: ${(error as Error).message}`]
    if (name !== throws) problems.push(`debía lanzar ${throws}, pero lanzó ${name}: ${(error as Error).message}`)
  }
  for (const check of checks) {
    if (!actual.has(check.id)) continue
    let expected: unknown
    try {
      expected = vm.runInContext(`(${check.expected})`, context)
    } catch {
      problems.push(`línea ${check.line}: el comentario "// ${check.expected}" no es un valor válido`)
      continue
    }
    if (actual.get(check.id) !== snapshot(expected)) {
      problems.push(`línea ${check.line}: ${check.source} da ${actual.get(check.id)}, no ${check.expected}`)
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

  it('toma el valor en el momento en que se muestra', () => {
    expect(verify('const bin = []\nbin.push("x")\nconsole.log(bin) // ["x"]\nbin.pop()\nconsole.log(bin) // []')).toEqual([])
  })

  it('verifica los ejemplos que lanzan un error a propósito', () => {
    expect(verify('let hut = "Refugio"\nhut("Ratón")', 'TypeError')).toEqual([])
    expect(verify('numdberFnc(12)', 'ReferenceError')).toEqual([])
    expect(verify('function f() {\n  return 1\n});', 'SyntaxError')).toEqual([])
    expect(verify('1 + 1', 'TypeError')).toHaveLength(1)
    expect(verify('numdberFnc(12)', 'TypeError')).toHaveLength(1)
  })
})

describe('los resultados de los ejemplos son correctos', () => {
  for (const concept of knowledgeBase.concepts) {
    for (const example of concept.examples) {
      it(`${concept.id} › ${example.title}`, () => {
        expect(verify(example.code, example.throws)).toEqual([])
      })
    }
  }
})

describe('los ejercicios pendientes', () => {
  it('tienen soluciones con resultados correctos', () => {
    const problems = pendingExercises.flatMap((exercise) =>
      verify(dedent(exercise.solution)).map((problem) => `${exercise.id}: ${problem}`),
    )
    expect(problems).toEqual([])
  })
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
