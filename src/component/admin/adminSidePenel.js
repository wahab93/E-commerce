import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Onerrorimg } from '../common/onerrorimg';

export const AdminSidePenel = ({ windowWidth, getlogoimage, companyId }) => {
    const [showSidebar, setShowSidebar] = useState(true);
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const location = useLocation()

    const logOut = (() => {
        dispatch({
            type: 'LOGOUT'
        })
        navigate('/login')
    })

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar); // Toggle the state when the button is clicked
    };

    const closeSidebar = () => {
        if (windowWidth <= 992) {
            const btnClose = document.querySelector('.btn-close'); // Select the close button
            btnClose.click(); // Trigger the click event on the close butto
        }
    };


    return (
        <>
            <div className='penelHeader mb-5'>
                <div className={showSidebar ? 'd-flex justify-content-between align-items-center' : 'd-flex flex-column align-items-center'} >
                    <Link to='/dashboard' className='d-block'>
                        <img
                            src={`${process.env.REACT_APP_IMAGE_URL}${companyId}/${getlogoimage}`}
                            width={showSidebar ? 100 : 50}
                            className={showSidebar ? '' : 'mb-3'}
                            height={showSidebar ? 70 : 50}
                            style={{ objectFit: 'cover' }}
                            onError={Onerrorimg}
                            loading='lazy'
                            alt="logo image"
                        />
                    </Link>
                    <a href='#' id='hideShow' onClick={toggleSidebar} className={`bg-secondarycolor p-2 text-white ${showSidebar ? 'fa fa-angle-left' : 'fa fa-angle-right'}`} style={{ borderRadius: '4px' }}></a>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
            </div>
            <div className={`penelBody flex-grow-1 ${showSidebar ? '' : 'text-center'}`}>
                <ul className="navbar-nav">
                    <li className={`nav-item ${location.pathname === '/dashboard' ? 'active' : ''}`} onClick={closeSidebar}>
                        <Link className='nav-link py-0' to='/dashboard'>
                            <i className={`fa fa-home ${showSidebar ? '' : 'fs-4'} me-2`}></i>
                            <span className={showSidebar ? 'd-inline-block' : 'd-none'}>Home</span>
                        </Link>
                    </li>
                    <li className={`nav-item dropend ${showSidebar ? "pe-5" : ''} ${location.pathname === '/productlist' || location.pathname === '/categorylisting' || location.pathname === '/productBrandlisting' || location.pathname === '/productTypelisting' ? 'active' : ''}`}>
                        <a href='#' className="dropdown-toggle text-decoration-none" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className={`fa fa-list ${showSidebar ? '' : 'fs-4'} me-2`}></i>
                            <span className={showSidebar ? 'd-inline-block' : 'd-none'}>Defination</span>
                        </a>
                        <ul className="dropdown-menu p-0">
                            <Link className={`dropdown-item ${location.pathname === '/productlist' ? 'active text-white rounded-top' : ''}`} to='/productlist' onClick={closeSidebar}>Products List</Link>
                            <Link className={`dropdown-item ${location.pathname === '/categorylisting' ? 'active text-white' : ''}`} to='/categorylisting' onClick={closeSidebar}>Category Listing</Link>
                            <Link className={`dropdown-item ${location.pathname === '/productBrandlisting' ? 'active text-white' : ''}`} to='/productBrandlisting' onClick={closeSidebar}>Product Brand Listing</Link>
                            <Link className={`dropdown-item ${location.pathname === '/productTypelisting' ? 'active text-white rounded-bottom' : ''}`} to='/productTypelisting' onClick={closeSidebar}>Product Type Listing</Link>
                        </ul>
                    </li>
                    <li className={`nav-item dropend ${showSidebar ? "pe-5" : ''} ${location.pathname === '/orders' ? 'active' : ''}`}>
                        <a href='#' className="dropdown-toggle text-decoration-none" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className={`fa fa-shopping-cart ${showSidebar ? '' : 'fs-4'} me-2`}></i>
                            <span className={showSidebar ? 'd-inline-block' : 'd-none'}>Transections</span>
                        </a>
                        <ul className="dropdown-menu p-0">
                            <Link className={`dropdown-item ${location.pathname === '/orders' ? 'active text-white rounded' : ''}`} to='/orders' onClick={closeSidebar}>Orders</Link>
                        </ul>
                    </li>
                    <li className={`nav-item ${location.pathname === '/websettings' ? 'active' : ''}`} onClick={closeSidebar}>
                        <Link className='nav-link py-0' to='/websettings'>
                            <i className={`fa fa-cog ${showSidebar ? '' : 'fs-4'} me-2`}></i>
                            <span className={showSidebar ? 'd-inline-block' : 'd-none'}>Web Settings</span>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className='penelFooter'>
                <a href='#' className="text-decoration-none" onClick={logOut}>
                    <button className={`btn border border-secondarycolor rounded-pill ${showSidebar ? 'px-3' : ''} c-secondarycolor`}>
                        <i className="fa fa-sign-out me-2"></i>
                        <span className={showSidebar ? 'd-inline-block' : 'd-none'}>Logout</span>
                    </button>
                </a>
            </div>
        </>
    )
}