import React, { useEffect, useState } from 'react'
import { Adminsearch } from './commoncomponent/adminsearch'
import { AdminRoutes } from './adminRoutes'
import { AdminSidePenel } from './adminSidePenel'
import { useSelector } from 'react-redux'
import { useProductContext } from '../common/api/provider'
import { Onerrorimg } from '../common/onerrorimg'

// Define the Admin component
export const Admin = ({ getwebsiteDetails }) => {
    const { companyId } = useProductContext();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const stateisadmin = useSelector((state) => state.userinfihandler.isAdmin);


    // const getlogoimage = getwebsiteDetails.imageResponseDTOs[0].imageName;
    const getlogoimage = getwebsiteDetails.imageResponseDTOs?.[0]?.imageName;


    // Use useEffect to add or remove 'admin' id from the body tag based on isAdmin value
    useEffect(() => {
        if (stateisadmin) {
            document.body.id = 'admin'; // Add 'admin' id to body tag
        } else {
            document.body.id = ''; // Remove 'admin' id from body tag
        }

        // Cleanup function to remove 'admin' id when component unmounts
        return () => {
            document.body.id = ''; // Remove 'admin' id from body tag
        };
    }, [stateisadmin]); // Re-run effect when isAdmin value changes


    // Use useEffect to add or remove 'admin' id from the body tag based on isAdmin value
    useEffect(() => {
        const checkWidth = () => {
            setWindowWidth(window.innerWidth);
        };

        checkWidth();

        // Add event listener for window resize
        window.addEventListener('resize', checkWidth);

        // Cleanup function to remove event listener when component unmounts
        return () => {
            window.removeEventListener('resize', checkWidth);
        };
    }, []); // Only run this effect once on mount


    // Return the Admin component JSX
    return (
        <>
            <div className="col-12 mb-2 px-2 extra">
                <div className="d-flex px-3 rounded bg-white justify-content-between align-items-center">
                    <img
                        src={`${process.env.REACT_APP_IMAGE_URL}${companyId}/${getlogoimage}`}
                        className="d-block"
                        alt='logo image'
                        style={{ objectFit: 'cover' }}
                        width="100"
                        onError={Onerrorimg}
                        height="70"
                        loading='lazy'
                    />
                    {/* <img src="/images/transparentlogo.png" className="d-block" style={{ objectFit: 'cover' }} width="100" height="70" alt="" /> */}
                    <a className="bg-primarycolor p-2 text-white rounded text-center" style={{ width: '40px' }} data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
                        <i className="fa fa-bars"></i>
                    </a>
                </div>
            </div>
            <div className="container-fluid p-0">
                <div className="row m-0">
                    {/* Admin Side Panel */}
                    <div className={`col-auto p-0 opendiv ${windowWidth <= 992 ? 'offcanvas offcanvas-start' : ''}`} style={{ visibility: 'hidden' }} tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                        <div className='p-3 admin_penel_side h-100 white bg-white d-flex flex-column'>
                            <AdminSidePenel windowWidth={windowWidth} getlogoimage={getlogoimage} companyId={companyId} />
                        </div>
                    </div>
                    {/* Admin Content Area */}
                    <div className="col pe-0">
                        <div className='px-3 h-100'>
                            <Adminsearch />
                            <AdminRoutes />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}