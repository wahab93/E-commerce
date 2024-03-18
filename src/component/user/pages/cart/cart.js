import React from 'react';
import { useSelector } from 'react-redux';
import CartItem from './cartItems';
import EmptyCart from './emptyCart';
import usePageTitle from '../../../common/usePageTitle';

export const Cart = () => {
    usePageTitle('Cart Details');
    const state = useSelector((state) => state.carthandler);

    return (
        <>
            {state.length === 0 ? <EmptyCart /> : null}
            {state.length != 0 && <CartItem data={state} />}
        </>
    );
};