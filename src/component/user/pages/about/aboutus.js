import React from 'react'
import usePageTitle from '../../../common/usePageTitle'
import { Breadcrumb } from '../../breadcrumb';
import { Onerrorimg } from '../../../common/onerrorimg';
import { useProductContext } from '../../../common/api/provider';

export const Aboutus = ({ getwebsiteDetails }) => {
    usePageTitle('About Us');
    const { companyId } = useProductContext();
    const getlogoimage = getwebsiteDetails.imageResponseDTOs?.[0]?.imageName;
    return (
        <>
            <div className="container-fluid page-header py-4 bg-light" data-aos="fade-up">
                <div className='container'>
                    <h1 className="c-secondarycolor display-6">About Us</h1>
                    <Breadcrumb paths={['Home', 'About Us']} />
                </div>
            </div>
            <div className='container-fluid fruite py-md-5 py-3'>
                <div className="container py-3 px-0">
                    <div className="row">
                        <div className="col-md-6">
                            <img
                                src={`${process.env.REACT_APP_IMAGE_URL}${companyId}/${getlogoimage}`}
                                className="d-block"
                                alt='logo image'
                                onError={Onerrorimg}
                                loading='lazy'
                            />
                        </div>
                        <div className="col-md-6 my-auto">
                            <h3 className='mb-3'>EXHIBITION CLOSING SOON</h3>
                            <p className='my-5'>
                                The Fondation Cartier pour l’art contemporain and The Shed present the North American debut of The Yanomami Struggle, a comprehensive exhibition dedicated to the collaboration between artist and activist Claudia Andujar and the Yanomami people, one of the largest Indigenous groups living in Amazonia today. On view through April 16, 2023.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}