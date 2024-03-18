import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { addCart, addFav, removeFav } from '../../../../redux/action';
import { useProductContext } from '../../../common/api/provider';
import { productServices } from '../../../../services/productServices';
import { ProductSkelton } from '../products/productSkelton';
import { Onerrorimg } from '../../../common/onerrorimg';


export const BestSeller = () => {
    const { apiProducts, companyId } = useProductContext();
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);

    const cart = useSelector((state) => state.carthandler);
    const favproduct = useSelector((state) => state.favhandler);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await productServices.getProducts(apiProducts);
                const startIndex = Math.max(0, response.data.length - 6); // Ensure startIndex is non-negative
                const Records = response.data.slice(startIndex).reverse(); // Get the last four record
                setProducts(Records);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [apiProducts]);
    useEffect(() => {
        AOS.init({
            // Initialize AOS
            duration: 1000, // You can adjust the animation duration as per your requirement
            delay: 200, // Delay between each animation
        });
    }, []);


    const addProduct = (product) => dispatch(addCart(product));
    const isProductInCart = (productId) => cart.some((e) => e.productId === productId);
    return (
        <div className="container-fluid pt-5 bestseller">
            <div className="container pb-md-5 py-3 px-0 px-md-0">
                <div className="text-center mx-auto mb-5" style={{ maxWidth: '700px' }}>
                    <h1 className="display-5 mb-5 c-secondarycolor">Bestseller Products</h1>
                    <p>Find out which products are dominating the market and are consistently topping sales charts, guaranteeing quality and satisfaction.</p>
                </div>
                <div className="row g-4">
                    {loading ?
                        <ProductSkelton count={3} />
                        : (
                            <>
                                {products.length > 0 ? (
                                    products.map((product) => {
                                        const { productId } = product;
                                        const productIsInCart = isProductInCart(productId);
                                        const imageUrl = product.imageResponseDTOs && product.imageResponseDTOs.length > 0 ? product.imageResponseDTOs[0].imageName : '';
                                        return (
                                            <div className="col-lg-6 col-xl-4" data-aos="fade-top" id={productId} key={productId}>
                                                <div className="p-md-4 p-2 rounded shadow-sm">
                                                    <div className='row align-items-center'>
                                                        <div className="col-6">
                                                            <img
                                                                src={`${process.env.REACT_APP_IMAGE_URL}${companyId}/${imageUrl}`}
                                                                className="img-fluid rounded-circle w-100"
                                                                alt={product.productTitle}
                                                                loading='lazy'
                                                                onError={Onerrorimg}
                                                            />
                                                        </div>
                                                        <div className="col-6">
                                                            <a href="#" className="h6">{product.productName.substring(0, 13)}</a>
                                                            <div className="d-flex my-3">
                                                                <i className="fas fa-star text-gold"></i>
                                                                <i className="fas fa-star text-gold"></i>
                                                                <i className="fas fa-star text-gold"></i>
                                                                <i className="fas fa-star text-gold"></i>
                                                                <i className="fas fa-star"></i>
                                                            </div>
                                                            <h6 className="mb-3">{product.currency} : {product.newPrice}</h6>
                                                            {productIsInCart ?
                                                                <Link className="btn border border-secondarycolor rounded-pill px-md-3 px-2 c-secondarycolor selectedproduct" to='/cart'><i className='fa fa-eye me-2 c-primarycolor'></i>Go to cart</Link> :
                                                                <Link className="btn border border-secondarycolor rounded-pill px-md-3 px-2 c-secondarycolor" onClick={() => addProduct(product)}><i className="fa fa-shopping-bag me-2 c-secondarycolor"></i>Add to cart</Link>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <h1 className='text-center'>No data found</h1>
                                )}
                            </>
                        )}
                </div>
                <div className='text-end mt-md-5 mt-3'>
                    <Link to='/products' className='btn border border-secondarycolor rounded-pill px-md-3 px-2 c-secondarycolor'>View All Products</Link>
                </div>
            </div>
        </div>
    )
}