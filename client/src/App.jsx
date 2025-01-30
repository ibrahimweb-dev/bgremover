
import Home from './pages/Home'
import Result from './pages/Result'
import { Route, Routes } from 'react-router-dom'
import BuyCredit from './pages/BuyCredit'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Toaster } from 'sonner'
const App = () => {
  return (
    <div className="min-h-screen bg-slate-100" >
        <Toaster richColors  position="top-right" />
      <Navbar />
  
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/result" element={<Result />} />
        <Route path="/buy" element={<BuyCredit />} />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App