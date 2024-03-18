import React from 'react'
import { Form } from 'react-bootstrap';

export const ProductForm = (props) => {
    const {
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
    } = props;
    return (
        <Form onSubmit={handleSubmit}>
            <div className="row g-3">
                <div className="col-md-6">
                    <Form.Group>
                        <Form.Label>Category</Form.Label>
                        <select
                            className='form-select'
                            value={values.categoryId}
                            onChange={handleCategoryChange} // Call the modified handleCategoryChange function
                            onBlur={handleBlur('categoryId')}
                        >
                            <option>Please Select</option>
                            {
                                categories.map((e) => {
                                    return (
                                        <>
                                            <option key={e.categoryId} value={e.categoryId}>{e.categoryName}</option>
                                        </>
                                    )
                                })
                            }
                        </select>
                    </Form.Group>
                    {errors.categoryId && touched.categoryId ? <span className='text-danger mt-2 d-block'>{errors.categoryId}</span> : null}
                </div>
                {/* product Category */}
                <div className="col-md-6">
                    <Form.Group>
                        <Form.Label>Product Type</Form.Label>
                        <select
                            className='form-select'
                            value={values.productTypeId}
                            onChange={(e) => setFieldValue('productTypeId', e.target.value)}
                            onBlur={handleBlur('productTypeId')}
                        >
                            <option>Please Select</option>
                            {
                                productType.map((e) => {
                                    return (
                                        <>
                                            <option value={e.productTypeId}>{e.productTypeName}</option>
                                        </>
                                    )
                                })
                            }
                        </select>
                    </Form.Group>
                    {errors.productTypeId && touched.productTypeId ? <span className='text-danger mt-2 d-block'>{errors.productTypeId}</span> : null}
                </div>
                {/* productType */}
                <div className="col-md-6">
                    <Form.Group>
                        <Form.Label>Product Brand</Form.Label>
                        <select
                            className='form-select'
                            value={values.productBrandId}
                            onChange={(e) => setFieldValue('productBrandId', e.target.value)}
                            onBlur={handleBlur('productBrandId')}
                        >
                            <option>Please Select</option>
                            {
                                productBrand.map((e) => {
                                    return (
                                        <>
                                            <option value={e.productBrandId}>{e.productBrandName}</option>
                                        </>
                                    )
                                })
                            }
                        </select>
                    </Form.Group>
                    {errors.productBrandId && touched.productBrandId ? <span className='text-danger mt-2 d-block'>{errors.productBrandId}</span> : null}
                </div>
                {/* productBrand */}
                <div className="col-md-6">
                    <Form.Group>
                        <Form.Label>Product Code</Form.Label>
                        <Form.Control
                            placeholder="Product Code"
                            type="text"
                            value={values.productCode}
                            readOnly
                        />
                    </Form.Group>
                </div>
                {/* productCode */}
                <div className="col-md-6">
                    <Form.Group>
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control
                            placeholder="Product Name"
                            type="text"
                            name='productName'
                            value={values.productName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </Form.Group>
                    {errors.productName && touched.productName ? <span className='text-danger mt-2 d-block'>{errors.productName}</span> : null}
                </div>
                {/* productName */}
                <div className="col-md-6">
                    <Form.Group>
                        <Form.Label>Product Description</Form.Label>
                        <Form.Control
                            type="text"
                            name='productDescription'
                            placeholder="Product Description"
                            value={values.productDescription}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </Form.Group>
                    {errors.productDescription && touched.productDescription ? <span className='text-danger mt-2 d-block'>{errors.productDescription}</span> : null}
                </div>
                {/* productDescription */}
                <div className="col-md-6">
                    <Form.Group>
                        <Form.Label>Product Title</Form.Label>
                        <Form.Control
                            type="text"
                            name='productTitle'
                            placeholder="Product Title"
                            value={values.productTitle}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </Form.Group>
                    {errors.productTitle && touched.productTitle ? <span className='text-danger mt-2 d-block'>{errors.productTitle}</span> : null}
                </div>
                {/* productTitle */}
                <div className="col-md-6">
                    <Form.Group>
                        <Form.Label>Old Price</Form.Label>
                        <Form.Control
                            type="number"
                            name='oldPrice'
                            placeholder="Old Price"
                            value={values.oldPrice}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </Form.Group>
                    {errors.oldPrice && touched.oldPrice ? <span className='text-danger mt-2 d-block'>{errors.oldPrice}</span> : null}
                </div>
                {/* productOldPrice */}
                <div className="col-md-6">
                    <Form.Group>
                        <Form.Label>New Price</Form.Label>
                        <Form.Control
                            type="number"
                            name='newPrice'
                            placeholder="New Price"
                            value={values.newPrice}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </Form.Group>
                    {errors.newPrice && touched.newPrice ? <span className='text-danger mt-2 d-block'>{errors.newPrice}</span> : null}
                </div>
                {/* productNewPrice */}
                <div className="col-md-6">
                    <Form.Group>
                        <Form.Label>Product UOM</Form.Label>
                        <select
                            className='form-select'
                            value={values.productUOM}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name='productUOM'
                        >
                            <option>Please Select</option>
                            <option value='kg'>KG</option>
                            <option value='ltr'>LTR</option>
                            <option value='pcs'>PCS</option>
                            <option value='pkg'>PKG</option>
                            <option value='dozen'>DOZEN</option>
                        </select>
                    </Form.Group>
                    {errors.productUOM && touched.productUOM ? <span className='text-danger mt-2 d-block'>{errors.productUOM}</span> : null}
                </div>
                {/* productUOM */}
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
                <div className="col-md-12">
                    <Form.Group>
                        <Form.Label>Product Image</Form.Label>
                        <Form.Control
                            type="file"
                            accept="image/*"
                            id="upload_input"
                            className="d-none"
                            onChange={handleImageChange}
                        />
                    </Form.Group>
                    <a href="#" className="imgholdingdiv" onClick={() => document.getElementById('upload_input').click()}>
                        <img
                            src={values.imageData ? `data:image/png;base64,${values.imageData}` : values.productImage}
                            id="upload_img"
                            alt="uploaded image"
                            loading='lazy'
                        />
                    </a>
                </div>
                {/* productImage */}
                <div className="col-md-6 logintbn">
                    <button type="submit" className={`btn border border-secondarycolor rounded-pill px-3 c-secondarycolor ${isLoading ? 'loading' : ''}`} disabled={isLoading}>
                        {isLoading ? (
                            <div className="spinner-border c-primarycolor" role="status">
                                <span className="visually-hidden">Saving Changes</span>
                            </div>
                        ) : (mode === 'add' ? 'Add Product' : 'Update Product')}
                    </button>
                </div>
            </div>
        </Form>
    )
}