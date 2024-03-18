import React from 'react';
import { useDispatch } from 'react-redux';
import { delCart, addCart, delProductCart } from '../../../../redux/action/index';
import { Link } from 'react-router-dom';
import { Breadcrumb } from '../../breadcrumb';
import { Onerrorimg } from '../../../common/onerrorimg';
import { useProductContext } from '../../../common/api/provider';
import { toast } from 'react-toastify';

const CartItem = ({ data }) => {
    const { companyId } = useProductContext();
    const dispatch = useDispatch();

    const handleClose = (e) => {
        dispatch(delProductCart(e));
        toast.info('Product removed from cart.');
    };

    const handleAdd = (e) => {
        dispatch(addCart(e));
        toast.success('One quantity of product in cart!');
    };
    const handleDel = (e) => {
        dispatch(delCart(e));
        toast.info('Product quantity one removed from cart!');
    };

    // Calculate total amount using only newPrice
    const totalAmount = data.reduce((total, product) => {
        const price = product.newPrice || 0; // Use newPrice, default to 0 if not available
        const quantity = product.qty || 0;

        return total + price * quantity;
    }, 0);
    const shippingCharges = 0;

    return (
        <>
            <div className="container-fluid page-header py-4 bg-light">
                <div className='container'>
                    <h1 className="c-secondarycolor display-6">Cart</h1>
                    <Breadcrumb paths={['Home', 'Cart']} />
                </div>
            </div>
            <div className="container-fluid py-md-5 py-3">
                <div className="container pb-md-5 py-3 px-0 px-md-0">
                    <div className='row'>
                        <div className='col-12'>
                            <h1 className='display-6 c-secondarycolor'>Cart Details</h1>
                        </div>
                    </div>
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col" className='c-primarycolor'>Products</th>
                                    <th scope="col" className='c-primarycolor'>Name</th>
                                    <th scope="col" className='c-primarycolor'>Price</th>
                                    <th scope="col" className='c-primarycolor'>Quantity</th>
                                    <th scope="col" className='c-primarycolor'>Total</th>
                                    <th scope="col" className='c-primarycolor'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map((e) => {
                                        return (
                                            <tr>
                                                <th scope="row" style={{ height: '100px' }}>
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

                                                </th>
                                                <td><p className="mb-0 mt-4">{e.productName}</p></td>
                                                <td><p className="mb-0 mt-4">{e.newPrice}</p></td>
                                                <td>
                                                    <div className="input-group quantity mt-4" style={{ width: '100px' }}>
                                                        <div className="input-group-btn">
                                                            <button className="btn btn-sm btn-minus rounded-circle bg-light border" onClick={() => handleDel(e)}>
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
                                                </td>
                                                <td><p className="mb-0 mt-4">{e.qty * e.newPrice}</p></td>
                                                <td valign='middle'>
                                                    <button className="btn border-0" onClick={() => handleClose(e)}>
                                                        <i className='fa fa-trash-alt text-danger' style={{ fontSize: '20px' }}></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className='row justify-content-center'>
                        <div className='col-12 col-md-12 my-md-0 my-2 text-center'>
                            <Link to='/products' className="btn border-secondarycolor rounded-pill px-4 py-3 c-secondarycolor text-uppercase">Add More Products</Link>
                        </div>
                    </div>
                    <div className="mt-md-5 my-2 d-flex justify-content-md-end justify-content-between">
                        <input type="text" className="border-0 border-bottom rounded me-md-5 py-md-3 py-2" placeholder="Coupon Code" />
                        <button className="btn border-secondarycolor rounded-pill px-md-4 px-2 py-md-3 py-2 c-secondarycolor" type="button">Apply Coupon</button>
                    </div>
                    <div className="row g-4 justify-content-end">
                        <div className="col-8"></div>
                        <div className="col-sm-8 col-md-7 col-lg-6 col-xl-4">
                            <div className="bg-light rounded">
                                <div className="p-4">
                                    <h1 className="display-6 mb-4 c-secondarycolor">Cart <span className="fw-normal">Total</span></h1>
                                    <div className="d-flex justify-content-between mb-4">
                                        <h5 className="mb-0 me-4">Subtotal:</h5>
                                        <p className="mb-0">{totalAmount}</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <h5 className="mb-0 me-4">Shipping</h5>
                                        <div className="">
                                            <p className="mb-0">Flat rate: {shippingCharges}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="py-4 mb-4 border-top border-bottom d-flex justify-content-between">
                                    <h5 className="mb-0 ps-4 me-4">Total</h5>
                                    <p className="mb-0 pe-4">{totalAmount + shippingCharges}</p>
                                </div>
                                <Link to='/checkout' className="btn border-secondarycolor rounded-pill px-4 py-3 c-secondarycolor text-uppercase mb-4 ms-4">Proceed Checkout</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CartItem;