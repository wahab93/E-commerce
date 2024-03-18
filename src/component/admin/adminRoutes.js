import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Dashboard } from './dashboard'
import ProductListing from './products/productlisting'
import Categorylisting from './productCategories/categorylisting'
import ProductBrandlisting from './productBrand/productBrandlisting'
import ProductTypelisting from './productType/productTypelisting'
import { Orderslisting } from './transections/orders/orderslisting'
import { Websetting } from './websettings/websetting'
export const AdminRoutes = () => {
    return (
        <Routes>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/productlist' element={<ProductListing />} />
            <Route path='/categorylisting' element={<Categorylisting />} />
            <Route path='/productBrandlisting' element={<ProductBrandlisting />} />
            <Route path='/productTypelisting' element={<ProductTypelisting />} />
            <Route path='/orders' element={<Orderslisting />} />
            <Route path='/websettings' element={<Websetting />} />
        </Routes>
    )
}