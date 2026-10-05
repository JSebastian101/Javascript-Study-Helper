import { describe, expect, it } from 'vitest'
import { annotatedLines, highlight, termsFor, tokenize } from './highlight'

describe('tokenize', () => {
  it('conserva el texto original', () => {
    const code = 'const frase = `Hola ${nombre.trim()}`\nfrase.slice(0, 4) // "Hola"'
    expect(tokenize(code).map((t) => t.text).join('')).toBe(code)
  })

  it('distingue comentarios de resultado y explicaciones', () => {
    const types = tokenize('a // "x"\nb // por ejemplo').filter((t) => t.text.startsWith('//')).map((t) => t.type)
    expect(types).toEqual(['result', 'comment'])
  })

  it('no confunde // dentro de un string con un comentario', () => {
    expect(annotatedLines('const url = "http://x"')).toEqual([])
  })

  it('reconoce operadores de varios caracteres', () => {
    const operators = tokenize('a === b && c !== d').filter((t) => t.type === 'operator').map((t) => t.text)
    expect(operators).toEqual(['===', '&&', '!=='])
  })

  it('resalta el término del concepto', () => {
    const emphasized = highlight('texto.slice(0, 4)', ['slice']).filter((t) => t.emphasis)
    expect(emphasized.map((t) => t.text)).toEqual(['slice'])
  })
})

describe('termsFor', () => {
  it('deriva el término desde el nombre', () => {
    expect(termsFor({ name: 'slice()', kind: 'method' })).toEqual(['slice'])
    expect(termsFor({ name: 'Math.random()', kind: 'method' })).toEqual(['random'])
    expect(termsFor({ name: '.length', kind: 'property' })).toEqual(['length'])
    expect(termsFor({ name: '===', kind: 'operator' })).toEqual(['==='])
  })
})
