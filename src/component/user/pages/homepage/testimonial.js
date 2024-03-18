import React, { useState, useEffect } from 'react';
import { useProductContext } from '../../../common/api/provider';
import { productServices } from '../../../../services/productServices';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import OwlCarousel from 'react-owl-carousel';


export const Testimonial = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const { apiCategory } = useProductContext();
    // getData from API
    useEffect(() => {
        const getproducts = async () => {
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
        getproducts();
    }, [apiCategory]);
    // getData from API
    // OwlCarousel settings
    const owlCarouselOptions = {
        autoplay: true,
        smartSpeed: 2000,
        center: false,
        dots: true,
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
                items: 1
            },
            576: {
                items: 1
            },
            768: {
                items: 1
            },
            992: {
                items: 2
            },
            1200: {
                items: 2
            }
        }
    };

    return (
        <>
            <div className="container-fluid testimonial" id='testimonial'>
                <div className="container pb-md-5 py-3 px-0 px-md-0">
                    <div className="testimonial-header text-center">
                        <h4 className="c-primarycolor">Our Testimonial</h4>
                        <h1 className="display-5 mb-5 c-secondarycolor">Our Client Saying!</h1>
                    </div>
                    {loading ?
                        <div className="row mt-5">
                            <div className="col-md-6">
                                <div className="skeleton-image"></div>
                            </div>
                            <div className="col-md-6">
                                <div className="skeleton-image"></div>
                            </div>
                        </div>
                        :
                        <OwlCarousel className="owl-carousel testimonial-carousel" {...owlCarouselOptions}>
                            {
                                categories.map((e) => {
                                    return (
                                        <div key={e.categoryId} className="testimonial-item img-border-radius bg-light rounded p-4">
                                            <div className="position-relative">
                                                <i className="fa fa-quote-right fa-2x c-primarycolor position-absolute"></i>
                                                <div className="mb-4 pb-4 border-bottom border-primarycolor">
                                                    <p className="mb-0 f13">Lorem Ipsum is simply dummy text of the printing Ipsum has been the industry's standard dummy text ever since the 1500s,
                                                    </p>
                                                </div>
                                                <div className="d-flex align-items-center flex-nowrap">
                                                    <div className="bg-secondary rounded">
                                                        <img src="/images/testimonial-1.jpg" className="img-fluid rounded" width={100} height={100} alt="" loading='lazy'/>
                                                    </div>
                                                    <div className="ms-4 d-block">
                                                        <h6 className="text-dark">ABC</h6>
                                                        <h5 className="m-0 pb-3">ABCD</h5>
                                                        <div className="d-flex pe-5">
                                                            <i className="fas fa-star text-gold"></i>
                                                            <i className="fas fa-star text-gold"></i>
                                                            <i className="fas fa-star text-gold"></i>
                                                            <i className="fas fa-star text-gold"></i>
                                                            <i className="fas fa-star"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </OwlCarousel>
                    }
                </div>
            </div>
        </>
    )
}