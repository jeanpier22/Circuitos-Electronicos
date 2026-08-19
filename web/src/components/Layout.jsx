import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { CircuitBoard, FolderGit2, Mail } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import { CURSO } from '../data/practicas'

function Navbar() {
  const enlace = ({ isActive }) =>
    [
      'rounded-lg px-3 py-2 text-sm font-medium transition',
      isActive
        ? 'bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-200'
        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100',
    ].join(' ')

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur-lg dark:border-slate-800/70 dark:bg-slate-950/80">
      <nav className="mx-auto flex max-w-6xl items-center gap-3 px-5 py-3 sm:px-8 lg:px-12">
        <Link to="/" className="group flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-glow transition group-hover:scale-105">
            <CircuitBoard className="h-5 w-5" />
          </span>
          <span className="hidden leading-tight sm:block">
            <span className="block text-sm font-bold text-slate-900 dark:text-white">
              {CURSO.nombre}
            </span>
            <span className="block text-xs text-slate-500 dark:text-slate-400">
              Laboratorios · {CURSO.periodo}
            </span>
          </span>
        </Link>

        <div className="ml-auto flex items-center gap-1">
          <NavLink to="/" className={enlace} end>
            Prácticas
          </NavLink>
          <NavLink to="/acerca" className={enlace}>
            Acerca de
          </NavLink>
          <span className="mx-1 hidden h-6 w-px bg-slate-200 dark:bg-slate-700 sm:block" />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}

function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:px-8 lg:px-12 md:grid-cols-3">
        <div>
          <p className="text-sm font-bold text-slate-900 dark:text-white">{CURSO.nombre}</p>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            {CURSO.facultad}
            <br />
            {CURSO.universidad}
          </p>
        </div>
        <div>
          <p className="text-sm font-bold text-slate-900 dark:text-white">Docente</p>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{CURSO.docente}</p>
        </div>
        <div>
          <p className="text-sm font-bold text-slate-900 dark:text-white">Retroalimentación</p>
          <a
            href={`mailto:${CURSO.correoRetroalimentacion}`}
            className="mt-2 inline-flex items-center gap-2 text-sm text-brand-600 transition hover:text-brand-700 hover:underline dark:text-brand-300"
          >
            <Mail className="h-4 w-4" />
            {CURSO.correoRetroalimentacion}
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="mt-3 flex items-center gap-2 text-sm text-slate-500 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          >
            <FolderGit2 className="h-4 w-4" />
            Repositorio del curso
          </a>
        </div>
      </div>
      <div className="border-t border-slate-100 py-5 text-center text-xs text-slate-400 dark:border-slate-800 dark:text-slate-500">
        Material académico con fines educativos · {CURSO.periodo}
      </div>
    </footer>
  )
}

export default function Layout() {
  const { pathname } = useLocation()

  // Al cambiar de practica, volver al inicio de la pagina.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
