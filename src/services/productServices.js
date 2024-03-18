import { apiHelper } from "../helper/apiHelper";

export const productServices = {
    getProducts: (apiProducts) => apiHelper.get(apiProducts),
    getProductById: (apiProductById, productId) => apiHelper.get(`${apiProductById}${productId}`),
    getProductCategories: (apiCategory) => apiHelper.get(apiCategory),
    addEditProductCategory: (addEditProductCategory, categoryData) => apiHelper.post(addEditProductCategory, { ...categoryData }),
    getProductCategoryById: (getCategoryById, selectedCategoryId) => apiHelper.get(`${getCategoryById}${selectedCategoryId}`),
    addEditProduct: (addEditProduct, productData) => apiHelper.post(addEditProduct, { ...productData }),
    getProductType: (apiProductType) => apiHelper.get(apiProductType),
    addEditProductType: (addEditProductType, productTypeData) => apiHelper.post(addEditProductType, { ...productTypeData }),
    getProductBrand: (apiProductBrand) => apiHelper.get(apiProductBrand),
    addEditProductBrand: (addEditProductBrand, productBrandData) => apiHelper.post(addEditProductBrand, { ...productBrandData })
}


// import { apiHelper } from "../helper/apiHelper";

// export const productServices = {
//     getProducts,
//     getProductById,
//     getProductCategories,
//     addEditProductBrand,
//     getProductBrand,
//     getProductType,
//     addEditProductType,
//     addEditProductCategory,
//     getProductList,
//     addEditProduct,
//     getProductCategoryById
// }


// // get Products for front end
// function getProducts(apiProducts) {
//     return apiHelper.get(apiProducts);
// }

// // get Product by ID for front end
// function getProductById(apiProductById, productId) {
//     const url = `${apiProductById}${productId}`; // Construct the URL using the base API endpoint (apiProducts)
//     return apiHelper.get(url);
// }


// // get Product Category start
// function getProductCategories(apiCategory) {
//     return apiHelper.get(apiCategory);
// }
// function addEditProductCategory(addEditProductCategory, categoryData) {
//     return apiHelper.post(addEditProductCategory, {
//         categoryId: categoryData.categoryId,
//         categoryCode: categoryData.categoryCode,
//         companyId: categoryData.companyId,
//         categoryName: categoryData.categoryName,
//         categoryDescription: categoryData.categoryDescription,
//         categoryTitle: categoryData.categoryTitle,
//         preFix: categoryData.preFix,
//         productCodeWidth: categoryData.productCodeWidth,
//         isActive: categoryData.isActive,
//         createdBy: categoryData.createdBy,
//         createdOn: categoryData.createdOn,
//         isNew: categoryData.isNew
//     })
//         .then(categoryData => {
//             return categoryData;
//         });
// }
// // get ProductCategory so that change the code by ID
// function getProductCategoryById(getCategoryById, selectedCategoryId) {
//     const url = `${getCategoryById}${selectedCategoryId}`; // Construct the URL using the base API endpoint (apiProducts)
//     return apiHelper.get(url);
// }


// // get Product Category end

// // get Product Listing start
// function getProductList(apiProducts) {
//     return apiHelper.get(apiProducts);
// }
// function addEditProduct(addEditProduct, productData) {
//     return apiHelper.post(addEditProduct, {
//         productId: productData.productId,
//         productCode: productData.productCode,
//         companyId: productData.companyId,
//         productName: productData.productName,
//         productUOM: productData.productUOM,
//         productDescription: productData.productDescription,
//         productTitle: productData.productTitle,
//         categoryId: productData.categoryId,
//         categoryName: productData.categoryName,
//         productTypeId: productData.productTypeId,
//         productTypeName: productData.productTypeName,
//         productBrandId: productData.productBrandId,
//         productBrandName: productData.productBrandName,
//         newPrice: productData.newPrice,
//         oldPrice: productData.oldPrice,
//         productImage: productData.productImage,
//         isActive: productData.isActive,
//         createdBy: productData.createdBy,
//         createdOn: productData.createdOn,
//         isNew: productData.isNew,
//         currency: productData.currency,
//     })
//         .then(productData => {
//             return productData;
//         });
// }
// // get Product Listing end


// // get Product Type start
// function getProductType(apiProductType) {
//     return apiHelper.get(apiProductType);
// }
// function addEditProductType(addEditProductType, ProductTypeData) {
//     return apiHelper.post(addEditProductType, {
//         productTypeId: ProductTypeData.productTypeId,
//         productTypeCode: ProductTypeData.productTypeCode,
//         companyId: ProductTypeData.companyId,
//         productTypeName: ProductTypeData.productTypeName,
//         productTypeDescription: ProductTypeData.productTypeDescription,
//         productTypeTitle: ProductTypeData.productTypeTitle,
//         isActive: ProductTypeData.isActive,
//         createdBy: ProductTypeData.createdBy,
//         createdOn: ProductTypeData.createdOn,
//         isNew: ProductTypeData.isNew
//     })
//         .then(ProductTypeData => {
//             return ProductTypeData;
//         });
// }
// // get Product Type end


// // Product Brand Start
// function getProductBrand(apiProductBrand) {
//     return apiHelper.get(apiProductBrand);
// }

// function addEditProductBrand(addEditProductBrand, ProductBrandData) {
//     return apiHelper.post(addEditProductBrand, {
//         productBrandId: ProductBrandData.productBrandId,
//         productBrandCode: ProductBrandData.productBrandCode,
//         companyId: ProductBrandData.companyId,
//         productBrandName: ProductBrandData.productBrandName,
//         productBrandDescription: ProductBrandData.productBrandDescription,
//         productBrandTitle: ProductBrandData.productBrandTitle,
//         isActive: ProductBrandData.isActive,
//         createdBy: ProductBrandData.createdBy,
//         createdOn: ProductBrandData.createdOn,
//         isNew: ProductBrandData.isNew
//     })
//         .then(ProductBrandData => {
//             return ProductBrandData;
//         });

// }

// // Product Brand End