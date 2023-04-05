import React, { useState } from 'react';
import { STATUS } from '../../utils/status';
import "./ProductList.scss";
import { setModalData, setIsModalVisible } from '../../store/modalSlice';
import SingleProduct from '../SingleProduct/SingleProduct';
import { useSelector, useDispatch } from 'react-redux';
import { formatPrice } from '../../utils/helpers';
import "../SingleCategory/SingleCategory.scss";
import "../ProductList/ProductList.scss";
import Loader from '../Loader/Loader';
import Error from '../Error/Error';


const ProductList = ({ products, status }) => {
    const dispatch = useDispatch();
    const { isModalVisible } = useSelector((state) => state.modal);
    const { isLoggedIn } = useSelector(state => state.user);


    // for pagination
    const [Currentpage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);

    // for getting first index and last index for array.slice() method #pagination
    const lastPostIndex = Currentpage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = products.slice(firstPostIndex, lastPostIndex);
    
    // creating an array for pagination
    let PagesCount = [];
    for (let i = 1; i < 5; i++) {
        PagesCount.push(i);
    }
    
    // increment count and decrement count
    const selectPageHandler = (selectPage) => {
        if (selectPage >= 1 && selectPage <= PagesCount.length && selectPage !== Currentpage) {
            setCurrentPage(selectPage);
        }
    }

    const viewModalHandler = (data) => {
        dispatch(setModalData(data));
        dispatch(setIsModalVisible(true));
    }

    if (status === STATUS.ERROR) return (<Error />);
    if (status === STATUS.LOADING) return (<Loader />);

    return (
        <section className='product py-5 bg-ghost-white' id="products">
            {isModalVisible && <SingleProduct />}

            <div className='container'>
                <div className='product-content'>
                    <div className='section-title'>
                        <h3 className='text-uppercase fw-7 text-regal-blue ls-1'>Our Products</h3>
                    </div>
                    <div className='product-items grid'>
                        {
                            currentPosts.map(product => (
                                <div className='product-item bg-white card' key={product.id} onClick={() => viewModalHandler(product)}>
                                    <div className='product-item-img'>
                                        <img src={product.images[0]} alt="" />

                                        <div className="product-item-cat text-white fs-13 text-uppercase bg-gold fw-6">{product.category.name}</div>

                                    </div>
                                    <div className='product-item-body'>
                                        <h6 className="product-item-title text-pine-green fw-4 fs-15">{product.title}</h6>
                                        <div className='custom-flex'>
                                            <div className="product-item-price text-regal-blue fw-7 fs-18">₹{formatPrice(product.price)}</div>
                                            <div className=""><button className='btn-primary custom-btn' style={{ backgroundColor: "#4A61EE" }}>Buy Now</button></div>
                                        </div>

                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>

                {products.length > 0 && <div className='pagination' style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}>

                    <span onClick={() => selectPageHandler(Currentpage - 1)} style={{ cursor: "pointer" }} className={`${"leftRightIcon"} ${Currentpage > 1 ? " " : "pagination_disable"}`}><i className="fas fa-arrow-left"></i></span>

                    {
                        PagesCount.map((page, i) => {
                            return (
                                <button key={i} onClick={() => selectPageHandler(page)} style={{ backgroundColor: " rgba(74, 97, 238,0.5)", color: "wheat", border: "none", margin: "0px 11px", borderRadius: "5px", padding: "6px 15px" }} className={page === Currentpage ? "buttonActive" : ""}>{page}</button>

                            )
                        })
                    }

                    <span onClick={() => selectPageHandler(Currentpage + 1)} style={{ cursor: "pointer" }} className={` ${"leftRightIcon"} ${Currentpage === PagesCount.length ? "pagination_disable" : ""}`}><i className="fas fa-arrow-right"></i></span>
                </div>

                }
            </div>
        </section>
    )
}

export default ProductList