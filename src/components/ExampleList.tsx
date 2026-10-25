import { ChevronRight } from 'lucide-react'
import { useEffect, useId, useState } from 'react'
import type { Example } from '../knowledge/model'
import { cx } from '../lib/accents'
import { NotesBadge } from './Badges'
import { CodeBlock } from './Code'

/** Señal externa para abrir o cerrar todos los ejemplos de todas las tarjetas. */
export interface ExpandSignal {
  open: boolean
  version: number
}

export function ExampleList({ examples, terms, signal }: { examples: Example[]; terms: string[]; signal: ExpandSignal }) {
  const baseId = useId()
  const [open, setOpen] = useState<Set<number>>(() => new Set([0]))

  useEffect(() => {
    if (signal.version === 0) return
    setOpen(signal.open ? new Set(examples.map((_, index) => index)) : new Set())
  }, [signal, examples])

  const allOpen = open.size === examples.length
  const toggle = (index: number) =>
    setOpen((previous) => {
      const next = new Set(previous)
      if (next.has(index)) next.delete(index)
      else next.add(index)
      return next
    })

  return (
    <section>
      <div className="mb-3 flex items-center justify-between gap-3">
        <h4 className="flex items-center gap-2 text-xs font-bold tracking-wider text-ink-3 uppercase">
          Ejemplos
          <span className="rounded-full bg-surface-2 px-1.5 py-px text-[11px] font-semibold text-ink-3 tabular-nums">
            {examples.length}
          </span>
        </h4>
        {examples.length > 1 && (
          <button
            type="button"
            onClick={() => setOpen(allOpen ? new Set() : new Set(examples.map((_, index) => index)))}
            className="rounded-md px-2 py-1 text-sm font-medium text-ink-2 transition hover:bg-surface-2 hover:text-ink focus-visible:ring-4 focus-visible:ring-[#f7df1e]/50 focus-visible:outline-none"
          >
            {allOpen ? 'Cerrar todos' : 'Abrir todos'}
          </button>
        )}
      </div>
      <ul className="divide-y divide-line overflow-hidden rounded-xl border border-line">
        {examples.map((example, index) => {
          const isOpen = open.has(index)
          const panelId = `${baseId}-${index}`
          return (
            <li key={example.title} className={cx(isOpen && 'bg-surface-2/60')}>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(index)}
                className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-surface-2 focus-visible:bg-surface-2 focus-visible:outline-none"
              >
                <ChevronRight
                  className={cx('size-4 shrink-0 text-ink-3 transition-transform duration-150', isOpen && 'rotate-90')}
                  aria-hidden
                />
                <span className="min-w-0 flex-1 font-medium text-ink">{example.title}</span>
                {example.throws && (
                  <span className="shrink-0 rounded-full border border-line-strong px-2 py-0.5 font-mono text-[11px] font-semibold text-ink-2">
                    lanza {example.throws}
                  </span>
                )}
                {example.fromNotes && <NotesBadge />}
              </button>
              {isOpen && (
                <div id={panelId} className="px-4 pb-4 sm:pl-11">
                  <CodeBlock code={example.code} terms={terms} className="bg-surface" />
                  {example.explanation && <p className="mt-2.5 text-[15px] leading-relaxed text-ink-2">{example.explanation}</p>}
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
