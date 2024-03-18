import React, { useState, useEffect } from 'react';
import { ViewproductModal } from '../viewproductmodal';
import { Delproductmodal } from '../commoncomponent/delproductmodal';
import { useProductContext } from '../../common/api/provider';
import { ProductTypeModal } from './productTypeModal';
import { productServices } from '../../../services/productServices';
import usePageTitle from '../../common/usePageTitle';
import LoadingSpinner from '../../common/loadingSpinner';
import { DataTable } from '../commoncomponent/dataTable';

const ProductTypelisting = () => {
    usePageTitle('Product Type'); // page Title
    const { apiProductType, addEditProductType } = useProductContext(); // data receive from useContext
    const [filterdata, setFilterData] = useState([]) //filterd data
    const [loading, setLoading] = useState(true);
    const [productType, setProductType] = useState([]); //set product type
    const [selectedProductType, setSelectedProductType] = useState(null); // selected product type in edit
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('add');
    const [search, setSearch] = useState('');

    // getData from API
    useEffect(() => {
        const getproducts = async () => {
            try {
                const response = await productServices.getProductType(apiProductType)
                if (response) {
                    const Records = response.data.reverse();
                    setProductType(Records);
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
    }, [apiProductType]);

    // set data after filter
    useEffect(() => {
        setFilterData(productType);
    }, [productType]);

    // filtering the products
    useEffect(() => {
        const result = productType.filter((e) => {
            return e.productTypeName.toLowerCase().match(search.toLowerCase())
        })
        setFilterData(result)
    }, [search]);

    // open Modal
    const openModal = (mode, product = null) => {
        setModalMode(mode);
        setSelectedProductType(product);
        setIsModalOpen(true);
    };

    // close Modal
    const closeModal = () => setIsModalOpen(false);

    // columns
    const columns = [
        { name: "Product Type Code", selector: (row) => row.productTypeCode },
        { name: "Product Type Name", selector: (row) => row.productTypeName },
        { name: "Product Type Description", selector: (row) => row.productTypeDescription },
        { name: "Product Type Title", selector: (row) => row.productTypeTitle },
        {
            name: "Actions",
            cell: (product) => (
                <>
                    <ViewproductModal product={product} />
                    <i className='fa fa-edit p-3 fs-6' onClick={() => openModal('edit', product)} style={{ cursor: 'pointer' }}></i>
                    <Delproductmodal
                        product={product}
                        setProducts={setProductType}
                        apiUrlHandler={addEditProductType}
                        dataSendMethod={productServices.addEditProductType}
                        apiUrlGet={apiProductType}
                        dataGetMethod={productServices.getProductType}
                    />
                </>
            )
        }
    ]
    return (
        <div className="row bg-white py-3">
            <div className="col-md-6 mb-4">
                <h1 className='display-6 c-secondarycolor'>Product Type List</h1>
            </div>
            <div className="col-md-6 mb-4 text-end">
                <button className='btn border border-secondarycolor rounded-pill px-3 c-secondarycolor' onClick={() => openModal('add')}>Add Product Type</button>
                <ProductTypeModal isOpen={isModalOpen} onClose={closeModal} mode={modalMode} selectedProductType={selectedProductType} setProductType={setProductType} />
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
                        placeholdervalue={'Search by Product Type Name'}
                    />}
            </div>
        </div>
    );
};

export default ProductTypelisting;