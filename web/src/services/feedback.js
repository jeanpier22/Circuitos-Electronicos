/**
 * Envio de retroalimentacion desde un sitio estatico.
 *
 * GitHub Pages no ejecuta codigo propio (ni Python, ni Node, ni PHP), asi que
 * el navegador entrega el formulario directamente a un servicio de correo.
 * Hay tres transportes, en orden de preferencia:
 *
 *   1. Web3Forms   - si se define VITE_WEB3FORMS_KEY. Requiere registrar una
 *                    clave gratuita; a cambio da panel de control y estadisticas.
 *   2. FormSubmit  - por defecto. NO necesita cuenta ni clave: basta con que el
 *                    destinatario confirme una sola vez el primer mensaje.
 *   3. mailto:     - ultimo recurso si la red falla. Abre el cliente de correo
 *                    del visitante con el mensaje ya redactado.
 *
 * Ningun componente conoce estos detalles: para cambiar de proveedor (Formspree,
 * EmailJS o un backend propio en FastAPI) solo se reescribe este archivo.
 */

import { CURSO } from '../data/practicas'

const CLAVE_WEB3FORMS = (import.meta.env.VITE_WEB3FORMS_KEY ?? '').trim()

/**
 * FormSubmit acepta el correo directamente en la URL. Tras confirmar el primer
 * envio, su panel entrega un identificador aleatorio (por ejemplo "a1b2c3d4")
 * que conviene usar en su lugar para no dejar la direccion a la vista de los
 * robots de spam. Se configura con VITE_FORMSUBMIT_ID.
 */
const ID_FORMSUBMIT = (import.meta.env.VITE_FORMSUBMIT_ID ?? '').trim()
const DESTINO_FORMSUBMIT = ID_FORMSUBMIT || CURSO.correoRetroalimentacion

export const proveedorActivo = CLAVE_WEB3FORMS ? 'web3forms' : 'formsubmit'

/** El envio automatico esta siempre disponible: FormSubmit no necesita configuracion. */
export const hayEnvioAutomatico = true

const asuntoDe = (d) => `[Retroalimentación] ${d.practica}`

const construirCuerpo = ({ practica, mensaje }) =>
  [
    `Práctica: ${practica}`,
    '',
    mensaje,
    '',
    '—',
    `Enviado desde el sitio de laboratorios de ${CURSO.nombre} (${CURSO.periodo}).`,
  ].join('\n')

/** Respaldo sin servicios externos: abre el cliente de correo del visitante. */
export function abrirMailto(datos) {
  const url =
    `mailto:${CURSO.correoRetroalimentacion}` +
    `?subject=${encodeURIComponent(asuntoDe(datos))}` +
    `&body=${encodeURIComponent(construirCuerpo(datos))}`
  window.location.href = url
}

async function enviarPorWeb3Forms(datos) {
  const respuesta = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: CLAVE_WEB3FORMS,
      subject: asuntoDe(datos),
      from_name: 'Laboratorios de Circuitos Electrónicos',
      message: construirCuerpo(datos),
      botcheck: datos.botcheck ?? '',
    }),
  })

  const cuerpo = await respuesta.json().catch(() => ({}))
  if (!respuesta.ok || cuerpo.success === false) {
    throw new Error(cuerpo.message || 'El servicio de correo rechazó el envío.')
  }
  return { ok: true, via: 'web3forms', requiereConfirmacion: false }
}

async function enviarPorFormSubmit(datos) {
  const respuesta = await fetch(
    `https://formsubmit.co/ajax/${encodeURIComponent(DESTINO_FORMSUBMIT)}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        _subject: asuntoDe(datos),
        _template: 'table',
        _captcha: 'false',
        // Campo trampa: FormSubmit descarta el envio si viene relleno
        _honey: datos.botcheck ?? '',
        Práctica: datos.practica,
        Mensaje: datos.mensaje,
      }),
    },
  )

  const cuerpo = await respuesta.json().catch(() => ({}))
  if (!respuesta.ok || String(cuerpo.success) === 'false') {
    throw new Error(cuerpo.message || 'El servicio de correo rechazó el envío.')
  }

  // En el primer envio, FormSubmit responde pidiendo confirmar la direccion.
  const texto = String(cuerpo.message ?? '')
  const requiereConfirmacion = /confirm/i.test(texto)
  return { ok: true, via: 'formsubmit', requiereConfirmacion }
}

/**
 * Envia la retroalimentacion.
 *
 * @returns {Promise<{ok: boolean, via: string, mensaje: string}>}
 * @throws  {Error} con `.puedeUsarMailto = true` si conviene ofrecer el respaldo
 */
export async function enviarRetroalimentacion(datos) {
  try {
    const resultado =
      proveedorActivo === 'web3forms'
        ? await enviarPorWeb3Forms(datos)
        : await enviarPorFormSubmit(datos)

    return {
      ...resultado,
      mensaje: resultado.requiereConfirmacion
        ? `Tu mensaje quedó registrado. Como es el primer envío del sitio, ${CURSO.correoRetroalimentacion} debe confirmar la dirección una sola vez: revisa la bandeja de entrada y pulsa el enlace de activación. A partir de ahí todo llega directo.`
        : `¡Gracias! Tu retroalimentación llegó a ${CURSO.correoRetroalimentacion}.`,
    }
  } catch (error) {
    const fallo = new Error(
      error instanceof TypeError
        ? 'No se pudo contactar con el servicio de correo (revisa tu conexión).'
        : error.message,
    )
    fallo.puedeUsarMailto = true
    throw fallo
  }
}
