import React, { useState, useEffect } from 'react';

export const BacktoTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Add scroll event listener
        window.addEventListener('scroll', handleScroll);
        // Remove the event listener when the component is unmounted
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleScroll = () => window.scrollY > 300 ? setIsVisible(true) : setIsVisible(false)
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <a
            href="#"
            className={`btn btn-primary border-3 border-primarycolor rounded-circle back-to-top ${isVisible ? 'visible' : 'hidden'}`}
            onClick={scrollToTop}
        >
            <i className="fa fa-arrow-up"></i>
        </a>
    );
};