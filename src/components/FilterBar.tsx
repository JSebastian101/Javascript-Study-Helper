import type { ReactNode } from 'react'
import { ArrowRight, ChevronDown, RotateCcw } from 'lucide-react'
import type { Action, Category } from '../knowledge/model'
import type { ActionOption, CategoryOption } from '../knowledge/query'
import { accents, cx } from '../lib/accents'

function PillSelect({
  label,
  value,
  onChange,
  className,
  children,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  className?: string
  children: ReactNode
}) {
  return (
    <label className={cx('relative inline-flex min-w-0 items-center', className)}>
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full min-w-0 cursor-pointer appearance-none truncate rounded-full border border-line bg-surface py-1.5 pr-8 pl-3.5 text-sm font-semibold text-ink transition hover:border-line-strong focus-visible:ring-4 focus-visible:ring-[#f7df1e]/50 focus-visible:outline-none"
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2.5 size-4 text-ink-3" aria-hidden />
    </label>
  )
}

/**
 * Barra fija con el filtro activo. Aparece cuando los pasos salen de la
 * pantalla, para poder cambiar de tipo o de acción sin volver arriba.
 */
export function FilterBar({
  visible,
  category,
  action,
  categoryOptions,
  actionOptions,
  onCategory,
  onAction,
  onReset,
}: {
  visible: boolean
  category: Category
  action?: Action
  categoryOptions: CategoryOption[]
  actionOptions: ActionOption[]
  onCategory: (id: string) => void
  onAction: (id: string) => void
  onReset: () => void
}) {
  const accent = accents[category.accent]
  return (
    <div
      inert={!visible}
      className={cx(
        'fixed inset-x-0 top-0 z-30 border-b border-line bg-surface/90 shadow-sm backdrop-blur-md transition-transform duration-200',
        visible ? 'translate-y-0' : '-translate-y-full',
      )}
    >
      <div className="mx-auto flex max-w-5xl items-center gap-2 px-4 py-2.5 sm:px-6">
        <span className={cx('hidden size-2 shrink-0 rounded-full sm:block', accent.dot)} aria-hidden />
        <PillSelect label="Tipo de dato" value={category.id} onChange={onCategory} className="max-w-[40%] sm:max-w-none">
          {categoryOptions.map(({ category: option }) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </PillSelect>
        <ArrowRight className="size-4 shrink-0 text-ink-3" aria-hidden />
        <PillSelect label="Acción" value={action?.id ?? ''} onChange={onAction} className="min-w-0 flex-1 sm:flex-none">
          {!action && (
            <option value="" disabled>
              Elige una acción
            </option>
          )}
          {actionOptions.map(({ action: option, count }) => (
            <option key={option.id} value={option.id}>
              {option.label} ({count})
            </option>
          ))}
        </PillSelect>
        <button
          type="button"
          onClick={onReset}
          className="ml-auto inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1.5 text-sm font-medium text-ink-2 transition hover:bg-surface-2 hover:text-ink focus-visible:ring-4 focus-visible:ring-[#f7df1e]/50 focus-visible:outline-none"
        >
          <RotateCcw className="size-4" aria-hidden />
          <span className="hidden sm:inline">Empezar de nuevo</span>
          <span className="sr-only sm:hidden">Empezar de nuevo</span>
        </button>
      </div>
    </div>
  )
}
