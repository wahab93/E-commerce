import React from 'react'
import { Breadcrumb } from '../user/breadcrumb'
import { Link } from 'react-router-dom'

export const NoPage = () => {
    return (
        <>
            <div className="container-fluid page-header py-4 bg-light">
                <div className='container'>
                    <h1 className="c-secondarycolor display-6">404 Error</h1>
                    <Breadcrumb paths={['Home', 'No page Page']} />
                </div>
            </div>
            <div className="container-fluid py-5">
                <div className="container pb-md-5 py-3 px-0 px-md-0 text-center">
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <i className="bi bi-exclamation-triangle display-1 text-secondary"></i>
                            <h1 className="display-1 c-primarycolor">404</h1>
                            <h1 className="mb-4 c-secondarycolor">Page Not Found</h1>
                            <p className="mb-4">We’re sorry, the page you have looked for does not exist in our website! Maybe go to our home page or try to use a search?</p>
                            <Link to='/' className="btn border-secondary rounded-pill py-3 px-5">Go Back To Home</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}