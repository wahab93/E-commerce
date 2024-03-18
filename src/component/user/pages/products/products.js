import React, { useState, useEffect, useRef } from 'react';
import { useProductContext } from '../../../common/api/provider';
import { useSelector } from 'react-redux';
import ProductCard from './productCard';
import { productServices } from '../../../../services/productServices';
import { useLocation, useNavigate } from 'react-router-dom';
import usePageTitle from '../../../common/usePageTitle';
import { Breadcrumb } from '../../breadcrumb';
import { Categoriesandproducts } from './categoriesandproducts';
import { ProductSkelton } from './productSkelton';
import AOS from 'aos';
import 'aos/dist/aos.css';

export const Products = () => {
    usePageTitle('Products');
    const { apiProducts, apiCategory } = useProductContext();
    const cart = useSelector((state) => state.carthandler);
    const favproduct = useSelector((state) => state.favhandler);
    const [loading, setLoading] = useState(true);
    const [isWideColumn, setIsWideColumn] = useState(false);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [priceRange, setPriceRange] = useState(0);
    const [displayCount, setDisplayCount] = useState(9);
    // const [manuallySelectedCategory, setManuallySelectedCategory] = useState('');
    const productContainerRef = useRef(null);


    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const getProducts = async () => {
            try {
                setLoading(true)
                const response = await productServices.getProductCategories(apiCategory)
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        }
        getProducts();
    }, [apiCategory]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await productServices.getProducts(apiProducts);
                setProducts(response.data.reverse());
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [apiProducts]);

    useEffect(() => {
        const movedcategoryName = new URLSearchParams(location.search).get('category');
        if (movedcategoryName !== selectedCategory) {
            setSelectedCategory(movedcategoryName || '');
            // setManuallySelectedCategory(movedcategoryName || '');
        }
    }, [location.search, selectedCategory]);

    const isProductInCart = (productId) => cart.some((e) => e.productId === productId);
    const isFavProductInCart = (productId) => favproduct.some((e) => e.productId === productId);

    const filterProducts = () => {
        const filtered = products.filter((product) => {
            const matchesSearchQuery = product.productName.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === "" || product.categoryName === selectedCategory;
            const matchesPriceRange = priceRange === 0 ? product.newPrice > 0 : product.newPrice <= priceRange;
            return matchesSearchQuery && matchesCategory && matchesPriceRange;
        });
        return filtered;
    };

    const displayedProducts = filterProducts();

    const handleCategoryChange = (e) => {
        const selectedValue = e.target.value;
        setSelectedCategory(selectedValue);
        // setManuallySelectedCategory(selectedValue);
        navigate(`?category=${selectedValue}`);
    };

    const handlePriceRangeChange = (e) => setPriceRange(Number(e.target.value));

    useEffect(() => {
        AOS.init({
            duration: 1000,
            delay: 200,
        });
    }, []);

    const handleLoadMoreClick = () => {
        setDisplayCount(displayCount + 9);
    };
    const handleParallelClick = () => {
        setIsWideColumn(false); // Set column to col-12
    };

    const handleVerticalClick = () => {
        setIsWideColumn(true); // Set column to col-4
    };

    return (
        <>
            <div className="container-fluid page-header py-4 bg-light" data-aos="fade-up">
                <div className='container'>
                    <h1 className="c-secondarycolor display-6">Products</h1>
                    <Breadcrumb paths={['Home', 'Products']} />
                </div>
            </div>
            <div className="container-fluid fruite py-md-5 py-3">
                <div className="container py-3 px-0">
                    <h1 className="mb-4 display-6 c-secondarycolor">Fresh fruits shop</h1>
                    <div className="row g-4">
                        <div className="col-lg-12">
                            <div className="row g-4" data-aos="fade-up">
                                <div className="col-xl-3" data-aos="fade-right">
                                    <div className="input-group w-100 mx-auto d-flex">
                                        <input type="search" className="form-control p-md-3 p-2" placeholder="Search Product" aria-describedby="search-icon-1" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                                    </div>
                                </div>
                                <div className="col-12 col-md-5 d-md-block sortbtns">
                                    view by :
                                    <button className={`btn border mx-2 ${isWideColumn ? '' : 'bg-primarycolor text-white border-primarycolor '}`} onClick={handleParallelClick}>|||</button>
                                    <button className={`btn border ${isWideColumn ? 'bg-primarycolor text-white border-primarycolor ' : ''}`} style={{ rotate: '90deg' }} onClick={handleVerticalClick}>|||</button>
                                </div>
                                <div className="col-xl-4" data-aos="fade-left">
                                    <div className="bg-light ps-3 py-md-3 py-2 rounded d-flex justify-content-between mb-4">
                                        <label htmlFor="fruits">Default Sorting:</label>
                                        <select className="cursorPointer border-0 form-select-sm bg-light me-3" value={selectedCategory} onChange={handleCategoryChange} style={{ outline: 'none' }}>
                                            <option value="">All</option>
                                            {categories.map((category) => (
                                                <option key={category.categoryId} value={category.categoryName}>{category.categoryName}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="row g-4">
                                <div className="col-lg-3 d-md-block d-none">
                                    <div className="row g-4">
                                        <div className="col-lg-12" data-aos="fade-right">
                                            <Categoriesandproducts categories={categories} />
                                        </div>
                                        <div className="col-lg-12" data-aos="fade-right">
                                            <div className="mb-3">
                                                <h4 className="mb-2 c-secondarycolor">Price</h4>
                                                <input type="range" className="form-range w-100" id="rangeInput" name="rangeInput" min="0" max="500" value={priceRange} onInput={handlePriceRangeChange} />
                                                <output id="amount" name="amount" min-value="0" max-value="500" htmlFor="rangeInput">{priceRange}</output>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-9" data-aos="fade-down">
                                    <div className="row g-4 justify-content-center" ref={productContainerRef}>
                                        {loading ? <ProductSkelton count={9} /> :
                                            displayedProducts.length > 0 ?
                                                displayedProducts.slice(0, displayCount).map((product, index) => (
                                                    <ProductCard
                                                        key={product.productId}
                                                        product={product}
                                                        isWideColumn={isWideColumn}
                                                        productIsInCart={isProductInCart(product.productId)}
                                                        favProductIsInCart={isFavProductInCart(product.productId)}
                                                    />
                                                )) :
                                                <h1 className='text-center'>No data found</h1>
                                        }
                                        {displayedProducts.length > displayCount && (
                                            <button className='btn border border-secondarycolor rounded-pill px-md-3 px-2 c-secondarycolor' onClick={handleLoadMoreClick} style={{ width: '150px' }}>More Products</button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};