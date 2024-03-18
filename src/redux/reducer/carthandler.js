const carthandler = (state = [], action) => {
    const product = action.payload
    switch (action.type) {
        case "ADDITEM":
            // check if product is already exist
            const exist = state.find((x) => x.productId === product.productId)
            if (exist) {
                return state.map((x) => x.productId === product.productId ? { ...x, qty: x.qty + 1 } : x)
            } else {
                const product = action.payload
                return [
                    ...state,
                    {
                        ...product,
                        qty: 1
                    }
                ]
            }
            break;
        case "DELITEM":
            const exit1 = state.find((x) => x.productId === product.productId);
            if (exit1.qty === 1) {
                return state.filter((x) => x.productId !== exit1.productId);
            }
            else {
                return state.map((x) =>
                    x.productId === product.productId ? { ...x, qty: x.qty - 1 } : x
                );
            }
            break;
        case "DELETE_PRODUCT_FROM_CART":
            // Filter out the product from the cart
            return state.filter((product) => product.productId !== action.payload.productId);

        case "CLEAR_CART":
            // Clear the cart by returning an empty array
            return [];
        default:
            return state
            break;
    }
}

export default carthandler