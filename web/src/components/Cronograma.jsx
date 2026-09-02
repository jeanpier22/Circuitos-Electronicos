import { Link } from 'react-router-dom'
import { ArrowRight, CalendarDays, CheckCircle2, CircleDot, Circle } from 'lucide-react'
import { CRONOGRAMA } from '../data/practicas'

/**
 * Linea de tiempo del avance del curso, semana por semana.
 *
 * El contenido sale entero de CRONOGRAMA (src/data/practicas.js): para agregar
 * una semana no hay que tocar este componente.
 */

const ESTADOS = {
  completada: {
    etiqueta: 'Completada',
    icono: CheckCircle2,
    punto: 'bg-emerald-500 text-white ring-emerald-100 dark:ring-emerald-950',
    chip: 'bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:ring-emerald-900',
  },
  encurso: {
    etiqueta: 'En curso',
    icono: CircleDot,
    punto: 'bg-brand-600 text-white ring-brand-100 dark:ring-brand-950',
    chip: 'bg-brand-50 text-brand-700 ring-brand-200 dark:bg-brand-950 dark:text-brand-200 dark:ring-brand-900',
  },
  programada: {
    etiqueta: 'Programada',
    icono: Circle,
    punto: 'bg-slate-300 text-slate-600 ring-slate-100 dark:bg-slate-700 dark:text-slate-300 dark:ring-slate-900',
    chip: 'bg-slate-100 text-slate-500 ring-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:ring-slate-700',
  },
}

function Semana({ dato, indice, ultima }) {
  const estado = ESTADOS[dato.estado] ?? ESTADOS.programada
  const Icono = estado.icono

  return (
    <li
      className="relative animate-fade-up pb-8 pl-14 last:pb-0"
      style={{ animationDelay: `${indice * 90}ms` }}
    >
      {/* Riel vertical: no se dibuja en la ultima semana */}
      {!ultima && (
        <span
          aria-hidden
          className="absolute left-[1.1875rem] top-10 bottom-0 w-px bg-slate-200 dark:bg-slate-800"
        />
      )}

      {/* Punto de la linea de tiempo */}
      <span
        className={[
          'absolute left-0 top-1 grid h-10 w-10 place-items-center rounded-full ring-4',
          estado.punto,
        ].join(' ')}
      >
        <Icono className="h-5 w-5" />
      </span>

      <div className="card p-5 transition duration-300 hover:-translate-y-0.5 hover:shadow-lift">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-300">
            Semana {dato.semana}
          </span>
          <span
            className={['rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1', estado.chip].join(
              ' ',
            )}
          >
            {estado.etiqueta}
          </span>
        </div>

        <h3 className="mt-2 text-base font-bold text-slate-900 dark:text-white">
          {dato.titulo}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {dato.detalle}
        </p>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-3 dark:border-slate-800">
          <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <CalendarDays className="h-3.5 w-3.5 shrink-0" />
            {dato.sesiones.join(' · ')}
          </span>
          {dato.practica && (
            <Link
              to={`/practica/${dato.practica}`}
              className="group inline-flex items-center gap-1 text-sm font-semibold text-brand-600 transition hover:gap-2 dark:text-brand-300"
            >
              Ver práctica
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </li>
  )
}

export default function Cronograma() {
  if (CRONOGRAMA.length === 0) return null

  return (
    <section className="border-t border-slate-200 bg-white/60 dark:border-slate-800 dark:bg-slate-900/40">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 lg:px-12">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
          Cronograma de avance
        </h2>
        <p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-400">
          Una práctica por semana, con sesiones los miércoles y viernes. El curso arrancó el
          miércoles 19 de agosto.
        </p>

        <ol className="mt-8 max-w-3xl">
          {CRONOGRAMA.map((dato, i) => (
            <Semana
              key={dato.semana}
              dato={dato}
              indice={i}
              ultima={i === CRONOGRAMA.length - 1}
            />
          ))}
        </ol>
      </div>
    </section>
  )
}
