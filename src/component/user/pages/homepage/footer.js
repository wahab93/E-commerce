import React from 'react'
import { BacktoTop } from '../homepage/backtoTop'
import { Link } from 'react-router-dom'

export const Footer = ({ getwebsiteDetails }) => {
    return (
        <>
            <div className="container-fluid bg-secondarycolor text-white-50 footer pt-5 mt-5">
                <div className="container pb-md-5 py-3 px-0 px-md-0">
                    <div className="pb-4 mb-4">
                        <div className="row g-4">
                            <div className="col-lg-3">
                                <Link to="/">
                                    <h1 className="c-primarycolor mb-0">{getwebsiteDetails.webSiteName}</h1>
                                </Link>
                            </div>
                            <div className="col-lg-6">
                                <div className="position-relative mx-auto">
                                    <input className="form-control border-0 w-100 py-3 px-4 rounded-pill" type="number" placeholder="Your Email" />
                                    <button type="submit" className="btn btn-primary border-0 border-secondary py-3 px-4 position-absolute rounded-pill text-white top-0 end-0">Subscribe Now</button>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div className="d-flex justify-content-end pt-3">
                                    <a className="btn btn-outline-secondary me-2 btn-md-square rounded-circle" href=""><i className="fab fa-twitter"></i></a>
                                    <a className="btn btn-outline-secondary me-2 btn-md-square rounded-circle" href=""><i className="fab fa-facebook-f"></i></a>
                                    <a className="btn btn-outline-secondary me-2 btn-md-square rounded-circle" href=""><i className="fab fa-youtube"></i></a>
                                    <a className="btn btn-outline-secondary btn-md-square rounded-circle" href=""><i className="fab fa-linkedin-in"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row g-5">
                        <div className="col-lg-3 col-md-6">
                            <div className="footer-item">
                                <h4 className="text-light mb-3">Why People Like us!</h4>
                                <p className="mb-4">
                                    People love us for our commitment to quality, innovation, and exceptional customer service.
                                </p>
                                <Link to="/aboutus" className="btn border-primarycolor py-2 px-4 rounded-pill c-primarycolor">Read More</Link>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-6">
                            <div className="d-flex flex-column text-start footer-item">
                                <h4 className="text-light mb-3">Shop Info</h4>
                                <Link className="btn-link" to="/aboutus">About Us</Link>
                                <a className="btn-link" href="">Contact Us</a>
                                <a className="btn-link" href="">Privacy Policy</a>
                                <a className="btn-link" href="">Terms & Condition</a>
                                <a className="btn-link" href="">Return Policy</a>
                                <a className="btn-link" href="">FAQs & Help</a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-6">
                            <div className="d-flex flex-column text-start footer-item">
                                <h4 className="text-light mb-3">Account</h4>
                                <a className="btn-link" href="">My Account</a>
                                <a className="btn-link" href="">Shop details</a>
                                <a className="btn-link" href="">Shopping Cart</a>
                                <a className="btn-link" href="">Wishlist</a>
                                <a className="btn-link" href="">Order History</a>
                                <a className="btn-link" href="">International Orders</a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="footer-item">
                                <h4 className="text-light mb-3">Contact</h4>
                                <p>Address: {getwebsiteDetails.companyAddress}</p>
                                <p>Email: {getwebsiteDetails.companyEmail}</p>
                                <p>Phone: {getwebsiteDetails.companyPhone}</p>
                                <p>Payment Accepted</p>
                                <img src="/images/payment.png" className="img-fluid" alt="" loading='lazy' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <BacktoTop />
        </>
    )
}