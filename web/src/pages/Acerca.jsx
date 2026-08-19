import { Info, Mail, ShieldCheck } from 'lucide-react'
import { CURSO } from '../data/practicas'

export default function Acerca() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 lg:px-12">
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
        Acerca de este sitio
      </h1>
      <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-400">
        Repositorio público de las prácticas de laboratorio del curso de{' '}
        <strong className="text-slate-800 dark:text-slate-200">{CURSO.nombre}</strong> ({CURSO.periodo}),{' '}
        {CURSO.facultad}, {CURSO.universidad}. Cada práctica tiene su propia página con el documento
        completo, los archivos descargables y un formulario para enviar comentarios.
      </p>

      <div className="mt-10 grid gap-5">
        <section className="card flex gap-4 p-6">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-300">
            <Info className="h-5 w-5" />
          </span>
          <div>
            <h2 className="font-bold text-slate-900 dark:text-white">Cómo está hecho</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Sitio estático construido con React y Tailwind CSS, publicado en GitHub Pages. Los
              documentos se redactan en LaTeX y se compilan a PDF; tanto el PDF como el código
              fuente están disponibles para descarga.
            </p>
          </div>
        </section>

        <section className="card flex gap-4 p-6">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-300">
            <Mail className="h-5 w-5" />
          </span>
          <div>
            <h2 className="font-bold text-slate-900 dark:text-white">Retroalimentación</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Las observaciones sobre erratas, procedimientos poco claros o propuestas de mejora se
              reciben en{' '}
              <a
                href={`mailto:${CURSO.correoRetroalimentacion}`}
                className="font-semibold text-brand-600 hover:underline dark:text-brand-300"
              >
                {CURSO.correoRetroalimentacion}
              </a>
              , ya sea desde el formulario de cada práctica o por correo directo.
            </p>
          </div>
        </section>

        <section className="card flex gap-4 p-6">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-300">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <div>
            <h2 className="font-bold text-slate-900 dark:text-white">Uso del material</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Material académico con fines educativos. Las guías originales pertenecen a su autor,{' '}
              {CURSO.docente}. Antes de cada sesión, revisa las indicaciones de seguridad del
              documento y trabaja siempre con la fuente apagada al modificar el montaje.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
