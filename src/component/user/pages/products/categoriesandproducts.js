import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { productServices } from '../../../../services/productServices';
import { useProductContext } from '../../../common/api/provider';

export const Categoriesandproducts = ({ categories = { categories } }) => {
    const { apiProducts } = useProductContext();
    const [products, setProducts] = useState([])
    const location = useLocation();
    // getData product from API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await productServices.getProducts(apiProducts);
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, [apiProducts]);
    // getData product from API
    const categoryCount = {};

    // Iterate through the products array and count the products for each category
    products.forEach((product) => {
        const categoryName = product.categoryName;

        // If the category is not in the categoryCount object, initialize it with count 1
        if (!categoryCount[categoryName]) {
            categoryCount[categoryName] = 1;
        } else {
            // If the category is already in the count object, increment the count
            categoryCount[categoryName]++;
        }
    });
    
    return (
        <div className="col-lg-12">
            <div className="mb-4 pe-2 customScroll" style={{ maxHeight: '400px', overflowY: 'scroll' }}>
                <h4 className='c-secondarycolor'>Categories</h4>
                <ul className="list-unstyled fruite-categorie">
                    {
                        categories.map((e,i) => {
                            return (
                                <li key={i}>
                                    {categoryCount[e.categoryName] > 0 && (
                                        <div className="d-flex justify-content-between fruite-name">
                                            <Link
                                                to={`/products?category=${encodeURIComponent(e.categoryName)}`}
                                                className={e.categoryName === new URLSearchParams(location.search).get('category') ? 'active' : ''}
                                            >
                                                <i className="fas fa-angle-right me-2"></i>{e.categoryName}
                                            </Link>
                                            <span className='f13'>({categoryCount[e.categoryName]})</span>
                                        </div>
                                    )}
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}