import React, { useState, useEffect } from 'react';
import usePageTitle from '../common/usePageTitle'
import { useProductContext } from '../common/api/provider';
import { orderServices } from '../../services/orderServices';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


// Define the Dashboard component
export const Dashboard = () => {
  // Set the page title
  usePageTitle('Admin Dashboard');
  // State to hold orders and loading status
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Access the ProductContext to get API data
  const { apiOrder } = useProductContext();

  const data = [
    { name: 'Jan', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Feb', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Apr', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'May', uv: 1890, pv: 4800, amt: 2181 },
  ];


  // useEffect to fetch orders from API on component mount
  useEffect(() => {
    const getOrders = async () => {
      try {
        // Call the getAllOrder method from orderServices
        const response = await orderServices.getAllOrder(apiOrder);

        // If the API request was successful
        if (response.isSuccess) {
          // Set the orders state with the response data
          setOrders(response.data);
          setLoading(false); // Set loading state to false
        } else {
          // Log an error message if the API request failed
          console.error('API request failed:', response.data.message);
          setLoading(true); // Set loading state to true
        }
      } catch (error) {
        // Log an error message if there was an error fetching the data
        console.error('Error fetching data:', error);
        setLoading(true); // Set loading state to true
      }
    };

    // Call the getOrders function
    getOrders();
  }, [apiOrder]);

  // Calculate the total product price across all orders
  const totalPrice = orders.reduce((acc, order) => {
    const orderTotalPrice = order.ordersDetails.reduce((orderAcc, orderDetail) => {
      return orderAcc + orderDetail.productPrice;
    }, 0);

    return acc + orderTotalPrice;
  }, 0);

  // Calculate the total count of orders for each order status description
  const orderCountByStatusDesc = {};

  orders.forEach((order) => {
    const orderStatusDesc = order.orderStatusDesc;

    if (orderCountByStatusDesc[orderStatusDesc] === undefined) {
      orderCountByStatusDesc[orderStatusDesc] = 0;
    }

    orderCountByStatusDesc[orderStatusDesc]++;
  });

  // Return the dashboard content
  return (
    <>
      <div className="row counter_row white rounded p-3">
        <div className='col-lg-3 col-md-6 col-12 mb-lg-0 mb-4'>
          <div className="d-flex align-items-center">
            <div className='income'>
              <i className="fa-solid fa-money-bill-wave"></i>
            </div>
            <div className="ms-2">
              <span>Income</span>
              <h4 className="enfont">{totalPrice}</h4>
            </div>
          </div>
        </div>
        <div className='col-lg-3 col-md-6 col-12 mb-lg-0 mb-4'>
          <div className="d-flex align-items-center">
            <div className='income'>
              <i className='fa fa-check'></i>
            </div>
            <div className="ms-2">
              <span>Orders Completed</span>
              <h4 className="enfont">{orderCountByStatusDesc.Completed || 0}</h4>
            </div>
          </div>
        </div>
        <div className='col-lg-3 col-md-6 col-12 mb-lg-0 mb-4'>
          <div className="d-flex">
            <div className='income'>
              <i className='fa fa-ban'></i>
            </div>
            <div className="ms-2">
              <span>Canceled Request</span>
              <h4 className="enfont">{orderCountByStatusDesc.Canceled || 0}</h4>
            </div>
          </div>
        </div>
        <div className='col-lg-3 col-md-6 col-12 mb-lg-0 mb-4'>
          <div className="d-flex">
            <div className='income'>
              <i className='fa fa-refresh'></i>
            </div>
            <div className="ms-2">
              <span>Pending Orders</span>
              <h4 className="enfont">{orderCountByStatusDesc.Pending || 0}</h4>
            </div>
          </div>
        </div>
      </div>
      {/* Display income and request reports */}
      <div className="row report_outer rounded mb-2">
        <div className="col-lg-8 col-12 p-0">
          <div className="income_report p-3 rounded white">
            {/* Chart component */}
            <LineChart width={500} height={300} data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
              <Line type="monotone" dataKey="uv" stroke="#8884d8" />
              <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
              <Tooltip />
              <Legend />
            </LineChart>
            <img src="/images/incomeReport.png" alt="" className='img-fluid' loading='lazy' />
          </div>
        </div>
        <div className="col-lg-4 col-12 pe-0">
          <div className="request_report p-3 rounded white">
            <img src="/images/requestReport.png" alt="" className='img-fluid' loading='lazy' />
          </div>
        </div>
      </div>
      {/* Display the latest orders */}
      <div className="row latest_request rounded">
        <div className="col-md-12 p-0">
          <div className="p-3 white">
            <h1 className='mb-4 display-6 c-secondarycolor'>Orders</h1>
            <h2>ORDER HI ORDER</h2>
          </div>
        </div>
      </div>
    </>
  );
};