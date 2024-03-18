import React from 'react';
import { Onerrorimg } from '../../../common/onerrorimg';

const CartSummary = ({ state, total, isLoading, companyId }) => {
    const flateRate = 0;
    const localPickup = 0;
    return (
        <>
            <h4 className="d-flex justify-content-between align-items-center mb-3">
                <b className='c-secondarycolor'>Your cart</b>
                <span className='bg-primarycolor' style={{ padding: '3px 12px', display: 'grid', placeItems: 'center', borderRadius: '8px' }}>{state.length}</span>
            </h4>
            <div className='row'>
                <div className='table-responsive'>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col" className='c-primarycolor'>Products</th>
                                <th scope="col" className='c-primarycolor'>Name</th>
                                <th scope="col" className='c-primarycolor'>Price</th>
                                <th scope="col" className='c-primarycolor'>Quantity</th>
                                <th scope="col" className='c-primarycolor'>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {state.map((e, i) => (
                                <tr key={i}>
                                    <th>
                                        {e.imageResponseDTOs && e.imageResponseDTOs.length > 0 ? (
                                            <img
                                                src={`${process.env.REACT_APP_IMAGE_URL}${companyId}/${e.imageResponseDTOs[0].imageName}`}
                                                className="img-fluid rounded-circle"
                                                style={{ width: '90px', height: '90px', objectFit: 'cover' }}
                                                alt=""
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
                                    </th>
                                    <td valign='middle'>{e.productName.substring(0, 12)}</td>
                                    <td valign='middle'>{e.newPrice}</td>
                                    <th valign='middle'>{e.qty}</th>
                                    <td valign='middle' align='right'>{e.newPrice * e.qty}</td>
                                </tr>
                            ))}
                            <tr>
                                <th scope="row">
                                </th>
                                <td className="py-3"></td>
                                <td className="py-3"></td>
                                <td className="py-3">
                                    <p className="mb-0 text-dark py-3">Total</p>
                                </td>
                                <td className="py-3">
                                    <div className="py-3">
                                        <p className="mb-0 text-dark text-end">{total}</p>
                                    </div>
                                </td>
                            </tr>
                            {/* <tr>
                                <th scope="row">
                                </th>
                                <td className="py-5">
                                    <p className="mb-0 text-dark py-4">Shipping</p>
                                </td>
                                <td colSpan="3" className="py-5">
                                    <div className="form-check text-start">
                                        <input type="checkbox" className="form-check-input bg-primarycolor border-0" id="Shipping-1" name="Shipping-1" value="Shipping" />
                                        <label className="form-check-label" htmlFor="Shipping-1">Free Shipping</label>
                                    </div>
                                    <div className="form-check text-start">
                                        <input type="checkbox" className="form-check-input bg-primarycolor border-0" id="Shipping-2" name="Shipping-1" value="Shipping" />
                                        <label className="form-check-label" htmlFor="Shipping-2">Flat rate: {flateRate}</label>
                                    </div>
                                    <div className="form-check text-start">
                                        <input type="checkbox" className="form-check-input bg-primarycolor border-0" id="Shipping-3" name="Shipping-1" value="Shipping" />
                                        <label className="form-check-label" htmlFor="Shipping-3">Local Pickup: {localPickup}</label>
                                    </div>
                                </td>
                            </tr> */}
                            {/* <tr>
                                <th scope="row">
                                </th>
                                <td className="py-5">
                                    <p className="mb-0 text-dark text-uppercase py-3">TOTAL</p>
                                </td>
                                <td className="py-5"></td>
                                <td className="py-5"></td>
                                <td className="py-5">
                                    <div className="py-3 border-bottom border-top">
                                        <p className="mb-0 text-dark">{total + flateRate + localPickup}</p>
                                    </div>
                                </td>
                            </tr> */}
                        </tbody>
                    </table>
                </div>
                {/* <div className="row g-4 text-center align-items-center justify-content-center border-bottom py-3">
                    <div className="col-12">
                        <div className="form-check text-start my-3">
                            <input type="checkbox" className="form-check-input bg-primarycolor border-0" id="Transfer-1" name="Transfer" value="Transfer" />
                            <label className="form-check-label" htmlFor="Transfer-1">Direct Bank Transfer</label>
                        </div>
                        <p className="text-start text-dark">Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.</p>
                    </div>
                </div> */}
                {/* <div className="row text-center align-items-center justify-content-center border-bottom py-3">
                    <div className="col-12">
                        <div className="form-check text-start my-3">
                            <input type="checkbox" className="form-check-input bg-primarycolor border-0" id="Payments-1" name="Payments" value="Payments" />
                            <label className="form-check-label" htmlFor="Payments-1">Check Payments</label>
                        </div>
                        <div className="form-check text-start my-3">
                            <input type="checkbox" className="form-check-input bg-primarycolor border-0" id="Delivery-1" name="Delivery" value="Delivery" />
                            <label className="form-check-label" htmlFor="Delivery-1">Cash On Delivery</label>
                        </div>
                    </div>
                </div> */}
                <div className="logintbn row g-4 text-center align-items-center justify-content-center pt-4">
                    <button type="submit" className={`btn border-secondarycolor py-3 px-4 text-uppercase w-100 c-secondarycolor ${isLoading ? 'loading' : ''}`} disabled={isLoading}>
                        {isLoading ? (
                            <div className="spinner-border c-primarycolor" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        ) : (
                            'Place Order'
                        )}
                    </button>
                </div>
            </div>
        </>
    );
};

export default CartSummary;