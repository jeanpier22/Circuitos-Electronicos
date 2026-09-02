import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, CircleDot, Circle, FileText } from 'lucide-react'
import { CRONOGRAMA } from '../data/practicas'

/**
 * Cronograma del curso, semana por semana.
 *
 * Ojo con la lectura de las fechas: hay dos grupos de laboratorio, el del
 * miercoles y el del viernes, y ambos hacen la misma practica dentro de la
 * misma semana. Las dos fechas de cada tarjeta son eso, un grupo cada una.
 *
 * El contenido sale entero de CRONOGRAMA (src/data/practicas.js).
 */

const ESTADOS = {
  completada: {
    etiqueta: 'Completada',
    icono: CheckCircle2,
    banda: 'bg-gradient-to-r from-emerald-400 to-emerald-600',
    numero: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300',
    chip: 'bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:ring-emerald-900',
  },
  encurso: {
    etiqueta: 'En curso',
    icono: CircleDot,
    banda: 'bg-gradient-to-r from-brand-500 to-brand-700',
    numero: 'bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-glow',
    chip: 'bg-brand-50 text-brand-700 ring-brand-200 dark:bg-brand-950 dark:text-brand-200 dark:ring-brand-900',
  },
  programada: {
    etiqueta: 'Programada',
    icono: Circle,
    banda: 'bg-slate-200 dark:bg-slate-700',
    numero: 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400',
    chip: 'bg-slate-100 text-slate-500 ring-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:ring-slate-700',
  },
}

const EXAMEN = {
  etiqueta: 'Evaluación',
  icono: FileText,
  banda: 'bg-gradient-to-r from-amber-400 to-amber-600',
  numero: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300',
  chip: 'bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:ring-amber-900',
}

function Grupo({ dia, fecha }) {
  return (
    <span className="flex items-baseline justify-between gap-2 text-xs">
      <span className="text-slate-400 dark:text-slate-500">{dia}</span>
      <span className="font-medium text-slate-600 dark:text-slate-300">{fecha}</span>
    </span>
  )
}

function SemanaCard({ dato, indice }) {
  const esExamen = dato.tipo === 'examen'
  const estilo = esExamen ? EXAMEN : (ESTADOS[dato.estado] ?? ESTADOS.programada)
  const Icono = estilo.icono
  const atenuada = !esExamen && dato.estado === 'programada'

  return (
    <li
      className={[
        'card relative flex animate-fade-up flex-col overflow-hidden p-5 transition duration-300',
        atenuada ? 'opacity-70' : 'hover:-translate-y-1 hover:shadow-lift',
      ].join(' ')}
      style={{ animationDelay: `${Math.min(indice, 12) * 45}ms` }}
    >
      <span aria-hidden className={['absolute inset-x-0 top-0 h-1', estilo.banda].join(' ')} />

      <div className="flex items-start justify-between gap-3">
        <span
          className={[
            'grid h-11 w-11 shrink-0 place-items-center rounded-xl text-sm font-extrabold',
            estilo.numero,
          ].join(' ')}
        >
          {dato.semana}
        </span>
        <span
          className={[
            'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ring-1',
            estilo.chip,
          ].join(' ')}
        >
          <Icono className="h-3 w-3 shrink-0" />
          {esExamen ? EXAMEN.etiqueta : estilo.etiqueta}
        </span>
      </div>

      <p className="mt-4 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
        Semana {dato.semana}
      </p>
      <h3
        className={[
          'mt-1 flex-1 text-sm font-bold leading-snug',
          dato.titulo
            ? 'text-slate-900 dark:text-white'
            : 'italic text-slate-400 dark:text-slate-500',
        ].join(' ')}
      >
        {dato.titulo ?? 'Por confirmar'}
      </h3>

      <div className="mt-4 space-y-1 border-t border-slate-100 pt-3 dark:border-slate-800">
        <Grupo dia="Grupo miércoles" fecha={dato.grupoMiercoles} />
        <Grupo dia="Grupo viernes" fecha={dato.grupoViernes} />
      </div>

      {dato.practica && (
        <Link
          to={`/practica/${dato.practica}`}
          className="group mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 transition hover:gap-2 dark:text-brand-300"
        >
          Ver práctica
          <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </li>
  )
}

function Bloque({ titulo, nota, semanas, desde }) {
  if (semanas.length === 0) return null
  return (
    <>
      <div className="mt-10 flex flex-wrap items-baseline gap-x-3 gap-y-1 first:mt-8">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">{titulo}</h3>
        {nota && <span className="text-sm text-slate-500 dark:text-slate-400">{nota}</span>}
      </div>
      <ol className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {semanas.map((dato, i) => (
          <SemanaCard key={dato.semana} dato={dato} indice={desde + i} />
        ))}
      </ol>
    </>
  )
}

export default function Cronograma() {
  if (CRONOGRAMA.length === 0) return null

  const unidad1 = CRONOGRAMA.filter((s) => s.unidad === 1)
  const unidad2 = CRONOGRAMA.filter((s) => s.unidad === 2)
  const sueltas = CRONOGRAMA.filter((s) => !s.unidad)
  const hechas = CRONOGRAMA.filter((s) => s.estado === 'completada').length

  return (
    <section className="border-t border-slate-200 bg-white/60 dark:border-slate-800 dark:bg-slate-900/40">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 lg:px-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
              Cronograma de avance
            </h2>
            <p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-400">
              El curso son {CRONOGRAMA.length} semanas. Hay{' '}
              <strong className="font-semibold text-slate-700 dark:text-slate-200">
                dos grupos de laboratorio
              </strong>
              , el del miércoles y el del viernes, y ambos hacen la misma práctica dentro de la
              misma semana.
            </p>
          </div>
          <span className="rounded-full bg-slate-100 px-3.5 py-1.5 text-sm font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            {hechas} de {CRONOGRAMA.length} semanas
          </span>
        </div>

        <Bloque
          titulo="Primera unidad"
          nota={`${unidad1.length} semanas, hasta el examen parcial`}
          semanas={unidad1}
          desde={0}
        />
        <Bloque
          titulo="Segunda unidad"
          nota={`${unidad2.length} semanas, hasta el examen final`}
          semanas={unidad2}
          desde={unidad1.length}
        />
        <Bloque
          titulo="Evaluaciones y semanas por asignar"
          semanas={sueltas}
          desde={unidad1.length + unidad2.length}
        />
      </div>
    </section>
  )
}
