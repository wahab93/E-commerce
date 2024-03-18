import React, { useState, useEffect } from 'react';
import { ViewproductModal } from '../viewproductmodal';
import { Delproductmodal } from '../commoncomponent/delproductmodal';
import { useProductContext } from '../../common/api/provider';
import { CategoryModal } from './categoryModal';
import LoadingSpinner from '../../common/loadingSpinner';
import { productServices } from '../../../services/productServices';
import usePageTitle from '../../common/usePageTitle';
import { DataTable } from '../commoncomponent/dataTable';
import { Onerrorimg } from '../../common/onerrorimg';

const Categorylisting = () => {
    usePageTitle('Product Category'); //for page title
    const { apiCategory, companyId, addEditProductCategory } = useProductContext(); //data receive from useContext
    const [categories, setCategories] = useState([]); // set all categories
    const [selectedCategory, setSelectedCategory] = useState(null); //selected category in edit mode
    const [filterdata, setFilterdata] = useState([]); // set filterdata
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false); // when page ready modal closed
    const [modalMode, setModalMode] = useState('add'); // by default modal is in add mode
    const [search, setSearch] = useState('');

    // getData from API
    useEffect(() => {
        const getproducts = async () => {
            try {
                const response = await productServices.getProductCategories(apiCategory)
                if (response) {
                    const Records = response.data.reverse();
                    setCategories(Records);
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
    }, [apiCategory]);

    useEffect(() => {
        setFilterdata(categories);
    }, [categories]);

    // search categories
    useEffect(() => {
        const result = categories.filter((e) => {
            return e.categoryName.toLowerCase().match(search.toLowerCase());
        })
        setFilterdata(result);
    }, [search]);

    // open modal
    const openModal = (mode, product = null) => {
        setModalMode(mode);
        setSelectedCategory(product);
        setIsModalOpen(true);
    };

    // close Modal
    const closeModal = () => setIsModalOpen(false);

    // columns
    const columns = [
        {
            name: 'Category Image',
            selector: 'productImage',
            cell: (row) => (
                row.imageResponseDTOs && row.imageResponseDTOs.length > 0 ? (
                    <img
                        src={`${process.env.REACT_APP_IMAGE_URL}${companyId}/${row.imageResponseDTOs[0].imageName}`}
                        alt={row.productName}
                        style={{ height: '70px', width: '70px', objectFit: 'cover' }}
                        className='rounded'
                        onError={Onerrorimg}
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
        { name: "Category Name", selector: (row) => row.categoryName },
        { name: "Category Title", selector: (row) => row.categoryTitle, },
        { name: "Category Description", selector: (row) => row.categoryDescription },
        {
            name: "Actions",
            cell: (product) => (
                <>
                    <ViewproductModal product={product} />
                    <i className='fa fa-edit p-3 fs-6' onClick={() => openModal('edit', product)} style={{ cursor: 'pointer' }}></i>
                    <Delproductmodal
                        product={product}
                        setProducts={setCategories}
                        apiUrlHandler={addEditProductCategory}
                        dataSendMethod={productServices.addEditProductCategory}
                        apiUrlGet={apiCategory}
                        dataGetMethod={productServices.getProductCategories}
                    />
                </>
            )
        }
    ]

    return (
        <div className="row bg-white py-3">
            <div className="col-md-6 mb-4">
                <h1 className='display-6 c-secondarycolor'>Category List</h1>
            </div>
            <div className="col-md-6 mb-4 text-end">
                <button className='btn border border-secondarycolor rounded-pill px-3 c-secondarycolor' onClick={() => openModal('add')}>Add New Category</button>
                <CategoryModal isOpen={isModalOpen} onClose={closeModal} mode={modalMode} selectedCategory={selectedCategory} setCategories={setCategories} />
            </div>
            <div className="col-12 list">
                {loading ?
                    <LoadingSpinner />
                    :
                    <DataTable
                        columns={columns}
                        data={filterdata}
                        datatableHeight={'293px'}
                        search={search}
                        setSearch={setSearch}
                        subHeader={true}
                        showSubHeader={true}
                        placeholdervalue={'Search by Category Name'}
                    />}
            </div>
        </div>
    );
};

export default Categorylisting;