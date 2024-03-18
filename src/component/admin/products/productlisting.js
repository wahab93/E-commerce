import React, { useState, useEffect } from 'react';
import { ViewproductModal } from '../viewproductmodal';
import { Delproductmodal } from '.././commoncomponent/delproductmodal';
import { useProductContext } from '../../common/api/provider';
import { Productmodal } from './productModal';
import { productServices } from '../../../services/productServices';
import usePageTitle from '../../common/usePageTitle';
import LoadingSpinner from '../../common/loadingSpinner';
import { DataTable } from '../commoncomponent/dataTable';
import { Onerrorimg } from '../../common/onerrorimg';

const ProductListing = () => {
    usePageTitle('Product Listing'); // page Title
    const { apiProducts, companyId, addEditProduct } = useProductContext(); // data receive from useContext
    const [products, setProducts] = useState([]); // set all products forom API
    const [loading, setLoading] = useState(true);
    const [filterdata, setFilterdata] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('add');
    const [selectedProduct, setSelectedProduct] = useState(null); // selected product when in edit
    const [search, setSearch] = useState('');

    // getData from API
    useEffect(() => {
        const getproducts = async () => {
            try {
                const response = await productServices.getProducts(apiProducts);
                if (response.isSuccess) {
                    const Records = response.data.reverse();
                    setProducts(Records);
                    setLoading(false);
                } else {
                    console.error('API request failed:', response.data.message);
                    setLoading(true);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(true);
            }
        }
        getproducts();
    }, [apiProducts]);

    // set all data after filter
    useEffect(() => {
        setFilterdata(products)
    }, [products]);

    // filtering the products
    useEffect(() => {
        const result = products.filter((e) => {
            return e.productName.toLowerCase().match(search.toLowerCase());
        })
        setFilterdata(result);
    }, [search]);

    // open Modal
    const openModal = (mode, product = null) => {
        setModalMode(mode);
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    // close Modal
    const closeModal = () => setIsModalOpen(false);

    // columns
    const columns = [
        {
            name: 'Product Image',
            selector: 'productImage',
            cell: (row) => (
                row.imageResponseDTOs && row.imageResponseDTOs.length > 0 ? (
                    <img
                        src={`${process.env.REACT_APP_IMAGE_URL}${companyId}/${row.imageResponseDTOs[0].imageName}`}
                        alt={row.productName}
                        style={{ height: '70px', width: '70px', objectFit: 'cover' }}
                        onError={Onerrorimg}
                        className='rounded'
                        loading='lazy'
                    />
                ) : (
                    <img
                        src="/path/to/error/image.jpg" // Path to your error image
                        alt="Error"
                        style={{ height: '70px', width: '70px', objectFit: 'cover' }}
                        onError={Onerrorimg}
                        loading='lazy'
                    />
                )
            ),
        },
        { name: "Product Category", selector: (row) => row.categoryName },
        { name: "Product Name", selector: (row) => row.productName },
        { name: "Product Price", selector: (row) => row.newPrice },
        {
            name: "Actions",
            cell: (product) => (
                <>
                    <ViewproductModal product={product} />
                    <i className='fa fa-edit p-3 fs-6' onClick={() => openModal('edit', product)} style={{ cursor: 'pointer' }}></i>
                    <Delproductmodal
                        product={product}
                        setProducts={setProducts}
                        apiUrlHandler={addEditProduct}
                        dataSendMethod={productServices.addEditProduct}
                        apiUrlGet={apiProducts}
                        dataGetMethod={productServices.getProducts}
                    />
                </>
            )
        }
    ];

    return (
        <div className="row bg-white py-3">
            <div className="col-md-6 mb-4">
                <h1 className='display-6 c-secondarycolor'>Product List</h1>
            </div>
            <div className="col-md-6 mb-4 text-end">
                <button className='btn border border-secondarycolor rounded-pill px-3 c-secondarycolor' onClick={() => openModal('add')}>Add New Products</button>
                <Productmodal isOpen={isModalOpen} onClose={closeModal} mode={modalMode} selectedProduct={selectedProduct} setProducts={setProducts} />
            </div>
            <div className="col-12 list">
                {loading ?
                    <LoadingSpinner />
                    :
                    <DataTable
                        columns={columns}
                        data={filterdata}
                        search={search}
                        datatableHeight={'293px'}
                        setSearch={setSearch}
                        subHeader={true}
                        showSubHeader={true}
                        placeholdervalue = {'Search by Product Name'}
                    />
                }
            </div>
        </div>
    );
};

export default ProductListing;