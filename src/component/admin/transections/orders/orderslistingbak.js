import React, { useState, useEffect } from 'react';
import Datatable from 'react-data-table-component';
import { useProductContext } from '../../../common/api/provider';
import LoadingSpinner from '../../../common/loadingSpinner';
const deliveryOptions = ['Pending', 'Dispatched', 'Delivered'];

export const Orderslisting = () => {
    const { companyId, LocationId, loading, setLoading, apiOrder } = useProductContext();
    const [deliveryStatus, setDeliveryStatus] = useState({});
    const [filtersChanged, setFiltersChanged] = useState(false);
    const [filters, setFilters] = useState({
        fromDate: '',
        toDate: '',
        orderCode: '',
        // OrderId: 1,
        // CustomerId: 1,
        // OrderStatusId: 1,
        // PaymentTypeId: 1
    });
    const [orders, setOrders] = useState([])

    // getData from API
    useEffect(() => {
        const getOrders = async () => {
            try {
                const res = await fetch(apiOrder);
                const data = await res.json();
                if (data.isSuccess) {

                    // Extract the first 4 records (you can change the number as needed)
                    // const firstFourRecords = data.data.slice(0, 4); // Change 4 to the desired number
                    // setOrders(firstFourRecords);


                    // Calculate the index to start from to get the last four records
                    // const startIndex = Math.max(0, data.data.length - 6); // Ensure startIndex is non-negative
                    // const lastFourRecords = data.data.slice(startIndex).reverse(); // Get the last four records
                    setOrders(data.data);
                    setLoading(false);
                } else {
                    console.error('API request failed:', data.message);
                    setLoading(true);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(true);
            }
        };

        getOrders();
    }, []);
    // getData from API
    useEffect(() => {
        const initialDeliveryStatus = {};
        orders.forEach((order) => {
            initialDeliveryStatus[order.orderId] = order.deliveryType;
        });
        setDeliveryStatus(initialDeliveryStatus);
    }, [orders]);



    // Function to update the filters and set filtersChanged to true
    const updateFilters = (newFilters) => {
        setFilters(newFilters);
        setFiltersChanged(true);
    };
    const clearFilters = async () => {
        try {
            setLoading(true);
            const res = await fetch(apiOrder);
            const data = await res.json();
            if (data.isSuccess) {
                setOrders(data.data);
            } else {
                console.error('API request failed:', data.message);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
            setFilters({
                fromDate: '',
                toDate: '',
                orderCode: '',
            });
            setFiltersChanged(false);
        }
    };


    // Update the filtersChanged state whenever any filter input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        updateFilters({
            ...filters,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const apiurlgetorders = `/api/Orders/GetAllOrders?CompanyId=${companyId}&LocationId=${LocationId}&PaymentTypeId=0&OrderStatusId=1&CustomerId=0&OrderId=0&OrderCode=${filters.orderCode}&FromDate=${filters.fromDate}&ToDate=${filters.toDate}`;
            const res = await fetch(apiurlgetorders);
            const data = await res.json();
            if (data.isSuccess) {
                setOrders(data.data);
            } else {
                console.error('API request failed:', data.message);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };



    const columns = [
        {
            name: "Order Id",
            selector: (row) => row.orderId,
        },
        {
            name: "Order Date",
            selector: (row) => row.orderDate,
        },
        {
            name: "Customer Name",
            selector: (row) => row.customerResponseDTO.customerName,
        },
        {
            name: "Order Code",
            selector: (row) => row.orderCode,
        },
        {
            name: "Delivery Type",
            selector: (row) => (
                <select className='form-select'
                    value={deliveryStatus[row.orderId]}
                    onChange={(e) => handleDeliveryChange(row.orderId, e.target.value)}
                >
                    {deliveryOptions.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            ),
        },
        {
            name: "Actions",
            cell: (product) => (
                <>
                    <i className='fa fa-edit p-3 fs-6'></i>
                </>
            )
        }
    ]
    const handleDeliveryChange = (orderId, newDeliveryStatus) => {
        setDeliveryStatus((prevStatus) => ({
            ...prevStatus,
            [orderId]: newDeliveryStatus,
        }));
    };

    return (
        <div className="row bg-white py-3">
            <div className="col-md-12">
                <h1>Orders List</h1>
            </div>
            <div className="col-md-12">
                <div className="row">
                    <form onSubmit={handleSubmit}>
                        <div className="col-md-12">
                            <div className="row g-3">
                                <div className="col">
                                    <input
                                        type="date"
                                        className="form-control"
                                        name="fromDate"
                                        placeholder="From Date"
                                        value={filters.fromDate}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="col">
                                    <input
                                        type="date"
                                        className="form-control"
                                        name="toDate"
                                        placeholder="To Date"
                                        value={filters.toDate}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="col">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="orderCode"
                                        placeholder="Order Code"
                                        value={filters.orderCode}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="col">
                                    <button className="primary-btn border-0 p-0" style={{ height: '31.25px', lineHeight: '31.25px' }}>Fetch Data</button>
                                </div>
                                {filtersChanged && (
                                    <div className="col">
                                        <button className="primary-btn border-0 p-0" style={{ height: '31.25px', lineHeight: '31.25px' }} onClick={clearFilters}>
                                            Clear Filters
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="col-md-12 mt-3">
                {
                    loading ? <LoadingSpinner />
                        :
                        (
                            <Datatable
                                columns={columns}
                                data={orders}
                                pagination
                                fixedHeader
                                fixedHeaderScrollHeight='413px'
                                highlightOnHover
                            />
                        )
                }
            </div>
        </div>
    );
};