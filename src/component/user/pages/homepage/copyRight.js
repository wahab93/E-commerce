import React from 'react'
import { Link } from 'react-router-dom'

export const CopyRight = ({getwebsiteDetails}) => {
    return (
        <div className="container-fluid copyright bg-secondarycolor py-4 border-top border-primarycolor">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 text-center mb-3 mb-md-0">
                        <span className="text-white"><Link to="/" className='text-white'><i className="fas fa-copyright text-white me-2"></i>{getwebsiteDetails.webSiteName}</Link>, All right reserved.</span>
                    </div>
                </div>
            </div>
        </div>
    )
}