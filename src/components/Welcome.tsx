import { ArrowRight, MessageSquareQuote } from 'lucide-react'
import { useKnowledge } from '../knowledge/KnowledgeContext'
import type { Category } from '../knowledge/model'
import { accents, cx } from '../lib/accents'

const questions = [
  { title: '¿Qué tipo de dato tengo?', detail: 'Un texto, un número, una lista…' },
  { title: '¿Qué necesito hacer con él?', detail: 'Cortarlo, buscar algo, convertirlo, compararlo…' },
  { title: '¿Qué herramientas conozco para hacerlo?', detail: 'Aquí ves las que has estudiado. Tú las comparas y decides.' },
]

/** Estado inicial: explica el hábito de las tres preguntas. */
export function Welcome({ onTryExample }: { onTryExample: (categoryId: string, actionId: string) => void }) {
  const query = useKnowledge()
  const exampleCategory = query.getCategory('array')
  const exampleAction = query.getAction('search')

  return (
    <section className="mt-14 overflow-hidden rounded-2xl border border-line bg-surface" aria-labelledby="como-usar">
      <div className="px-5 py-6 sm:px-8 sm:py-8">
        <h2 id="como-usar" className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
          Cuando un ejercicio te pida algo, hazte tres preguntas
        </h2>
        <ol className="mt-6 grid gap-4 md:grid-cols-3">
          {questions.map((question, index) => (
            <li key={question.title} className="rounded-xl border border-line bg-surface-2/70 p-4">
              <span className="flex size-7 items-center justify-center rounded-full bg-ink text-sm font-bold text-bg">{index + 1}</span>
              <p className="mt-3 font-semibold text-ink">{question.title}</p>
              <p className="mt-1 text-[15px] text-ink-2">{question.detail}</p>
            </li>
          ))}
        </ol>

        {exampleCategory && exampleAction && (
          <div className="mt-6 flex flex-col gap-4 rounded-xl bg-[#fdf9dc] p-4 sm:flex-row sm:items-center dark:bg-[#2a2710]">
            <MessageSquareQuote className="size-6 shrink-0 text-[#8a7400] dark:text-[#e8cd3a]" aria-hidden />
            <div className="flex-1">
              <p className="text-[15px] text-ink-2 italic">“Necesito saber si un valor existe dentro de un arreglo.”</p>
              <p className="mt-1 flex flex-wrap items-center gap-1.5 font-semibold text-ink">
                <CategoryName category={exampleCategory} />
                <ArrowRight className="size-4 text-ink-3" aria-hidden />
                {exampleAction.label}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onTryExample(exampleCategory.id, exampleAction.id)}
              className="shrink-0 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-bg transition hover:opacity-90 focus-visible:ring-4 focus-visible:ring-[#f7df1e]/60 focus-visible:outline-none"
            >
              Ver este ejemplo
            </button>
          </div>
        )}
      </div>
      <div className="border-t border-line bg-surface-2/70 px-5 py-3.5 text-sm text-ink-3 sm:px-8">
        Esta herramienta te ayuda a recordar nombres y sintaxis de lo que ya estudiaste. No resuelve ejercicios ni te dice cuál usar: esa
        decisión es tuya.
      </div>
    </section>
  )
}

function CategoryName({ category }: { category: Category }) {
  return <span className={cx(accents[category.accent].text)}>{category.label}</span>
}

/** Paso intermedio: hay tipo de dato pero falta la acción. */
export function ChooseActionHint({ category }: { category: Category }) {
  const accent = accents[category.accent]
  return (
    <section className={cx('mt-14 rounded-2xl border-2 border-dashed px-5 py-6 sm:px-8', accent.border)}>
      <p className="text-lg font-semibold text-ink">
        Tienes un <span className={accent.text}>{category.label}</span>. ¿Qué te pide hacer el ejercicio con él?
      </p>
      <p className="mt-1 text-[15px] text-ink-2">
        Busca el verbo en el enunciado: «corta», «busca», «convierte», «compara»… y elige la acción que mejor lo describa.
      </p>
    </section>
  )
}
