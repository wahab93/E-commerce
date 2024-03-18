import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addCart, delCart } from '../../../../redux/action';
import { useProductContext } from '../../../common/api/provider';
import { productServices } from '../../../../services/productServices';
import usePageTitle from '../../../common/usePageTitle';
import { Breadcrumb } from '../../breadcrumb';
import { Loadingskelton } from './loadingskelton';
import { Descriptionproducttabs } from './descriptionproducttabs';
import { Userreplyform } from './userreplyform';
import { Onerrorimg } from '../../../common/onerrorimg';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { toast } from 'react-toastify';
import { Relatedproductsslider } from './relatedproductsslider';

export const Product = () => {
    usePageTitle('Product Details');
    const cart = useSelector((state) => state.carthandler);
    const { apiProductById, apiCategory, companyId } = useProductContext();
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const dispatch = useDispatch();

    const addProduct = (product) => {
        dispatch(addCart(product));
        toast.success('Product added to cart!');
    };

    const existingProduct = cart.find((e) => e.productId == productId);

    useEffect(() => {
        const fetchProductById = async () => {
            try {
                const response = await productServices.getProductById(apiProductById, productId);
                if (response.isSuccess && response.data) {
                    setProduct(response.data);
                    setIsLoading(false);
                } else {
                    console.error('Error fetching product:', response.message);
                }
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        const getCategories = async () => {
            try {
                setIsLoading(true);
                const response = await productServices.getProductCategories(apiCategory);
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false); // Set loading to false when the operation completes (success or failure)
            }
        };

        getCategories();
        fetchProductById();
    }, [productId, apiCategory, apiProductById]);

    useEffect(() => {
        AOS.init({
            // Initialize AOS
            duration: 1000, // You can adjust the animation duration as per your requirement
            delay: 200, // Delay between each animation
        });
    }, []);

    const handleDel = (e) => {
        dispatch(delCart(e))
        toast.info('Product Delete to cart!');
    }

    const handleAdd = (e) => {
        dispatch(addCart(e));
        toast.success('One More Quantity added to cart!');
    };

    return (
        <>
            {/* Single Page Header start */}
            <div className="container-fluid page-header py-4 bg-light" data-aos="fade-up">
                <div className='container'>
                    <h1 className="c-secondarycolor display-6">Shoping Detail</h1>
                    <Breadcrumb paths={['Home', 'Shop Details']} />
                </div>
            </div>
            {/* Single Page Header End */}
            {isLoading ? (
                <Loadingskelton />
            ) : (
                <div className="container-fluid py-5 mt-5">
                    <div className="container pb-md-5 py-3 px-0 px-md-0">
                        <div className="row g-4 mb-5">
                            <div className="col-lg-12" data-aos="fade-right">
                                <div className="row g-4">
                                    {product &&
                                        <>
                                            <div className="col-lg-6 productDetail">
                                                {product.imageResponseDTOs.length > 0 ? (
                                                    <Carousel autoPlay={true} infiniteLoop={true} showArrows={true} showIndicators={false} showStatus={false}>
                                                        {product.imageResponseDTOs.map((image, index) => (
                                                            <img
                                                                key={index}
                                                                src={`${process.env.REACT_APP_IMAGE_URL}${companyId}/${image.imageName}`}
                                                                className="w-100 rounded"
                                                                alt={`${product.productName} - Image ${index + 1}`}
                                                                onError={Onerrorimg}
                                                                loading='lazy'
                                                            />
                                                        ))}
                                                    </Carousel>
                                                ) : (
                                                    <img
                                                        src="/path/to/error/image.jpg" // Replace with the path to your error image
                                                        className="img-fluid w-100 rounded"
                                                        alt="Error"
                                                        onError={Onerrorimg}
                                                        loading='lazy'
                                                    />
                                                )}
                                            </div>
                                            <div className="col-lg-6">
                                                <h4 className="fw-bold mb-3">{product.productName}</h4>
                                                <p className="mb-3">Category: {product.categoryName}</p>
                                                <h5 className="fw-bold mb-3">
                                                    {product.newPrice} {product.currency}
                                                </h5>
                                                <div className="d-flex mb-4">
                                                    <i className="fa fa-star text-gold"></i>
                                                    <i className="fa fa-star text-gold"></i>
                                                    <i className="fa fa-star text-gold"></i>
                                                    <i className="fa fa-star text-gold"></i>
                                                    <i className="fa fa-star"></i>
                                                </div>
                                                <p className="mb-4">{product.productDescription}</p>
                                                {cart.length > 0 &&
                                                    cart.map(cartItem => {
                                                        if (cartItem.productId === product.productId) {
                                                            return (
                                                                <div className="input-group quantity mb-5" style={{ width: '100px' }}>
                                                                    <div className="input-group-btn">
                                                                        <button className="btn btn-sm btn-minus rounded-circle bg-light border" onClick={() => handleDel(product)}>
                                                                            <i className="fa fa-minus"></i>
                                                                        </button>
                                                                    </div>
                                                                    <input type="text" className="form-control form-control-sm text-center border-0" value={cartItem.qty} readOnly />
                                                                    <div className="input-group-btn">
                                                                        <button className="btn btn-sm btn-plus rounded-circle bg-light border" onClick={() => handleAdd(product)}>
                                                                            <i className="fa fa-plus"></i>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            );
                                                        }
                                                        return null; // If the cart item doesn't match the current product, return null
                                                    })
                                                }
                                                {existingProduct ? (
                                                    <Link className="btn border border-primarycolor selectedproduct rounded-pill px-4 py-2 mb-4 c-primarycolor" to="/cart">
                                                        <i className="fa fa-eye me-2 c-primarycolor"></i> Go to cart
                                                    </Link>
                                                ) : (
                                                    <Link className="btn border border-secondarycolor rounded-pill px-4 py-2 mb-4 c-secondarycolor" onClick={() => addProduct(product)}>
                                                        <i className="fa fa-shopping-bag me-2 c-secondarycolor"></i> Add to cart
                                                    </Link>
                                                )}
                                            </div>
                                        </>
                                    }
                                    <Descriptionproducttabs />
                                    <Userreplyform />
                                </div>
                            </div>
                            <div className='col-md-12'>
                                <Relatedproductsslider product={product} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};