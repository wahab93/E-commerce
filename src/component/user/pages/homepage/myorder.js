import React from 'react'
import { Breadcrumb } from '../../breadcrumb'

export const Myorder = () => {
    return (
        <>
            <div className="container-fluid page-header py-4 bg-light">
                <h1 className="text-center c-secondarycolor display-6">My Orders</h1>
                <Breadcrumb paths={['Home', 'My Orders']} />
            </div>
            <div className="container-fluid contact py-5">
                <div className="container pb-md-5 py-3 px-0 px-md-0">
                    <div className="p-md-5 p-2 bg-light rounded">
                        <h1>My Orders</h1>
                    </div>
                </div>
            </div>
        </>
    )
}
