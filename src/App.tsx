import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import Home from './pages/Home'
import Examples from './pages/Examples'
import Showcase from './pages/Showcase'
import FreeWebsite from './pages/FreeWebsite'
import Policy from './pages/Policy'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="examples" element={<Examples />} />
          <Route path="showcase" element={<Showcase />} />
          <Route path="free-website" element={<FreeWebsite />} />
          <Route path="free-website/policy" element={<Policy />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
