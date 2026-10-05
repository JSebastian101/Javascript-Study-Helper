import { ArrowRight, ChevronsDownUp, ChevronsUpDown, Scale } from 'lucide-react'
import { useState } from 'react'
import { useKnowledge } from '../knowledge/KnowledgeContext'
import type { Action, Category, ResolvedConcept } from '../knowledge/model'
import { accents, cx } from '../lib/accents'
import { ComparisonGridTable, ComparisonOverview } from './Comparison'
import { ConceptCard } from './ConceptCard'
import type { ExpandSignal } from './ExampleList'
import { plural } from './labels'

export function Results({
  category,
  action,
  concepts,
  onSelectAction,
  onOpenConcept,
  onJump,
}: {
  category: Category
  action: Action
  concepts: ResolvedConcept[]
  onSelectAction: (actionId: string) => void
  onOpenConcept: (conceptId: string) => void
  onJump: (conceptId: string) => void
}) {
  const query = useKnowledge()
  const grids = query.comparisonsFor(concepts)
  const [signal, setSignal] = useState<ExpandSignal>({ open: false, version: 0 })
  const accent = accents[category.accent]
  const many = concepts.length > 1
  const isReview = action.group === 'concept'

  return (
    <section aria-labelledby="resultados" className="mt-14">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-5">
        <div>
          <p className="text-sm font-medium text-ink-3">{isReview ? 'Conceptos para repasar en' : 'Lo que has estudiado para'}</p>
          <h2 id="resultados" className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-2xl font-bold tracking-tight sm:text-3xl">
            <span className={accent.text}>{category.label}</span>
            <ArrowRight className="size-6 text-ink-3" aria-label="y la acción" />
            <span className="text-ink">{action.label}</span>
          </h2>
          <p className="mt-2 text-[15px] text-ink-2">
            {plural(concepts.length, 'herramienta relacionada', 'herramientas relacionadas')}
            {action.synonyms.length > 0 && <span className="text-ink-3"> · también se dice: {action.synonyms.slice(0, 4).join(', ')}</span>}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setSignal((previous) => ({ open: !previous.open, version: previous.version + 1 }))}
          className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-2 text-sm font-medium text-ink-2 transition hover:border-line-strong hover:text-ink focus-visible:ring-4 focus-visible:ring-[#f7df1e]/50 focus-visible:outline-none"
        >
          {signal.open ? <ChevronsDownUp className="size-4" aria-hidden /> : <ChevronsUpDown className="size-4" aria-hidden />}
          {signal.open ? 'Cerrar todos los ejemplos' : 'Abrir todos los ejemplos'}
        </button>
      </div>

      <div className="mt-6 flex gap-3 rounded-2xl border border-line bg-surface px-5 py-4">
        <Scale className="mt-0.5 size-5 shrink-0 text-ink-3" aria-hidden />
        <p className="text-[15px] leading-relaxed text-ink-2">
          {many ? (
            <>
              Estas herramientas están relacionadas con <strong className="font-semibold text-ink">{action.label.toLowerCase()}</strong>, pero
              no hacen lo mismo. Compara <strong className="font-semibold text-ink">qué reciben, qué hacen y qué retornan</strong>: decidir
              cuál se ajusta a tu problema es tu parte.
            </>
          ) : (
            <>
              Revisa <strong className="font-semibold text-ink">qué recibe, qué hace y qué retorna</strong> para confirmar si se ajusta a lo
              que necesitas en tu problema.
            </>
          )}
        </p>
      </div>

      {many && <ComparisonOverview concepts={concepts} onJump={onJump} />}
      {grids.map((grid) => (
        <ComparisonGridTable key={grid.id} grid={grid} />
      ))}

      <div className={cx('space-y-8', many || grids.length > 0 ? 'mt-12' : 'mt-8')}>
        {concepts.map((concept) => (
          <ConceptCard
            key={concept.id}
            concept={concept}
            category={category}
            action={action}
            signal={signal}
            onSelectAction={onSelectAction}
            onOpenConcept={onOpenConcept}
          />
        ))}
      </div>
    </section>
  )
}
