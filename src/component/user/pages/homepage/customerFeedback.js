import React, { useEffect, useState } from 'react';
import { useProductContext } from '../../../common/api/provider';
import { productServices } from '../../../../services/productServices';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { orderServices } from '../../../../services/orderServices';

export const CustomerFeedback = () => {
    const { apiProducts, apiOrder } = useProductContext();
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await productServices.getProducts(apiProducts);
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        const getOrders = async () => {
            try {
                const response = await orderServices.getAllOrder(apiOrder);
                if (response.isSuccess) {
                    setOrders(response.data);
                } else {
                    console.error('API request failed:', response.data.message);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Call the getOrders function
        getOrders();
        getProducts();
    }, [apiProducts, apiOrder]);


    useEffect(() => {
        AOS.init({
            // Initialize AOS
            duration: 1000, // You can adjust the animation duration as per your requirement
            delay: 200, // Delay between each animation
        });
    }, []);
    return (
        <div className="container-fluid py-5 px-md-3 px-0">
            <div className="container">
                <div className="bg-light p-md-5 px-2  pb-3 rounded" data-aos="fade-up">
                    <div className="row g-4 justify-content-center">
                        <div className="col-md-6 col-lg-6 col-xl-3" data-aos="fade-right">
                            <div className="counter bg-white rounded p-md-5 p-3">
                                <i className="fa fa-users c-secondarycolor"></i>
                                <h6>satisfied customers</h6>
                                <h3>{orders.length}</h3>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-3" data-aos="fade-right">
                            <div className="counter bg-white rounded p-md-5 p-3">
                                <i className="fa fa-users c-secondarycolor"></i>
                                <h6>quality of service</h6>
                                <h3>99%</h3>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-3" data-aos="fade-left">
                            <div className="counter bg-white rounded p-md-5 p-3">
                                <i className="fa fa-users c-secondarycolor"></i>
                                <h6>quality certificates</h6>
                                <h3>33</h3>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-3" data-aos="fade-left">
                            <div className="counter bg-white rounded p-md-5 p-3">
                                <i className="fa fa-users c-secondarycolor"></i>
                                <h6>Available Products</h6>
                                <h3>{products.length}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}