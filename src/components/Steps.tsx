import { Check } from 'lucide-react'
import type { Category } from '../knowledge/model'
import type { ActionOption, CategoryOption } from '../knowledge/query'
import { accents, cx } from '../lib/accents'
import { plural } from './labels'

function StepHeading({
  step,
  title,
  hint,
  done,
  disabled,
}: {
  step: number
  title: string
  hint?: string
  done?: boolean
  disabled?: boolean
}) {
  return (
    <div className="flex items-start gap-3.5">
      <span
        aria-hidden
        className={cx(
          'mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors',
          done && 'bg-ink text-bg',
          !done && disabled && 'border border-line bg-surface-2 text-ink-3',
          !done && !disabled && 'bg-[#f7df1e] text-[#1a1a1a]',
        )}
      >
        {done ? <Check className="size-4" strokeWidth={3} /> : step}
      </span>
      <div>
        <h2 className={cx('text-xl font-bold tracking-tight sm:text-2xl', disabled ? 'text-ink-3' : 'text-ink')}>{title}</h2>
        {hint && <p className="mt-1 text-[15px] text-ink-2">{hint}</p>}
      </div>
    </div>
  )
}

function CategoryCard({
  option,
  selected,
  onSelect,
}: {
  option: CategoryOption
  selected: boolean
  onSelect: (id: string) => void
}) {
  const { category, count } = option
  const accent = accents[category.accent]
  return (
    <label
      className={cx(
        'group relative flex cursor-pointer items-center gap-4 rounded-2xl border-2 bg-surface p-4 transition sm:flex-col sm:items-stretch sm:gap-0',
        'has-[:focus-visible]:ring-4',
        accent.ring,
        selected ? cx(accent.border, accent.soft) : 'border-line hover:border-line-strong',
      )}
    >
      <input
        type="radio"
        name="categoria"
        value={category.id}
        checked={selected}
        onChange={() => onSelect(category.id)}
        className="sr-only"
      />
      <div className="flex items-start justify-between sm:mb-4">
        <code
          className={cx(
            'rounded-lg px-2.5 py-1 font-mono text-sm font-semibold whitespace-nowrap transition-colors',
            selected ? accent.solid : 'bg-surface-2 text-ink-2',
          )}
        >
          {category.sample}
        </code>
        <span
          aria-hidden
          className={cx(
            'hidden size-6 items-center justify-center rounded-full transition-colors sm:flex',
            selected ? accent.solid : 'border border-line-strong',
          )}
        >
          {selected && <Check className="size-3.5" strokeWidth={3} />}
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <span className="block text-lg leading-tight font-bold text-ink">{category.label}</span>
        <span className="block text-sm text-ink-2">{category.description}</span>
        <span className="mt-1.5 block text-xs text-ink-3">{plural(count, 'concepto', 'conceptos')}</span>
      </div>
    </label>
  )
}

export function CategoryStep({
  options,
  selectedId,
  onSelect,
}: {
  options: CategoryOption[]
  selectedId?: string
  onSelect: (id: string) => void
}) {
  const dataTypes = options.filter((option) => option.category.group === 'dataType')
  const topics = options.filter((option) => option.category.group === 'topic')
  return (
    <fieldset>
      <legend className="sr-only">Paso 1: tipo de dato o categoría</legend>
      <StepHeading
        step={1}
        title="¿Con qué tipo de dato estás trabajando?"
        hint="Antes de pensar en métodos, identifica qué tienes: un texto, un número, una lista…"
        done={selectedId !== undefined}
      />
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {dataTypes.map((option) => (
          <CategoryCard key={option.category.id} option={option} selected={option.category.id === selectedId} onSelect={onSelect} />
        ))}
      </div>
      {topics.length > 0 && (
        <>
          <p className="mt-5 mb-2.5 text-xs font-semibold tracking-wider text-ink-3 uppercase">Otras categorías</p>
          <div className="grid gap-3 sm:grid-cols-3">
            {topics.map((option) => (
              <CategoryCard key={option.category.id} option={option} selected={option.category.id === selectedId} onSelect={onSelect} />
            ))}
          </div>
        </>
      )}
    </fieldset>
  )
}

function ActionCard({
  option,
  selected,
  category,
  onSelect,
}: {
  option: ActionOption
  selected: boolean
  category: Category
  onSelect: (id: string) => void
}) {
  const { action, count } = option
  const accent = accents[category.accent]
  return (
    <label
      className={cx(
        'flex cursor-pointer items-start gap-3 rounded-xl border bg-surface px-4 py-3 transition',
        'has-[:focus-visible]:ring-4',
        accent.ring,
        selected ? cx(accent.border, accent.soft, 'shadow-sm') : 'border-line hover:border-line-strong hover:bg-surface-2',
      )}
    >
      <input type="radio" name="accion" value={action.id} checked={selected} onChange={() => onSelect(action.id)} className="sr-only" />
      <span className="min-w-0 flex-1">
        <span className={cx('block font-semibold', selected ? accent.text : 'text-ink')}>{action.label}</span>
        <span className="block text-sm leading-snug text-ink-3">{action.hint}</span>
      </span>
      <span
        className={cx(
          'mt-0.5 rounded-full px-2 py-0.5 text-xs font-semibold tabular-nums',
          selected ? accent.solid : 'bg-surface-2 text-ink-3',
        )}
        title={plural(count, 'concepto relacionado', 'conceptos relacionados')}
      >
        {count}
      </span>
    </label>
  )
}

export function ActionStep({
  category,
  options,
  selectedId,
  onSelect,
}: {
  category?: Category
  options: ActionOption[]
  selectedId?: string
  onSelect: (id: string) => void
}) {
  const doing = options.filter((option) => option.action.group !== 'concept')
  const reviewing = options.filter((option) => option.action.group === 'concept')
  const title = category?.group === 'dataType' ? `¿Qué necesitas hacer con tu ${category.label}?` : '¿Qué necesitas hacer?'

  return (
    <fieldset disabled={!category} className="mt-12">
      <legend className="sr-only">Paso 2: acción</legend>
      <StepHeading
        step={2}
        title={title}
        hint={category ? 'Elige la acción que mejor describe lo que te pide el ejercicio.' : undefined}
        done={selectedId !== undefined}
        disabled={!category}
      />
      {!category ? (
        <div className="mt-5 rounded-2xl border-2 border-dashed border-line px-5 py-6 text-[15px] text-ink-3">
          Primero elige con qué tipo de dato estás trabajando.
        </div>
      ) : (
        <>
          <div className="mt-5 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {doing.map((option) => (
              <ActionCard
                key={option.action.id}
                option={option}
                category={category}
                selected={option.action.id === selectedId}
                onSelect={onSelect}
              />
            ))}
          </div>
          {reviewing.length > 0 && (
            <>
              <p className="mt-5 mb-2.5 text-xs font-semibold tracking-wider text-ink-3 uppercase">Para repasar</p>
              <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                {reviewing.map((option) => (
                  <ActionCard
                    key={option.action.id}
                    option={option}
                    category={category}
                    selected={option.action.id === selectedId}
                    onSelect={onSelect}
                  />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </fieldset>
  )
}
