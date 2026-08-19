import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

const leerPreferencia = () => {
  const guardado = localStorage.getItem('tema')
  if (guardado) return guardado
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export default function ThemeToggle() {
  const [tema, setTema] = useState(leerPreferencia)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', tema === 'dark')
    localStorage.setItem('tema', tema)
  }, [tema])

  const esOscuro = tema === 'dark'

  return (
    <button
      type="button"
      onClick={() => setTema(esOscuro ? 'light' : 'dark')}
      aria-label={esOscuro ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      title={esOscuro ? 'Modo claro' : 'Modo oscuro'}
      className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-soft transition hover:-translate-y-0.5 hover:text-brand-600 hover:shadow-lift dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:text-brand-300"
    >
      {esOscuro ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  )
}
