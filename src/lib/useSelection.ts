import { useCallback, useEffect, useMemo, useState } from 'react'
import type { KnowledgeQuery } from '../knowledge/query'

const CATEGORY_PARAM = 'tipo'
const ACTION_PARAM = 'accion'

interface RawSelection {
  categoryId: string | null
  actionId: string | null
}

function readUrl(): RawSelection {
  const params = new URLSearchParams(window.location.search)
  return { categoryId: params.get(CATEGORY_PARAM), actionId: params.get(ACTION_PARAM) }
}

function writeUrl(next: RawSelection) {
  const url = new URL(window.location.href)
  for (const [param, value] of [
    [CATEGORY_PARAM, next.categoryId],
    [ACTION_PARAM, next.actionId],
  ] as const) {
    if (value) url.searchParams.set(param, value)
    else url.searchParams.delete(param)
  }
  url.hash = ''
  window.history.pushState(null, '', url)
}

/**
 * Estado de los dos filtros, sincronizado con la URL (?tipo=string&accion=cut)
 * para que el botón "atrás" funcione y una búsqueda se pueda guardar.
 */
export function useSelection(query: KnowledgeQuery) {
  const [raw, setRaw] = useState<RawSelection>(readUrl)

  useEffect(() => {
    const onPop = () => setRaw(readUrl())
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  // Ignora valores de la URL que no existen en el contenido.
  const selection = useMemo(() => {
    const category = raw.categoryId ? query.getCategory(raw.categoryId) : undefined
    const available = category ? query.actionsFor(category.id) : []
    const action = available.find((option) => option.action.id === raw.actionId)?.action
    return { category, action, available }
  }, [raw, query])

  const commit = useCallback((next: RawSelection) => {
    writeUrl(next)
    setRaw(next)
  }, [])

  const selectCategory = useCallback(
    (categoryId: string) => {
      // Si la acción actual también existe en el nuevo tipo, se conserva:
      // así se puede comparar String → Buscar con Array → Buscar.
      const keepAction = query.actionsFor(categoryId).some((option) => option.action.id === raw.actionId)
      commit({ categoryId, actionId: keepAction ? raw.actionId : null })
    },
    [commit, query, raw.actionId],
  )

  const selectAction = useCallback(
    (actionId: string) => commit({ categoryId: raw.categoryId, actionId }),
    [commit, raw.categoryId],
  )

  const goTo = useCallback((categoryId: string, actionId: string) => commit({ categoryId, actionId }), [commit])

  const reset = useCallback(() => commit({ categoryId: null, actionId: null }), [commit])

  return { ...selection, selectCategory, selectAction, goTo, reset }
}
