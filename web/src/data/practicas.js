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
    practica: 'lab4',
    titulo: 'Diodos limitadores y sujetadores',
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
  {
    id: 'lab4',
    numero: 4,
    titulo: 'Diodos limitadores y sujetadores',
    subtitulo: 'El diodo rectificador de silicio en AC',
    estado: 'disponible',
    duracion: '2 horas',
    resumen:
      'Estudio del diodo trabajando con señal alterna en dos aplicaciones: circuitos recortadores (limitadores), que cortan la señal por encima o por debajo de un nivel, y circuitos sujetadores, que desplazan su nivel DC sin deformarla. Se mide con la Analog Discovery Studio e incluye el diseño de un sujetador.',
    objetivos: [
      'Familiarizar al estudiante con el comportamiento del diodo rectificador de silicio en AC.',
      'Medir con el osciloscopio las señales de entrada y de salida de circuitos recortadores y sujetadores.',
      'Analizar cómo los circuitos recortadores limitan la señal de entrada y cómo los sujetadores desplazan su nivel DC.',
      'Diseñar un circuito sujetador a partir de la forma de onda de salida requerida.',
    ],
    temas: ['Diodo 1N4007', 'Recortadores', 'Limitadores', 'Sujetadores', 'Nivel DC', 'Analog Discovery Studio', 'Proteus'],
    documento: {
      // Visor principal embebido en la pagina
      src: 'practicas/lab4/Laboratorio_4.pdf',
      paginas: 8,
      peso: '0.4 MB',
    },
    descargas: [
      {
        etiqueta: 'Práctica en PDF',
        detalle: 'Documento compilado desde LaTeX — versión revisada',
        archivo: 'practicas/lab4/Laboratorio_4.pdf',
        nombre: 'Laboratorio_4_Circuitos_Electronicos.pdf',
        tipo: 'PDF',
        peso: '0.4 MB',
        destacado: true,
      },
      {
        etiqueta: 'Fuente LaTeX',
        detalle: 'Código .tex para recompilar o reutilizar el formato',
        archivo: 'practicas/lab4/Laboratorio_4.tex',
        nombre: 'Laboratorio_4.tex',
        tipo: 'TEX',
        peso: '25 KB',
        destacado: false,
      },
      {
        etiqueta: 'Guía original del docente',
        detalle: 'Documento Word entregado en clase',
        archivo: 'practicas/lab4/Laboratorio_4_original.doc',
        nombre: 'Laboratorio_4_Diodos_Limitadores_Sujetadores_Rectificadores.doc',
        tipo: 'DOC',
        peso: '1.2 MB',
        destacado: false,
      },
    ],
  },
  {
    id: 'lab5',
    numero: 5,
    titulo: 'Polarización del transistor bipolar',
    subtitulo: 'El punto Q cerca del corte, cerca de la saturación y en el punto medio',
    estado: 'disponible',
    duracion: '2 horas',
    resumen:
      'Diseño de la polarización por divisor de tensión de un transistor BJT para ubicar su punto de operación en tres posiciones de la misma recta de carga: cerca del corte, cerca de la saturación y en el punto medio. En cada experimento se inyecta una señal AC para ver cómo el punto Q limita la excursión de la salida. Se mide con la Analog Discovery Studio.',
    objetivos: [
      'Diseñar la polarización por divisor de tensión de un transistor bipolar para ubicar su punto Q en una posición determinada de la recta de carga.',
      'Trazar la recta de carga DC y ubicar sobre ella los puntos Q teóricos, simulados y medidos.',
      'Comprobar experimentalmente cómo la posición del punto Q limita la excursión de una señal AC.',
    ],
    temas: ['Transistor BJT', 'BC548B', 'Divisor de tensión', 'Recta de carga', 'Punto Q', 'Corte y saturación', 'Emisor común', 'Analog Discovery Studio'],
    documento: {
      // Visor principal embebido en la pagina
      src: 'practicas/lab5/Laboratorio_5.pdf',
      paginas: 11,
      peso: '0.1 MB',
    },
    // Sin la fuente .tex: su cabecera trae los valores de referencia del
    // docente (R2 y puntos Q), que son las respuestas del diseño previo.
    descargas: [
      {
        etiqueta: 'Práctica en PDF',
        detalle: 'Documento compilado desde LaTeX',
        archivo: 'practicas/lab5/Laboratorio_5.pdf',
        nombre: 'Laboratorio_5_Circuitos_Electronicos.pdf',
        tipo: 'PDF',
        peso: '0.1 MB',
        destacado: true,
      },
    ],
  },
  {
    id: 'lab6',
    numero: 6,
    titulo: 'El transistor en corte y saturación',
    subtitulo: 'Diseño del interruptor, compuertas NOR y NAND y manejo de un relé',
    estado: 'disponible',
    duracion: '2 horas',
    resumen:
      'El transistor bipolar trabajando solo en corte y en saturación. A partir de las condiciones de la carga y de la hoja de datos, el alumno calcula las resistencias de un interruptor para un LED y comprueba por qué la misma resistencia de base satura a un transistor y no a otro. Después verifica compuertas NOR y NAND con diodos y maneja un relé protegido con un diodo volante. Se mide con la Analog Discovery Studio.',
    objetivos: [
      'Calcular las resistencias de base y de colector de un transistor que trabaja como interruptor, a partir de las condiciones de la carga y de la hoja de datos, y comprobar por simulación y por medición que queda en corte o en saturación.',
      'Explicar por qué una resistencia de base calculada con el β justo puede no saturar a otro transistor.',
      'Verificar compuertas NOR y NAND con diodos y un transistor, y manejar un relé protegiendo al transistor con un diodo volante.',
    ],
    temas: ['Transistor BJT', 'BC548B', '2N2222A', 'Corte y saturación', 'Transistor como interruptor', 'β forzado', 'Compuertas lógicas', 'Lógica DTL', 'Relé', 'Diodo volante', 'Analog Discovery Studio'],
    documento: {
      // Visor principal embebido en la pagina
      src: 'practicas/lab6/Laboratorio_6.pdf',
      paginas: 12,
      peso: '0.1 MB',
    },
    // Sin la fuente .tex: su cabecera trae los valores de referencia del
    // docente, que son las respuestas del diseño previo.
    descargas: [
      {
        etiqueta: 'Práctica en PDF',
        detalle: 'Documento compilado desde LaTeX',
        archivo: 'practicas/lab6/Laboratorio_6.pdf',
        nombre: 'Laboratorio_6_Circuitos_Electronicos.pdf',
        tipo: 'PDF',
        peso: '0.1 MB',
        destacado: true,
      },
    ],
  },
  {
    id: 'lab7',
    numero: 7,
    titulo: 'Amplificadores con transistor bipolar',
    subtitulo: 'Ganancia de voltaje, de corriente y de potencia',
    estado: 'disponible',
    duracion: '2 sesiones (2 semanas)',
    resumen:
      'Práctica de dos semanas sobre los tipos de amplificación con el transistor bipolar. El alumno calcula, simula y mide las ganancias de voltaje, de corriente y de potencia y la impedancia de entrada del transistor en sus tres configuraciones: emisor común y base común (semana 1) y colector común (semana 2), y comprueba que el seguidor rescata la ganancia del emisor común frente a una carga pequeña. Termina con una etapa de potencia push-pull en clase B y en clase AB: distorsión de cruce, potencia en la carga y rendimiento. Se mide con la Analog Discovery Studio.',
    objetivos: [
      'Calcular, simular y medir las ganancias de voltaje, de corriente y de potencia y la impedancia de entrada del transistor en sus tres configuraciones: emisor común, base común y colector común.',
      'Distinguir qué amplifica cada configuración y explicar por qué el emisor común pierde casi toda su ganancia con una carga pequeña y cómo un seguidor de emisor lo resuelve.',
      'Comparar una etapa de potencia push-pull en clase B y en clase AB: distorsión de cruce, potencia entregada a la carga y rendimiento.',
    ],
    temas: ['Transistor BJT', 'Amplificador', 'Emisor común', 'Base común', 'Colector común', 'Seguidor de emisor', 'Ganancia de voltaje', 'Ganancia de corriente', 'Ganancia de potencia', 'Impedancia de entrada', 'Push-pull', 'Clase B', 'Clase AB', 'Analog Discovery Studio'],
    documento: {
      // Visor principal embebido en la pagina
      src: 'practicas/lab7/Laboratorio_7.pdf',
      paginas: 21,
      peso: '0.2 MB',
    },
    // Sin la fuente .tex: su cabecera trae los valores de referencia del
    // docente, que son las respuestas del diseño previo.
    descargas: [
      {
        etiqueta: 'Práctica en PDF',
        detalle: 'Documento compilado desde LaTeX',
        archivo: 'practicas/lab7/Laboratorio_7.pdf',
        nombre: 'Laboratorio_7_Circuitos_Electronicos.pdf',
        tipo: 'PDF',
        peso: '0.2 MB',
        destacado: true,
      },
    ],
  },
  {
    id: 'lab8',
    numero: 8,
    titulo: 'Transistores de efecto de campo: JFET y MOSFET',
    subtitulo: 'Curvas de transferencia, fuente de corriente y atenuador PWM de LEDs',
    estado: 'disponible',
    duracion: '2 sesiones (2 semanas)',
    resumen:
      'Práctica de dos semanas sobre los transistores de efecto de campo. En la semana 1 el alumno mide la curva de transferencia de un JFET 2N5457, obtiene su I_DSS y su V_P y los compara con la ecuación de Shockley; luego diseña su autopolarización y lo usa como fuente de corriente constante para un LED. En la semana 2 mide el voltaje umbral, la curva de transferencia y la resistencia de conducción de un MOSFET 2N7000, y lo usa como interruptor en un atenuador PWM de LEDs. Se mide con la Analog Discovery Studio.',
    objetivos: [
      'Medir la curva de transferencia de un JFET, obtener su corriente I_DSS y su voltaje de estrangulamiento V_P, y compararlos con la ecuación de Shockley.',
      'Diseñar la autopolarización de un JFET y usarlo como fuente de corriente constante para un LED, comprobando que la corriente no cambia con el voltaje de alimentación.',
      'Medir el voltaje umbral, la curva de transferencia y la resistencia de conducción de un MOSFET de enriquecimiento, y usarlo como interruptor en un atenuador PWM de LEDs.',
    ],
    temas: ['FET', 'JFET', 'MOSFET', '2N5457', '2N7000', 'Ecuación de Shockley', 'I_DSS y V_P', 'Autopolarización', 'Fuente de corriente', 'Voltaje umbral', 'R_DS(on)', 'PWM', 'LED', 'Analog Discovery Studio'],
    documento: {
      // Visor principal embebido en la pagina
      src: 'practicas/lab8/Laboratorio_8.pdf',
      paginas: 14,
      peso: '0.1 MB',
    },
    // Sin la fuente .tex: su cabecera trae los valores de referencia del
    // docente, que son las respuestas del diseño previo.
    descargas: [
      {
        etiqueta: 'Práctica en PDF',
        detalle: 'Documento compilado desde LaTeX',
        archivo: 'practicas/lab8/Laboratorio_8.pdf',
        nombre: 'Laboratorio_8_Circuitos_Electronicos.pdf',
        tipo: 'PDF',
        peso: '0.1 MB',
        destacado: true,
      },
    ],
  },
]

export const getPractica = (id) => PRACTICAS.find((p) => p.id === id)
