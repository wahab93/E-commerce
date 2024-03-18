import * as yup from 'yup';

export const loginSchema = yup.object({
    userName: yup.string().required('Please Enter Your Name'),
    userPassword: yup.string().min(2).required('Please Enter Your Password'),
})

export const productTypeSchema = yup.object({
    productTypeCode: yup.number().required('Please Enter Product Type Code'),
    productTypeName: yup.string().required('Please Enter Product Type Name'),
    productTypeDescription: yup.string().required('Please Enter product Type Description'),
    productTypeTitle: yup.string().required('Please Enter Product Type Title'),
})

export const productBrandSchema = yup.object({
    productBrandCode: yup.number().required('Please Enter Product Brand Code'),
    productBrandName: yup.string().required('Please Enter Product Brand Name'),
    productBrandDescription: yup.string().required('Please Enter product Brand Description'),
    productBrandTitle: yup.string().required('Please Enter Product Brand Title'),
})


export const productCategorySchema = yup.object({
    categoryCode: yup.number().required('Please Enter Product Category Code'),
    categoryName: yup.string().required('Please Enter Product Category Name'),
    categoryDescription: yup.string().required('Please Enter product Category Description'),
    categoryTitle: yup.string().required('Please Enter Product Category Title'),
    preFix: yup.string().required('Please Enter Product Category Pre-Fix'),
    productCodeWidth: yup.number().max(2).required('Please Enter Product Category Code Width'),
})


export const productSchema = yup.object({
    categoryId: yup.string().required('Category is required'),
    productTypeId: yup.string().required('Product Type is required'),
    productBrandId: yup.string().required('Product Brand is required'),
    productName: yup.string().required('Product Name is required'),
    productDescription: yup.string().required('Product Description is required'),
    productTitle: yup.string().required('Product Title is required'),
    oldPrice: yup.number().required('Old Price is required'),
    newPrice: yup.number().required('New Price is required'),
    productUOM: yup.string().required('Product UOM is required'),
})

export const checkoutValidationSchema = yup.object().shape({
    customerName: yup.string().required('Name is required.'),
    customerEmail: yup.string().email('Invalid email address.').required('Email is required.'),
    phoneNo: yup.string().required('Phone number is required.'),
    personalNo: yup.string().required('Personal number is required.'),
    postalAddress: yup.string().required('Street is required.'),
    postalCode: yup.string().required('Postal code is required.'),
    city: yup.string().required('City is required.'),
    cardNumber: yup.string().required('Card Number is required.'),
    cardExpirationMonth: yup.string().required('Expiration Month is required.'),
    cardExpirationYear: yup.string().required('Expiration Year is required.'),
    cvc: yup.string().required('CVC is required.'),
});



export const websetting = yup.object({
    webSiteName: yup.string().required('Please Enter Website Name'),
    webSiteDescription: yup.string().required('Please Enter Web Site Description'),
    primaryColor: yup.string().required('Please Enter Light Color'),
    secondaryColor: yup.string().required('Please Enter Dark Color'),
    bannerText: yup.string().required('Please Enter Hero Banner Text'),
    contentBannerText: yup.string().required('Please Enter Content Banner Text'),
    companyAddress: yup.string().required('Please Enter Address'),
    companyEmail: yup.string().email('Invalid email address.').required('Email is required.'),
    companyPhone : yup.number().required('Please Enter Phone number'),
})

