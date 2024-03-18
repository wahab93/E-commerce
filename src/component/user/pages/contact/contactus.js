import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import usePageTitle from '../../../common/usePageTitle'
import { useSelector } from 'react-redux'
import { Breadcrumb } from '../../breadcrumb'

export const Contactus = ({getwebsiteDetails}) => {
    usePageTitle('Contact Us');
    const stateuser = useSelector((state) => state.userinfihandler.user);
    const [data, setData] = useState({
        name: stateuser ? stateuser.userName || '' : '',
        email: stateuser ? stateuser.userEmail || '' : '',
        subject: '',
        message: ''
    })
    const handleMessage = (e) => {
        e.preventDefault();
        if (!data.name || !data.email || !data.subject || !data.message) {
            alert('Fill The Form')
        }
    }
    const inputEvent = (event) => {
        const { name, value } = event.target;
        setData((preVal) => {
            return { ...preVal, [name]: value }
        })
    }
    return (
        <>
            {/* Single Page Header start */}
            <div className="container-fluid page-header py-4 bg-light">
                <div className='container'>
                    <h1 className="c-secondarycolor display-6">Contact</h1>
                    <Breadcrumb paths={['Home', 'Contact']} />
                </div>
            </div>
            {/* Single Page Header End */}
            <div className="container-fluid contact py-5">
                <div className="container pb-md-5 py-3 px-0 px-md-0">
                    <div className="p-md-5 p-2 bg-light rounded">
                        <div className="row g-4">
                            <div className="col-12">
                                <div className="text-center mx-auto" style={{ maxWidth: '700px' }}>
                                    <h1 className="c-primarycolor">Get in touch</h1>
                                    <p className="mb-4">The contact form is currently inactive. Get a functional and working contact form with Ajax & PHP in a few minutes. Just copy and paste the files, add a little code and you're done. <a href="https://htmlcodex.com/contact-form">Download Now</a>.</p>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="h-100 rounded">
                                    <iframe className='rounded w-100'
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27225.338402741112!2d74.27696225!3d31.464583700000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919015f82b0b86f%3A0x2fcaf9fdeb3d02e6!2sJohar%20Town%2C%20Lahore%2C%20Punjab!5e0!3m2!1sen!2s!4v1680762136676!5m2!1sen!2s"
                                        style={{ border: '0', width: '100%', height: '290px' }}>
                                    </iframe>
                                </div>
                            </div>
                            <div className="col-lg-7">
                                <form onSubmit={handleMessage}>
                                    <input type="text"
                                        placeholder='Enter Name'
                                        name="name"
                                        className="w-100 form-control border-0 py-3 mb-4"
                                        value={data.name}
                                        onChange={inputEvent}
                                    />
                                    <input type="email"
                                        placeholder='Enter Email'
                                        className="w-100 form-control border-0 py-3 mb-4"
                                        name="email"
                                        value={data.email}
                                        onChange={inputEvent}
                                    />
                                    <textarea className="w-100 form-control border-0 mb-4" rows="5" cols="10" placeholder="Your Message" name="message" value={data.message} onChange={inputEvent}></textarea>
                                    <button className="w-100 btn form-control border-secondarycolor py-3 bg-white c-secondarycolor " type="submit">Submit</button>
                                </form>
                            </div>
                            <div className="col-lg-5">
                                <div className="d-flex p-4 rounded mb-4 bg-white">
                                    <i className="fas fa-map-marker-alt fa-2x c-primarycolor me-4"></i>
                                    <div>
                                        <h5>Address</h5>
                                        <p className="mb-2 f13">{getwebsiteDetails.companyAddress}</p>
                                    </div>
                                </div>
                                <div className="d-flex p-4 rounded mb-4 bg-white">
                                    <i className="fas fa-envelope fa-2x c-primarycolor me-4"></i>
                                    <div>
                                        <h5>Mail Us</h5>
                                        <p className="mb-2 f13">{getwebsiteDetails.companyEmail}</p>
                                    </div>
                                </div>
                                <div className="d-flex p-4 rounded bg-white">
                                    <i className="fa fa-phone-alt fa-2x c-primarycolor me-4"></i>
                                    <div>
                                        <h5>Telephone</h5>
                                        <p className="mb-2 f13">{getwebsiteDetails.companyPhone}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}