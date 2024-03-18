import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import swal from 'sweetalert';
import { productServices } from '../../../services/productServices';
import { useProductContext } from '../../common/api/provider';


export const Delproductmodal = ({ product, setProducts, apiUrlHandler, dataSendMethod, apiUrlGet, dataGetMethod }) => {
    const { addEditProduct, apiProducts } = useProductContext();
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

    const handleDeleteClick = (product) => {
        // Set the productIdToDelete and show the confirmation modal
        setProductToDelete(product);
        setShowConfirmation(true);
    };

    const confirmDelete = async () => {
        try {
            // Create a copy of the product and set isActive to false
            const modifiedProduct = { ...productToDelete, isActive: false };

            // Send the modified product to the backend
            const response = await dataSendMethod(apiUrlHandler, modifiedProduct);

            if (response) {
                swal("Success", 'Deleted successfully', "success");
                // Fetch updated product data after adding or updating
                const updatedData = await dataGetMethod(apiUrlGet);

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
            swal("Oops!", 'Failed to Delete', "error");
        }
        setProductToDelete(null);
        setShowConfirmation(false);
    }

    return (
        <>
            <i className='fa fa-trash p-3 text-danger fs-6' onClick={() => handleDeleteClick(product)} style={{ cursor: 'pointer' }}></i>
            {/* Confirmation modal */}
            <Modal centered show={showConfirmation} onHide={() => setShowConfirmation(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you want to delete this product?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowConfirmation(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={confirmDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}