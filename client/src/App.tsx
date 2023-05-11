import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./pages/HomePage"
import NotFound from './pages/NotFound';
import CartPage from './pages/CartPage';
import SignUpPage from './pages/SignUpPage';
import Navbar from './components/Navbar';
import PrivateRoutes from './PrivateRoutes';
import LoginPage from './pages/LoginPage';
function App() {

  return (
    <Router>
      <Navbar />
      <main className='w-full h-[94vh]'>
        <Routes>
          <Route path='' element={<HomePage />} />
          <Route path='login' element={<PrivateRoutes isPrivate={false}><LoginPage /></PrivateRoutes>} />
          <Route path='signUp' element={<PrivateRoutes isPrivate={false}><SignUpPage /></PrivateRoutes>} />
          <Route path='cart' element={<PrivateRoutes isPrivate={true}><CartPage /></PrivateRoutes>} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App
