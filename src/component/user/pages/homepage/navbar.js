import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import $ from 'jquery'; // Import jQuery
import { MenuIcons } from './menuIcons';
import { FavProductsOffCanvas } from '../../favProductsOffCanvas';
import { addCart, delCart, delFav, delProductCart } from '../../../../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useProductContext } from '../../../common/api/provider';
import { CartProductsOffCanvas } from '../../cartProductsOffCanvas';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Onerrorimg } from '../../../common/onerrorimg';

export const Navbar = ({ getwebsiteDetails }) => {
    const { companyId } = useProductContext();
    const state = useSelector((state) => state.carthandler)
    const stateuser = useSelector((state) => state.userinfihandler.user);
    const favproduct = useSelector((state) => state.favhandler)
    const [isSticky, setIsSticky] = useState(false)
    const [isBouncing, setIsBouncing] = useState(false);

    const location = useLocation()
    const dispatch = useDispatch()

    // const getlogoimage = getwebsiteDetails.imageResponseDTOs[0].imageName;
    const getlogoimage = getwebsiteDetails.imageResponseDTOs?.[0]?.imageName;

    const handleClose = (e) => {
        dispatch(delProductCart(e));
        toast.info('Product removed from cart.');
    };

    const handleAdd = (e) => {
        dispatch(addCart(e));
        toast.success('One quantity of product in cart!');
    };
    const handleDelprod = (e) => {
        dispatch(delCart(e));
        toast.info('Product quantity one removed from cart!');
    };
    const handleDel = (e) => {
        dispatch(delFav(e))
        toast.info('Product removed from Favorites!');
    }

    // Calculate total amount using only newPrice
    const totalAmount = state.reduce((total, product) => {
        const price = product.newPrice || 0; // Use newPrice, default to 0 if not available
        const quantity = product.qty || 0;

        return total + price * quantity;
    }, 0);

    const currencySymbol = state.length > 0 ? state[0].currency : "";

    useEffect(() => {
        // Initialize jQuery click event when the component mounts
        $('.nav-link , .user').on('click', function () {
            // Add your jQuery click event logic here
            $('.navbar-collapse').removeClass('show')
        });
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsSticky(true)
            } else {
                setIsSticky(false)
            }
        };

        window.addEventListener('scroll', handleScroll)

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('scroll', handleScroll)
        };
    }, []);


    useEffect(() => {
        // Initialize AOS
        AOS.init({
            duration: 1000,
            delay: 200,
        });
    }, []);

    useEffect(() => {
        // Add bounce effect when state length is greater than 0
        if (state.length > 0) {
            setIsBouncing(true);
            // const addproductclick = document.querySelector('.addproductclick'); // Select the close button
            // addproductclick.click(); // Trigger the click event on the close butto

            // Remove bounce effect after 1 second
            const timeout = setTimeout(() => {
                setIsBouncing(false);
            }, 500);

            // Cleanup function to clear timeout
            return () => clearTimeout(timeout);
        }
    }, [state]);

    return (
        <>
            <div className="container-fluid fixed-top p-0">
                <div className="container topbar bg-secondarycolor d-none d-lg-block p-3">
                    <div className="d-flex justify-content-between">
                        <div className="top-info ps-2">
                            <small className="me-3"><i className="fas fa-map-marker-alt me-2 text-white"></i> <a href="#" className="text-white">{getwebsiteDetails.companyAddress}</a></small>
                            <small className="me-3"><i className="fas fa-envelope me-2 text-white"></i><a href="#" className="text-white">{getwebsiteDetails.companyEmail}</a></small>
                        </div>
                        <div className="top-link pe-2">
                            <a href="#" className="text-white"><small className="text-white mx-2">Privacy Policy</small>/</a>
                            <a href="#" className="text-white"><small className="text-white mx-2">Terms of Use</small>/</a>
                            <a href="#" className="text-white"><small className="text-white ms-2">Sales and Refunds</small></a>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <nav className="navbar navbar-light bg-white navbar-expand-xl">

                        <Link to='/' className="navbar-brand">
                            <img
                                src={`${process.env.REACT_APP_IMAGE_URL}${companyId}/${getlogoimage}`}
                                className="d-block"
                                alt='logo image'
                                style={{ objectFit: 'cover' }}
                                width="100"
                                height="70"
                                onError={Onerrorimg}
                                loading='lazy'
                            />
                            {/* <img src="/images/transparentlogo.png" className="d-block" style={{ objectFit: 'cover' }} width="100" height="70" alt="logo" /> */}
                        </Link>
                        <div className='d-block d-xl-none'>
                            <MenuIcons />
                        </div>
                        <button className="navbar-toggler py-2 px-md-3 px-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                            <span className="fa fa-bars c-secondarycolor"></span>
                        </button>
                        <div className="collapse navbar-collapse bg-white" id="navbarCollapse">
                            <div className="navbar-nav mx-auto">
                                <Link to='/' className={`nav-item nav-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
                                <Link to='/products' className={`nav-item nav-link ${location.pathname === '/products' ? 'active' : ''}`}>Products</Link>
                                <div className="nav-item dropdown">
                                    <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages</a>
                                    <div className="dropdown-menu m-0 bg-secondary rounded-0">
                                        <Link to='/cart' className="dropdown-item">Cart</Link>
                                        {/* <a href="chackout.html" className="dropdown-item">Checkout</a> */}
                                        {/* <a href="testimonial.html" className="dropdown-item">Testimonial</a> */}
                                        {/* <a href="404.html" className="dropdown-item">404 Page</a> */}
                                    </div>
                                </div>
                                <Link to='/contactus' className={`nav-item nav-link ${location.pathname === '/contactus' ? 'active' : ''}`}>Contact</Link>
                                {stateuser && <Link to='/myorders' className={`nav-item nav-link ${location.pathname === '/contactus' ? 'active' : ''}`}>My Orders</Link>}
                            </div>
                            <div className='menuicons'>
                                <MenuIcons />
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
            {/* Modal Search Start */}
            <div className="modal fade" id="searchModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-fullscreen">
                    <div className="modal-content rounded-0">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Search by keyword</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body d-flex align-items-center">
                            <div className="input-group w-75 mx-auto d-flex">
                                <input type="search" className="form-control p-3" placeholder="keywords" aria-describedby="search-icon-1" />
                                <span id="search-icon-1" className="input-group-text p-3"><i className="fa fa-search"></i></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal Search End */}
            <FavProductsOffCanvas handleDel={handleDel} favproduct={favproduct} />
            <button className={`sc-hjWSTT eNEEQn addproductclick shadow ${isBouncing ? 'animate-bounce' : ''}`} data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
                <span className="counter">{state.length} Items</span>
                <span className="sc-cbDFGl hZMWMe">{totalAmount} {currencySymbol}</span>
            </button>

            <CartProductsOffCanvas
                handleDelprod={handleDelprod}
                handleAdd={handleAdd}
                handleClose={handleClose}
                companyId={companyId}
                totalAmount={totalAmount}
                currencySymbol={currencySymbol}
                state={state}
            />
        </>
    )
}