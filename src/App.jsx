import Header from './components/Header'
import Footer from './components/Footer'
import Tendencias from './pages/productos/Tendencias'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Generos from './pages/productos/Generos'
import Actores from './pages/productos/Actores'
import Detalle from './pages/productos/Detalle'
import Peliculas from './pages/productos/Peliculas'
import Busquedas from './pages/Busquedas'

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>

        <Route path='/' element={<Tendencias />} />
        <Route path='/tendencias/:tipo' element={<Tendencias />} />
        <Route path="/generos/:tipo/:genero/:id" element={<Generos />} />
        <Route path='/actores' element={<Actores />} />
        <Route path="/detalle/:tipo/:id" element={<Detalle />} />
        <Route path="/peliculas/:id/:actor" element={<Peliculas />} />
        <Route path="/busquedas" element={<Busquedas />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  )
}

export default App