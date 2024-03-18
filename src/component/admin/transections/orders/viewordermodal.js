import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { useProductContext } from '../../../common/api/provider';


export const Viewordermodal = ({ product }) => {
    const { companyId } = useProductContext();
    const [showViewModal, setShowViewModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Function to open the view modal
    const openmodal = (product) => {
        setSelectedProduct(product);
        setShowViewModal(true);
    };

    // Function to close the view modal
    const closemodal = () => {
        setSelectedProduct(null);
        setShowViewModal(false);
    };
    return (
        <>
            <i className='fa fa-eye p-3 fs-6' onClick={() => openmodal(product)} style={{ cursor: 'pointer' }}></i>
            <Modal show={showViewModal} onHide={closemodal} size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>View Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedProduct && (
                        <>
                            <div className='container-fluid'>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <p>Email: {selectedProduct.customerResponseDTO.customerEmail}</p>
                                        <p>Name: {selectedProduct.customerResponseDTO.customerName}</p>
                                        <p>Personal No: {selectedProduct.customerResponseDTO.personalNo}</p>
                                        <p>Discount Price: {selectedProduct.ordersDetails.discountPrice}</p>
                                        <p>Product Price: {selectedProduct.ordersDetails.productPrice}</p>
                                        <p>Order Code: {selectedProduct.orderCode}</p>
                                        <p>Order Date: {selectedProduct.orderDate}</p>
                                        <p>Order Status Desc: {selectedProduct.orderStatusDesc}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='d-flex justify-content-between'>
                            </div>
                            <div className='d-flex justify-content-between'>
                            </div>
                            <div className='row justify-content-center'>
                                <div className='col-md-12'>

                                </div>
                            </div>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closemodal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
