import React, { useState, useEffect } from 'react';
import "./Navbar.scss";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../../store/categorySlice';
import { addToCartt ,getTotals} from '../../store/cartDataSlice';
import {logout} from './../../store/userSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const { data: categories } = useSelector((state) => state.category);
  const { cartItem, cartTotlQuantity } = useSelector((state) => state.cartData);
  const {isLoggedIn} = useSelector(state => state.user);
  
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
              <span className="text-regal-blue">Shopping</span><span className='text-gold'>Hub.</span>
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
              <Link to="/login"  className='btn-primary custom-btn' style={{ fontSize: 15, padding: "6px 16px" }}>
                login
              </Link>
            </div>
           }
          </div>
        </div>

        <div className='navbar-bottom bg-regal-blue'>
          <div className='container flex flex-between'>
            <ul className={`nav-links flex ${isSidebarOpen ? 'show-nav-links' : ""}`}>
              <button type="button" className='navbar-hide-btn text-white' onClick={() => setIsSidebarOpen(false)}>
                <i className='fas fa-times'></i>
              </button>
              {
                categories.map(category => (
                  <li key={category.id}><Link to={`/category/${category.id}`} className="nav-link text-white" onClick={() => setIsSidebarOpen(false)}>{category.name}</Link></li>
                ))
              }
              {isLoggedIn &&
              <li key="logout"><Link to ='/login' className = "nav-link text-white" onClick={()=>{dispatch(logout())}}>Logout</Link></li>
              }
            </ul>

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