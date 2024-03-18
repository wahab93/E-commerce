import React, { useState, useEffect } from 'react';
import { Modal, Form } from 'react-bootstrap';
import swal from 'sweetalert';
import { useProductContext } from '../../common/api/provider';
import { productServices } from '../../../services/productServices';
import { useFormik } from 'formik';
import { productSchema } from '../../../schemas';
import { ProductForm } from './productForm';

export const Productmodal = ({ isOpen, onClose, mode, selectedProduct, setProducts }) => {
    const { companyId, addEditProduct, apiProducts, apiCategory, apiProductType, apiProductBrand, getCategoryById } = useProductContext(); //data received from useContext
    const [categories, setCategories] = useState([]); // set all categories gets from API
    const [productType, setProductType] = useState([]); // set all productType gets from API
    const [productBrand, setProductBrand] = useState([]); // set all productBrand gets from API
    const [isLoading, setIsLoading] = useState(false); 

    //intial values for data
    const initialValues = {
        companyId: companyId,
        productId: selectedProduct ? selectedProduct.productId : 0,
        productCode: selectedProduct ? selectedProduct.productCode : '',
        productName: selectedProduct ? selectedProduct.productName : '',
        productUOM: selectedProduct ? selectedProduct.productUOM : '',
        productDescription: selectedProduct ? selectedProduct.productDescription : '',
        productTitle: selectedProduct ? selectedProduct.productTitle : '',
        categoryId: selectedProduct ? selectedProduct.categoryId : '',
        categoryName: selectedProduct ? selectedProduct.categoryName : '',
        productTypeId: selectedProduct ? selectedProduct.productTypeId : '',
        productTypeName: selectedProduct ? selectedProduct.productTypeName : '',
        productBrandId: selectedProduct ? selectedProduct.productBrandId : '',
        productBrandName: selectedProduct ? selectedProduct.productBrandName : '',
        newPrice: selectedProduct ? selectedProduct.newPrice : '',
        oldPrice: selectedProduct ? selectedProduct.oldPrice : '',
        productImage: selectedProduct ? selectedProduct.productImage : '',
        imageData: selectedProduct ? selectedProduct.imageData : '',
        isNew: mode === 'add',
        isActive: selectedProduct ? selectedProduct.isActive : true,
        createdBy: 'Admin',
        createdOn: new Date().toISOString(),
        currency: 'RS-'
    };

    // fetch data when modal is open
    useEffect(() => {
        if (isOpen) {
            fetchData();
        }
    }, [isOpen]);

    // data fetch
    async function fetchData() {
        // Fetch category data
        try {
            const response = await productServices.getProductCategories(apiCategory);
            if (response.isSuccess) {
                setCategories(response.data);
                setIsLoading(false);
            } else {
                console.error('API request failed:', response.message);
                setIsLoading(true);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setIsLoading(true);
        }

        // Fetch product type data
        try {
            const response = await productServices.getProductType(apiProductType);
            if (response.isSuccess) {
                setProductType(response.data);
                setIsLoading(false);
            } else {
                console.error('API request failed:', response.message);
                setIsLoading(true);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setIsLoading(true);
        }

        // Fetch product brand data
        try {
            const response = await productServices.getProductBrand(apiProductBrand);
            if (response.isSuccess) {
                setProductBrand(response.data);
                setIsLoading(false);
            } else {
                console.error('API request failed:', response.message);
                setIsLoading(true);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setIsLoading(true);
        }
    }

    // send data to the API (API call)
    const { values, errors, handleBlur, touched, handleChange, handleSubmit, setValues, setFieldValue } = useFormik({
        initialValues,
        validationSchema: productSchema,
        onSubmit: async (values, action) => {
            setIsLoading(true);
            try {
                const response = await productServices.addEditProduct(addEditProduct, values);

                if (response) {
                    setIsLoading(false);
                    swal("Success", `${mode === 'add' ? 'Product added' : 'Product updated'} successfully`, "success");
                    onClose();

                    // Fetch updated product data after adding or updating
                    const updatedData = await productServices.getProducts(apiProducts);

                    if (updatedData.isSuccess) {
                        setProducts(updatedData.data);
                    } else {
                        console.error('API request failed:', updatedData.message);
                    }
                } else {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
            } catch (error) {
                console.error('Error:', error);
                swal("Oops!", `Failed to ${mode === 'add' ? 'add' : 'update'} product`, "error");
                setIsLoading(false);
            }
            console.log(values)
            action.resetForm();
        }
    });

    // Update the form values when 'selectedProduct' changes
    useEffect(() => {
        if (mode === 'edit' && selectedProduct) {
            setValues({
                ...values,
                productId: selectedProduct.productId,
                productCode: selectedProduct.productCode,
                productName: selectedProduct.productName,
                productUOM: selectedProduct.productUOM,
                productDescription: selectedProduct.productDescription,
                productTitle: selectedProduct.productTitle,
                categoryId: selectedProduct.categoryId,
                categoryName: selectedProduct.categoryName,
                productTypeId: selectedProduct.productTypeId,
                productTypeName: selectedProduct.productTypeName,
                productBrandId: selectedProduct.productBrandId,
                productBrandName: selectedProduct.productBrandName,
                productImage: selectedProduct.productImage,
                newPrice: selectedProduct.newPrice,
                oldPrice: selectedProduct.oldPrice,
                isActive: selectedProduct.isActive,
                isNew: false,
            });
        }
    }, [mode, selectedProduct, setValues]);

    // Image Handler
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                const base64String = reader.result.split(',')[1];
                setFieldValue('productImage', file.name); // Update the productImage field in Formik
                setFieldValue('imageData', base64String); // Set the file name or any relevant information into imageData
            };

            reader.readAsDataURL(file);
        }
    };

    // handle category change
    const handleCategoryChange = async (e) => {
        const selectedCategoryId = e.target.value;
        const selectedCategory = categories.find((category) => category.categoryId == selectedCategoryId);

        // Set the selected category and clear the validation message for the productBrandId input
        setValues((prevValues) => ({
            ...prevValues,
            categoryId: selectedCategoryId,
            categoryName: selectedCategory.categoryName,
            productCode: '', // Clear the productCode
        }));

        try {
            const response = await productServices.getProductCategoryById(getCategoryById, selectedCategoryId);
            if (response.isSuccess) {
                // Update the productCode when the API call is successful
                setValues((prevValues) => ({
                    ...prevValues,
                    productCode: response.data,
                }));
            } else {
                console.error('API request failed:', response.message);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <Modal size='xl' show={isOpen} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>{mode === 'add' ? 'Add Product' : 'Edit Product'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ProductForm {...{
                    handleSubmit,
                    values,
                    handleCategoryChange,
                    handleBlur,
                    categories,
                    errors,
                    touched,
                    setFieldValue,
                    productType,
                    productBrand,
                    handleChange,
                    handleImageChange,
                    isLoading,
                    mode
                }} />
            </Modal.Body>
        </Modal>
    );
};