import type { AccentName } from '../knowledge/model'

export interface AccentStyle {
  /** Fondo suave para estados seleccionados. */
  soft: string
  /** Texto con el color de acento. */
  text: string
  /** Borde de acento. */
  border: string
  /** Botón o etiqueta rellena. */
  solid: string
  /** Punto o barra pequeña. */
  dot: string
  /** Anillo de foco. */
  ring: string
}

// Clases completas y estáticas para que Tailwind las detecte.
export const accents: Record<AccentName, AccentStyle> = {
  emerald: {
    soft: 'bg-emerald-50 dark:bg-emerald-500/10',
    text: 'text-emerald-700 dark:text-emerald-300',
    border: 'border-emerald-500 dark:border-emerald-400',
    solid: 'bg-emerald-600 text-white dark:bg-emerald-500 dark:text-emerald-950',
    dot: 'bg-emerald-500',
    ring: 'has-[:focus-visible]:ring-emerald-500/40',
  },
  sky: {
    soft: 'bg-sky-50 dark:bg-sky-500/10',
    text: 'text-sky-700 dark:text-sky-300',
    border: 'border-sky-500 dark:border-sky-400',
    solid: 'bg-sky-600 text-white dark:bg-sky-500 dark:text-sky-950',
    dot: 'bg-sky-500',
    ring: 'has-[:focus-visible]:ring-sky-500/40',
  },
  violet: {
    soft: 'bg-violet-50 dark:bg-violet-500/10',
    text: 'text-violet-700 dark:text-violet-300',
    border: 'border-violet-500 dark:border-violet-400',
    solid: 'bg-violet-600 text-white dark:bg-violet-500 dark:text-violet-950',
    dot: 'bg-violet-500',
    ring: 'has-[:focus-visible]:ring-violet-500/40',
  },
  amber: {
    soft: 'bg-amber-50 dark:bg-amber-500/10',
    text: 'text-amber-800 dark:text-amber-300',
    border: 'border-amber-500 dark:border-amber-400',
    solid: 'bg-amber-500 text-amber-950 dark:bg-amber-400 dark:text-amber-950',
    dot: 'bg-amber-500',
    ring: 'has-[:focus-visible]:ring-amber-500/40',
  },
  rose: {
    soft: 'bg-rose-50 dark:bg-rose-500/10',
    text: 'text-rose-700 dark:text-rose-300',
    border: 'border-rose-500 dark:border-rose-400',
    solid: 'bg-rose-600 text-white dark:bg-rose-500 dark:text-rose-950',
    dot: 'bg-rose-500',
    ring: 'has-[:focus-visible]:ring-rose-500/40',
  },
  cyan: {
    soft: 'bg-cyan-50 dark:bg-cyan-500/10',
    text: 'text-cyan-700 dark:text-cyan-300',
    border: 'border-cyan-500 dark:border-cyan-400',
    solid: 'bg-cyan-600 text-white dark:bg-cyan-500 dark:text-cyan-950',
    dot: 'bg-cyan-500',
    ring: 'has-[:focus-visible]:ring-cyan-500/40',
  },
  indigo: {
    soft: 'bg-indigo-50 dark:bg-indigo-500/10',
    text: 'text-indigo-700 dark:text-indigo-300',
    border: 'border-indigo-500 dark:border-indigo-400',
    solid: 'bg-indigo-600 text-white dark:bg-indigo-500 dark:text-indigo-950',
    dot: 'bg-indigo-500',
    ring: 'has-[:focus-visible]:ring-indigo-500/40',
  },
  fuchsia: {
    soft: 'bg-fuchsia-50 dark:bg-fuchsia-500/10',
    text: 'text-fuchsia-700 dark:text-fuchsia-300',
    border: 'border-fuchsia-500 dark:border-fuchsia-400',
    solid: 'bg-fuchsia-600 text-white dark:bg-fuchsia-500 dark:text-fuchsia-950',
    dot: 'bg-fuchsia-500',
    ring: 'has-[:focus-visible]:ring-fuchsia-500/40',
  },
}

export function cx(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ')
}
