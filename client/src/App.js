import './App.scss';
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
// pages
import {Home, Category, Cart} from "./pages/index";
// components
import Payment from "./components/Payment/Payment";
import Navbar from './components/Navbar/Navbar';
import Footer from "./components/Footer/Footer";
import Swiper from 'swiper';
import SwiperCarousel from './components/SwiperJs/SwiperCarousel';
import { ToastContainer } from 'react-toastify';
import Login from './components/Login/Login';
import Signup from './components/Login/Signup';
import {isAuthenticated} from './store/userSlice';
import LoginPage  from './components/Login/LoginPage';
import SignupPage from './components/Login/SignupPage';
import {useDispatch} from 'react-redux';

function App() {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(isAuthenticated());
  }, [])
  return (
    <div className="App">
        <BrowserRouter>
        <ToastContainer/>
          <Navbar />
          <Routes>
            <Route path = "/" element = {<Home />} />
            <Route path="/login" element = {<Login/>} />
            <Route path="/signup" element = {<Signup/>} />
            <Route path = "/category/:id" element = {<Category />} />
            <Route path = "/cart" element = {<Cart />} />
            <Route path = "/payment" element = {<Payment />} />
            <Route path = "/loginPage" element = {<LoginPage />} />
            <Route path = "/SignupPage" element = {<SignupPage />} />
          </Routes>
          <Footer />
        </BrowserRouter>
    </div>
  );
}

export default App;
