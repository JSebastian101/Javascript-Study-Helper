import { Moon, RotateCcw, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

function useTheme() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'))
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    try {
      localStorage.setItem('jsh-theme', dark ? 'dark' : 'light')
    } catch {
      // Sin almacenamiento disponible: el tema solo dura esta visita.
    }
  }, [dark])
  return [dark, setDark] as const
}

export function Header({ onReset, canReset }: { onReset: () => void; canReset: boolean }) {
  const [dark, setDark] = useTheme()
  return (
    <header className="border-b border-line bg-surface">
      <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-4 sm:px-6">
        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-3 rounded-lg text-left focus-visible:ring-4 focus-visible:ring-[#f7df1e]/50 focus-visible:outline-none"
          aria-label="JavaScript Helper, volver al inicio"
        >
          <span className="flex size-10 items-center justify-center rounded-xl bg-[#f7df1e] font-mono text-[15px] font-extrabold text-[#1a1a1a] shadow-sm">
            JS
          </span>
          <span>
            <span className="block text-lg leading-tight font-bold tracking-tight text-ink">JavaScript Helper</span>
            <span className="block text-sm text-ink-3">Consulta lo que ya estudiaste</span>
          </span>
        </button>
        <div className="ml-auto flex items-center gap-1">
          {canReset && (
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-ink-2 transition hover:bg-surface-2 hover:text-ink focus-visible:ring-4 focus-visible:ring-[#f7df1e]/50 focus-visible:outline-none"
            >
              <RotateCcw className="size-4" aria-hidden />
              <span className="hidden sm:inline">Empezar de nuevo</span>
              <span className="sr-only sm:hidden">Empezar de nuevo</span>
            </button>
          )}
          <button
            type="button"
            onClick={() => setDark((value) => !value)}
            className="rounded-full p-2.5 text-ink-2 transition hover:bg-surface-2 hover:text-ink focus-visible:ring-4 focus-visible:ring-[#f7df1e]/50 focus-visible:outline-none"
            aria-label={dark ? 'Usar tema claro' : 'Usar tema oscuro'}
          >
            {dark ? <Sun className="size-5" aria-hidden /> : <Moon className="size-5" aria-hidden />}
          </button>
        </div>
      </div>
    </header>
  )
}
