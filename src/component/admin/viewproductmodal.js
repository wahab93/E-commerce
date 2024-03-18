import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { Onerrorimg } from '../common/onerrorimg';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { useProductContext } from '../common/api/provider';

export const ViewproductModal = ({ product }) => {
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
                                        {selectedProduct.imageResponseDTOs.length > 0 ? (
                                            <Carousel autoPlay={true} infiniteLoop={true} showArrows={true} showIndicators={false} showStatus={false}>
                                                {product.imageResponseDTOs.map((image, index) => {
                                                    // Extract the filename from the full path
                                                    const filename = image.imageName;

                                                    return (
                                                        <img
                                                            key={index} // Ensure you add a unique key for each image
                                                            src={`${process.env.REACT_APP_IMAGE_URL}${companyId}/${filename}`} // Use proper string interpolation to include variables
                                                            className="rounded"
                                                            alt={`${product.productName} - Image ${index + 1}`}
                                                            height={230}
                                                            style={{ objectFit: 'cover' }}
                                                            onError={Onerrorimg}
                                                            loading='lazy'
                                                        />
                                                    );
                                                })}
                                            </Carousel>
                                        ) : (
                                            <img
                                                src="/path/to/error/image.jpg" // Replace with the path to your error image
                                                className="img-fluid w-100 rounded"
                                                alt="Error"
                                                onError={Onerrorimg}
                                                loading='lazy'
                                            />
                                        )}
                                    </div>
                                    <div className='col-md-6 border-start customborder'>
                                        <h5 className='fw-bold mb-3'>{selectedProduct.productName} - {selectedProduct.productBrandName}</h5>
                                        <b>Category Name :</b>
                                        <h6 className='fw-bold mb-3'>{selectedProduct.categoryName}</h6>
                                        <b>Price :</b>
                                        <h5 className='fw-bold mb-3'>{selectedProduct.newPrice}{selectedProduct.currency}</h5>
                                        <b>Description :</b>
                                        <h6>{selectedProduct.productDescription}</h6>
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
            {/* View Product Modal end */}</>
    )
}