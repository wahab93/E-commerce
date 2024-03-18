import React from 'react'
import { Form } from 'react-bootstrap';
import { Onerrorimg } from '../../common/onerrorimg';
import { useProductContext } from '../../common/api/provider';

export const CategoryForm = (props) => {
    const { companyId } = useProductContext();
    const {
        handleSubmit,
        values,
        handleBlur,
        errors,
        touched,
        handleChange,
        handleImageChange,
        isLoading,
        mode,
        handleImageDelete,
        inputFileRef
    } = props;
    // console.log(values.imageResponseDTOs)
    return (
        <>
            <Form onSubmit={handleSubmit}>
                <div className="row g-3">
                    <div className="col-md-6">
                        <Form.Group>
                            <Form.Label>Category Code</Form.Label>
                            <Form.Control
                                placeholder="Category Code"
                                type="text"
                                value={values.categoryCode}
                                name='categoryCode'
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Form.Group>
                        {errors.categoryCode && touched.categoryCode ? <span className='text-danger mt-2 d-block'>{errors.categoryCode}</span> : null}
                    </div>
                    {/* productCode */}
                    <div className="col-md-6">
                        <Form.Group>
                            <Form.Label>Category Name</Form.Label>
                            <Form.Control
                                placeholder="Category Name"
                                type="text"
                                name='categoryName'
                                value={values.categoryName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Form.Group>
                        {errors.categoryName && touched.categoryName ? <span className='text-danger mt-2 d-block'>{errors.categoryName}</span> : null}
                    </div>
                    {/* productName */}
                    <div className="col-md-6">
                        <Form.Group>
                            <Form.Label>Category Description</Form.Label>
                            <Form.Control
                                type="text"
                                name='categoryDescription'
                                placeholder="Category Description"
                                value={values.categoryDescription}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Form.Group>
                        {errors.categoryDescription && touched.categoryDescription ? <span className='text-danger mt-2 d-block'>{errors.categoryDescription}</span> : null}
                    </div>
                    {/* productDescription */}
                    <div className="col-md-6">
                        <Form.Group>
                            <Form.Label>Category Title</Form.Label>
                            <Form.Control
                                type="text"
                                name='categoryTitle'
                                placeholder="Category Title"
                                value={values.categoryTitle}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Form.Group>
                        {errors.categoryTitle && touched.categoryTitle ? <span className='text-danger mt-2 d-block'>{errors.categoryTitle}</span> : null}
                    </div>
                    {/* productTitle */}
                    <div className="col-md-6">
                        <Form.Group>
                            <Form.Label>Category Pre-Fix</Form.Label>
                            <Form.Control
                                type="text"
                                name='preFix'
                                placeholder="XXX-"
                                value={values.preFix}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Form.Group>
                        {errors.preFix && touched.preFix ? <span className='text-danger mt-2 d-block'>{errors.preFix}</span> : null}
                    </div>
                    {/* productTitle */}
                    <div className="col-md-6">
                        <Form.Group>
                            <Form.Label>Category Code Width</Form.Label>
                            <Form.Control
                                type="number"
                                name='productCodeWidth'
                                placeholder="Any Number 1~10"
                                value={values.productCodeWidth}
                                onChange={(e) => {
                                    // Enforce a maximum of 2 digits
                                    const newValue = e.target.value.slice(0, 2);
                                    handleChange({ target: { name: 'productCodeWidth', value: newValue } });
                                }}
                                onBlur={handleBlur}
                            />
                        </Form.Group>
                        {errors.productCodeWidth && touched.productCodeWidth ? <span className='text-danger mt-2 d-block'>{errors.productCodeWidth}</span> : null}
                    </div>
                    {/* category Width Code */}
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
                    <div className="col-md-12 imgdiv">
                        <Form.Group>
                            <Form.Label>Category Image</Form.Label>
                            <Form.Control
                                type="file"
                                accept="image/*"
                                multiple  // Allow multiple file selection
                                id="upload_input"
                                className="d-none"
                                ref={inputFileRef}
                                onChange={handleImageChange}
                            />
                        </Form.Group>
                        <div className="d-flex flex-wrap">
                            {values.imageResponseDTOs && values.imageResponseDTOs.map((image, index) => (
                                <div key={index} className="m-2 position-relative">
                                    {
                                        image.imageData == "" ?
                                            <img
                                                src={`${process.env.REACT_APP_IMAGE_URL}${companyId}/${image.imageName}`}
                                                alt={image.imageName}
                                                style={{ width: '100px', height: '100px' }}
                                                onError={Onerrorimg}
                                                loading='lazy'
                                            />
                                            :
                                            <img
                                                src={`data:image/png;base64,${image.imageData}`}
                                                alt={image.imageName}
                                                style={{ width: '100px', height: '100px' }}
                                                loading='lazy'
                                            />
                                    }

                                    <span
                                        className="position-absolute top-0 end-0 bg-danger rounded-circle text-white"
                                        onClick={() => handleImageDelete(index)}
                                    >
                                        <i className='fa fa-multiply'></i>
                                    </span>
                                </div>
                            ))}
                        </div>
                        <a href="#" className="imgholdingdiv" onClick={() => document.getElementById('upload_input').click()}>
                            Upload Images
                        </a>
                    </div>
                    {/* productImage */}
                    <div className="col-md-12 logintbn">
                        <button type="submit" className={`btn border border-secondarycolor rounded-pill px-3 c-secondarycolor ${isLoading ? 'loading' : ''}`} disabled={isLoading}>
                            {isLoading ? (
                                <div className="spinner-border c-primarycolor" role="status">
                                    <span className="visually-hidden">Saving Changes</span>
                                </div>
                            ) : (mode === 'add' ? 'Add Category' : 'Update Category')}
                        </button>
                    </div>
                </div>
            </Form>
        </>
    )
}
