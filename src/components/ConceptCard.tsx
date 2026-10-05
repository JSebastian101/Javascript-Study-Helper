import { Lightbulb } from 'lucide-react'
import type { ReactNode } from 'react'
import { useKnowledge } from '../knowledge/KnowledgeContext'
import type { Action, Category, InfoTable, ResolvedConcept } from '../knowledge/model'
import { accents, cx } from '../lib/accents'
import { termsFor } from '../lib/highlight'
import { CategoryBadge, ConversionBadge, KindBadge, SourceTag, TypeBadge } from './Badges'
import { CodeBlock, InlineCode } from './Code'
import { ExampleList, type ExpandSignal } from './ExampleList'
import { codeNamedKinds, parametersLabel, returnsLabel } from './labels'

function SectionTitle({ children }: { children: ReactNode }) {
  return <h4 className="mb-2.5 text-xs font-bold tracking-wider text-ink-3 uppercase">{children}</h4>
}

function Fact({ title, children, className }: { title: string; children: ReactNode; className?: string }) {
  return (
    <div className={cx('rounded-xl border border-line bg-surface-2/70 px-4 py-3.5', className)}>
      <SectionTitle>{title}</SectionTitle>
      {children}
    </div>
  )
}

function Table({ table }: { table: InfoTable }) {
  const codeColumns = new Set(table.codeColumns ?? [])
  return (
    <div>
      {table.title && <SectionTitle>{table.title}</SectionTitle>}
      <div className="overflow-x-auto rounded-xl border border-line">
        <table className="w-full text-left text-[15px]">
          <thead className="bg-surface-2 text-xs font-semibold tracking-wide text-ink-3 uppercase">
            <tr>
              {table.headers.map((header) => (
                <th key={header} scope="col" className="px-4 py-2.5">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {table.rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="px-4 py-2.5 align-top text-ink-2">
                    {codeColumns.has(cellIndex) ? <InlineCode code={cell} className="text-ink" /> : cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function ConceptCard({
  concept,
  category,
  action,
  signal,
  onSelectAction,
  onOpenConcept,
}: {
  concept: ResolvedConcept
  category: Category
  action: Action
  signal: ExpandSignal
  onSelectAction: (actionId: string) => void
  onOpenConcept: (conceptId: string) => void
}) {
  const query = useKnowledge()
  const accent = accents[category.accent]
  const terms = termsFor(concept)
  const related = query.related(concept)
  const otherActions = concept.actions
    .filter((id) => id !== action.id)
    .map((id) => query.getAction(id))
    .filter((item): item is Action => item !== undefined)
  const from = concept.converts && query.getCategory(concept.converts.from)
  const to = concept.converts && query.getCategory(concept.converts.to)
  const syntax = concept.syntax ?? []
  const syntaxCode = syntax.join(syntax.some((line) => line.includes('\n')) ? '\n\n' : '\n')

  const parameters =
    concept.parameters === undefined ? null : (
      <Fact title={parametersLabel(concept.kind)}>
        {concept.parameters.length === 0 ? (
          <p className="text-[15px] text-ink-2">No recibe argumentos.</p>
        ) : (
          <dl className="space-y-3">
            {concept.parameters.map((parameter) => (
              <div key={parameter.name}>
                <dt className="flex flex-wrap items-center gap-2">
                  <code className="font-mono text-[15px] font-semibold text-ink">{parameter.name}</code>
                  {parameter.optional && (
                    <span className="rounded border border-line px-1.5 text-[11px] font-semibold text-ink-3">opcional</span>
                  )}
                </dt>
                <dd className="mt-0.5 text-[15px] leading-relaxed text-ink-2">{parameter.description}</dd>
              </div>
            ))}
          </dl>
        )}
      </Fact>
    )

  const returns = concept.returns && (
    <Fact title={returnsLabel(concept.kind)}>
      {concept.returns.type && (
        <div className="mb-1.5">
          <TypeBadge type={concept.returns.type} />
        </div>
      )}
      <p className="text-[15px] leading-relaxed text-ink-2">{concept.returns.description}</p>
    </Fact>
  )

  const mutates = concept.mutates !== undefined && (
    <Fact title="¿Modifica el original?">
      <p className="flex items-center gap-2 text-[15px] text-ink-2">
        <span
          className={cx(
            'rounded-md px-2 py-0.5 text-xs font-bold',
            concept.mutates ? 'bg-ink text-bg' : 'border border-line-strong text-ink',
          )}
        >
          {concept.mutates ? 'Sí' : 'No'}
        </span>
        {concept.mutates ? 'Cambia el valor original.' : 'El original queda igual.'}
      </p>
    </Fact>
  )

  const facts = [parameters, returns, mutates].filter(Boolean)

  return (
    <article
      id={`concepto-${concept.id}`}
      tabIndex={-1}
      aria-labelledby={`titulo-${concept.id}`}
      className="scroll-mt-20 overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_1px_2px_rgba(16,24,40,0.04)] focus:outline-none"
    >
      <div className={cx('h-1', accent.dot)} aria-hidden />
      <header className="px-5 pt-5 sm:px-7 sm:pt-6">
        <div className="flex flex-wrap items-center gap-2">
          <KindBadge kind={concept.kind} />
          <CategoryBadge category={category} />
          {from && to && <ConversionBadge from={from} to={to} />}
          <span className="basis-full sm:ml-auto sm:basis-auto">
            <SourceTag source={concept.source} sections={concept.sections} />
          </span>
        </div>
        <h3
          id={`titulo-${concept.id}`}
          className={cx(
            'mt-3 text-[1.75rem] leading-tight font-bold tracking-tight break-words text-ink sm:text-3xl',
            codeNamedKinds.has(concept.kind) && 'font-mono tracking-normal',
          )}
        >
          {concept.name}
        </h3>
        {concept.aka && <p className="mt-1 text-[15px] text-ink-3">{concept.aka}</p>}
      </header>

      <div className="space-y-7 px-5 pt-5 pb-6 sm:px-7">
        <section>
          <SectionTitle>¿Qué hace?</SectionTitle>
          <p className="text-[17px] leading-relaxed text-ink">{concept.summary}</p>
        </section>

        {syntax.length > 0 && (
          <section>
            <SectionTitle>Sintaxis</SectionTitle>
            <CodeBlock code={syntaxCode} terms={terms} className="text-[14.5px]" />
          </section>
        )}

        {facts.length === 3 ? (
          <div className="grid gap-3 md:grid-cols-2">
            {parameters}
            <div className="grid content-start gap-3">
              {returns}
              {mutates}
            </div>
          </div>
        ) : facts.length > 0 ? (
          <div className={cx('grid gap-3', facts.length > 1 && 'md:grid-cols-2')}>
            {parameters}
            {returns}
            {mutates}
          </div>
        ) : null}

        {concept.tables?.map((table, index) => <Table key={index} table={table} />)}

        {concept.keyPoints && concept.keyPoints.length > 0 && (
          <section>
            <SectionTitle>Para tener en cuenta</SectionTitle>
            <ul className="space-y-2">
              {concept.keyPoints.map((point) => (
                <li key={point} className="flex gap-2.5 text-[15px] leading-relaxed text-ink-2">
                  <Lightbulb className="mt-1 size-4 shrink-0 text-[#c9a800] dark:text-[#e8cd3a]" aria-hidden />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <ExampleList examples={concept.examples} terms={terms} signal={signal} />

        <footer className="space-y-4 border-t border-line pt-5">
          {concept.phrases.length > 0 && (
            <div>
              <p className="mb-2 text-sm font-medium text-ink-3">También lo puedes describir como:</p>
              <ul className="flex flex-wrap gap-1.5">
                {concept.phrases.map((phrase) => (
                  <li key={phrase} className="rounded-full border border-line bg-surface-2 px-2.5 py-1 text-sm text-ink-2">
                    {phrase}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {otherActions.length > 0 && (
            <div>
              <p className="mb-2 text-sm font-medium text-ink-3">También aparece en:</p>
              <div className="flex flex-wrap gap-1.5">
                {otherActions.map((other) => (
                  <button
                    key={other.id}
                    type="button"
                    onClick={() => onSelectAction(other.id)}
                    className={cx(
                      'rounded-full border px-2.5 py-1 text-sm font-medium transition hover:shadow-sm focus-visible:ring-4 focus-visible:ring-[#f7df1e]/50 focus-visible:outline-none',
                      accent.border,
                      accent.text,
                    )}
                  >
                    {category.label} → {other.label}
                  </button>
                ))}
              </div>
            </div>
          )}
          {related.length > 0 && (
            <div>
              <p className="mb-2 text-sm font-medium text-ink-3">Relacionado:</p>
              <div className="flex flex-wrap gap-1.5">
                {related.map((item) => {
                  const itemCategory = query.getCategory(
                    item.categories.includes(category.id) ? category.id : item.categories[0],
                  )
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => onOpenConcept(item.id)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-2.5 py-1 text-sm transition hover:border-line-strong hover:bg-surface-2 focus-visible:ring-4 focus-visible:ring-[#f7df1e]/50 focus-visible:outline-none"
                    >
                      <span className={cx('font-semibold text-ink', codeNamedKinds.has(item.kind) && 'font-mono')}>{item.name}</span>
                      {itemCategory && itemCategory.id !== category.id && (
                        <span className={cx('text-xs font-semibold', accents[itemCategory.accent].text)}>{itemCategory.label}</span>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </footer>
      </div>
    </article>
  )
}
