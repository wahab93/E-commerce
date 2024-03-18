import React, { useState, useEffect } from 'react'
import { useProductContext } from '../../../common/api/provider';
import { productServices } from '../../../../services/productServices';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import OwlCarousel from 'react-owl-carousel';
import { Onerrorimg } from '../../../common/onerrorimg';
import { Link } from 'react-router-dom';

export const Relatedproductsslider = ({ product }) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const { apiProducts, companyId } = useProductContext();
    // getData from API
    useEffect(() => {
        const getproducts = async () => {
            try {
                const response = await productServices.getProducts(apiProducts)
                if (response) {
                    setCategories(response.data);
                    setLoading(false)
                } else {
                    console.error('API request failed:', response.data.message);
                    setLoading(true)
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(true)
            }
        }
        getproducts();
    }, [apiProducts]);

    // Filter the data where categoryName is equal to product.categoryName
    const filteredCategories = categories.filter(category => category.categoryName === product.categoryName);

    // OwlCarousel settings
    const owlCarouselOptions = {
        autoplay: true,
        smartSpeed: 1500,
        center: false,
        dots: false,
        // loop: true,
        margin: 25,
        nav: true,
        navText: [
            '<i class="fa fa-arrow-right"></i>',
            '<i class="fa fa-arrow-left"></i>'
        ],
        responsiveClass: true,

        responsive: {
            0: {
                items: 1,
            },
            576: {
                items: 2,
            },
            768: {
                items: 3,
            },
            992: {
                items: 4,
            },
            1200: {
                items: 5,
            },
        },
    };


    return (
        <>
            <h1 className="display-5 mb-5 c-secondarycolor">Related Products</h1>
            {loading ?
                <div className="row mt-5">
                    <div className="col-md-4">
                        <div className="skeleton-image"></div>
                    </div>
                    <div className="col-md-4">
                        <div className="skeleton-image"></div>
                    </div>
                    <div className="col-md-4">
                        <div className="skeleton-image"></div>
                    </div>
                </div>
                :
                <OwlCarousel className="owl-theme vesitable" id='vesitable' {...owlCarouselOptions}>
                    {
                        filteredCategories.length > 0 ?
                            filteredCategories.map((e) => {
                                const imageUrl = e.imageResponseDTOs && e.imageResponseDTOs.length > 0 ? e.imageResponseDTOs[0].imageName : '';
                                return (
                                    <Link key={e.categoryId} to={`/products?category=${encodeURIComponent(e.categoryName)}`}>
                                        <div className="border border-primarycolor rounded position-relative vesitable-item">
                                            <div className="vesitable-img">
                                                <img
                                                    src={`${process.env.REACT_APP_IMAGE_URL}${companyId}/${imageUrl}`}
                                                    className="w-100 rounded-top"
                                                    alt={e.categoryName}
                                                    onError={Onerrorimg}
                                                    height={200}
                                                    style={{ objectFit: 'cover' }}
                                                    loading='lazy'
                                                />
                                            </div>
                                            <div className="text-white f13 text-capitalize px-3 py-1 rounded bg-primarycolor position-absolute">{e.categoryName}</div>
                                            <div className="py-4 px-2 rounded-bottom">
                                                <h4 className='text-center h6'>{e.productName}</h4>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })
                            :
                            <div className='caroselnotfound'>No data Found</div>
                    }
                </OwlCarousel>
            }
        </>
    )
}
