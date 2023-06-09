import React, { useEffect, useState } from 'react';
import "./SingleProduct.scss";
import { useSelector, useDispatch } from 'react-redux';
import { setIsModalVisible } from '../../store/modalSlice';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '../../utils/helpers';
import { addToCartt, decreaseCartt,removeFromCartt, getTotals,clearCartt } from '../../store/cartDataSlice';

const SingleProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);

  const { data: product } = useSelector(state => state.modal);
  const { cartItem } = useSelector(state => state.cartData);
  const {isLoggedIn} = useSelector(state => state.user);
  // const getCartQuantity=()=>{
  //   const itemIndex=cartItem.findIndex((item)=>{ item.id===product.id});
  //   const cartCount=cartItem[itemIndex].cartQuantity;
  //   return cartCount;
  //   // console.log("CartItem:")
  //   // console.log(cartItem);
  // }


  // useEffect(()=>{
  //   getCartQuantity(cartItem,product);
  //   console.log("click! useEffect!")
  // },[cartItem])
  

  function decreaseHandler(product) {
    dispatch(decreaseCartt(product));
    console.log("DataRemove:");
    console.log(cartItem);
  }


  const addToCartHandler = (product) => {
    // let totalPrice = qty * product.price;
    // const tempProduct = {
    //   ...product,
    //   quantity: qty,
    //   totalPrice
    // }
    // dispatch(addToCart(tempProduct));
    dispatch(setIsModalVisible(false));
    navigate('/cart');
    // alert("Hello Vivek!");
    dispatch(addToCartt(product));
    console.log("Data:");
    console.log(cartItem);
  };

  const modalOverlayHandler = (e) => {
    if (e.target.classList.contains('overlay-bg')) {
      dispatch(setIsModalVisible(false));
    }
  }

  return (
    <div className='overlay-bg' onClick={modalOverlayHandler}>
      <div className="product-details-modal bg-white">
        <button type="button" className='modal-close-btn flex flex-center fs-14' onClick={() => dispatch(setIsModalVisible(false))}>
          <i className="fas fa-times"></i>
        </button>
        <div className="details-content grid">
          {/* details left */}
          <div className="details-right">
            <div className="details-img">
              <img src={product.images[0]} alt={product.title} />
            </div>
          </div>
          {/* detials right */}
          <div className='details-left'>
            <div className="details-info">
              <h3 className="title text-regal-blue fs-22 fw-5">{product.title}</h3>
              <p className='description text-pine-green'>{product.description}</p>
              <div className='price fw-7 fs-24'>₹ {product.price}</div>
              
              <button type="button" className='btn-primary add-to-cart-btn' onClick={() => { addToCartHandler(product) }} 
               >
                <span className="btn-icon">
                  <i className='fas fa-cart-shopping'></i>
                </span>
                <span className='btn-text' style={{backgroundColor:"rgb(74, 97, 238)"}}>Add To Cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleProduct