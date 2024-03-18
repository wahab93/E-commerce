import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

export const Adminsearch = () => {
    const stateuser = useSelector((state) => state.userinfihandler.user); //check the admin in redux state
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // for admin logout
    const logOut = (() => {
        dispatch({
            type: 'LOGOUT'
        })
        navigate('/login');
    })
    return (
        <div className="row searchFilter p-3 mb-2 align-items-center">
            <div className="col-lg-12 col-xl-10 ps-0 mb-lg-0 mb-3 position-relative">
                <i className='fa fa-search searchicon c-primarycolor'></i>
                <input type="text" className="form-control ps-4" placeholder="What Are You Looking For" />
            </div>
            <div className="col-lg-6 col-xl-2 col-md-6 p-0 mx-md-auto">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="notificationdrop">
                        <div className="dropdown">
                            <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton1"
                                data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="fa fa-bell c-primarycolor fs-3"></i>
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li><a className="dropdown-item border-bottom" href="#">Notice No. 01</a>
                                </li>
                                <li><a className="dropdown-item border-bottom" href="#">Notice No. 02</a>
                                </li>
                                <li><a className="dropdown-item" href="#">Notice No. 03</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="loggeduser">
                        <div className="dropdown">
                            <span className='text-capitalize fw-bold'>
                                {stateuser.userName}
                            </span>
                            <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton1"
                                data-bs-toggle="dropdown" aria-expanded="false">
                                {/* <span style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid grey', background: 'lightgrey', display:'inline-block'}}></span> */}
                                <img src="/images/admin.png" className='border-primarycolor' style={{ width: '40px', height:'40px', border:'2px solid', borderRadius:'50%', padding:'2px' }} alt="admin icon" loading='lazy' />
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li><a className="dropdown-item border-bottom" href="#">My Account</a></li>
                                <li><a className="dropdown-item border-bottom" href="#">Change Password</a></li>
                                <li><a className="dropdown-item" href="#" onClick={logOut}>Logout</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}