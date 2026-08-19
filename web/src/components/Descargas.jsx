import { Download, FileCode2, FileText, FileType2 } from 'lucide-react'

const ICONOS = {
  PDF: FileText,
  TEX: FileCode2,
  DOC: FileType2,
}

const COLORES = {
  PDF: 'from-rose-500 to-rose-700',
  TEX: 'from-teal-500 to-teal-700',
  DOC: 'from-sky-500 to-sky-700',
}

/**
 * Una descarga.
 *
 * El bloque se organiza en dos filas para que no se rompa dentro de columnas
 * estrechas: arriba el icono, el nombre y el boton; abajo la descripcion, que
 * dispone del ancho completo de la tarjeta para envolverse.
 */
function ItemDescarga({ item }) {
  const Icono = ICONOS[item.tipo] ?? FileText
  const color = COLORES[item.tipo] ?? 'from-slate-500 to-slate-700'

  return (
    <a
      href={item.archivo}
      download={item.nombre}
      className={[
        'group block rounded-xl border p-4 transition duration-300',
        item.destacado
          ? 'border-brand-200 bg-brand-50/50 hover:-translate-y-0.5 hover:border-brand-400 hover:shadow-lift dark:border-brand-800 dark:bg-brand-950/40 dark:hover:border-brand-600'
          : 'border-slate-200 bg-white hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lift dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-600',
      ].join(' ')}
    >
      <div className="flex items-center gap-3">
        <span
          className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${color} text-white shadow-soft transition group-hover:scale-110`}
        >
          <Icono className="h-5 w-5" />
        </span>

        <span className="min-w-0 flex-1">
          <span className="block text-sm font-bold leading-snug text-slate-900 dark:text-white">
            {item.etiqueta}
          </span>
          <span className="mt-0.5 block font-mono text-[11px] font-medium tracking-wide text-slate-500 dark:text-slate-400">
            {item.tipo} · {item.peso}
          </span>
        </span>

        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-slate-100 text-slate-500 transition group-hover:bg-brand-600 group-hover:text-white dark:bg-slate-800 dark:text-slate-400">
          <Download className="h-4 w-4" />
        </span>
      </div>

      <p className="mt-2.5 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
        {item.detalle}
      </p>
    </a>
  )
}

export default function Descargas({ items }) {
  if (!items?.length) return null

  return (
    <section id="descargas" className="card flex flex-col p-6">
      <div className="flex items-center gap-3">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-300">
          <Download className="h-4.5 w-4.5" />
        </span>
        <div className="min-w-0">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Descargas</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Archivos de esta práctica</p>
        </div>
      </div>

      <div className="mt-5 grid gap-3">
        {items.map((item) => (
          <ItemDescarga key={item.archivo} item={item} />
        ))}
      </div>
    </section>
  )
}
