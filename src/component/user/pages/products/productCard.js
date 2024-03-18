import React from 'react';
import { Link } from 'react-router-dom';
import { Onerrorimg } from '../../../common/onerrorimg';
import { useProductContext } from '../../../common/api/provider';
import { useDispatch } from 'react-redux';
import { addCart, addFav, removeFav } from '../../../../redux/action';
import { toast } from 'react-toastify';

const ProductCard = ({ product, productIsInCart, favProductIsInCart, isWideColumn }) => {
    const { companyId } = useProductContext();
    const dispatch = useDispatch();
    const { productName, newPrice, productId, imageResponseDTOs, productTitle, currency, categoryName } = product;

    const imageUrl = imageResponseDTOs && imageResponseDTOs.length > 0 ? imageResponseDTOs[0].imageName : '';

    const addProductToCart = () => {
        dispatch(addCart(product));
        toast.success('Product added to cart!');
    };

    const addOrRemoveFavProduct = () => {
        if (favProductIsInCart) {
            dispatch(removeFav(product));
            toast.info('Product removed from favorites!');
        } else {
            dispatch(addFav(product));
            toast.success('Product added to favorites!');
        }
    };

    return (
        <div className={`col-xl-${isWideColumn ? '12' : '4'} col-12 fruite fruitecard`} id={productId}>
            <div className={`rounded position-relative fruite-item cursorPointer ${isWideColumn ? 'd-flex border border-primarycolor' : ''}`}>
                {favProductIsInCart ?
                    <i className='heart fa fa-heart fa-2x c-primarycolor' onClick={addOrRemoveFavProduct}></i> :
                    <i className='heart fa-regular fa-heart fa-2x c-primarycolor' onClick={addOrRemoveFavProduct}></i>
                }
                <Link to={`/products/${productId}`}>
                    <div className={`fruite-img ${isWideColumn ? '' : 'border border-primarycolor border-bottom-0'}`}>
                        <img
                            src={`${process.env.REACT_APP_IMAGE_URL}${companyId}/${imageUrl}`}
                            className={`${isWideColumn ? 'rounded-start' : 'rounded-top'}`}
                            alt={productTitle}
                            onError={Onerrorimg}
                            loading='lazy'
                            style={{ width: '100%', objectFit: 'cover', height: '250px', display: 'block' }}
                        />
                    </div>
                </Link>

                <div className="categoryName text-white px-3 py-1 rounded position-absolute bg-primarycolor" style={{ top: '10px', left: '10px' }}>{categoryName}</div>
                <div className={`p-md-4 p-2 border border-primarycolor ${isWideColumn ? 'border-start border-0' : ' border-top-0 rounded-bottom'}`}>
                    <h6 className='text-capitalize'>
                        {isWideColumn ? productName.substring(0, 19) : productName}
                    </h6>
                    <p className='my-1'>{categoryName}</p>
                    <div>
                        <p className="text-dark fw-bold">{currency} : {newPrice}</p>
                        {productIsInCart ?
                            <Link className="btn border border-secondarycolor rounded-pill px-md-3 px-2 c-secondarycolor selectedproduct" to='/cart'><i className='fa fa-eye me-2 c-primarycolor'></i>Go to cart</Link> :
                            <button className="btn border border-secondarycolor rounded-pill px-md-3 px-2 c-secondarycolor" onClick={addProductToCart}><i className="fa fa-shopping-bag me-2 c-secondarycolor"></i>Add to cart</button>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;