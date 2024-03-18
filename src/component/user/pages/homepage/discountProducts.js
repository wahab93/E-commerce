import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export const DiscountProducts = () => {
    useEffect(() => {
        AOS.init({
            // Initialize AOS
            duration: 1000, // You can adjust the animation duration as per your requirement
            delay: 200, // Delay between each animation
        });
    }, []);
    return (
        <div className="container-fluid service">
            <div className="container pb-md-5 py-3 px-0 px-md-0">
                <div className="row g-4 justify-content-center">
                    <div className="col-md-6 col-lg-4" data-aos="fade-right">
                        <a href="#">
                            <div className="service-item bg-primarycolor rounded border border-primarycolor">
                                <img src="/images/featur-1.jpg" className="img-fluid rounded-top w-100" alt="" loading='lazy'/>
                                <div className="px-4 rounded-bottom">
                                    <div className="service-content bg-secondarycolor text-center p-4 rounded">
                                        <h6 className="text-white">Fresh Apples</h6>
                                        <h4 className="text-white mb-0">20% OFF</h4>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div className="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="200">
                        <a href="#">
                            <div className="service-item bg-secondarycolor rounded border border-secondarycolor">
                                <img src="/images/featur-2.jpg" className="img-fluid rounded-top w-100" alt="" loading='lazy'/>
                                <div className="px-4 rounded-bottom">
                                    <div className="service-content bg-light text-center p-4 rounded">
                                        <h6 className="c-primarycolor">Tasty Fruits</h6>
                                        <h4 className="mb-0 c-primarycolor">Free delivery</h4>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div className="col-md-6 col-lg-4" data-aos="fade-left" data-aos-delay="400">
                        <a href="#">
                            <div className="service-item bg-primarycolor rounded border border-primarycolor">
                                <img src="/images/featur-3.jpg" className="img-fluid rounded-top w-100" alt="" loading='lazy'/>
                                <div className="px-4 rounded-bottom">
                                    <div className="service-content bg-secondarycolor text-center p-4 rounded">
                                        <h6 className="text-white">Exotic Vegitable</h6>
                                        <h4 className="text-white mb-0">Discount 30$</h4>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}