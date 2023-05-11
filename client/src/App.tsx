import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./pages/HomePage"
import NotFound from './pages/NotFound';
import CartPage from './pages/CartPage';
import SignUpPage from './pages/SignUpPage';
import Navbar from './components/Navbar';
import PrivateRoutes from './PrivateRoutes';
function App() {

  return (
    <Router>
      <Navbar />
      <main className='w-full h-[94vh]'>
        <Routes>
          <Route path='' element={<HomePage />} />
          <Route path='signUp' element={<SignUpPage />} />
          <Route path='cart' element={<PrivateRoutes><CartPage /></PrivateRoutes>} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App
