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
 * Cronograma del curso: 16 semanas.
 *
 * Hay dos grupos de laboratorio, el del miercoles y el del viernes, y ambos
 * hacen la misma practica dentro de la misma semana. Por eso cada entrada
 * lleva dos fechas: una por grupo, no dos sesiones del mismo grupo.
 *
 * Semanas 1 a 8: primera unidad. Semana 9: examen parcial. Semanas 10 a 14:
 * segunda unidad. Semana 16: examen final.
 *
 * Las semanas sin practica asignada van con titulo en null y la portada las
 * dibuja como "Por confirmar": basta rellenarlas aqui, sin tocar componentes.
 *
 * estado: 'completada' | 'encurso' | 'programada'
 * tipo:   'practica' | 'examen'
 */
export const CRONOGRAMA = [
  {
    semana: 1,
    unidad: 1,
    tipo: 'practica',
    grupoMiercoles: '19 de agosto',
    grupoViernes: '21 de agosto',
    practica: 'lab1',
    titulo: 'Mi primer circuito',
    estado: 'completada',
  },
  {
    semana: 2,
    unidad: 1,
    tipo: 'practica',
    grupoMiercoles: '26 de agosto',
    grupoViernes: '28 de agosto',
    practica: 'lab2',
    titulo: 'El diodo semiconductor',
    estado: 'completada',
  },
  {
    semana: 3,
    unidad: 1,
    tipo: 'practica',
    grupoMiercoles: '2 de septiembre',
    grupoViernes: '4 de septiembre',
    practica: 'lab3',
    titulo: 'Diseño de una fuente de alimentación DC',
    estado: 'encurso',
  },
  {
    semana: 4,
    unidad: 1,
    tipo: 'practica',
    grupoMiercoles: '9 de septiembre',
    grupoViernes: '11 de septiembre',
    practica: null,
    titulo: null,
    estado: 'programada',
  },
  {
    semana: 5,
    unidad: 1,
    tipo: 'practica',
    grupoMiercoles: '16 de septiembre',
    grupoViernes: '18 de septiembre',
    practica: null,
    titulo: null,
    estado: 'programada',
  },
  {
    semana: 6,
    unidad: 1,
    tipo: 'practica',
    grupoMiercoles: '23 de septiembre',
    grupoViernes: '25 de septiembre',
    practica: null,
    titulo: null,
    estado: 'programada',
  },
  {
    semana: 7,
    unidad: 1,
    tipo: 'practica',
    grupoMiercoles: '30 de septiembre',
    grupoViernes: '2 de octubre',
    practica: null,
    titulo: null,
    estado: 'programada',
  },
  {
    semana: 8,
    unidad: 1,
    tipo: 'practica',
    grupoMiercoles: '7 de octubre',
    grupoViernes: '9 de octubre',
    practica: null,
    titulo: null,
    estado: 'programada',
  },
  {
    semana: 9,
    unidad: null,
    tipo: 'examen',
    grupoMiercoles: '14 de octubre',
    grupoViernes: '16 de octubre',
    practica: null,
    titulo: 'Examen parcial',
    estado: 'programada',
  },
  {
    semana: 10,
    unidad: 2,
    tipo: 'practica',
    grupoMiercoles: '21 de octubre',
    grupoViernes: '23 de octubre',
    practica: null,
    titulo: null,
    estado: 'programada',
  },
  {
    semana: 11,
    unidad: 2,
    tipo: 'practica',
    grupoMiercoles: '28 de octubre',
    grupoViernes: '30 de octubre',
    practica: null,
    titulo: null,
    estado: 'programada',
  },
  {
    semana: 12,
    unidad: 2,
    tipo: 'practica',
    grupoMiercoles: '4 de noviembre',
    grupoViernes: '6 de noviembre',
    practica: null,
    titulo: null,
    estado: 'programada',
  },
  {
    semana: 13,
    unidad: 2,
    tipo: 'practica',
    grupoMiercoles: '11 de noviembre',
    grupoViernes: '13 de noviembre',
    practica: null,
    titulo: null,
    estado: 'programada',
  },
  {
    semana: 14,
    unidad: 2,
    tipo: 'practica',
    grupoMiercoles: '18 de noviembre',
    grupoViernes: '20 de noviembre',
    practica: null,
    titulo: null,
    estado: 'programada',
  },
  {
    semana: 15,
    unidad: null,
    tipo: 'practica',
    grupoMiercoles: '25 de noviembre',
    grupoViernes: '27 de noviembre',
    practica: null,
    titulo: null,
    estado: 'programada',
  },
  {
    semana: 16,
    unidad: null,
    tipo: 'examen',
    grupoMiercoles: '2 de diciembre',
    grupoViernes: '4 de diciembre',
    practica: null,
    titulo: 'Examen final',
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
