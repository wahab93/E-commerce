import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';


export const FeaturedSection = () => {
    useEffect(() => {
        AOS.init({
            // Initialize AOS
            duration: 1000, // You can adjust the animation duration as per your requirement
            delay: 200, // Delay between each animation
        });
    }, []);
    return (
        <div className="container-fluid featurs">
            <div className="container py-md-4 py-3 px-0 px-md-0">
                <div className="row g-4">
                    <div className="col-md-6 col-lg-3" data-aos="fade-up">
                        <div className="featurs-item text-center rounded bg-light p-4">
                            <div className="mb-5 mx-auto">
                                <i className="fas fa-car-side fa-3x c-secondarycolor"></i>
                            </div>
                            <div className="featurs-content text-center">
                                <h5>Free Shipping</h5>
                                <p className="mb-0">Free on order over $300</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay="200">
                        <div className="featurs-item text-center rounded bg-light p-4">
                            <div className="mb-5 mx-auto">
                                <i className="fas fa-user-shield fa-3x c-secondarycolor"></i>
                            </div>
                            <div className="featurs-content text-center">
                                <h5>Security Payment</h5>
                                <p className="mb-0">100% security payment</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay="400">
                        <div className="featurs-item text-center rounded bg-light p-4">
                            <div className="mb-5 mx-auto">
                                <i className="fas fa-exchange-alt fa-3x c-secondarycolor"></i>
                            </div>
                            <div className="featurs-content text-center">
                                <h5>30 Day Return</h5>
                                <p className="mb-0">30 day money guarantee</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay="600">
                        <div className="featurs-item text-center rounded bg-light p-4">
                            <div className="mb-5 mx-auto">
                                <i className="fa fa-phone-alt fa-3x c-secondarycolor"></i>
                            </div>
                            <div className="featurs-content text-center">
                                <h5>24/7 Support</h5>
                                <p className="mb-0">Support every time fast</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}