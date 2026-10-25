import { ArrowRight, NotebookPen } from 'lucide-react'
import type { Category, ConceptKind, NoteRef, SourceInfo } from '../knowledge/model'
import { accents, cx } from '../lib/accents'
import { kindLabels } from './labels'

export function KindBadge({ kind }: { kind: ConceptKind }) {
  return (
    <span className="inline-flex items-center rounded-md border border-line bg-surface-2 px-2 py-0.5 text-xs font-semibold text-ink-2">
      {kindLabels[kind]}
    </span>
  )
}

export function CategoryBadge({ category }: { category: Category }) {
  const accent = accents[category.accent]
  return (
    <span className={cx('inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-semibold', accent.soft, accent.text)}>
      <span className={cx('size-1.5 rounded-full', accent.dot)} />
      {category.label}
    </span>
  )
}

export function ConversionBadge({ from, to }: { from: Category; to: Category }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-line px-2 py-0.5 text-xs font-semibold text-ink-2">
      <span className={accents[from.accent].text}>{from.label}</span>
      <ArrowRight className="size-3 text-ink-3" aria-label="se convierte en" />
      <span className={accents[to.accent].text}>{to.label}</span>
    </span>
  )
}

/** Tipo de dato de un valor retornado: "number", "boolean"... */
export function TypeBadge({ type }: { type: string }) {
  return (
    <span className="inline-flex items-center rounded-md bg-ink px-2 py-0.5 font-mono text-xs font-semibold text-bg">{type}</span>
  )
}

export function NotesBadge() {
  return (
    <span
      className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#fdf6c3] px-2 py-0.5 text-[11px] font-semibold text-[#6b5a00] dark:bg-[#3a3410] dark:text-[#f1dc6b]"
      title="Este ejemplo viene de tus apuntes"
    >
      <NotebookPen className="size-3" aria-hidden />
      De tus apuntes
    </span>
  )
}

function sectionsLabel(sections: string[]): string {
  return sections.length === 1 ? `pregunta ${sections[0]}` : `preguntas ${sections.join(', ')}`
}

export function SourceTag({ source, sections, also = [] }: { source: SourceInfo; sections: string[]; also?: NoteRef[] }) {
  const files = [source.file, ...also.map((ref) => ref.file)].join('\n')
  return (
    <span className="inline-flex items-start gap-1.5 text-xs text-ink-3" title={files}>
      <NotebookPen className="mt-px size-3.5 shrink-0" aria-hidden />
      <span>
        Apuntes de {source.title} · {sectionsLabel(sections)}
        {also.map((ref) => (
          <span key={ref.file} className="block">
            También en {ref.title} · {sectionsLabel(ref.sections)}
          </span>
        ))}
      </span>
    </span>
  )
}
