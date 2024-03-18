import React from 'react'
import { Link } from 'react-router-dom'
import { Onerrorimg } from '../common/onerrorimg'

export const CartProductsOffCanvas = ({ state, currencySymbol, totalAmount, companyId, handleClose, handleAdd, handleDelprod }) => {
    return (
        <div className="offcanvas offcanvas-end cartcanvas" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
            <div className="offcanvas-header border-bottom">
                <h5 id="offcanvasRightLabel">Shopping Cart</h5>
                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body d-flex flex-cloumn justify-content-center align-items-center">
                <div>
                    {state.length > 0 ?
                        state.map((e) => {
                            return (
                                <div className='d-flex justify-content-between align-items-center border-bottom py-2' key={e.productId}>
                                    <div>
                                        {e.imageResponseDTOs && e.imageResponseDTOs.length > 0 ? (
                                            <img
                                                src={`${process.env.REACT_APP_IMAGE_URL}${companyId}/${e.imageResponseDTOs[0].imageName}`}
                                                alt={e.productName}
                                                width={'100px'}
                                                height={'100px'}
                                                style={{ objectFit: 'contain' }}
                                                onError={Onerrorimg}
                                                loading='lazy'
                                            />
                                        ) : (
                                            <img
                                                src="/path/to/error/image.jpg" // Path to your error image
                                                alt="Error"
                                                width={'100px'}
                                                height={'100px'}
                                                style={{ objectFit: 'contain' }}
                                                onError={Onerrorimg}
                                                loading='lazy'
                                            />
                                        )}
                                    </div>
                                    <div className='cartproductdetails w-100 px-md-3 px-2'>
                                        <div className='d-flex justify-content-between'>
                                            <p className='m-0 fw-bold text-capitalize'>{e.productName}</p>
                                            <button className="btn border-0 p-1" onClick={() => handleClose(e)}>
                                                <i className='fa fa-trash-alt text-danger' style={{ fontSize: '20px' }}></i>
                                            </button>
                                        </div>
                                        <div className='d-flex'>
                                            <p className='m-0'>{e.qty}</p>
                                            <b className='mx-2'>X</b>
                                            <p className='m-0'>{e.newPrice}</p>
                                        </div>
                                        <div className="input-group quantity my-2" style={{ width: '100px' }}>
                                            <div className="input-group-btn">
                                                <button className="btn btn-sm btn-minus rounded-circle bg-light border" onClick={() => handleDelprod(e)}>
                                                    <i className="fa fa-minus"></i>
                                                </button>
                                            </div>
                                            <input type="text" className="form-control form-control-sm text-center border-0" value={e.qty} />
                                            <div className="input-group-btn">
                                                <button className="btn btn-sm btn-plus rounded-circle bg-light border" onClick={() => handleAdd(e)}>
                                                    <i className="fa fa-plus"></i>
                                                </button>
                                            </div>
                                        </div>
                                        <p className='m-0 text-end'>{e.qty * e.newPrice}</p>
                                    </div>
                                </div>
                            )
                        })
                        : (
                            <div className='text-center h-100'>
                                <img src='/images/cart.png' alt='Empty Cart' className='' width={200} height={200} />
                                <h5>Your cart is currently empty</h5>
                                <p>You may check out all the available products and buy some in the shop</p>
                            </div>
                        )
                    }
                </div>
            </div>
            <div className="offcanvas-footer">
                <Link to="/cart" className='text-start rounded'>
                    View Cart
                    <span className="sc-iIEXtl jZwiUS">{currencySymbol} {totalAmount}</span>
                </Link>
            </div>
        </div>
    )
}