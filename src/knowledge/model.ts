/**
 * Modelo de conocimiento de JavaScript Helper.
 *
 * La UI solo consume estos tipos. El contenido puede venir de archivos TS,
 * JSON, una API o Markdown procesado: mientras respete este modelo, la
 * interfaz y la lógica de filtrado no cambian.
 */

/** Qué clase de elemento de JavaScript es un concepto. */
export type ConceptKind =
  | 'method' // se llama sobre un valor: texto.slice()
  | 'property' // se lee sobre un valor, sin paréntesis: arreglo.length
  | 'function' // se llama sola: Number()
  | 'operator' // símbolos: +, ===, &&, ternario
  | 'statement' // estructuras del lenguaje: if / else
  | 'syntax' // formas de escribir algo: corchetes, comillas invertidas
  | 'object' // agrupadores: Math
  | 'concept' // ideas: qué es un string, coerción
  | 'pattern' // combinación de herramientas conocidas: aleatorio entre min y max

export type AccentName = 'emerald' | 'sky' | 'violet' | 'amber' | 'rose' | 'cyan' | 'indigo' | 'fuchsia'

/**
 * Primer filtro: el tipo de dato o la categoría con la que trabaja la estudiante.
 * `dataType` se muestra como tipo de dato; `topic` agrupa conceptos que no son
 * de un tipo concreto (condicionales, ciclos, funciones...).
 */
export interface Category {
  id: string
  label: string
  description: string
  group: 'dataType' | 'topic'
  /** Valor de ejemplo que ayuda a reconocer el tipo: "hola", 42, [1, 2] */
  sample?: string
  accent: AccentName
}

/**
 * Segundo filtro: una acción expresada en lenguaje natural. El vocabulario es
 * compartido entre tipos de dato ("Buscar" significa lo mismo en String y en
 * Array) y es el puente entre los enunciados de los ejercicios y la app.
 */
export interface Action {
  id: string
  label: string
  /** Frase corta que explica la acción. */
  hint: string
  /** Otras formas de decir lo mismo; sirven como vocabulario para los ejercicios. */
  synonyms: string[]
  /** `concept` agrupa entradas para repasar qué es algo, no para hacer algo. */
  group?: 'action' | 'concept'
}

export interface Parameter {
  name: string
  description: string
  optional?: boolean
}

export interface ReturnInfo {
  /** Tipo corto para comparar de un vistazo: "number", "boolean", "string"... */
  type?: string
  description: string
}

export interface Example {
  /** Escenario de uso, en lenguaje natural. */
  title: string
  /** Código. Los comentarios `// valor` muestran resultados y se verifican en los tests. */
  code: string
  explanation?: string
  /** true si el ejemplo viene (o está adaptado) de los apuntes de la estudiante. */
  fromNotes?: boolean
  /**
   * Si el ejemplo lanza un error a propósito, su nombre: "SyntaxError",
   * "ReferenceError", "TypeError"... Los tests verifican que lo lance.
   */
  throws?: string
}

/** Tabla informativa estática dentro de una tarjeta. */
export interface InfoTable {
  title?: string
  headers: string[]
  rows: string[][]
  /** Índices de columnas que se muestran como código. */
  codeColumns?: number[]
}

/** Referencia a una o varias preguntas de un archivo de apuntes. */
export interface NoteRef {
  /** Ruta desde la raíz del repo: "wiki/tripleten/strings.md". */
  file: string
  /** Nombre visible de esos apuntes: "Strings (TripleTen)". */
  title: string
  /** Números de las preguntas ("## 6." → "6"). */
  sections: string[]
}

export interface Concept {
  /** Identificador único y estable: "string.slice", "array.slice". */
  id: string
  /** Nombre tal como se escribe o se reconoce: "slice()", "===", "Coerción de datos". */
  name: string
  /** Subtítulo: otro nombre o una descripción breve del nombre. */
  aka?: string
  kind: ConceptKind
  /** Ids de categoría donde aparece. */
  categories: string[]
  /** Ids de acción del vocabulario. Son los que determinan el filtrado. */
  actions: string[]
  /** Frases naturales para describir lo que hace este concepto en particular. */
  phrases: string[]
  /** ¿Qué hace? */
  summary: string
  syntax?: string[]
  /** undefined = no aplica; [] = no recibe argumentos. */
  parameters?: Parameter[]
  returns?: ReturnInfo
  /** ¿Modifica el valor original? undefined = no aplica. */
  mutates?: boolean
  /** Para conversiones: de qué categoría a cuál. */
  converts?: { from: string; to: string }
  keyPoints?: string[]
  tables?: InfoTable[]
  examples: Example[]
  /** Ids de conceptos relacionados. */
  related?: string[]
  /** Palabras que se resaltan dentro del código de los ejemplos. Si falta, se deriva del nombre. */
  highlight?: string[]
  /** Pregunta(s) de los apuntes de su fuente donde aparece. */
  sections: string[]
  /** Otros apuntes que también tratan este concepto (cuando se enriqueció con otra wiki). */
  alsoIn?: NoteRef[]
}

/**
 * Ejercicio con solución tomado de una wiki. Todavía no se muestra en la app:
 * queda guardado para la futura sección de práctica.
 */
export interface PendingExercise {
  id: string
  title: string
  /** Ids de categoría y de acción, para encontrarlo desde la consulta. */
  categories: string[]
  actions: string[]
  /** Enunciado en lenguaje natural. */
  statement: string
  /** Código de la solución; sus comentarios `// valor` se verifican en los tests. */
  solution: string
  /** Ids de los conceptos que usa la solución (no se muestran antes de revelarla). */
  uses: string[]
  from: NoteRef
}

/**
 * Tabla comparativa entre varios conceptos: la misma entrada pasada por
 * diferentes herramientas. Cada celda se puede verificar ejecutando
 * `template` con las entradas ($1, $2...).
 */
export interface ComparisonGrid {
  id: string
  title: string
  description?: string
  /** Se muestra cuando al menos dos de estos conceptos están en los resultados. */
  concepts: string[]
  inputHeaders: string[]
  columns: { header: string; template: string }[]
  rows: { inputs: string[]; results: string[] }[]
}

/** Una fuente de conocimiento: normalmente corresponde a un archivo de apuntes. */
export interface KnowledgeSource {
  id: string
  /** Nombre visible de los apuntes: "Strings". */
  title: string
  /** Archivo de apuntes de donde sale el contenido. */
  file: string
  /** Orden relativo entre fuentes (menor primero). */
  order?: number
  concepts: Concept[]
  comparisons?: ComparisonGrid[]
}

export interface SourceInfo {
  id: string
  title: string
  file: string
}

export interface ResolvedConcept extends Concept {
  source: SourceInfo
}

export interface ResolvedComparison extends ComparisonGrid {
  source: SourceInfo
}

/** Modelo común que consume la UI, sin importar de dónde vino el contenido. */
export interface KnowledgeBase {
  categories: Category[]
  actions: Action[]
  concepts: ResolvedConcept[]
  comparisons: ResolvedComparison[]
}
