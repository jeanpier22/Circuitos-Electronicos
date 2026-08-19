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
      paginas: 16,
      peso: '1.6 MB',
    },
    descargas: [
      {
        etiqueta: 'Práctica en PDF',
        detalle: 'Documento compilado desde LaTeX — versión revisada',
        archivo: 'practicas/lab1/Laboratorio_1.pdf',
        nombre: 'Laboratorio_1_Circuitos_Electronicos.pdf',
        tipo: 'PDF',
        peso: '1.6 MB',
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
    titulo: 'Laboratorio 2',
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
