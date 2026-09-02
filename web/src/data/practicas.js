/**
 * Catalogo de practicas de laboratorio.
 *
 * Para agregar la Practica 2 o 3 solo hay que:
 *   1. Copiar sus archivos a  web/public/practicas/labN/
 *   2. Cambiar  estado: 'proximamente'  por  estado: 'disponible'
 *   3. Rellenar  descargas[]  con las rutas reales
 * No hay que tocar ningun componente.
 */

export const CURSO = {
  nombre: 'Circuitos Electrónicos',
  periodo: '2026-2',
  universidad: 'Universidad Católica San Pablo',
  facultad: 'Facultad de Ingeniería · Ing. Electrónica y de Telecomunicaciones',
  docente: 'Ebert San Román Castillo',
  correoRetroalimentacion: 'jbancori@ucsp.edu.pe',
}

/**
 * Cronograma de la primera unidad: 8 semanas antes del examen parcial.
 *
 * Las clases son los miercoles y viernes; la semana 1 arranca el miercoles 19
 * de agosto de 2026. Las semanas todavia sin practica asignada van con titulo
 * en null y la portada las dibuja como "Por confirmar": basta con rellenarlas
 * aqui cuando se sepan, sin tocar ningun componente.
 *
 * estado: 'completada' | 'encurso' | 'programada'
 */
export const CRONOGRAMA = [
  {
    semana: 1,
    sesiones: ['Miércoles 19 de agosto', 'Viernes 21 de agosto'],
    practica: 'lab1',
    titulo: 'Mi primer circuito',
    estado: 'completada',
  },
  {
    semana: 2,
    sesiones: ['Miércoles 26 de agosto', 'Viernes 28 de agosto'],
    practica: 'lab2',
    titulo: 'El diodo semiconductor',
    estado: 'completada',
  },
  {
    semana: 3,
    sesiones: ['Miércoles 2 de septiembre', 'Viernes 4 de septiembre'],
    practica: 'lab3',
    titulo: 'Diseño de una fuente de alimentación DC',
    estado: 'encurso',
  },
  {
    semana: 4,
    sesiones: ['Miércoles 9 de septiembre', 'Viernes 11 de septiembre'],
    practica: null,
    titulo: null,
    estado: 'programada',
  },
  {
    semana: 5,
    sesiones: ['Miércoles 16 de septiembre', 'Viernes 18 de septiembre'],
    practica: null,
    titulo: null,
    estado: 'programada',
  },
  {
    semana: 6,
    sesiones: ['Miércoles 23 de septiembre', 'Viernes 25 de septiembre'],
    practica: null,
    titulo: null,
    estado: 'programada',
  },
  {
    semana: 7,
    sesiones: ['Miércoles 30 de septiembre', 'Viernes 2 de octubre'],
    practica: null,
    titulo: null,
    estado: 'programada',
  },
  {
    semana: 8,
    sesiones: ['Miércoles 7 de octubre', 'Viernes 9 de octubre'],
    practica: null,
    titulo: null,
    estado: 'programada',
  },
]

export const PRACTICAS = [
  {
    id: 'lab1',
    numero: 1,
    titulo: 'Mi primer circuito',
    subtitulo: 'Laboratorio propedéutico — EEB',
    estado: 'disponible',
    duracion: '2 horas',
    resumen:
      'Introducción al laboratorio de electrónica: reconocimiento del instrumental, montaje en protoboard, medición de tensión y corriente, y verificación experimental de la ley de Ohm.',
    objetivos: [
      'Identificar y operar correctamente la fuente DC, el multímetro y el osciloscopio.',
      'Montar un circuito resistivo elemental sobre protoboard.',
      'Medir tensión, corriente y resistencia aplicando las conexiones adecuadas.',
      'Contrastar los valores medidos con los valores teóricos y estimar el error porcentual.',
    ],
    temas: ['Protoboard', 'Ley de Ohm', 'Multímetro', 'Fuente DC', 'Resistencias'],
    documento: {
      // Visor principal embebido en la pagina
      src: 'practicas/lab1/Laboratorio_1.pdf',
      paginas: 15,
      peso: '1.4 MB',
    },
    descargas: [
      {
        etiqueta: 'Práctica en PDF',
        detalle: 'Documento compilado desde LaTeX — versión revisada',
        archivo: 'practicas/lab1/Laboratorio_1.pdf',
        nombre: 'Laboratorio_1_Circuitos_Electronicos.pdf',
        tipo: 'PDF',
        peso: '1.4 MB',
        destacado: true,
      },
      {
        etiqueta: 'Fuente LaTeX',
        detalle: 'Código .tex para recompilar o reutilizar el formato',
        archivo: 'practicas/lab1/Laboratorio_1.tex',
        nombre: 'Laboratorio_1.tex',
        tipo: 'TEX',
        peso: '36 KB',
        destacado: false,
      },
      {
        etiqueta: 'Guía original del docente',
        detalle: 'Documento Word entregado en clase',
        archivo: 'practicas/lab1/Laboratorio_1_original.doc',
        nombre: 'Laboratorio_1_Propedeutico_EEB.doc',
        tipo: 'DOC',
        peso: '12 MB',
        destacado: false,
      },
    ],
  },
  {
    id: 'lab2',
    numero: 2,
    titulo: 'El diodo semiconductor',
    subtitulo: 'Curvas características y capacitancia del diodo',
    estado: 'disponible',
    duracion: '2 horas',
    resumen:
      'Estudio experimental del diodo semiconductor: se levanta punto a punto su curva característica en polarización directa e inversa y se contrastan las medidas con la simulación. Cierra estudiando el diodo en inversa como capacitor variable de un resonador LC, con un inductor de núcleo de aire que los alumnos calculan sobre un tubo de PVC y bobinan ellos mismos.',
    objetivos: [
      'Polarizar el diodo en forma directa y representar su curva característica de operación.',
      'Polarizar el diodo en forma inversa y representar su curva característica de operación.',
      'Analizar el comportamiento externo del diodo semiconductor en sus diferentes polarizaciones.',
      'Contrastar los resultados experimentales con la simulación en Proteus.',
      'Aprovechar la capacitancia de juntura del diodo en inversa para sintonizar un resonador LC.',
    ],
    temas: ['Diodo 1N4007', 'Curva característica', 'Polarización directa', 'Polarización inversa', 'Proteus', 'Varicap', 'Resonador LC', 'Diagrama de Bode'],
    documento: {
      // Visor principal embebido en la pagina
      src: 'practicas/lab2/Laboratorio_2.pdf',
      paginas: 15,
      peso: '0.4 MB',
    },
    descargas: [
      {
        etiqueta: 'Práctica en PDF',
        detalle: 'Documento compilado desde LaTeX — versión revisada',
        archivo: 'practicas/lab2/Laboratorio_2.pdf',
        nombre: 'Laboratorio_2_Circuitos_Electronicos.pdf',
        tipo: 'PDF',
        peso: '0.4 MB',
        destacado: true,
      },
      {
        etiqueta: 'Fuente LaTeX',
        detalle: 'Código .tex para recompilar o reutilizar el formato',
        archivo: 'practicas/lab2/Laboratorio_2.tex',
        nombre: 'Laboratorio_2.tex',
        tipo: 'TEX',
        peso: '63 KB',
        destacado: false,
      },
      {
        etiqueta: 'Datos del resonador',
        detalle: 'Barrido del simulador, 1000 puntos de 0,1 a 8 MHz — para trazar el Bode del resonador LC',
        archivo: 'practicas/lab2/resonador_7100khz.DAT',
        nombre: 'resonador_7100khz.DAT',
        tipo: 'DAT',
        peso: '122 KB',
        destacado: false,
      },
      {
        etiqueta: 'Guía original del docente',
        detalle: 'Documento Word entregado en clase',
        archivo: 'practicas/lab2/Laboratorio_2_original.doc',
        nombre: 'Laboratorio_2_Diodo_Curva_Caracteristica.doc',
        tipo: 'DOC',
        peso: '2 MB',
        destacado: false,
      },
    ],
  },
  {
    id: 'lab3',
    numero: 3,
    titulo: 'Diseño de una fuente de alimentación DC',
    subtitulo: 'Laboratorio propedéutico — EEB',
    estado: 'disponible',
    duracion: '2 horas',
    resumen:
      'Diseño, construcción y caracterización de una fuente de alimentación DC ajustable de cuatro etapas: transformador de 220 a 24 V, rectificador en puente, filtro por condensador y regulador LM317 de 1,25 a 26 V. Se arma en protoboard por etapas y se mide con carga: regulación de línea, regulación de carga, rizado y disipación del regulador.',
    objetivos: [
      'Reconocer las cuatro etapas de una fuente DC y la función de cada una.',
      'Calcular la tensión de pico, la tensión continua y el rizado de un rectificador en puente con filtro por condensador, y contrastarlos con la simulación y con la medida.',
      'Montar la fuente por etapas, verificando cada una antes de pasar a la siguiente.',
      'Ajustar la salida con el regulador LM317 y comprobar que el rango medido coincide con el que predice su ecuación.',
      'Caracterizar la fuente con carga: regulación de línea, regulación de carga y rizado.',
      'Evaluar la potencia que disipa el regulador y decidir si el disipador elegido es suficiente.',
    ],
    temas: ['Fuente DC', 'Protoboard', 'Transformador 220/24', 'Rectificador en puente', 'Filtro por condensador', 'Valor eficaz y de pico', 'Rizado', 'LM317', 'Regulación de carga', 'Disipación térmica'],
    documento: {
      // Visor principal embebido en la pagina
      src: 'practicas/lab3/Laboratorio_3.pdf',
      paginas: 12,
      peso: '0.4 MB',
    },
    descargas: [
      {
        etiqueta: 'Práctica en PDF',
        detalle: 'Documento compilado desde LaTeX — versión completa',
        archivo: 'practicas/lab3/Laboratorio_3.pdf',
        nombre: 'Laboratorio_3_Circuitos_Electronicos.pdf',
        tipo: 'PDF',
        peso: '0.4 MB',
        destacado: true,
      },
      {
        etiqueta: 'Fuente LaTeX',
        detalle: 'Código .tex para recompilar o reutilizar el formato',
        archivo: 'practicas/lab3/Laboratorio_3.tex',
        nombre: 'Laboratorio_3.tex',
        tipo: 'TEX',
        peso: '47 KB',
        destacado: false,
      },
    ],
  },
]

export const getPractica = (id) => PRACTICAS.find((p) => p.id === id)
