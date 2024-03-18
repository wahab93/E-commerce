import React, { useState, useEffect } from 'react';
import OwlCarousel from 'react-owl-carousel'; // Import OwlCarousel library
import 'owl.carousel/dist/assets/owl.carousel.css'; // Import OwlCarousel CSS
import 'owl.carousel/dist/assets/owl.theme.default.css'; // Import OwlCarousel default theme CSS
import { useProductContext } from '../common/api/provider'; // Import useContext hook
import { productServices } from '../../services/productServices'; // Import product services

const responsiveOptions = { // Responsive options for the OwlCarousel
    0: {
        items: 1,
    },
    768: {
        items: 2,
    },
    1024: {
        items: 3,
    },
};

// ProductCategories component
export const ProductCategories = () => {
    const [categories, setCategories] = useState([]); // State to store categories
    const [loading, setLoading] = useState(false); // State to track loading status
    const { apiCategory } = useProductContext(); // Use the ProductContext to get the API category

    // Function to fetch categories from the API
    useEffect(() => {
        const getProducts = async () => {
            try {
                setLoading(true); // Set loading to true
                const response = await productServices.getProductCategories(apiCategory); // Get product categories from the API
                if (response) {
                    setCategories(response.data); // Set the fetched categories in state
                    setLoading(false); // Set loading to false after successful fetching
                } else {
                    console.error('API request failed:', response.data.message);
                    setLoading(true); // Set loading to true in case of API error
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(true); // Set loading to true in case of any error
            }
        };

        getProducts(); // Call the function to get product categories
    }, [apiCategory]); // Fetch categories when API category changes

    // Render the component
    return (
        <div className="container categoriesSkelton"> {/* Container to hold the categories section */}
            <h1>Our Categories</h1> {/* Section heading */}

            {/* Render loading skeleton or the OwlCarousel */}
            {loading ? ( // If loading is true, render loading skeleton
                <div className="row">
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
            ) : ( // If loading is false, render OwlCarousel with categories
                <OwlCarousel className='owl-theme' dots={false} autoplay={true} autoplayTimeout={3000} autoplayHoverPause={true} loop={true} margin={10} slideBy={1} items={2} responsive={responsiveOptions} >
                    {categories.length > 0 ? ( // If categories array has elements, map through and render each category as a carousel item
                        categories.map((e) => (
                            <div key={e.categoryId} className='categoryitems'>{e.categoryName}</div>
                        ))
                    ) : ( // If categories array is empty, render a "No data Found" message
                        <div className='caroselnotfound'>No data Found</div>
                    )}
                </OwlCarousel>
            )}
        </div>
    );
}