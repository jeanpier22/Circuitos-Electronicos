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
    subtitulo: 'Curva característica en polarización directa e inversa',
    estado: 'disponible',
    duracion: '2 horas',
    resumen:
      'Estudio experimental del diodo semiconductor: se levanta punto a punto su curva característica en polarización directa e inversa, se contrastan las medidas con la simulación y se analizan configuraciones con LED y motor DC. Cierra estudiando el diodo en inversa como capacitor variable de un resonador LC, con un inductor de núcleo de aire que los alumnos calculan y bobinan.',
    objetivos: [
      'Polarizar el diodo en forma directa y representar su curva característica de operación.',
      'Polarizar el diodo en forma inversa y representar su curva característica de operación.',
      'Analizar el comportamiento externo del diodo semiconductor en sus diferentes polarizaciones.',
      'Contrastar los resultados experimentales con la simulación en Multisim.',
      'Aprovechar la capacitancia de juntura del diodo en inversa para sintonizar un resonador LC.',
    ],
    temas: ['Diodo 1N4007', 'Curva característica', 'Polarización directa', 'Polarización inversa', 'Multisim', 'LED', 'Varicap', 'Diagrama de Bode'],
    documento: {
      // Visor principal embebido en la pagina
      src: 'practicas/lab2/Laboratorio_2.pdf',
      paginas: 10,
      peso: '0.3 MB',
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
        peso: '43 KB',
        destacado: false,
      },
      {
        etiqueta: 'Datos del resonador',
        detalle: 'Barrido en frecuencia del simulador — para trazar el Bode del resonador LC',
        archivo: 'practicas/lab2/LAB2.DAT',
        nombre: 'LAB2.DAT',
        tipo: 'DAT',
        peso: '5 KB',
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
    titulo: 'Laboratorio 3',
    subtitulo: 'Laboratorio propedéutico — EEB',
    estado: 'proximamente',
    duracion: '2 horas',
    resumen:
      'La transcripción a LaTeX de esta práctica todavía está en preparación. El documento original ya se encuentra en el repositorio.',
    objetivos: [],
    temas: [],
    documento: null,
    descargas: [],
  },
]

export const getPractica = (id) => PRACTICAS.find((p) => p.id === id)
