import { Link } from 'react-router-dom'
import { ArrowRight, CalendarDays, CheckCircle2, CircleDot, Circle } from 'lucide-react'
import { CRONOGRAMA } from '../data/practicas'

/**
 * Cronograma de la primera unidad, en rejilla de ocho semanas.
 *
 * El contenido sale entero de CRONOGRAMA (src/data/practicas.js): para
 * rellenar una semana pendiente no hay que tocar este componente.
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

function SemanaCard({ dato, indice }) {
  const estado = ESTADOS[dato.estado] ?? ESTADOS.programada
  const Icono = estado.icono
  const pendiente = dato.estado === 'programada'

  return (
    <li
      className={[
        'card relative flex animate-fade-up flex-col overflow-hidden p-5 transition duration-300',
        pendiente ? 'opacity-70' : 'hover:-translate-y-1 hover:shadow-lift',
      ].join(' ')}
      style={{ animationDelay: `${indice * 60}ms` }}
    >
      <span aria-hidden className={['absolute inset-x-0 top-0 h-1', estado.banda].join(' ')} />

      <div className="flex items-start justify-between gap-3">
        <span
          className={[
            'grid h-11 w-11 shrink-0 place-items-center rounded-xl text-sm font-extrabold',
            estado.numero,
          ].join(' ')}
        >
          {dato.semana}
        </span>
        <span
          className={[
            'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ring-1',
            estado.chip,
          ].join(' ')}
        >
          <Icono className="h-3 w-3 shrink-0" />
          {estado.etiqueta}
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
        {dato.sesiones.map((s) => (
          <span
            key={s}
            className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400"
          >
            <CalendarDays className="h-3.5 w-3.5 shrink-0" />
            {s}
          </span>
        ))}
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

export default function Cronograma() {
  if (CRONOGRAMA.length === 0) return null

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
              Primera unidad: {CRONOGRAMA.length} semanas antes del examen parcial, con sesiones
              los miércoles y viernes. El curso arrancó el miércoles 19 de agosto.
            </p>
          </div>
          <span className="rounded-full bg-slate-100 px-3.5 py-1.5 text-sm font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            {hechas} de {CRONOGRAMA.length} semanas
          </span>
        </div>

        <ol className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CRONOGRAMA.map((dato, i) => (
            <SemanaCard key={dato.semana} dato={dato} indice={i} />
          ))}
        </ol>
      </div>
    </section>
  )
}
