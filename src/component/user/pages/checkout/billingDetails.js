import React from 'react';

const BillingDetails = ({ order, validationMessages, handleInput, }) => {
    return (
        <>
            <div className="row">
                <div className="col-md-12 col-lg-6">
                    <div className="form-item w-100">
                        <label className="form-label my-2">Enter Name<sup className='text-danger'>*</sup></label>
                        <input type="text"
                            className="form-control"
                            name='customerResponseDTO.customerName'
                            placeholder="Name*"
                            value={order.customerResponseDTO.customerName}
                            onChange={handleInput}
                        />
                        <div className="text-danger" style={{ fontSize: '13px' }}>{validationMessages.customerName}</div>
                    </div>
                </div>
                <div className="col-md-12 col-lg-6">
                    <div className="form-item w-100">
                        <label className="form-label my-2">Enter Email<sup className='text-danger'>*</sup></label>
                        <input type="email"
                            className="form-control"
                            name='customerResponseDTO.customerEmail'
                            placeholder="Email*"
                            value={order.customerResponseDTO.customerEmail}
                            onChange={handleInput}
                        />
                        <div className="text-danger" style={{ fontSize: '13px' }}>{validationMessages.customerEmail}</div>
                    </div>
                </div>
            </div>
            <div className="form-item">
                <label className="form-label my-2">Phone Number<sup className='text-danger'>*</sup></label>
                <input type='number'
                    className="form-control"
                    name='customerResponseDTO.phoneNo'
                    placeholder="Phone*"
                    value={order.customerResponseDTO.phoneNo}
                    onChange={handleInput}
                />
                <div className="text-danger" style={{ fontSize: '13px' }}>{validationMessages.phoneNo}</div>
            </div>
            <div className="form-item">
                <label className="form-label my-2">Personal Phone No<sup className='text-danger'>*</sup></label>
                <input type='number'
                    className="form-control"
                    name='customerResponseDTO.personalNo'
                    placeholder="Personal No*"
                    value={order.customerResponseDTO.personalNo}
                    onChange={handleInput}
                />
                <div className="text-danger" style={{ fontSize: '13px' }}>{validationMessages.personalNo}</div>
            </div>
            <div className="form-item">
                <label className="form-label my-2">Postal Address<sup className='text-danger'>*</sup></label>
                <input type='text'
                    className="form-control"
                    name='customerResponseDTO.postalAddress'
                    placeholder="Street*"
                    value={order.customerResponseDTO.postalAddress}
                    onChange={handleInput}
                />
                <div className="text-danger" style={{ fontSize: '13px' }}>{validationMessages.postalAddress}</div>
            </div>
            <div className="form-item">
                <label className="form-label my-2">Postal Code<sup className='text-danger'>*</sup></label>
                <input type='number'
                    className="form-control"
                    name='customerResponseDTO.postalCode'
                    placeholder="Postal Code*"
                    value={order.customerResponseDTO.postalCode}
                    onChange={handleInput}
                />
                <div className="text-danger" style={{ fontSize: '13px' }}>{validationMessages.postalCode}</div>
            </div>
            <div className="form-item">
                <label className="form-label my-2">City<sup className='text-danger'>*</sup></label>
                <input type='text'
                    className="form-control"
                    name='customerResponseDTO.city'
                    placeholder="City*"
                    value={order.customerResponseDTO.city}
                    onChange={handleInput}
                />
                <div className="text-danger" style={{ fontSize: '13px' }}>{validationMessages.city}</div>
            </div>
            <div className="form-item">
                <label className="form-label my-2">Additional Notes</label>
                <textarea
                    name='additionalNotes'
                    className='form-control'
                    value={order.additionalNotes}
                    cols="30" rows="6"
                    placeholder="Other Notes (Optional)"
                    onChange={handleInput}>
                </textarea>
            </div>
            <h4 className="my-3 c-secondarycolor">Payment</h4>
            <div className="row gy-3">
                <div className="col-md-5">
                    <input type='number'
                        className="form-control"
                        name='cardExpirationMonth'
                        placeholder="MM"
                        maxLength={2}
                        value={order.cardExpirationMonth}
                        onChange={handleInput}
                    />
                    <div className="text-danger" style={{ fontSize: '13px' }}>{validationMessages.cardExpirationMonth}</div>
                </div>
                <div className="col-md-5">
                    <input type='number'
                        className="form-control"
                        name='cardExpirationYear'
                        placeholder="YYYY"
                        maxLength={4}
                        value={order.cardExpirationYear}
                        onChange={handleInput}
                    />
                    <div className="text-danger" style={{ fontSize: '13px' }}>{validationMessages.cardExpirationYear}</div>
                </div>
                <div className="col-md-2">
                    <input type='number'
                        className="form-control"
                        name='cvc'
                        placeholder="CVV"
                        value={order.cvc}
                        maxLength={3}
                        onChange={handleInput}
                    />
                    <div className="text-danger" style={{ fontSize: '13px' }}>{validationMessages.cvc}</div>
                </div>
                <div className="col-md-12">
                    <input type='number'
                        className="form-control"
                        name='cardNumber'
                        placeholder="Card Number"
                        value={order.cardNumber}
                        onChange={handleInput}
                    />
                    <div className="text-danger" style={{ fontSize: '13px' }}>{validationMessages.cardNumber}</div>
                </div>
            </div>
        </>
    );
};

export default BillingDetails;
