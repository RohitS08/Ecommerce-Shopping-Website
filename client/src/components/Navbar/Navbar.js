import React, { useState, useEffect } from 'react';
import "./Navbar.scss";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../../store/categorySlice';
import { addToCartt, getTotals } from '../../store/cartDataSlice';
import SwiperCarousel from '../SwiperJs/SwiperCarousel';
import { logout } from './../../store/userSlice';
import "../SingleCategory/SingleCategory.scss";
const Navbar = () => {
  const dispatch = useDispatch();
  const { data: categories } = useSelector((state) => state.category);
  const { cartItem, cartTotlQuantity } = useSelector((state) => state.cartData);
  const { isLoggedIn } = useSelector(state => state.user);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    dispatch(getTotals());
  }, [cartItem]);

  useEffect(() => {
    dispatch(fetchCategories());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <nav className="navbar">
      <div className='navbar-content'>
        <div className="container">
          <div className="navbar-top flex flex-between">
            <Link to="/" className="navbar-brand">
              <span className="text-regal-blue">Fashion</span><span style={{color:"rgb(74, 97, 238)"}}>Trends.</span>
            </Link>

            <div className="navbar-btns">
              <Link to="/cart" className="add-to-cart-btn flex">
                <span className="btn-ico">
                  <i className="fas fa-shopping-cart"></i>
                </span>
                <div className='btn-txt fw-5'>Cart
                  <span className='cart-count-value'>{cartTotlQuantity}</span>
                </div>
              </Link>
            </div>
            {!isLoggedIn &&
              <div>
                <Link to="/login" className='btn-primary custom-btn' style={{ fontSize: 15, padding: "6px 16px" }}>
                  login
                </Link>
              </div>
            }
          </div>
        </div>

        <SwiperCarousel />

        <div className='navbar-bottom bg-regal-blue' style={{ backgroundColor: "#4A61EE" }}>
          <div className='container flex flex-between'>
            <ul className={`nav-links flex ${isSidebarOpen ? 'show-nav-links' : ""}`}>
              <button type="button" className='navbar-hide-btn text-white' onClick={() => setIsSidebarOpen(false)}>
                <i className='fas fa-times'></i>
              </button>
              
              {
                categories.map(category => (
                  // <li key={category.id}><Link to={`/category/${category.id}`} className="nav-link text-white" onClick={() => setIsSidebarOpen(false)}><button className='btn-primary custom-btn' style={{ backgroundColor: "#4A61EE" ,fontFamily:"cursive",fontSize:"1.5rem"}}>{category.name}</button></Link></li>
                  <li key = {category.id}><Link to = {`/category/${category.id}`} className = "nav-link text-white" onClick={() => setIsSidebarOpen(false)}><h3 style={{fontFamily:"cursive",fontSize:"1.8rem"}}>{category.name}</h3></Link></li>
                  ))
                }
              {isLoggedIn &&
                <li key="logout"><Link to='/login' className="nav-link text-white" onClick={() => { dispatch(logout()) }}>Logout</Link></li>
              }
            </ul>
              <hr></hr>
            

            <button type="button" className='navbar-show-btn text-gold' onClick={() => setIsSidebarOpen(true)}>
              <i className="fas fa-bars"></i>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;