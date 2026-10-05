import { useCallback, useEffect, useMemo, useRef, useState, type RefObject } from 'react'
import { ActionStep, CategoryStep } from './components/Steps'
import { FilterBar } from './components/FilterBar'
import { Header } from './components/Header'
import { Results } from './components/Results'
import { ChooseActionHint, Welcome } from './components/Welcome'
import { useKnowledge } from './knowledge/KnowledgeContext'
import { useSelection } from './lib/useSelection'

function useInView(ref: RefObject<HTMLElement | null>) {
  const [inView, setInView] = useState(true)
  useEffect(() => {
    const element = ref.current
    if (!element) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin: '-64px 0px 0px 0px' })
    observer.observe(element)
    return () => observer.disconnect()
  }, [ref])
  return inView
}

function scrollToConcept(conceptId: string) {
  const element = document.getElementById(`concepto-${conceptId}`)
  if (!element) return
  element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  element.focus({ preventScroll: true })
  element.classList.remove('flash-focus')
  void element.offsetWidth
  element.classList.add('flash-focus')
}

export default function App() {
  const query = useKnowledge()
  const { category, action, available, selectCategory, selectAction, goTo, reset } = useSelection(query)
  const stepsRef = useRef<HTMLDivElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)
  const stepsVisible = useInView(stepsRef)
  const [pendingFocus, setPendingFocus] = useState<string | null>(null)
  const [scrollToResults, setScrollToResults] = useState(false)

  const concepts = useMemo(
    () => (category && action ? query.conceptsFor(category.id, action.id) : []),
    [query, category, action],
  )

  // Al abrir un concepto relacionado, primero cambia el filtro y después se desplaza hasta él.
  useEffect(() => {
    if (!pendingFocus) return
    scrollToConcept(pendingFocus)
    setPendingFocus(null)
  }, [pendingFocus, concepts])

  // Al cambiar el filtro, acerca el inicio de los resultados si quedó fuera de la pantalla.
  useEffect(() => {
    if (!scrollToResults) return
    setScrollToResults(false)
    const element = resultsRef.current
    if (!element) return
    const top = element.getBoundingClientRect().top
    if (top < 0 || top > window.innerHeight * 0.6) element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [scrollToResults, concepts])

  const chooseAction = useCallback(
    (actionId: string) => {
      selectAction(actionId)
      setScrollToResults(true)
    },
    [selectAction],
  )

  // Desde la barra fija, cambiar de tipo también lleva al inicio de los resultados.
  const chooseCategoryFromBar = useCallback(
    (categoryId: string) => {
      selectCategory(categoryId)
      setScrollToResults(true)
    },
    [selectCategory],
  )

  const openConcept = useCallback(
    (conceptId: string) => {
      const location = query.locate(conceptId, { categoryId: category?.id, actionId: action?.id })
      if (!location) return
      if (location.categoryId !== category?.id || location.actionId !== action?.id) goTo(location.categoryId, location.actionId)
      setPendingFocus(conceptId)
    },
    [query, category, action, goTo],
  )

  const startOver = useCallback(() => {
    reset()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [reset])

  const tryExample = useCallback(
    (categoryId: string, actionId: string) => {
      goTo(categoryId, actionId)
      setScrollToResults(true)
    },
    [goTo],
  )

  return (
    <div className="min-h-dvh bg-bg text-ink">
      <Header onReset={startOver} canReset={category !== undefined} />
      {category && (
        <FilterBar
          visible={!stepsVisible}
          category={category}
          action={action}
          categoryOptions={query.categories()}
          actionOptions={available}
          onCategory={chooseCategoryFromBar}
          onAction={chooseAction}
          onReset={startOver}
        />
      )}

      <main className="mx-auto max-w-5xl px-4 pt-10 pb-24 sm:px-6 sm:pt-12">
        <div ref={stepsRef}>
          <CategoryStep options={query.categories()} selectedId={category?.id} onSelect={selectCategory} />
          <ActionStep category={category} options={available} selectedId={action?.id} onSelect={chooseAction} />
        </div>

        <div ref={resultsRef} className="scroll-mt-16">
          {!category && <Welcome onTryExample={tryExample} />}
          {category && !action && <ChooseActionHint category={category} />}
          {category && action && (
            <Results
              category={category}
              action={action}
              concepts={concepts}
              onSelectAction={chooseAction}
              onOpenConcept={openConcept}
              onJump={scrollToConcept}
            />
          )}
        </div>
      </main>

      <footer className="border-t border-line">
        <p className="mx-auto max-w-5xl px-4 py-6 text-sm text-ink-3 sm:px-6">
          Contenido basado en tus apuntes de Strings, Números y Arreglos · {query.totalConcepts} conceptos
        </p>
      </footer>
    </div>
  )
}
