import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import CartSummary from './cartSummary';
import BillingDetails from './billingDetails';
import { orderServices } from '../../../../services/orderServices';
import { useProductContext } from '../../../common/api/provider';
import usePageTitle from '../../../common/usePageTitle';
import { Breadcrumb } from '../../breadcrumb';

export const Checkout = () => {
    usePageTitle('CheckOut');
    const { postOrder, companyId, LocationId } = useProductContext();
    const state = useSelector((state) => state.carthandler);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // calculating the Total amount
    const total = state.reduce((acc, product) => acc + product.newPrice * product.qty, 0);

    const currencySymbol = state.length > 0 ? state[0].currency : "";

    const formattedOrdersDetails = state.map((product) => {
        return {
            orderDetailId: 1,
            locationId: LocationId,
            orderId: 0,
            productId: product.productId,
            productPrice: product.newPrice,
            quantity: product.qty,
            discountPrice: product.discountPrice,
            totalPrice: product.newPrice * product.qty,
        };
    });
    const formattedCustomerResponseDTO = {
        customerId: 1,
        customerName: "",
        customerEmail: "",
        phoneNo: "",
        personalNo: "",
        postalAddress: "",
        city: "",
        postalCode: ''
    };
    // Create state variable for formatted customerResponseDTO
    const [customerResponseDTOData, setCustomerResponseDTOData] = useState(formattedCustomerResponseDTO);

    // Create state variables for individual validation messages
    const [validationMessages, setValidationMessages] = useState({
        customerName: '',
        customerEmail: '',
        phoneNo: '',
        personalNo: '',
        postalAddress: '',
        postalCode: '',
        city: '',
        cardNumber: '',
        cardExpirationMonth: '',
        cardExpirationYear: '',
        cvc: '',
    });

    const initialOrderState = {
        orderId: 1,
        orderCode: '',
        locationId: LocationId,
        companyId: companyId,
        orderDate: new Date().toISOString(),
        paymentTypeId: 0,
        paymentDescription: "stripe",
        orderStatusId: 1,
        customerId: 0,
        additionalNotes: "",
        isActive: true,
        acceptTermsConditions: true,
        stripeCustomerId: "string",
        stripeChargeId: "string",
        createdBy: "Test User",
        createdOn: new Date().toISOString(),
        isNew: true,
        cardNumber: "",
        cardExpirationMonth: "",
        cardExpirationYear: "",
        cvc: "",
        deliveryType: 'swermi',
        totalCartAmount: total,
        customerResponseDTO: customerResponseDTOData,
        ordersDetails: formattedOrdersDetails
    }
    const [order, setorder] = useState(initialOrderState)
    const resetForm = () => {
        setorder(initialOrderState);
    };

    // clearing the validate meassges
    const clearValidationMessage = (name) => {
        setValidationMessages((prevValidationMessages) => ({
            ...prevValidationMessages,
            [name]: '',
        }));
    };
    // clearing the validate meassges end

    // handling the inputs
    const handleInput = (e) => {
        const name = e.target.name;
        let value = e.target.value;

        clearValidationMessage(name);

        // Define maxLength for specific fields
        const maxLengthMap = {
            cardNumber: 16, // Example: Limit cardNumber to 16 characters
            cvc: 3, // Example: Limit cvc to 3 characters
            cardExpirationMonth: 2,
            cardExpirationYear: 4,
        };

        // Check if the field has a maxLength defined
        if (maxLengthMap[name]) {
            // Limit the length of the value
            value = value.slice(0, maxLengthMap[name]);
        }

        if (name.startsWith("customerResponseDTO.") || name.startsWith("ordersDetails.")) {
            const [prefix, field] = name.split(".");
            setorder((prevOrder) => ({
                ...prevOrder,
                [prefix]: {
                    ...prevOrder[prefix],
                    [field]: value,
                },
            }));
            // Clear the validation message for the corresponding field
            clearValidationMessage(field);
        } else {
            setorder((prevOrder) => ({
                ...prevOrder,
                [name]: value,
            }));
        }
    };


    // handling the inputs ends


    const handleOrder = async (e) => {
        e.preventDefault();

        // Check if any input fields are empty and update the individual validation messages
        const updatedValidationMessages = {
            customerName: !order.customerResponseDTO.customerName ? 'Name is required.' : '',
            customerEmail: !order.customerResponseDTO.customerEmail ? 'Email is required.' : '',
            phoneNo: !order.customerResponseDTO.phoneNo ? 'Phone number is required.' : '',
            personalNo: !order.customerResponseDTO.personalNo ? 'Personal number is required.' : '',
            postalAddress: !order.customerResponseDTO.postalAddress ? 'Street is required.' : '',
            postalCode: !order.customerResponseDTO.postalCode ? 'Postal code is required.' : '',
            city: !order.customerResponseDTO.city ? 'City is required.' : '',
            cardNumber: !order.cardNumber ? 'Card Number is required.' : '',
            cardExpirationMonth: !order.cardExpirationMonth ? 'Expiration Month is required.' : '',
            cardExpirationYear: !order.cardExpirationYear ? 'Expiration Year is required.' : '',
            cvc: !order.cvc ? 'CVC is required.' : '',
        };

        setValidationMessages(updatedValidationMessages);

        // Check if any validation messages are present and prevent form submission if needed
        const hasEmptyField = Object.values(updatedValidationMessages).some((message) => message !== '')
        if (!hasEmptyField) {
            setIsLoading(true)
            try {
                const response = await orderServices.postorder(postOrder, order);
                if (response.data && response.data.message) {
                    swal("Success", `Your Order is Placed. \nOrderCode: ${response.data.message}`, "success");
                    resetForm();
                    dispatch({ type: 'CLEAR_CART' });
                    navigate('/');
                } else {
                    swal("Oops!", "Failed to place order: No message returned from the server.", "error");
                    throw new Error(`HTTP error! Status: ${response.data.statusCode}`);
                }
            } catch (error) {
                console.error('Error:', error);
                setIsLoading(false);
                swal("Oops!", "Failed to place order: An error occurred.", "error");
            }
        }
    }

    return (
        <>
            <div className="container-fluid page-header py-4 bg-light">
                <div className='container'>
                    <h1 className="c-secondarycolor display-6">Checkout</h1>
                    <Breadcrumb paths={['Home', 'Checkout']} />
                </div>
            </div>
            <div className="container-fluid py-5">
                <div className="container pb-md-5 py-3 px-0 px-md-0">
                    <h1 className="mb-4 display-6 c-secondarycolor">Billing details</h1>
                    <form onSubmit={handleOrder} method='POST'>
                        <div className="row">
                            <div className="col-md-12 col-lg-6 col-xl-7">
                                <BillingDetails order={order} validationMessages={validationMessages} handleInput={handleInput} />
                            </div>
                            <div className="col-md-12 col-lg-6 col-xl-5">
                                <CartSummary state={state} total={total} companyId={companyId} isLoading={isLoading} />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}