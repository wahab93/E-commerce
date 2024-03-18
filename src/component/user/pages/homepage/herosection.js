import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useProductContext } from '../../../common/api/provider';
import { productServices } from '../../../../services/productServices';
import { Onerrorimg } from '../../../common/onerrorimg';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { htmlToText } from 'html-to-text';


export const Herosection = ({ getBannerText }) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [bannerText, setBannerText] = useState('');
    const { apiCategory, companyId } = useProductContext();


    // Function to decode HTML entities and remove HTML tags
    const extractText = (html) => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || '';
    };

    // Decode HTML entities and remove HTML tags
    const textOnly = extractText(getBannerText.bannerText);

    const htmlContent = textOnly;

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


    const owlCarouselOptions = {
        autoplay: true,
        smartSpeed: 1500,
        center: false,
        dots: false,
        loop: true,
        margin: 25,
        nav: false,
        items: 1,
        navText: [
            '<i class="fa fa-arrow-left"></i>',
            '<i class="fa fa-arrow-right"></i>'
        ],
        responsiveClass: true,
    };


    return (
        <div className="container-fluid mb-5 hero-header">
            <div className="container py-md-5 py-2 px-0 px-md-0">
                <div className="row g-5 align-items-center">
                    <div className="col-md-12 col-lg-6">
                        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
                        {/* <h1 className="mb-5 display-4 c-secondarycolor"><span style={{ fontWeight: '600' }}>Organic</span> <span className='c-primarycolor'>Veggies & Fruits Foods</span> </h1> */}
                        <div className="position-relative mx-auto">
                            <input className="form-control border-2 border-secondarycolor w-75 py-md-3 py-2 px-4 rounded-pill" type="number" placeholder="Search" />
                            <button type="submit" className="btn btn-primary border-2 border-secondarycolor py-md-3 py-2 px-md-4 position-absolute rounded-pill text-white h-100" style={{ top: '0', right: '25%' }}>Submit Now</button>
                        </div>
                    </div>
                    <div className="col-md-12 col-lg-6">
                        {loading ?
                            <div className="row">
                                <div className="col-12">
                                    <div className="skeleton-image w-100" style={{ height: '400px' }}></div>
                                </div>
                            </div>
                            :
                            <OwlCarousel className="owl-theme" {...owlCarouselOptions}>
                                {
                                    categories.length > 0 ?
                                        categories.map((e) => {
                                            const imageUrl = e.imageResponseDTOs && e.imageResponseDTOs.length > 0 ? e.imageResponseDTOs[0].imageName : '';
                                            return (
                                                <Link key={e.categoryId} to={`/products?category=${encodeURIComponent(e.categoryName)}`}>
                                                    <div className="rounded position-relative">
                                                        <img
                                                            src={`${process.env.REACT_APP_IMAGE_URL}${companyId}/${imageUrl}`}
                                                            className="rounded"
                                                            alt={e.categoryName}
                                                            onError={Onerrorimg}
                                                            height={400}
                                                            style={{ objectFit: 'cover' }}
                                                            loading='lazy'
                                                        />
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
            </div>
        </div>
    )
}