import { useState } from 'react'
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  Mail,
  MessageSquarePlus,
  Send,
  ShieldCheck,
} from 'lucide-react'
import { CURSO } from '../data/practicas'
import { abrirMailto, enviarRetroalimentacion } from '../services/feedback'

const MINIMO = 10

export default function FormularioRetro({ practica }) {
  const [mensaje, setMensaje] = useState('')
  const [botcheck, setBotcheck] = useState('')
  const [estado, setEstado] = useState('inactivo') // inactivo | enviando | ok | error
  const [aviso, setAviso] = useState('')
  const [ofrecerMailto, setOfrecerMailto] = useState(false)

  const contexto = {
    mensaje,
    botcheck,
    practica: `Práctica ${practica.numero}: ${practica.titulo}`,
  }

  const enviar = async (e) => {
    e.preventDefault()

    if (mensaje.trim().length < MINIMO) {
      setEstado('error')
      setAviso(`Cuéntanos un poco más: el mensaje necesita al menos ${MINIMO} caracteres.`)
      setOfrecerMailto(false)
      return
    }

    setEstado('enviando')
    setAviso('')
    setOfrecerMailto(false)

    try {
      const resultado = await enviarRetroalimentacion(contexto)
      setEstado('ok')
      setAviso(resultado.mensaje)
      setMensaje('')
    } catch (error) {
      setEstado('error')
      setAviso(error.message)
      setOfrecerMailto(Boolean(error.puedeUsarMailto))
    }
  }

  return (
    <section id="retroalimentacion" className="card overflow-hidden">
      <div className="border-b border-slate-100 bg-gradient-to-br from-brand-50 to-white px-6 py-6 dark:border-slate-800 dark:from-brand-950/50 dark:to-slate-900 sm:px-7">
        <div className="flex items-start gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-glow">
            <MessageSquarePlus className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Retroalimentación para mejoras
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              ¿Encontraste un error, algo confuso o tienes una idea para mejorar esta práctica?
              Escríbelo aquí y llegará a{' '}
              <a
                href={`mailto:${CURSO.correoRetroalimentacion}`}
                className="font-semibold text-brand-600 hover:underline dark:text-brand-300"
              >
                {CURSO.correoRetroalimentacion}
              </a>
              .
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={enviar} className="grid gap-5 px-6 py-6 sm:px-7">
        {/* Trampa antispam: invisible para personas, tentadora para bots */}
        <input
          type="checkbox"
          name="botcheck"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          onChange={(e) => setBotcheck(e.target.checked)}
        />

        <div>
          <label
            htmlFor="mensaje"
            className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-300"
          >
            Tu mensaje sobre la {`Práctica ${practica.numero}`}
          </label>
          <textarea
            id="mensaje"
            required
            rows={7}
            autoComplete="off"
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            placeholder="Describe con el mayor detalle posible: sección del documento, página, qué esperabas y qué encontraste…"
            className="w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-relaxed text-slate-800 shadow-soft transition placeholder:text-slate-400 focus:border-brand-400 focus:ring-4 focus:ring-brand-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500"
          />
          <p className="mt-1.5 text-xs text-slate-400 dark:text-slate-500">
            {mensaje.length} caracteres · mínimo {MINIMO}
          </p>
        </div>

        {aviso && (
          <div
            role="status"
            className={[
              'flex items-start gap-3 rounded-xl border p-4 text-sm',
              estado === 'ok'
                ? 'border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-200'
                : 'border-rose-200 bg-rose-50 text-rose-800 dark:border-rose-900 dark:bg-rose-950 dark:text-rose-200',
            ].join(' ')}
          >
            {estado === 'ok' ? (
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
            ) : (
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
            )}
            <div className="min-w-0">
              <p>{aviso}</p>
              {ofrecerMailto && (
                <button
                  type="button"
                  onClick={() => abrirMailto(contexto)}
                  className="mt-2 inline-flex items-center gap-2 rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-rose-700 shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift dark:bg-slate-800 dark:text-rose-200"
                >
                  <Mail className="h-3.5 w-3.5" />
                  Enviarlo desde mi aplicación de correo
                </button>
              )}
            </div>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-4">
          <button
            type="submit"
            disabled={estado === 'enviando'}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 px-6 py-3 text-sm font-bold text-white shadow-glow transition hover:-translate-y-0.5 hover:shadow-lift active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {estado === 'enviando' ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Enviando…
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Enviar retroalimentación
              </>
            )}
          </button>

          <a
            href={`mailto:${CURSO.correoRetroalimentacion}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-300"
          >
            <Mail className="h-4 w-4" />
            O escribir por correo
          </a>
        </div>

        <p className="flex items-start gap-2 text-xs text-slate-400 dark:text-slate-500">
          <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          El mensaje se envía por correo a {CURSO.correoRetroalimentacion}. No pedimos datos
          personales ni guardamos nada en el sitio.
        </p>
      </form>
    </section>
  )
}
