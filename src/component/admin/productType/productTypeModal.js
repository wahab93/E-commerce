import React, { useState, useEffect } from 'react';
import { Modal, Form } from 'react-bootstrap';
import swal from 'sweetalert';
import { useProductContext } from '../../common/api/provider';
import { productServices } from '../../../services/productServices';
import { useFormik } from 'formik';
import { productTypeSchema } from '../../../schemas';

export const ProductTypeModal = ({ isOpen, onClose, mode, selectedProductType, setProductType }) => {
    const { companyId, apiProductType, addEditProductType } = useProductContext(); //get data from useContext
    const [isLoading, setIsLoading] = useState(false);

    // Initialize the form values, including productTypeId
    const initialValues = {
        companyId: companyId,
        productTypeId: selectedProductType ? selectedProductType.productTypeId : 0,
        productTypeCode: selectedProductType ? selectedProductType.productTypeCode : '',
        productTypeName: selectedProductType ? selectedProductType.productTypeName : '',
        productTypeDescription: selectedProductType ? selectedProductType.productTypeDescription : '',
        productTypeTitle: selectedProductType ? selectedProductType.productTypeTitle : '',
        isNew: mode === 'add',
        isActive: selectedProductType ? selectedProductType.isActive : true,
        createdBy: 'Admin',
        createdOn: new Date().toISOString(),
    };

    // data send to API (API Call)
    const { values, errors, handleBlur, touched, handleChange, handleSubmit, setValues } = useFormik({
        initialValues,
        validationSchema: productTypeSchema,
        onSubmit: async (values, action) => {
            setIsLoading(true);
            try {
                const response = await productServices.addEditProductType(addEditProductType, values);
                if (response) {
                    setIsLoading(false);
                    swal("Success", `${mode === 'add' ? 'Product Type added' : 'Product Type updated'} successfully`, "success");
                    onClose();

                    // Fetch updated product data after adding or updating
                    const updatedData = await productServices.getProductType(apiProductType);
                    if (updatedData.isSuccess) {
                        setProductType(updatedData.data);
                    } else {
                        console.error('API request failed:', updatedData.message);
                    }
                } else {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
            } catch (error) {
                console.error('Error:', error);
                swal("Oops!", `Failed to ${mode === 'add' ? 'add' : 'update'} Product Type`, "error");
                setIsLoading(false);
            }
            action.resetForm();
        }
    });

    // Update the form values when 'selectedProductType' changes
    useEffect(() => {
        if (mode === 'edit' && selectedProductType) {
            setValues({
                ...values,
                productTypeId: selectedProductType.productTypeId,
                productTypeCode: selectedProductType.productTypeCode,
                productTypeName: selectedProductType.productTypeName,
                productTypeDescription: selectedProductType.productTypeDescription,
                productTypeTitle: selectedProductType.productTypeTitle,
                isActive: selectedProductType.isActive,
                isNew: false,
            });
        }
    }, [mode, selectedProductType, setValues]);

    return (
        <Modal size='lg' show={isOpen} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>{mode === 'add' ? 'Add Product Type' : 'Edit Product Type'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <div className="row g-3">
                        <div className="col-md-6">
                            <Form.Group>
                                <Form.Label>Type Code</Form.Label>
                                <Form.Control
                                    placeholder="Type Code"
                                    type="number"
                                    value={values.productTypeCode}
                                    name='productTypeCode'
                                    onChange={(e) => {
                                        // Enforce a maximum of 2 digits
                                        const newValue = e.target.value.slice(0, 5);
                                        handleChange({ target: { name: 'productTypeCode', value: newValue } });
                                    }}
                                    onBlur={handleBlur}
                                />
                            </Form.Group>
                            {errors.productTypeCode && touched.productTypeCode ? <span className='text-danger mt-2 d-block'>{errors.productTypeCode}</span> : null}
                        </div>
                        {/* productCode */}
                        <div className="col-md-6">
                            <Form.Group>
                                <Form.Label>Type Name</Form.Label>
                                <Form.Control
                                    placeholder="Type Name"
                                    type="text"
                                    name='productTypeName'
                                    value={values.productTypeName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Form.Group>
                            {errors.productTypeName && touched.productTypeName ? <span className='text-danger mt-2 d-block'>{errors.productTypeName}</span> : null}
                        </div>
                        {/* productName */}
                        <div className="col-md-6">
                            <Form.Group>
                                <Form.Label>Type Description</Form.Label>
                                <Form.Control
                                    type="text"
                                    name='productTypeDescription'
                                    placeholder="Type Description"
                                    value={values.productTypeDescription}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Form.Group>
                            {errors.productTypeDescription && touched.productTypeDescription ? <span className='text-danger mt-2 d-block'>{errors.productTypeDescription}</span> : null}
                        </div>
                        {/* productDescription */}
                        <div className="col-md-6">
                            <Form.Group>
                                <Form.Label>Type Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    name='productTypeTitle'
                                    placeholder="Type Title"
                                    value={values.productTypeTitle}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Form.Group>
                            {errors.productTypeTitle && touched.productTypeTitle ? <span className='text-danger mt-2 d-block'>{errors.productTypeTitle}</span> : null}
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
                                ) : (mode === 'add' ? 'Add Type' : 'Update Type')}
                            </button>
                        </div>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    )
};