import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useProductContext } from '../../../common/api/provider';
import { Link } from 'react-router-dom';
import { Onerrorimg } from '../../../common/onerrorimg';


export const ContentBanner = ({ getwebsiteDetails }) => {
    const { companyId } = useProductContext();
    // const getcontentbannerimage = getwebsiteDetails.imageResponseDTOs[1].imageName;
    const getcontentbannerimage = getwebsiteDetails.imageResponseDTOs?.[1]?.imageName;

    useEffect(() => {
        AOS.init({
            // Initialize AOS
            duration: 1000, // You can adjust the animation duration as per your requirement
            delay: 200, // Delay between each animation
        });
    }, []);
    return (
        <div className="container-fluid banner bg-primarycolor">
            <div className="container pt-md-5 pt-3 px-0 px-md-0">
                <div className="row g-4 align-items-center">
                    <div className="col-lg-6" data-aos="fade-right">
                        <div className="py-4">
                            <div dangerouslySetInnerHTML={{ __html: getwebsiteDetails.contentBannerText }} />
                            <Link to='/products' className="banner-btn bg-white btn border-2 border-white rounded-pill c-primarycolor py-2 px-4">Buy Now</Link>
                        </div>
                        {/* <h1 className="display-4 c-secondarycolor"><span className='text-white'>Fresh Exotic</span> Fruits & Vegetables</h1>
                            <p className="mb-4 text-dark">
                                The generated Lorem Ipsum is therefore always free from repetition injected humour, or non-characteristic words etc.
                                The generated Lorem Ipsum is therefore always free from repetition injected humour, or non-characteristic words etc.
                            </p> */}
                    </div>
                    <div className="col-lg-6" data-aos="fade-left">
                        <div className="position-relative">
                            <img
                                src={`${process.env.REACT_APP_IMAGE_URL}${companyId}/${getcontentbannerimage}`}
                                className="img-fluid w-100 rounded"
                                alt='content banner image'
                                onError={Onerrorimg}
                                loading='lazy'
                            />
                            {/* <img src="/images/baner-1.png" className="img-fluid w-100 rounded" alt="" /> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}