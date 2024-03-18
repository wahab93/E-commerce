import React, { useState, useEffect } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { useProductContext } from '../../../common/api/provider';
import { productServices } from '../../../../services/productServices';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Onerrorimg } from '../../../common/onerrorimg';

export const CategorySilder = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const { apiCategory, companyId } = useProductContext();
    // getData from API
    useEffect(() => {
        const getCategories = async () => {
            try {
                const response = await productServices.getProductCategories(apiCategory)
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
        getCategories();
    }, [apiCategory]);
    // getData from API
    // OwlCarousel settings
    const owlCarouselOptions = {
        autoplay: true,
        smartSpeed: 1500,
        center: false,
        dots: false,
        loop: true,
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
    useEffect(() => {
        AOS.init({
            // Initialize AOS
            duration: 1000, // You can adjust the animation duration as per your requirement
            delay: 200, // Delay between each animation
        });
    }, []);


    return (
        <div className="container-fluid vesitable" data-aos="fade-up">
            <div className="container pb-md-5 py-3 px-0 px-md-0">
                <h1 className="mb-0 display-5 c-secondarycolor">Fresh Organic Vegetables</h1>
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
                            categories.length > 0 ?
                                categories.map((e) => {
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
                                                        loading='lazy'
                                                        style={{objectFit:'cover'}}
                                                    />
                                                </div>
                                                <div className="text-white f13 text-capitalize px-3 py-1 rounded bg-primarycolor position-absolute">{e.categoryName}</div>
                                                <div className="py-4 px-2 rounded-bottom">
                                                    <h4 className='text-center h6'>{e.categoryName}</h4>
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
            </div>
        </div>
    )
}