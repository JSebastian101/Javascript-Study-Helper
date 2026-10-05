import type { ResolvedComparison, ResolvedConcept } from '../knowledge/model'
import { cx } from '../lib/accents'
import { TypeBadge } from './Badges'
import { InlineCode } from './Code'
import { codeNamedKinds, isCallable } from './labels'

function parametersSummary(concept: ResolvedConcept) {
  if (concept.parameters === undefined) return <span className="text-ink-3">—</span>
  if (concept.parameters.length === 0) return <span className="text-ink-2">Nada</span>
  return (
    <span className="flex flex-wrap gap-x-2 gap-y-1">
      {concept.parameters.map((parameter) => (
        <span key={parameter.name} className="whitespace-nowrap">
          <code className="font-mono text-[13px] font-semibold text-ink">{parameter.name}</code>
          {parameter.optional && <span className="text-xs text-ink-3"> (opcional)</span>}
        </span>
      ))}
    </span>
  )
}

function returnsSummary(concept: ResolvedConcept) {
  if (!concept.returns) return <span className="text-ink-3">—</span>
  if (concept.returns.type) {
    return (
      <span className="flex flex-col items-start gap-1">
        <TypeBadge type={concept.returns.type} />
        <span className="text-[13px] leading-snug text-ink-3">{concept.returns.description}</span>
      </span>
    )
  }
  return <span className="text-ink-2">{concept.returns.description}</span>
}

function mutatesSummary(concept: ResolvedConcept) {
  if (concept.mutates === undefined) return <span className="text-ink-3">—</span>
  return concept.mutates ? <span className="font-bold text-ink">Sí, lo cambia</span> : <span className="text-ink-2">No</span>
}

function NameLink({ concept, onJump }: { concept: ResolvedConcept; onJump: (id: string) => void }) {
  return (
    <a
      href={`#concepto-${concept.id}`}
      onClick={(event) => {
        event.preventDefault()
        onJump(concept.id)
      }}
      className={cx(
        'font-bold whitespace-nowrap text-ink underline decoration-line-strong decoration-2 underline-offset-4 transition hover:decoration-[#e0c400]',
        codeNamedKinds.has(concept.kind) && 'font-mono',
      )}
    >
      {concept.name}
    </a>
  )
}

/** Tabla generada a partir de los datos: qué recibe, qué hace y qué retorna cada resultado. */
export function ComparisonOverview({ concepts, onJump }: { concepts: ResolvedConcept[]; onJump: (id: string) => void }) {
  const hasParameters = concepts.some((c) => c.parameters !== undefined)
  const hasReturns = concepts.some((c) => c.returns !== undefined)
  const hasMutates = concepts.some((c) => c.mutates !== undefined)
  const returnsHeader = concepts.some((c) => isCallable(c.kind)) ? '¿Qué retorna?' : 'Resultado'

  return (
    <section className="mt-8" aria-labelledby="comparacion-rapida">
      <h3 id="comparacion-rapida" className="text-lg font-bold text-ink">
        Comparación rápida
      </h3>
      <p className="mt-0.5 mb-3 text-[15px] text-ink-2">Las diferencias de un vistazo. Haz clic en un nombre para ir a su ficha completa.</p>
      <ul className="space-y-3 md:hidden">
        {concepts.map((concept) => (
          <li key={concept.id} className="rounded-2xl border border-line bg-surface px-4 py-3.5">
            <NameLink concept={concept} onJump={onJump} />
            <p className="mt-1.5 text-[15px] leading-snug text-ink-2">{concept.summary}</p>
            <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-3 gap-y-2 text-[15px]">
              {hasParameters && (
                <>
                  <dt className="text-xs font-semibold tracking-wide text-ink-3 uppercase">Recibe</dt>
                  <dd>{parametersSummary(concept)}</dd>
                </>
              )}
              {hasReturns && (
                <>
                  <dt className="text-xs font-semibold tracking-wide text-ink-3 uppercase">{returnsHeader.replace(/[¿?]/g, '')}</dt>
                  <dd>{returnsSummary(concept)}</dd>
                </>
              )}
              {hasMutates && (
                <>
                  <dt className="text-xs font-semibold tracking-wide text-ink-3 uppercase">Modifica</dt>
                  <dd>{mutatesSummary(concept)}</dd>
                </>
              )}
            </dl>
          </li>
        ))}
      </ul>
      <div className="hidden overflow-x-auto rounded-2xl border border-line bg-surface md:block">
        <table className="w-full text-left text-[15px]">
          <thead className="bg-surface-2 text-xs font-semibold tracking-wide text-ink-3 uppercase">
            <tr>
              <th scope="col" className="px-4 py-3">Herramienta</th>
              <th scope="col" className="px-4 py-3">¿Qué hace?</th>
              {hasParameters && <th scope="col" className="px-4 py-3">¿Qué recibe?</th>}
              {hasReturns && <th scope="col" className="px-4 py-3">{returnsHeader}</th>}
              {hasMutates && <th scope="col" className="px-4 py-3">¿Modifica el original?</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {concepts.map((concept) => (
              <tr key={concept.id} className="align-top">
                <th scope="row" className="px-4 py-3.5">
                  <NameLink concept={concept} onJump={onJump} />
                </th>
                <td className="max-w-[22rem] px-4 py-3.5 leading-snug text-ink-2">{concept.summary}</td>
                {hasParameters && <td className="px-4 py-3.5">{parametersSummary(concept)}</td>}
                {hasReturns && <td className="max-w-[16rem] px-4 py-3.5">{returnsSummary(concept)}</td>}
                {hasMutates && <td className="px-4 py-3.5 whitespace-nowrap">{mutatesSummary(concept)}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

/** Tabla con la misma entrada pasada por varias herramientas. */
export function ComparisonGridTable({ grid }: { grid: ResolvedComparison }) {
  return (
    <section className="mt-8" aria-label={grid.title}>
      <h3 className="text-lg font-bold text-ink">{grid.title}</h3>
      {grid.description && <p className="mt-0.5 text-[15px] text-ink-2">{grid.description}</p>}
      <div className="mt-3 overflow-x-auto rounded-2xl border border-line bg-surface">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-line">
              {grid.inputHeaders.map((header) => (
                <th key={header} scope="col" className="bg-surface-2 px-4 py-2.5 text-xs font-semibold tracking-wide text-ink-3 uppercase">
                  {header}
                </th>
              ))}
              {grid.columns.map((column) => (
                <th key={column.header} scope="col" className="px-4 py-2.5 whitespace-nowrap">
                  <InlineCode code={column.header} className="font-semibold" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {grid.rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.inputs.map((input, index) => (
                  <td key={`in-${index}`} className="bg-surface-2 px-4 py-2.5 whitespace-nowrap">
                    <InlineCode code={input} />
                  </td>
                ))}
                {row.results.map((result, index) => (
                  <td key={`out-${index}`} className="px-4 py-2.5 whitespace-nowrap">
                    <InlineCode code={result} className="font-semibold" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
