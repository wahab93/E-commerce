// EmptyCartMessage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from '../../breadcrumb';

const EmptyCart = () => {
    return (
        <>
            <div className="container-fluid page-header py-4 bg-light">
                <div className='container'>
                    <h1 className="c-secondarycolor display-6">Cart</h1>
                    <Breadcrumb paths={['Home', 'Cart']} />
                </div>
            </div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className='col-md-6 text-center'>
                        <img src='/images/cart.png' alt='Empty Cart' className='' width={200} height={200} />
                        <h1 className="display-5 c-secondarycolor">Your Cart is Empty</h1>
                        <Link to="/products" className="btn border-secondarycolor rounded-pill px-4 py-3 c-secondarycolor text-uppercase" style={{ width: '200px' }}>
                            Return to Shop
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EmptyCart;