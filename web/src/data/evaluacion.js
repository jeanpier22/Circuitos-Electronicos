/**
 * Esquema de calificacion del curso.
 *
 * Este archivo es PUBLICO: se compila dentro del sitio y cualquiera que abra la
 * pagina puede leerlo. No poner aqui nombres de alumnos ni notas individuales.
 * El registro de notas por alumno se lleva fuera de web/ y fuera de git.
 *
 * Cada seccion se oculta sola cuando su arreglo esta vacio, igual que hace
 * CRONOGRAMA en practicas.js. Para activar una, basta rellenarla: ningun
 * componente conoce el contenido.
 */

// Pesos que componen la nota final. Deben sumar 100.
// PENDIENTE: no hay silabo de este curso en el repositorio, asi que los pesos
// de los tres componentes no estan confirmados. En cuanto se tengan, se
// rellenan aqui con la misma forma que en Electronica Digital.
export const COMPONENTES = []

// Como se compone la nota de laboratorio.
// PENDIENTE por el mismo motivo.
export const LABORATORIO = []

/**
 * Reparto de los 20 puntos dentro de cada guia.
 *
 * Solo va lo que la guia publicada asigna de verdad con \puntos{}: estos son
 * los valores que el alumno ve impresos en el PDF del Laboratorio 2.
 */
export const RUBRICAS = [
  {
    practica: 'lab2',
    total: 20,
    filas: [
      { seccion: 'Polarización directa', puntos: 4 },
      { seccion: 'Polarización inversa', puntos: 4 },
      { seccion: 'El diodo como capacitor variable', puntos: 4 },
      { seccion: 'Análisis de resultados', puntos: 4 },
      { seccion: 'Cuestionario', puntos: 2 },
      { seccion: 'Conclusiones', puntos: 2 },
    ],
  },
]

// Fechas de evaluacion.
// PENDIENTE: el cronograma de practicas esta en practicas.js (CRONOGRAMA),
// pero las fechas de los examenes parcial y final no estan registradas.
export const FECHAS = []

// Lo que todavia no esta cerrado. Se dibuja como aviso, no como dato.
export const AVISOS = [
  'Los pesos de la evaluación permanente y de los exámenes parcial y final aún no están publicados.',
  'La guía del Laboratorio 3 reparte sus 20 puntos en construcción (6), caracterización (8), cuestionario (3) y conclusiones (3), pero ese reparto todavía no aparece impreso en el documento; se publica aquí cuando quede reflejado en la guía.',
]
