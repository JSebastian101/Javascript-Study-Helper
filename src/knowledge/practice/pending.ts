import type { PendingExercise } from '../model'

/**
 * Ejercicios con solución tomados de las wikis. No se muestran en la consulta
 * (la app no da soluciones): quedan guardados para la futura sección de
 * práctica. Las soluciones se ejecutan en los tests como los ejemplos.
 */
export const pendingExercises: PendingExercise[] = []
