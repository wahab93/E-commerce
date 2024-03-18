import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from './pages/homepage/home'
import { Products } from './pages/products/products'
import { Product } from './pages/singleProduct/product'
import { Register } from '../common/register'
import { Aboutus } from './pages/about/aboutus'
import { Login } from '../common/login'
import { Cart } from '../user/pages/cart/cart'
import { Checkout } from './pages/checkout/checkout'
import { Contactus } from './pages/contact/contactus'
import { NoPage } from '../common/noPage'
import { Myorder } from './pages/homepage/myorder'
import { useSelector } from 'react-redux'

export const UserRoutes = ({ getwebsiteDetails }) => {
    const stateuser = useSelector((state) => state.userinfihandler.user);
    
    return (
        <Routes>
            <Route path='/' element={<Home getwebsiteDetails={getwebsiteDetails} />} />
            <Route path='/products' element={<Products />} />
            <Route path='/products/:productId' element={<Product />} />
            <Route path='/register' element={<Register />} />
            <Route path='/aboutus' element={<Aboutus getwebsiteDetails={getwebsiteDetails}/>} />
            <Route path='/login' element={<Login />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/contactus' element={<Contactus getwebsiteDetails={getwebsiteDetails}/>} />
            {stateuser && <Route path='/myorders' element={<Myorder />} />}
            <Route path='/*' element={<NoPage />} />
        </Routes>
    )
}