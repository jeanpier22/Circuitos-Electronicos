# Circuitos Electrónicos — Laboratorios

Sitio web de las prácticas de laboratorio del curso de **Circuitos Electrónicos** (2026-2),
Facultad de Ingeniería · Ing. Electrónica y de Telecomunicaciones,
Universidad Católica San Pablo. Docente: Ebert San Román Castillo.

Cada práctica tiene su propia página con el documento embebido, botones de descarga y un
formulario de retroalimentación que llega a **jbancori@ucsp.edu.pe**.

---

## Estructura del repositorio

```
Circuitos Electrónicos/
├── Laboratorio_1/            Material fuente de cada práctica
│   ├── LaTeX/                  .tex, PDF compilado e imágenes
│   └── Originales/             guía .doc del docente
├── Laboratorio_2/
├── Laboratorio_3/
├── web/                      Sitio React que se publica en GitHub Pages
│   ├── public/practicas/       archivos servidos al visitante
│   └── src/
│       ├── data/practicas.js   catálogo de prácticas (único archivo a editar)
│       └── services/feedback.js envío del formulario
└── .github/workflows/deploy.yml  publicación automática
```

## Desarrollo local

```bash
cd web
npm install
npm run dev      # http://localhost:5173
npm run build    # genera web/dist
npm run preview  # revisa el build antes de publicar
```

## Publicar en GitHub Pages

1. Crea el repositorio en GitHub y sube el proyecto:

   ```bash
   git init
   git add .
   git commit -m "Sitio de laboratorios de Circuitos Electrónicos"
   git branch -M main
   git remote add origin https://github.com/USUARIO/REPOSITORIO.git
   git push -u origin main
   ```

2. En GitHub: **Settings → Pages → Source: GitHub Actions**.

3. Cada `push` a `main` reconstruye y publica el sitio automáticamente.
   Quedará en `https://USUARIO.github.io/REPOSITORIO/`.

> El sitio usa rutas relativas (`base: './'`) y `HashRouter`, así que funciona en cualquier
> subcarpeta sin tocar la configuración, y recargar una práctica no da error 404.

## El formulario de retroalimentación

GitHub Pages es hosting **estático**: no ejecuta código propio (ni Python, ni Node, ni PHP).
El envío se hace con **FormSubmit**, un endpoint público al que el navegador manda el
formulario. No hay que desplegar ni mantener ningún servidor, **ni crear ninguna cuenta**.

### Activación (una sola vez)

1. Abre la práctica en el sitio y envía un mensaje de prueba con el botón
   *Enviar retroalimentación*.
2. Llegará un correo de **FormSubmit** a `jbancori@ucsp.edu.pe` pidiendo confirmar la
   dirección. Pulsa el enlace de activación.
3. Listo. Desde ese momento todos los mensajes se entregan directamente.

La interfaz avisa de este paso: en el primer envío muestra que el mensaje quedó registrado
y que falta confirmar la dirección.

### Ocultar la dirección de correo (recomendado)

Al activar, el panel de FormSubmit entrega un identificador aleatorio del tipo `a1b2c3d4e5f6`.
Ponlo en `VITE_FORMSUBMIT_ID` (en `web/.env` y como variable `FORMSUBMIT_ID` en GitHub) para
que la dirección no quede escrita en el código de la página, a la vista de los robots de spam.

### Alternativa: Web3Forms

Si prefieres un servicio con panel de control y estadísticas, registra una clave gratuita en
<https://web3forms.com> con el correo `jbancori@ucsp.edu.pe` y ponla en `VITE_WEB3FORMS_KEY`.
Si esa variable existe, tiene prioridad sobre FormSubmit.

### Si falla la red

El formulario detecta el fallo y ofrece un botón que abre la aplicación de correo del
visitante con el mensaje ya redactado. Nunca se queda sin salida.

### ¿Y si prefieres un backend en Python?

Todo el transporte vive en `web/src/services/feedback.js`. Para cambiar a FastAPI, Formspree
o EmailJS basta con reescribir `enviarRetroalimentacion()`; ningún componente conoce los
detalles del envío. Eso sí, un backend propio no puede vivir en GitHub Pages: habría que
desplegarlo aparte (Render, Railway, Vercel) y llamarlo por `fetch` con CORS habilitado.

## Comprimir el PDF antes de publicarlo

Los PDF compilados desde LaTeX arrastran las imágenes a su resolución original (la del
Laboratorio 1 pesaba 11 MB, con una figura a 649 DPI). El script `herramientas/comprimir_pdf.py`
remuestrea cada imagen a 200 DPI efectivos y elige el mejor formato para cada una:

```bash
pip install pymupdf pillow
python herramientas/comprimir_pdf.py entrada.pdf salida.pdf
```

Preserva el texto seleccionable y respeta la transparencia (las imágenes con máscara se componen
sobre blanco en lugar de convertirse en JPEG con fondo negro). El PDF del Laboratorio 1 pasó de
**11.05 MB a 1.63 MB** sin pérdida visible.

La copia del repositorio en `Laboratorio_1/LaTeX/` conserva el PDF original sin comprimir; en
`web/public/` va la versión ligera, que es la que se muestra y se descarga.

## Agregar la Práctica 2 o 3

1. Copia los archivos a `web/public/practicas/lab2/`.
2. En `web/src/data/practicas.js`, en la entrada `lab2`:
   - cambia `estado: 'proximamente'` por `estado: 'disponible'`,
   - completa `titulo`, `resumen`, `objetivos`, `temas`,
   - apunta `documento.src` al PDF y rellena el arreglo `descargas`.
3. `git push`. No hay que tocar ningún componente.

## Tecnologías

React 19 · Vite 8 · Tailwind CSS 4 · React Router 7 · lucide-react · GitHub Actions
