import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import swal from 'sweetalert';

export const MenuIcons = () => {
    const state = useSelector((state) => state.carthandler)
    const favproduct = useSelector((state) => state.favhandler)
    const stateuser = useSelector((state) => state.userinfihandler.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logOut = () => {
        swal({
            title: 'Are you sure?',
            text: 'You will be logged out!',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        })
            .then((willLogout) => {
                if (willLogout) {
                    dispatch({ type: 'LOGOUT' });
                    navigate('/login');
                    swal('Logged Out!', 'You have been logged out.', 'success');
                }
            });
    };
    return (
        <>
            <div className="d-flex m-md-3 me-0">
                <button className="btn-search btn border border-secondarycolor btn-md-square rounded-circle bg-white me-md-4 me-2" data-bs-toggle="modal" data-bs-target="#searchModal"><i className="fas fa-search c-secondarycolor"></i></button>
                <Link className='position-relative my-auto me-md-4 me-2 formobileheart'>
                    {favproduct.length != 0 ?
                        <i className='fa fa-heart fa-2x' data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample"></i>
                        :
                        <i className='fa-regular fa-heart fa-2x ' data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample"></i>
                    }
                    <span className={`${favproduct.length !== 0 ? 'shoppingbagstyle bg-primarycolor text-white' : 'shoppingbagstyle'}`}>
                        {favproduct.length !== 0 ? <span> {favproduct.length > 9 ? '9+' : favproduct.length}</span> : ''}
                    </span>
                </Link>
                <Link to='/cart' className="position-relative me-md-4 me-2 my-auto shoppingbaghidden">
                    <i className="fa fa-shopping-bag fa-2x"></i>
                    <span className={`${state.length !== 0 ? 'shoppingbagstyle bg-primarycolor text-white' : 'shoppingbagstyle'}`}>
                        {state.length !== 0 ? <span>{state.length > 9 ? '9+' : state.length}</span> : ''}
                    </span>
                </Link>
                {
                    stateuser ? (
                        <a href='#' className="my-auto user" onClick={logOut}>
                            <i className="fa fa-sign-out fa-2x"></i>
                        </a>
                    )
                        :
                        <Link to='/login' className="user my-auto">
                            <i className="fas fa-user fa-2x"></i>
                        </Link>
                }
            </div>
        </>
    )
}