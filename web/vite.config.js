import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base: './' -> rutas relativas, funciona igual en usuario.github.io/repo/
// que en un dominio propio, sin tocar la configuracion.
export default defineConfig({
  base: './',
  // Limpiar dist en cada build: si no, se acumulan los bundles antiguos y
  // acaban publicandose como peso muerto en GitHub Pages.
  build: { emptyOutDir: true },
  plugins: [react(), tailwindcss()],
})
