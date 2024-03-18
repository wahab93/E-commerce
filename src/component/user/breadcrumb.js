import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'
import AOS from 'aos';
import 'aos/dist/aos.css';

export const Breadcrumb = ({ paths }) => {
    useEffect(() => {
        AOS.init({
            // Initialize AOS
            duration: 1000, // You can adjust the animation duration as per your requirement
            delay: 200, // Delay between each animation
        });
    }, []);
    return (
        <ol className="breadcrumb mb-0" data-aos="fade-up">
            {paths.map((path, index) => (
                <li key={index} className={`breadcrumb-item ${index === paths.length - 1 ? 'active c-primarycolor' : ''}`}>
                    {index === paths.length - 1 ? (
                        path
                    ) : (
                        <Link to='/' className='c-secondarycolor'>{path}</Link>
                    )}
                </li>
            ))}
        </ol>
    )
}