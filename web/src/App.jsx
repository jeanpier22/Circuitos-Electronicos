import { HashRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Practica from './pages/Practica'
import Acerca from './pages/Acerca'
import NoEncontrado from './pages/NoEncontrado'

/**
 * HashRouter y no BrowserRouter: GitHub Pages sirve archivos estaticos y
 * devuelve 404 al recargar una ruta profunda. Con el hash (#/practica/lab1)
 * la navegacion la resuelve el navegador y todo funciona sin configuracion.
 */
export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="practica/:id" element={<Practica />} />
          <Route path="acerca" element={<Acerca />} />
          <Route path="*" element={<NoEncontrado />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
