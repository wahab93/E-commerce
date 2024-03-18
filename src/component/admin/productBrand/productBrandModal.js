import React, { useState, useEffect } from 'react';
import { Modal, Form } from 'react-bootstrap';
import swal from 'sweetalert';
import { useProductContext } from '../../common/api/provider';
import { productServices } from '../../../services/productServices';
import { useFormik } from 'formik';
import { productBrandSchema } from '../../../schemas';

export const ProductBrandModal = ({ isOpen, onClose, mode, selectedProductBrand, setBrand }) => {
    const { companyId, apiProductBrand, addEditProductBrand } = useProductContext(); //data receive from useContext
    const [isLoading, setIsLoading] = useState(false);

    // initail values for data
    const initialValues = {
        companyId: companyId,
        productBrandId: selectedProductBrand ? selectedProductBrand.productBrandId : 0,
        productBrandCode: selectedProductBrand ? selectedProductBrand.productBrandCode : '',
        productBrandName: selectedProductBrand ? selectedProductBrand.productBrandName : '',
        productBrandDescription: selectedProductBrand ? selectedProductBrand.productBrandDescription : '',
        productBrandTitle: selectedProductBrand ? selectedProductBrand.productBrandTitle : '',
        isNew: mode === 'add',
        isActive: selectedProductBrand ? selectedProductBrand.isActive : true,
        createdBy: 'Admin',
        createdOn: new Date().toISOString(),
    };

    // data send to API
    const { values, errors, handleBlur, touched, handleChange, handleSubmit, setValues } = useFormik({
        initialValues,
        validationSchema: productBrandSchema,
        onSubmit: async (values, action) => {
            setIsLoading(true);
            try {
                const response = await productServices.addEditProductBrand(addEditProductBrand, values)
                if (response) {
                    setIsLoading(false);
                    swal("Success", `${mode === 'add' ? 'Product Brand added' : 'Product Brand updated'} successfully`, "success");
                    onClose();
                    // Fetch updated product data after adding
                    const updatedData = await productServices.getProductBrand(apiProductBrand)
                    if (updatedData.isSuccess) {
                        setBrand(updatedData.data);
                    } else {
                        console.error('API request failed:', updatedData.message);
                    }
                } else {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
            } catch (error) {
                console.error('Error:', error);
                swal("Oops!", `Failed to ${mode === 'add' ? 'add' : 'update'} Product Brand`, "error");
                setIsLoading(false);
            }
            action.resetForm();
        }
    });
    
    // Update the form values when 'selectedProductBrand' changes
    useEffect(() => {
        if (mode === 'edit' && selectedProductBrand) {
            setValues({
                ...values,
                productBrandId: selectedProductBrand.productBrandId,
                productBrandCode: selectedProductBrand.productBrandCode,
                productBrandName: selectedProductBrand.productBrandName,
                productBrandDescription: selectedProductBrand.productBrandDescription,
                productBrandTitle: selectedProductBrand.productBrandTitle,
                isActive: selectedProductBrand.isActive,
                isNew: false,
            });
        }
    }, [mode, selectedProductBrand, setValues]);

    return (
        <Modal size='lg' show={isOpen} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>{mode === 'add' ? 'Add Product Brand' : 'Edit Product Brand'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <div className="row g-3">
                        <div className="col-md-6">
                            <Form.Group>
                                <Form.Label>Brand Code</Form.Label>
                                <Form.Control
                                    placeholder="Brand Code"
                                    type="text"
                                    value={values.productBrandCode}
                                    name='productBrandCode'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Form.Group>
                            {errors.productBrandCode && touched.productBrandCode ? <span className='text-danger mt-2 d-block'>{errors.productBrandCode}</span> : null}
                        </div>
                        {/* productCode */}
                        <div className="col-md-6">
                            <Form.Group>
                                <Form.Label>Brand Name</Form.Label>
                                <Form.Control
                                    placeholder="Brand Name"
                                    type="text"
                                    name='productBrandName'
                                    value={values.productBrandName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Form.Group>
                            {errors.productBrandName && touched.productBrandName ? <span className='text-danger mt-2 d-block'>{errors.productBrandName}</span> : null}
                        </div>
                        {/* productName */}
                        <div className="col-md-6">
                            <Form.Group>
                                <Form.Label>Brand Description</Form.Label>
                                <Form.Control
                                    type="text"
                                    name='productBrandDescription'
                                    placeholder="Brand Description"
                                    value={values.productBrandDescription}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Form.Group>
                            {errors.productBrandDescription && touched.productBrandDescription ? <span className='text-danger mt-2 d-block'>{errors.productBrandDescription}</span> : null}
                        </div>
                        {/* productDescription */}
                        <div className="col-md-6">
                            <Form.Group>
                                <Form.Label>Brand Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    name='productBrandTitle'
                                    placeholder="Brand Title"
                                    value={values.productBrandTitle}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Form.Group>
                            {errors.productBrandTitle && touched.productBrandTitle ? <span className='text-danger mt-2 d-block'>{errors.productBrandTitle}</span> : null}
                        </div>
                        {/* productTitle */}
                        <div className="col-md-6">
                            <Form.Group>
                                <Form.Check
                                    type="checkbox"
                                    label="Is Active"
                                    checked={values.isActive}
                                    name='isActive'
                                    onChange={handleChange} // Toggle the value
                                />
                            </Form.Group>
                        </div>
                        {/* isActive */}
                        <div className="col-md-12 logintbn">
                            <button type="submit" className={`btn border border-secondarycolor rounded-pill px-3 c-secondarycolor ${isLoading ? 'loading' : ''}`} disabled={isLoading}>
                                {isLoading ? (
                                    <div className="spinner-border c-primarycolor" role="status">
                                        <span className="visually-hidden">Saving Changes</span>
                                    </div>
                                ) : (mode === 'add' ? 'Add Brand' : 'Update Brand')}
                            </button>
                        </div>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};