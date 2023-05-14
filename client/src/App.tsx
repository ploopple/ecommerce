import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./pages/HomePage"
import NotFound from './pages/NotFound';
import CartPage from './pages/CartPage';
import SignUpPage from './pages/SignUpPage';
import Navbar from './components/Navbar';
import PrivateRoutes from './PrivateRoutes';
import LoginPage from './pages/LoginPage';
import ProductByIdPage from './pages/ProductByIdPage';
function App() {

  return (
    <Router>
      <Navbar/>
      <main className='w-full h-[94vh]'>
        <Routes>
          <Route path='' element={<PrivateRoutes url='homePage' isPrivate={!false}><HomePage /></PrivateRoutes>} />
          <Route path='login' element={<PrivateRoutes url='loginPage' isPrivate={false}><LoginPage /></PrivateRoutes>} />
          <Route path='signUp' element={<PrivateRoutes url='signUpPage' isPrivate={false}><SignUpPage /></PrivateRoutes>} />
          <Route path='cart' element={<PrivateRoutes url='cartPage' isPrivate={true}><CartPage /></PrivateRoutes>} />
          <Route path='product/:productId' element={<ProductByIdPage />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App
