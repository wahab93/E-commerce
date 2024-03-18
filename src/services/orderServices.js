// import { apiHelper } from "../helper/apiHelper";

// export const orderServices = {
//     getAllOrder: (apiOrder) => apiHelper.get(apiOrder),
//     postorder: (postOrder, order) => apiHelper.post(postOrder, { ...order }),
//     filterOrders: (orderFilter, filters) => {
//         const url = `${orderFilter}${filters.orderCode}&FromDate=${filters.fromDate}&ToDate=${filters.toDate}`;
//         return apiHelper.get(url);
//     }
// };


import { apiHelper } from "../helper/apiHelper";


export const orderServices = {
    postorder,
    getAllOrder,
    filterOrders
}


function getAllOrder(apiOrder) {
    return apiHelper.get(apiOrder);
}

function postorder(postOrder, raw) {
    return apiHelper.post(postOrder, {
        orderId: raw.orderId,
        orderCode: raw.orderCode,
        companyId: raw.companyId,
        locationId: raw.locationId,
        orderDate: raw.orderDate,
        paymentTypeId: raw.paymentTypeId,
        paymentDescription: raw.paymentDescription,
        orderStatusId: raw.orderStatusId,
        customerId: raw.customerId,
        additionalNotes: raw.additionalNotes,
        isActive: raw.isActive,
        acceptTermsConditions: raw.acceptTermsConditions,
        stripeCustomerId: raw.stripeCustomerId,
        stripeChargeId: raw.stripeChargeId,
        createdBy: raw.createdBy,
        createdOn: raw.createdOn,
        isNew: raw.isNew,
        cardNumber: raw.cardNumber,
        cardExpirationMonth: raw.cardExpirationMonth,
        cardExpirationYear: raw.cardExpirationYear,
        cvc: raw.cvc,
        deliveryType: raw.deliveryType,
        totalCartAmount: raw.totalCartAmount,
        customerResponseDTO: raw.customerResponseDTO,
        ordersDetails: raw.ordersDetails,
    })
        .then(raw => {
            return raw;
        });
}



function filterOrders(orderFilter, filters) {
    const url = `${orderFilter}${filters.orderCode}&FromDate=${filters.fromDate}&ToDate=${filters.toDate}`; // Construct the URL using the base API endpoint (apiProducts)
    return apiHelper.get(url);
}
// ${filters.orderCode}&FromDate=${filters.fromDate}&ToDate=${filters.toDate}