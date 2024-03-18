import React, { useState, useEffect } from 'react';
import { ViewproductModal } from '../viewproductmodal';
import { Delproductmodal } from '../commoncomponent/delproductmodal';
import { useProductContext } from '../../common/api/provider';
import { ProductBrandModal } from './productBrandModal';
import LoadingSpinner from '../../common/loadingSpinner';
import { productServices } from '../../../services/productServices';
import usePageTitle from '../../common/usePageTitle';
import { DataTable } from '../commoncomponent/dataTable';

const ProductBrandlisting = () => {
    usePageTitle('Product Brand'); // page title
    const { apiProductBrand, addEditProductBrand } = useProductContext(); // data receive fron useContext
    const [brand, setBrand] = useState([]); // set product brand
    const [filterdata, setFilterData] = useState([]); //set for filter product brand
    const [isModalOpen, setIsModalOpen] = useState(false); // modal is closed on page load
    const [modalMode, setModalMode] = useState('add'); // set modal mode add on page loads
    const [selectedProductBrand, setSelectedProductBrand] = useState(null); // set selected productbrand in edit mode
    const [search, setSearch] = useState(''); // set search for 
    const [loading, setLoading] = useState(true);

    // getData from API
    useEffect(() => {
        const getproducts = async () => {
            try {
                const response = await productServices.getProductBrand(apiProductBrand)
                if (response) {
                    const Records = response.data.reverse();
                    setBrand(Records);
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
    }, [apiProductBrand]);

    // set all data in list
    useEffect(() => {
        setFilterData(brand);
    }, [brand]);

    // filtering the products
    useEffect(() => {
        const result = brand.filter((e) => {
            return e.productBrandName.toLowerCase().match(search.toLowerCase());
        })
        setFilterData(result);
    }, [search]);

    // open Modal
    const openModal = (mode, product = null) => {
        setModalMode(mode);
        setSelectedProductBrand(product);
        setIsModalOpen(true);
    };

    // close Modal
    const closeModal = () => setIsModalOpen(false);

    //  Columns
    const columns = [
        { name: "Product Brand Code", selector: (row) => row.productBrandCode },
        { name: "Product Brand Name", selector: (row) => row.productBrandName },
        { name: "Product Brand Description", selector: (row) => row.productBrandDescription },
        {
            name: "Actions",
            cell: (product) => (
                <>
                    <ViewproductModal product={product} />
                    <i className='fa fa-edit p-3 fs-6' onClick={() => openModal('edit', product)} style={{ cursor: 'pointer' }}></i>
                    <Delproductmodal
                        product={product}
                        setProducts={setBrand}
                        apiUrlHandler={addEditProductBrand}
                        dataSendMethod={productServices.addEditProductBrand}
                        apiUrlGet={apiProductBrand}
                        dataGetMethod={productServices.getProductBrand}
                    />
                </>
            )
        }
    ]

    return (
        <div className="row bg-white py-3">
            <div className="col-md-6 mb-4">
                <h1 className='display-6 c-secondarycolor'>Product Brand List</h1>
            </div>
            <div className="col-md-6 mb-4 text-end">
                <button className='btn border border-secondarycolor rounded-pill px-3 c-secondarycolor' onClick={() => openModal('add')}>Add Product Brand</button>
                <ProductBrandModal isOpen={isModalOpen} onClose={closeModal} mode={modalMode} selectedProductBrand={selectedProductBrand} setBrand={setBrand} />
            </div>
            <div className="col-12 list">
                {loading ?
                    <LoadingSpinner />
                    :
                    <DataTable
                        columns={columns}
                        data={filterdata}
                        datatableHeight={'293px'}
                        subHeader={true}
                        showSubHeader={true}
                        search={search}
                        setSearch={setSearch}
                        placeholdervalue={'Search by Product Brand Name'}
                    />}
            </div>
        </div>
    );
};

export default ProductBrandlisting;