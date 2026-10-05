import { createContext, useContext, useMemo, type ReactNode } from 'react'
import type { KnowledgeBase } from './model'
import { createQuery, type KnowledgeQuery } from './query'

const KnowledgeContext = createContext<KnowledgeQuery | null>(null)

/**
 * Entrega el conocimiento a la UI. Hoy recibe contenido estático; mañana podría
 * recibir lo que devuelva una API o un CMS, sin cambiar los componentes.
 */
export function KnowledgeProvider({ base, children }: { base: KnowledgeBase; children: ReactNode }) {
  const query = useMemo(() => createQuery(base), [base])
  return <KnowledgeContext.Provider value={query}>{children}</KnowledgeContext.Provider>
}

export function useKnowledge(): KnowledgeQuery {
  const query = useContext(KnowledgeContext)
  if (!query) throw new Error('useKnowledge debe usarse dentro de <KnowledgeProvider>')
  return query
}
