import React, { useState, useEffect, useRef } from 'react';
import { Modal, Form } from 'react-bootstrap';
import swal from 'sweetalert';
import { useProductContext } from '../../common/api/provider';
import { productServices } from '../../../services/productServices';
import { useFormik } from 'formik';
import { productCategorySchema } from '../../../schemas';
import { CategoryForm } from './categoryForm';

export const CategoryModal = ({ isOpen, onClose, mode, selectedCategory, setCategories }) => {
    const { companyId, apiCategory, addEditProductCategory } = useProductContext(); //data recive from useContext
    const [isLoading, setIsLoading] = useState(false);
    // create the ref
    const inputFileRef = useRef(null);

    // initial values for data
    const initialValues = {
        companyId: companyId,
        categoryId: selectedCategory ? selectedCategory.categoryId : 0,
        categoryCode: selectedCategory ? selectedCategory.categoryCode : '',
        categoryName: selectedCategory ? selectedCategory.categoryName : '',
        categoryDescription: selectedCategory ? selectedCategory.categoryDescription : '',
        categoryTitle: selectedCategory ? selectedCategory.categoryTitle : '',
        preFix: selectedCategory ? selectedCategory.preFix : '',
        productCodeWidth: selectedCategory ? selectedCategory.productCodeWidth : '',
        isNew: mode === 'add',
        isActive: selectedCategory ? selectedCategory.isActive : true,
        createdBy: 'Admin',
        createdOn: new Date().toISOString(),
        imageResponseDTOs: []
    };

    // data send to API
    const { values, errors, handleBlur, touched, handleChange, handleSubmit, setValues, setFieldValue } = useFormik({
        initialValues,
        validationSchema: productCategorySchema,
        onSubmit: async (values, action) => {
            setIsLoading(true);
            try {
                const response = await productServices.addEditProductCategory(addEditProductCategory, values);
                if (response) {
                    setIsLoading(false);
                    swal("Success", `${mode === 'add' ? 'Category added' : 'Category updated'} successfully`, "success");
                    onClose();
                    // Fetch updated product data after adding
                    const updatedData = await productServices.getProductCategories(apiCategory);
                    if (updatedData.isSuccess) {
                        setCategories(updatedData.data.reverse());
                    } else {
                        console.error('API request failed:', updatedData.message);
                    }
                } else {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
            } catch (error) {
                console.error('Error:', error);
                swal("Oops!", `Failed to ${mode === 'add' ? 'add' : 'update'} Category`, "error");
                setIsLoading(false);
            }
            console.log(values)
            action.resetForm();
        }
    });
    // Update the form values when 'selectedCategory' changes
    useEffect(() => {
        if (mode === 'edit' && selectedCategory) {
            setValues({
                ...values,
                categoryId: selectedCategory.categoryId,
                categoryCode: selectedCategory.categoryCode,
                categoryName: selectedCategory.categoryName,
                categoryDescription: selectedCategory.categoryDescription,
                categoryTitle: selectedCategory.categoryTitle,
                preFix: selectedCategory.preFix,
                productCodeWidth: selectedCategory.productCodeWidth,
                isActive: selectedCategory.isActive,
                isNew: false,
                imageResponseDTOs: selectedCategory.imageResponseDTOs
            });
        }
    }, [mode, selectedCategory, setValues]);

    // handle Image change
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
                            imageType: "category",
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

    // Inside your component where you define your functions
    const handleImageDelete = (index) => {
        const updatedImages = [...values.imageResponseDTOs];
        updatedImages.splice(index, 1);
        setFieldValue('imageResponseDTOs', updatedImages);
    };


    return (
        <Modal size='lg' show={isOpen} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>{mode === 'add' ? 'Add Category' : 'Edit Category'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <CategoryForm {...{
                    handleSubmit,
                    values,
                    handleBlur,
                    errors,
                    touched,
                    setFieldValue,
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