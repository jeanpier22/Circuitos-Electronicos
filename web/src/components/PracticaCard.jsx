import { Link } from 'react-router-dom'
import { ArrowRight, Clock, Lock } from 'lucide-react'

export default function PracticaCard({ practica, indice = 0 }) {
  const disponible = practica.estado === 'disponible'

  const Contenedor = disponible ? Link : 'div'
  const props = disponible ? { to: `/practica/${practica.id}` } : {}

  return (
    <Contenedor
      {...props}
      style={{ animationDelay: `${indice * 80}ms` }}
      className={[
        'card group relative flex animate-fade-up flex-col overflow-hidden p-6 transition duration-300',
        disponible
          ? 'hover:-translate-y-1 hover:border-brand-300 hover:shadow-lift dark:hover:border-brand-700'
          : 'opacity-70',
      ].join(' ')}
    >
      {/* Banda superior de color */}
      <span
        className={[
          'absolute inset-x-0 top-0 h-1 transition-opacity',
          disponible
            ? 'bg-gradient-to-r from-brand-500 to-brand-700 opacity-100'
            : 'bg-slate-300 opacity-60 dark:bg-slate-700',
        ].join(' ')}
      />

      <div className="flex items-start justify-between gap-4">
        <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-xl font-extrabold text-white shadow-glow">
          {practica.numero}
        </span>
        {disponible ? (
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:ring-emerald-900">
            Disponible
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500 ring-1 ring-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:ring-slate-700">
            <Lock className="h-3 w-3" />
            Próximamente
          </span>
        )}
      </div>

      <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">
        Práctica {practica.numero}: {practica.titulo}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
        {practica.resumen}
      </p>

      {practica.temas.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {practica.temas.slice(0, 4).map((t) => (
            <span
              key={t}
              className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
            >
              {t}
            </span>
          ))}
        </div>
      )}

      <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
        <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
          <Clock className="h-3.5 w-3.5" />
          {practica.duracion}
        </span>
        {disponible && (
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 transition group-hover:gap-2 dark:text-brand-300">
            Abrir práctica
            <ArrowRight className="h-4 w-4" />
          </span>
        )}
      </div>
    </Contenedor>
  )
}
