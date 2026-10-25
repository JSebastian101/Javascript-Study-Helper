/**
 * Tokenizador mínimo de JavaScript para colorear los ejemplos.
 * No pretende ser un parser completo: cubre lo que aparece en el contenido.
 */

export type TokenType =
  | 'keyword'
  | 'literal'
  | 'string'
  | 'escape'
  | 'interp'
  | 'number'
  | 'comment'
  | 'result'
  | 'global'
  | 'property'
  | 'function'
  | 'operator'
  | 'punctuation'
  | 'plain'

export interface Token {
  type: TokenType
  text: string
  emphasis?: boolean
}

const KEYWORDS = new Set([
  'const', 'let', 'var', 'if', 'else', 'return', 'function', 'new', 'typeof',
  'for', 'of', 'while', 'break', 'continue', 'debugger',
])
const LITERALS = new Set(['true', 'false', 'null', 'undefined', 'NaN', 'Infinity'])
const GLOBALS = new Set(['Math', 'Number', 'console', 'String', 'Array', 'Boolean'])
const OPERATORS = [
  '**=', '===', '!==', '...',
  '**', '==', '!=', '<=', '>=', '&&', '||', '++', '--', '+=', '-=', '*=', '/=', '%=', '=>',
  '+', '-', '*', '/', '%', '=', '<', '>', '!', '?', ':',
]

/** Un comentario es "resultado" cuando lo que sigue a // parece un valor de JavaScript. */
export function isResultComment(text: string): boolean {
  const body = text.replace(/^\/\/\s*/, '')
  return /^(["'`[]|-?\d|true\b|false\b|undefined\b|null\b|NaN\b|Infinity\b)/.test(body)
}

function readQuoted(code: string, start: number, quote: string, out: Token[]): number {
  let i = start + 1
  let buffer = quote
  const flush = () => {
    if (buffer) out.push({ type: 'string', text: buffer })
    buffer = ''
  }
  while (i < code.length) {
    const ch = code[i]
    if (ch === '\\' && i + 1 < code.length) {
      flush()
      out.push({ type: 'escape', text: code.slice(i, i + 2) })
      i += 2
      continue
    }
    if (ch === '\n') break
    buffer += ch
    i++
    if (ch === quote) break
  }
  flush()
  return i
}

function readTemplate(code: string, start: number, out: Token[]): number {
  let i = start + 1
  let buffer = '`'
  const flush = () => {
    if (buffer) out.push({ type: 'string', text: buffer })
    buffer = ''
  }
  while (i < code.length) {
    const ch = code[i]
    if (ch === '\\' && i + 1 < code.length) {
      flush()
      out.push({ type: 'escape', text: code.slice(i, i + 2) })
      i += 2
      continue
    }
    if (ch === '$' && code[i + 1] === '{') {
      flush()
      out.push({ type: 'interp', text: '${' })
      let depth = 1
      let j = i + 2
      while (j < code.length && depth > 0) {
        if (code[j] === '{') depth++
        else if (code[j] === '}') depth--
        if (depth > 0) j++
      }
      out.push(...tokenize(code.slice(i + 2, j)))
      if (j < code.length) out.push({ type: 'interp', text: '}' })
      i = j + 1
      continue
    }
    buffer += ch
    i++
    if (ch === '`') break
  }
  flush()
  return i
}

export function tokenize(code: string): Token[] {
  const tokens: Token[] = []
  let i = 0
  const lastSignificant = () => {
    for (let k = tokens.length - 1; k >= 0; k--) {
      if (tokens[k].text.trim() !== '') return tokens[k]
    }
    return undefined
  }

  while (i < code.length) {
    const ch = code[i]
    const rest = code.slice(i)

    if (rest.startsWith('//')) {
      const end = code.indexOf('\n', i)
      const text = code.slice(i, end === -1 ? code.length : end)
      tokens.push({ type: isResultComment(text) ? 'result' : 'comment', text })
      i += text.length
      continue
    }
    if (ch === '"' || ch === "'") {
      i = readQuoted(code, i, ch, tokens)
      continue
    }
    if (ch === '`') {
      i = readTemplate(code, i, tokens)
      continue
    }
    const number = /^\d+(\.\d+)?/.exec(rest)
    if (number) {
      tokens.push({ type: 'number', text: number[0] })
      i += number[0].length
      continue
    }
    const word = /^[A-Za-z_$áéíóúñÁÉÍÓÚÑ][\wáéíóúñÁÉÍÓÚÑ$]*/.exec(rest)
    if (word) {
      const text = word[0]
      const previous = lastSignificant()
      const next = code.slice(i + text.length).trimStart()[0]
      let type: TokenType = 'plain'
      if (previous?.text === '.') type = next === '(' ? 'function' : 'property'
      else if (KEYWORDS.has(text)) type = 'keyword'
      else if (LITERALS.has(text)) type = 'literal'
      else if (GLOBALS.has(text)) type = 'global'
      else if (next === '(') type = 'function'
      tokens.push({ type, text })
      i += text.length
      continue
    }
    const operator = OPERATORS.find((op) => rest.startsWith(op))
    if (operator) {
      tokens.push({ type: 'operator', text: operator })
      i += operator.length
      continue
    }
    const whitespace = /^\s+/.exec(rest)
    if (whitespace) {
      tokens.push({ type: 'plain', text: whitespace[0] })
      i += whitespace[0].length
      continue
    }
    tokens.push({ type: 'punctuation', text: ch })
    i++
  }
  return tokens
}

/** Tokeniza y marca las palabras u operadores que se quieren resaltar. */
export function highlight(code: string, terms: string[] = []): Token[] {
  const wanted = new Set(terms)
  return tokenize(code).map((token) =>
    wanted.has(token.text) && token.type !== 'string' && token.type !== 'comment' && token.type !== 'result'
      ? { ...token, emphasis: true }
      : token,
  )
}

export interface AnnotatedLine {
  /** Índice de línea (0-based). */
  line: number
  /** Código antes del comentario, sin espacios finales. */
  code: string
  /** Texto del comentario sin las barras. */
  comment: string
}

/** Líneas que tienen código seguido de un comentario `// ...`. */
export function annotatedLines(code: string): AnnotatedLine[] {
  const result: AnnotatedLine[] = []
  let offset = 0
  const lineStarts = [0]
  for (let k = 0; k < code.length; k++) if (code[k] === '\n') lineStarts.push(k + 1)
  const lineOf = (pos: number) => {
    let line = 0
    while (line + 1 < lineStarts.length && lineStarts[line + 1] <= pos) line++
    return line
  }
  for (const token of tokenize(code)) {
    if (token.type === 'comment' || token.type === 'result') {
      const line = lineOf(offset)
      const before = code.slice(lineStarts[line], offset).trimEnd()
      if (before.trim() !== '') {
        result.push({ line, code: before, comment: token.text.replace(/^\/\/\s*/, '') })
      }
    }
    offset += token.text.length
  }
  return result
}

/** Palabras a resaltar para un concepto, derivadas de su nombre si no se definen. */
export function termsFor(concept: { name: string; kind: string; highlight?: string[] }): string[] {
  if (concept.highlight) return concept.highlight
  const name = concept.name.trim()
  switch (concept.kind) {
    case 'method':
    case 'property':
    case 'function':
    case 'object': {
      const clean = name.replace(/\(\)$/, '').replace(/^\./, '')
      const last = clean.split('.').pop()
      return last ? [last] : []
    }
    case 'operator':
      return name.split(/\s+/).filter((part) => part !== '/' && part !== 'y')
    case 'statement':
      return name.split(/[\s/]+/).filter(Boolean)
    default:
      return []
  }
}
