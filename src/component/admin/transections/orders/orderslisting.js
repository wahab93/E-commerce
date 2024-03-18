import React, { useState, useEffect } from 'react';
import { useProductContext } from '../../../common/api/provider';
import { FilterForm } from './filterForm';
import { orderServices } from '../../../../services/orderServices';
import usePageTitle from '../../../common/usePageTitle';
import LoadingSpinner from '../../../common/loadingSpinner';
import { DataTable } from '../../commoncomponent/dataTable';
import { Viewordermodal } from './viewordermodal';

export const Orderslisting = () => {
    usePageTitle('Orders'); // Page Title
    const { apiOrder, orderFilter } = useProductContext(); // Get data from useContext
    const [orders, setOrders] = useState([]); // Set all orders in list
    const [loading, setLoading] = useState(true);
    const [filtersChanged, setFiltersChanged] = useState(false);
    const [filters, setFilters] = useState({
        fromDate: new Date().toISOString().split('T')[0],
        toDate: new Date().toISOString().split('T')[0],
        orderCode: '',
    });
    const [orignalData, setOrignalData] = useState([])
    const [orderStatuses, setOrderStatuses] = useState({});

    // Get data from API
    useEffect(() => {
        const getOrders = async () => {
            try {
                const response = await orderServices.getAllOrder(apiOrder);
                if (response.isSuccess) {
                    const startIndex = Math.max(0, response.data.length - 5); // Ensure startIndex is non-negative
                    const Records = response.data.slice(startIndex).reverse(); // Get the last four records
                    setOrders(Records);
                    setOrignalData(Records);
                    setLoading(false);
                } else {
                    console.error('API request failed:', response.data.message);
                    setLoading(true);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(true);
            }
        };

        getOrders();
    }, [apiOrder]);

    // Function to update the filters and set filtersChanged to true
    const updateFilters = (newFilters) => {
        setFilters(newFilters);
        setFiltersChanged(true);
    };

    // Create a function to clear filters
    const clearFilters = () => {
        setFilters({
            fromDate: new Date().toISOString().split('T')[0],
            toDate: new Date().toISOString().split('T')[0],
            orderCode: '',
        });
        setFiltersChanged(false);

        // Reset orders to the original data
        setOrders(orignalData);
    };

    // Update the filtersChanged state whenever any filter input changes
    const onInputChange = (e) => {
        const { name, value } = e.target;
        updateFilters({
            ...filters,
            [name]: value,
        });
    };

    // Order Filter API
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await orderServices.filterOrders(orderFilter, filters);
            if (response.isSuccess) {
                setOrders(response.data);
            } else {
                console.error('API request failed:', response.data.message);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    // Handle status changes
    const handleStatusChange = (event, orderId) => {
        const newStatus = event.target.value;
        setOrderStatuses((prevStatuses) => ({
            ...prevStatuses,
            [orderId]: newStatus,
        }));

        // Make an API call to update the status on the server using newStatus and orderId.
        // You'll need to pass orderId to your API call.
    };

    // Columns for the DataTable
    const columns = [
        { name: "Order Id", selector: (row) => row.orderId },
        { name: "Order Date", selector: (row) => row.orderDate },
        { name: "Customer Name", selector: (row) => row.customerResponseDTO.customerName, },
        { name: "Order Code", selector: (row) => row.orderCode, },
        {
            name: "Order Status",
            selector: (row) => (
                <select
                    className="form-select"
                    value={orderStatuses[row.orderId] || 'Pending'}
                    onChange={(event) => handleStatusChange(event, row.orderId)}
                >
                    <option value="Pending">Pending</option>
                    <option value="Delivered">Delivered</option>
                </select>
            ),
        },
        {
            name: "Actions",
            cell: (product) => (
                <>
                    <Viewordermodal product={product} />
                    {/* <i className='fa fa-edit p-3 fs-6'></i> */}
                </>
            )
        }
    ]

    return (
        <div className="row bg-white py-3">
            <div className="col-md-12">
                <h3 className='c-secondarycolor'>Orders List</h3>
            </div>
            <div className="col-md-12 mb-2">
                <div className="row">
                    <FilterForm filters={filters} onInputChange={onInputChange} onSubmit={handleSubmit} onClear={clearFilters} handleSubmit={handleSubmit} filtersChanged={filtersChanged} />
                </div>
            </div>
            <div className="col-md-12 list orderlist">
                {loading ?
                    <LoadingSpinner />
                    :
                    <DataTable columns={columns} data={orders} subHeader={false} showSubHeader={false} datatableHeight={'370px'} />
                }
            </div>
        </div>
    );
};