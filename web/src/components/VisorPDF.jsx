import { useCallback, useEffect, useRef, useState } from 'react'
import {
  Download,
  ExternalLink,
  FileText,
  Loader2,
  Maximize2,
  Minimize2,
  Minus,
  Plus,
} from 'lucide-react'

/**
 * Visor de PDF embebido a ancho completo.
 *
 * Usa el visor nativo del navegador dentro de un iframe: trae su propia
 * paginacion, busqueda y zoom, y no requiere ninguna libreria extra.
 *
 * La altura es regulable (tres pasos) y hay modo pantalla completa real
 * mediante la Fullscreen API.
 */

const ALTURAS = [
  { etiqueta: 'Compacta', clase: 'h-[65vh] min-h-[440px]' },
  { etiqueta: 'Cómoda', clase: 'h-[85vh] min-h-[560px]' },
  { etiqueta: 'Alta', clase: 'h-[130vh] min-h-[720px]' },
]

export default function VisorPDF({ src, titulo, peso, descarga }) {
  const [cargando, setCargando] = useState(true)
  const [nivel, setNivel] = useState(1)
  const [pantallaCompleta, setPantallaCompleta] = useState(false)
  const contenedor = useRef(null)

  // "#view=FitH" pide al visor del navegador que ajuste el ancho de la pagina.
  const fuente = `${src}#view=FitH&toolbar=1&navpanes=0`

  const alternarPantallaCompleta = useCallback(() => {
    const nodo = contenedor.current
    if (!nodo) return
    if (document.fullscreenElement) {
      document.exitFullscreen?.()
    } else {
      nodo.requestFullscreen?.()
    }
  }, [])

  useEffect(() => {
    const alCambiar = () => setPantallaCompleta(Boolean(document.fullscreenElement))
    document.addEventListener('fullscreenchange', alCambiar)
    return () => document.removeEventListener('fullscreenchange', alCambiar)
  }, [])

  return (
    <div
      ref={contenedor}
      className="card overflow-hidden bg-white dark:bg-slate-900"
    >
      {/* ------------------------------------------------------ Barra superior */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-slate-100 px-4 py-3 dark:border-slate-800 sm:px-5">
        <FileText className="h-4 w-4 shrink-0 text-brand-600 dark:text-brand-300" />
        <span className="truncate text-sm font-semibold text-slate-800 dark:text-slate-100">
          {titulo}
        </span>
        {peso && (
          <span className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-xs text-slate-500 dark:bg-slate-800 dark:text-slate-400">
            {peso}
          </span>
        )}

        <div className="ml-auto flex items-center gap-1">
          {/* Regulador de altura */}
          <div className="mr-1 hidden items-center gap-0.5 rounded-lg border border-slate-200 p-0.5 dark:border-slate-700 sm:flex">
            <button
              type="button"
              onClick={() => setNivel((n) => Math.max(0, n - 1))}
              disabled={nivel === 0}
              title="Reducir el alto del visor"
              aria-label="Reducir el alto del visor"
              className="grid h-7 w-7 place-items-center rounded-md text-slate-500 transition hover:bg-slate-100 hover:text-brand-600 disabled:opacity-30 disabled:hover:bg-transparent dark:text-slate-400 dark:hover:bg-slate-800"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="w-16 text-center text-xs font-medium text-slate-500 dark:text-slate-400">
              {ALTURAS[nivel].etiqueta}
            </span>
            <button
              type="button"
              onClick={() => setNivel((n) => Math.min(ALTURAS.length - 1, n + 1))}
              disabled={nivel === ALTURAS.length - 1}
              title="Aumentar el alto del visor"
              aria-label="Aumentar el alto del visor"
              className="grid h-7 w-7 place-items-center rounded-md text-slate-500 transition hover:bg-slate-100 hover:text-brand-600 disabled:opacity-30 disabled:hover:bg-transparent dark:text-slate-400 dark:hover:bg-slate-800"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>

          <button
            type="button"
            onClick={alternarPantallaCompleta}
            title={pantallaCompleta ? 'Salir de pantalla completa' : 'Pantalla completa'}
            className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-brand-600 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-brand-300"
          >
            {pantallaCompleta ? (
              <Minimize2 className="h-3.5 w-3.5" />
            ) : (
              <Maximize2 className="h-3.5 w-3.5" />
            )}
            <span className="hidden sm:inline">
              {pantallaCompleta ? 'Salir' : 'Pantalla completa'}
            </span>
          </button>

          <a
            href={src}
            target="_blank"
            rel="noreferrer"
            title="Abrir en una pestaña nueva"
            className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-brand-600 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-brand-300"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            <span className="hidden lg:inline">Pestaña nueva</span>
          </a>

          {descarga && (
            <a
              href={src}
              download={descarga}
              title="Descargar el documento"
              className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 px-3 py-1.5 text-xs font-bold text-white shadow-soft transition hover:shadow-lift"
            >
              <Download className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Descargar</span>
            </a>
          )}
        </div>
      </div>

      {/* ----------------------------------------------------------- Documento */}
      <div
        className={[
          'relative w-full bg-slate-200 dark:bg-slate-950',
          pantallaCompleta ? 'h-[calc(100vh-7rem)]' : ALTURAS[nivel].clase,
        ].join(' ')}
      >
        {cargando && (
          <div className="absolute inset-0 z-10 grid place-items-center bg-slate-100 dark:bg-slate-950">
            <span className="flex flex-col items-center gap-3 text-slate-500 dark:text-slate-400">
              <Loader2 className="h-8 w-8 animate-spin text-brand-500" />
              <span className="text-sm font-medium">Cargando documento…</span>
            </span>
          </div>
        )}
        <iframe
          src={fuente}
          title={titulo}
          onLoad={() => setCargando(false)}
          className="h-full w-full border-0"
        />
      </div>

      {/* -------------------------------------------------------- Pie de ayuda */}
      <div className="border-t border-slate-100 px-4 py-2.5 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400 sm:px-5">
        Usa <strong className="font-semibold">Pantalla completa</strong> para leerlo cómodamente, o
        ábrelo en una pestaña nueva si prefieres el visor de tu navegador.
      </div>
    </div>
  )
}
