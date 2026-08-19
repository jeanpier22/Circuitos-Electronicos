import { Link, Navigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Download,
  Info,
  MessageSquarePlus,
  Target,
} from 'lucide-react'
import Descargas from '../components/Descargas'
import FormularioRetro from '../components/FormularioRetro'
import VisorPDF from '../components/VisorPDF'
import { CURSO, getPractica } from '../data/practicas'

function BotonAncla({ href, icono: Icono, children, primario }) {
  return (
    <a
      href={href}
      className={[
        'inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift',
        primario
          ? 'bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-glow'
          : 'border border-slate-200 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200',
      ].join(' ')}
    >
      <Icono className="h-4 w-4" />
      {children}
    </a>
  )
}

export default function Practica() {
  const { id } = useParams()
  const practica = getPractica(id)

  if (!practica) return <Navigate to="/404" replace />

  return (
    <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-10 lg:px-12">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:gap-3 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-300"
      >
        <ArrowLeft className="h-4 w-4" />
        Todas las prácticas
      </Link>

      {/* ----------------------------------------------------- Encabezado */}
      <header className="mt-6 animate-fade-up">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-brand-600 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
            Práctica {practica.numero}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
            <Clock className="h-3.5 w-3.5" />
            {practica.duracion}
          </span>
          <span className="text-xs text-slate-400 dark:text-slate-500">{practica.subtitulo}</span>
        </div>

        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          {practica.titulo}
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-600 dark:text-slate-400">
          {practica.resumen}
        </p>

        {practica.temas.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {practica.temas.map((t) => (
              <span
                key={t}
                className="rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-slate-600 shadow-soft ring-1 ring-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        <div className="mt-7 flex flex-wrap gap-3">
          <BotonAncla href="#descargas" icono={Download} primario>
            Descargar
          </BotonAncla>
          <BotonAncla href="#retroalimentacion" icono={MessageSquarePlus}>
            Enviar retroalimentación
          </BotonAncla>
        </div>
      </header>

      {/* ------------------------------- Documento, a todo el ancho de la pagina */}
      {practica.documento && (
        <div className="mt-10">
          <VisorPDF
            src={practica.documento.src}
            titulo={`Práctica ${practica.numero} — ${practica.titulo}`}
            peso={practica.documento.peso}
            descarga={practica.descargas[0]?.nombre}
          />
        </div>
      )}

      {/* ------------------ Tres tarjetas de igual altura, en una sola fila */}
      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Descargas items={practica.descargas} />

        {practica.objetivos.length > 0 && (
          <section className="card flex flex-col p-6">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-300">
                <Target className="h-4.5 w-4.5" />
              </span>
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Objetivos</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">Qué deberías lograr</p>
              </div>
            </div>
            <ul className="mt-5 grid gap-3">
              {practica.objetivos.map((o) => (
                <li key={o} className="flex gap-2.5 text-sm text-slate-600 dark:text-slate-400">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <span className="leading-relaxed">{o}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="card flex flex-col p-6 md:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
              <Info className="h-4.5 w-4.5" />
            </span>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Ficha del curso</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">Datos de la asignatura</p>
            </div>
          </div>
          <dl className="mt-5 grid gap-3 text-sm">
            {[
              ['Curso', CURSO.nombre],
              ['Periodo', CURSO.periodo],
              ['Docente', CURSO.docente],
              ['Escuela', 'Ing. Electrónica y Telecomunicaciones'],
            ].map(([k, v]) => (
              <div
                key={k}
                className="flex justify-between gap-4 border-b border-slate-100 pb-2 last:border-0 dark:border-slate-800"
              >
                <dt className="shrink-0 text-slate-500 dark:text-slate-400">{k}</dt>
                <dd className="text-right font-semibold text-slate-800 dark:text-slate-200">{v}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>

      {/* ------------------- Formulario, centrado para que no quede demasiado ancho */}
      <div className="mx-auto mt-6 max-w-4xl">
        <FormularioRetro practica={practica} />
      </div>

    </div>
  )
}
