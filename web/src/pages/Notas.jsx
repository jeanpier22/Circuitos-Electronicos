import { AlertTriangle, CalendarDays, ClipboardList, FlaskConical, Scale } from 'lucide-react'
import { CURSO, PRACTICAS } from '../data/practicas'
import { AVISOS, COMPONENTES, FECHAS, LABORATORIO, RUBRICAS } from '../data/evaluacion'

/**
 * Esquema de calificacion del curso.
 *
 * Solo muestra como se reparte la nota. NO lleva notas de alumnos: el sitio se
 * publica en GitHub Pages, que es estatico y publico, asi que cualquier dato
 * que llegue aqui es legible por cualquiera y queda en el historial de git.
 *
 * Cada bloque se oculta cuando su arreglo esta vacio, de modo que el mismo
 * componente sirve para los tres cursos aunque tengan distinto nivel de
 * informacion confirmada.
 */

// Barra de peso porcentual. El ancho es el propio porcentaje.
function Barra({ nombre, peso, detalle, color }) {
  return (
    <li className="py-4 first:pt-0 last:pb-0">
      <div className="flex items-baseline justify-between gap-4">
        <span className="font-semibold text-slate-900 dark:text-white">{nombre}</span>
        <span className="shrink-0 font-mono text-sm font-bold text-slate-900 dark:text-white">
          {peso}%
        </span>
      </div>
      <div
        className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"
        role="img"
        aria-label={`${nombre}: ${peso} por ciento`}
      >
        <div className={`h-full rounded-full ${color}`} style={{ width: `${peso}%` }} />
      </div>
      {detalle && (
        <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{detalle}</p>
      )}
    </li>
  )
}

function Bloque({ icono: Icono, titulo, descripcion, tono, children }) {
  return (
    <section className="card p-6 sm:p-7">
      <div className="flex gap-4">
        <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${tono}`}>
          <Icono className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="font-bold text-slate-900 dark:text-white">{titulo}</h2>
          {descripcion && (
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {descripcion}
            </p>
          )}
          <div className="mt-4">{children}</div>
        </div>
      </div>
    </section>
  )
}

const tituloPractica = (id) => PRACTICAS.find((p) => p.id === id)?.titulo ?? id

export default function Notas() {
  const sinDatos =
    COMPONENTES.length === 0 &&
    LABORATORIO.length === 0 &&
    RUBRICAS.length === 0 &&
    FECHAS.length === 0

  return (
    <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 lg:px-12">
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
        Cómo se califica
      </h1>
      <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-400">
        Reparto de la nota del curso de{' '}
        <strong className="text-slate-800 dark:text-slate-200">{CURSO.nombre}</strong> ({CURSO.periodo}).
        Esta página explica el esquema de puntaje; las notas individuales no se publican aquí y se
        consultan directamente con el jefe de práctica.
      </p>

      {sinDatos ? (
        <div className="card mt-10 flex gap-4 p-6">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-300">
            <AlertTriangle className="h-5 w-5" />
          </span>
          <div>
            <h2 className="font-bold text-slate-900 dark:text-white">Por confirmar</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              El esquema de calificación de este curso todavía no está publicado. Se cargará en
              cuanto quede confirmado con el docente.
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-10 grid gap-5">
          {COMPONENTES.length > 0 && (
            <Bloque
              icono={Scale}
              titulo="Nota final del curso"
              descripcion="Los tres componentes que promedian la nota final."
              tono="bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-300"
            >
              <ul className="divide-y divide-slate-100 dark:divide-slate-800">
                {COMPONENTES.map((c) => (
                  <Barra key={c.nombre} {...c} color="bg-brand-500" />
                ))}
              </ul>
            </Bloque>
          )}

          {LABORATORIO.length > 0 && (
            <Bloque
              icono={FlaskConical}
              titulo="Nota de laboratorio"
              descripcion="Dentro de la evaluación permanente, así se compone lo que sale del laboratorio."
              tono="bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-300"
            >
              <ul className="divide-y divide-slate-100 dark:divide-slate-800">
                {LABORATORIO.map((l) => (
                  <Barra key={l.nombre} {...l} color="bg-emerald-500" />
                ))}
              </ul>
            </Bloque>
          )}

          {RUBRICAS.length > 0 && (
            <Bloque
              icono={ClipboardList}
              titulo="Puntaje de cada guía"
              descripcion="Reparto de los puntos dentro del informe de cada práctica."
              tono="bg-violet-50 text-violet-600 dark:bg-violet-950 dark:text-violet-300"
            >
              <div className="grid gap-6">
                {RUBRICAS.map((r) => (
                  <div key={r.practica}>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      {tituloPractica(r.practica)}
                    </p>
                    <div className="mt-2 overflow-x-auto">
                      <table className="w-full text-sm">
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                          {r.filas.map((f) => (
                            <tr key={f.seccion}>
                              <td className="py-2 pr-4 text-slate-600 dark:text-slate-400">
                                {f.seccion}
                              </td>
                              <td className="w-20 py-2 text-right font-mono font-semibold text-slate-900 dark:text-white">
                                {f.puntos}
                              </td>
                            </tr>
                          ))}
                          <tr className="border-t-2 border-slate-200 dark:border-slate-700">
                            <td className="py-2 pr-4 font-semibold text-slate-900 dark:text-white">
                              Total
                            </td>
                            <td className="w-20 py-2 text-right font-mono font-bold text-slate-900 dark:text-white">
                              {r.total}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            </Bloque>
          )}

          {FECHAS.length > 0 && (
            <Bloque
              icono={CalendarDays}
              titulo="Fechas de evaluación"
              tono="bg-sky-50 text-sky-600 dark:bg-sky-950 dark:text-sky-300"
            >
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {FECHAS.map((f) => (
                      <tr key={f.evento}>
                        <td className="py-3 pr-4 align-top font-semibold text-slate-900 dark:text-white">
                          {f.evento}
                          <span className="mt-0.5 block font-normal text-slate-500 dark:text-slate-400">
                            {f.fecha}
                          </span>
                        </td>
                        <td className="py-3 align-top text-slate-600 dark:text-slate-400">
                          {f.contenido}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Bloque>
          )}

          {AVISOS.length > 0 && (
            <Bloque
              icono={AlertTriangle}
              titulo="Pendiente de confirmar"
              tono="bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-300"
            >
              <ul className="grid gap-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {AVISOS.map((a) => (
                  <li key={a} className="flex gap-2">
                    <span aria-hidden="true" className="text-amber-500">
                      •
                    </span>
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </Bloque>
          )}
        </div>
      )}
    </div>
  )
}
