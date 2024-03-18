import React, { useState, useEffect, useRef } from 'react';
import { Modal } from 'react-bootstrap';
import swal from 'sweetalert';
import { useProductContext } from '../../common/api/provider';
import { productServices } from '../../../services/productServices';
import { useFormik } from 'formik';
import { productSchema } from '../../../schemas';
import { ProductForm } from './productForm';

export const Productmodal = ({ isOpen, onClose, mode, selectedProduct, setProducts }) => {
    const { companyId, addEditProduct, apiProducts, apiCategory, apiProductType, apiProductBrand, getCategoryById } = useProductContext(); // Things receving from usecontext
    const [categories, setCategories] = useState([]); // holds all categories
    const [isLoading, setIsLoading] = useState(false);
    const [productType, setProductType] = useState([]); // holds all product Type
    const [productBrand, setProductBrand] = useState([]); // holds all product Brand
    // create the ref
    const inputFileRef = useRef(null);

    // Initial values for the data
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
        isNew: mode === 'add',
        isActive: selectedProduct ? selectedProduct.isActive : true,
        createdBy: 'Admin',
        createdOn: new Date().toISOString(),
        currency: 'PKR',
        imageResponseDTOs: []
    };

    // Fetch Data when modal is open
    useEffect(() => {
        if (isOpen) {
            fetchData();
        }
    }, [isOpen]);

    async function fetchData() {
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

    // Image Handling
    const handleImageChange = (e) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const updatedImages = [...values.imageResponseDTOs];
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64String = reader.result.split(',')[1];
                    // Check if an image with the same name already exists
                    const existingImage = updatedImages.find(image => image.imageName === file.name);
                    if (!existingImage) {
                        // If the image doesn't exist, add it to the array
                        updatedImages.push({
                            imageId: 1,
                            imageName: file.name,
                            imageType: "product",
                            imageData: base64String,
                            isPrimary: true,
                        });
                        // Update the Formik field with the new array of images
                        setFieldValue('imageResponseDTOs', updatedImages);
                    } else {
                        swal("Oops!", "Image already exists", "error");
                        console.log('Image already exists:', file.name);
                    }
                    // Reset the input file value
                    inputFileRef.current.value = ''
                };
                reader.readAsDataURL(file);
            }
        }
    };

    // Handle change Category
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

    // Inside your component where you define your functions
    const handleImageDelete = (index) => {
        const updatedImages = [...values.imageResponseDTOs];
        updatedImages.splice(index, 1);
        setFieldValue('imageResponseDTOs', updatedImages);
    };

    // data send to API
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
                        setProducts(updatedData.data.reverse());
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
                ...initialValues,
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
                newPrice: selectedProduct.newPrice,
                oldPrice: selectedProduct.oldPrice,
                isActive: selectedProduct.isActive,
                isNew: false,
                imageResponseDTOs: selectedProduct.imageResponseDTOs
            });
        }
    }, [mode, selectedProduct, setValues]);


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
                    mode,
                    handleImageDelete,
                    inputFileRef
                }} />
            </Modal.Body>
        </Modal>
    );
};