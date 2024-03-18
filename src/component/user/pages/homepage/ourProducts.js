import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { productServices } from '../../../../services/productServices';
import { useProductContext } from '../../../common/api/provider';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { Onerrorimg } from '../../../common/onerrorimg';
import { Link } from 'react-router-dom';
import Slider from "react-slick";



export const OurProducts = () => {
    const { apiProducts, companyId } = useProductContext();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await productServices.getProducts(apiProducts);
                const startIndex = Math.max(0, response.data.length - 6); // Ensure startIndex is non-negative
                const Records = response.data.slice(startIndex).reverse(); // Get the last four record
                setProducts(Records);
            } catch (error) {
                console.error("Error fetching products:", error);
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
    var settings = {
        slidesToShow: 2,
        vertical: true,
        speed: 5000,
        autoplay: true,
        autoplaySpeed: 0,
        centerMode: true,
        cssEase: 'linear',
        slidesToScroll: 1,
        variableWidth: true,
        infinite: true,
        initialSlide: 1,
        arrows: false,
        buttons: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                }
            }
        ]
    };


    return (
        <div className="container-fluid">
            <div className="container px-0 px-md-0">
                <div className="row g-4" style={{ overflow: 'hidden' }}>
                    <div className="col-lg-6 productslider" data-aos="fade-right">
                        <div className='d-flex justify-content-md-start justify-content-center shadowslider'>
                            <Slider className="vesitable" style={{ width: '150px' }} id='vesitable' {...settings}>
                                {products.length > 0 ?
                                    products.map((e) => {
                                        const imageUrl = e.imageResponseDTOs && e.imageResponseDTOs.length > 0 ? e.imageResponseDTOs[0].imageName : '';
                                        return (
                                            <div className="vesitable-item mb-4" key={e.productId}>
                                                <div className="vesitable-img">
                                                    <img
                                                        src={`${process.env.REACT_APP_IMAGE_URL}${companyId}/${imageUrl}`}
                                                        className="rounded"
                                                        width={150}
                                                        height={200}
                                                        style={{ objectFit: 'cover' }}
                                                        alt=""
                                                        onError={Onerrorimg}
                                                        loading='lazy'
                                                    />
                                                </div>
                                            </div>
                                        )
                                    })
                                    :
                                    <div className='caroselnotfound'>No data Found</div>
                                }
                            </Slider>
                            <Slider className="vesitable mx-3 d-sm-block d-none" style={{ width: '150px' }} id='vesitable' {...settings}>
                                {products.length > 0 ?
                                    products.map((e) => {
                                        const imageUrl = e.imageResponseDTOs && e.imageResponseDTOs.length > 0 ? e.imageResponseDTOs[0].imageName : '';
                                        return (
                                            <div className="vesitable-item mb-4" key={e.productId}>
                                                <div className="vesitable-img">
                                                    <img
                                                        src={`${process.env.REACT_APP_IMAGE_URL}${companyId}/${imageUrl}`}
                                                        className="rounded"
                                                        width={150}
                                                        height={200}
                                                        style={{ objectFit: 'cover' }}
                                                        alt=""
                                                        onError={Onerrorimg}
                                                        loading='lazy'
                                                    />
                                                </div>
                                            </div>
                                        )
                                    })
                                    :
                                    <div className='caroselnotfound'>No data Found</div>
                                }
                            </Slider>
                            <Slider className="vesitable d-md-block d-none" style={{ width: '150px' }} id='vesitable' {...settings}>
                                {products.length > 0 ?
                                    products.map((e) => {
                                        const imageUrl = e.imageResponseDTOs && e.imageResponseDTOs.length > 0 ? e.imageResponseDTOs[0].imageName : '';
                                        return (
                                            <div className="vesitable-item mb-4" key={e.productId}>
                                                <div className="vesitable-img">
                                                    <img
                                                        src={`${process.env.REACT_APP_IMAGE_URL}${companyId}/${imageUrl}`}
                                                        className="rounded"
                                                        width={150}
                                                        height={200}
                                                        style={{ objectFit: 'cover' }}
                                                        alt=""
                                                        onError={Onerrorimg}
                                                        loading='lazy'
                                                    />
                                                </div>
                                            </div>
                                        )
                                    })
                                    :
                                    <div className='caroselnotfound'>No data Found</div>
                                }
                            </Slider>
                        </div>
                    </div>
                    <div className="col-lg-6 d-flex flex-column justify-content-center py-md-5 py-2 my-md-5 mb-2" data-aos="fade-up">
                        <h1 className='display-5 c-secondarycolor'>Our Products</h1>
                        <p className='mt-3 mb-5'>
                        Welcome to our comprehensive selection of top-notch products that cater to diverse tastes and preferences. Whether you're seeking the latest tech gadgets, stylish apparel, functional home essentials, or unique gifts, we have you covered. Our curated collection reflects a blend of quality, innovation, and affordability, making it easier for you to find exactly what you need. Each product undergoes rigorous testing and scrutiny to ensure durability, performance, and user satisfaction. Browse through our range and discover exceptional products that add value to your life. With a focus on customer delight, we strive to provide a seamless shopping experience and unparalleled product excellence.
                        </p>
                        <Link to='/products' style={{ width: '150px' }} className="btn border border-secondarycolor rounded-pill px-3 c-secondarycolor"><i className="fa fa-arrow-right me-2 c-secondarycolor"></i> View More</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}