/**
 * Reporte de cobertura de la wiki: qué preguntas de cada archivo de `wiki/`
 * ya están representadas en la app (como concepto o como ejercicio pendiente).
 *
 *   npm run wiki:coverage                         resumen de todos los archivos
 *   npm run wiki:coverage -- wiki/tripleten/strings.md   detalle de un archivo
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import type { KnowledgeSource, PendingExercise } from '../src/knowledge/model.ts'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const requested = process.argv.slice(2).map((file) => path.normalize(file))

async function loadSources(): Promise<KnowledgeSource[]> {
  const dir = path.join(root, 'src/knowledge/sources')
  const sources: KnowledgeSource[] = []
  for (const file of fs.readdirSync(dir).sort()) {
    const fullPath = path.join(dir, file)
    if (file.endsWith('.json')) sources.push(JSON.parse(fs.readFileSync(fullPath, 'utf8')))
    else if (file.endsWith('.ts') && !file.endsWith('.test.ts')) sources.push((await import(pathToFileURL(fullPath).href)).default)
  }
  return sources
}

function wikiFiles(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) return wikiFiles(fullPath)
    return entry.name.endsWith('.md') && entry.name !== 'README.md' ? [path.relative(root, fullPath)] : []
  })
}

const sources = await loadSources()
const { pendingExercises } = (await import(pathToFileURL(path.join(root, 'src/knowledge/practice/pending.ts')).href)) as {
  pendingExercises: PendingExercise[]
}

// archivo → pregunta → ids que la usan
const usage = new Map<string, Map<string, { concepts: string[]; exercises: string[] }>>()
function mark(file: string, sections: string[], id: string, kind: 'concepts' | 'exercises') {
  const byQuestion = usage.get(file) ?? new Map()
  usage.set(file, byQuestion)
  for (const section of sections) {
    const entry = byQuestion.get(section) ?? { concepts: [], exercises: [] }
    entry[kind].push(id)
    byQuestion.set(section, entry)
  }
}

for (const source of sources) {
  for (const concept of source.concepts) {
    mark(source.file, concept.sections, concept.id, 'concepts')
    for (const ref of concept.alsoIn ?? []) mark(ref.file, ref.sections, concept.id, 'concepts')
  }
}
for (const exercise of pendingExercises) mark(exercise.from.file, exercise.from.sections, exercise.id, 'exercises')

let totalQuestions = 0
let totalCovered = 0
for (const file of wikiFiles(path.join(root, 'wiki')).sort()) {
  if (requested.length > 0 && !requested.includes(file)) continue
  const text = fs.readFileSync(path.join(root, file), 'utf8')
  const questions = [...text.matchAll(/^## (\d+)\.\s*(.+)$/gm)].map((match) => ({ number: match[1], title: match[2].trim() }))
  const byQuestion = usage.get(file) ?? new Map()
  const covered = questions.filter((q) => byQuestion.has(q.number))
  const exercises = questions.filter((q) => byQuestion.get(q.number)?.exercises.length)
  totalQuestions += questions.length
  totalCovered += covered.length

  const percent = questions.length === 0 ? 0 : Math.round((covered.length / questions.length) * 100)
  const exerciseNote = exercises.length > 0 ? ` (${exercises.length} como ejercicio pendiente)` : ''
  console.log(`${file}: ${covered.length}/${questions.length} preguntas (${percent}%)${exerciseNote}`)

  const showDetail = requested.length > 0 || (covered.length > 0 && covered.length < questions.length)
  if (!showDetail) continue
  for (const question of questions) {
    const entry = byQuestion.get(question.number)
    const mark = entry ? '✓' : '·'
    const detail = entry ? `  → ${[...entry.concepts, ...entry.exercises.map((id: string) => `ejercicio ${id}`)].join(', ')}` : '  (sin transformar)'
    console.log(`  ${mark} ${question.number}. ${question.title}${detail}`)
  }
}
console.log(`\nTotal: ${totalCovered}/${totalQuestions} preguntas representadas en la app`)
