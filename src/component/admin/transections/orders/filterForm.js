import React from 'react'

export const FilterForm = ({ filters, onInputChange, handleSubmit, onClear, filtersChanged }) => {
    return (
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
                            onChange={onInputChange}
                        />
                    </div>
                    <div className="col">
                        <input
                            type="date"
                            className="form-control"
                            name="toDate"
                            placeholder="To Date"
                            value={filters.toDate}
                            onChange={onInputChange}
                        />
                    </div>
                    <div className="col">
                        <input
                            type="text"
                            className="form-control"
                            name="orderCode"
                            placeholder="XXX-XXX-XX-XXXXXXXX-XXX"
                            value={filters.orderCode}
                            onChange={onInputChange}
                        />
                    </div>
                    <div className="col">
                        <button className="btn border border-secondarycolor rounded-pill px-3 c-secondarycolor w-100">Fetch Data</button>
                    </div>
                    {filtersChanged && (
                        <div className="col">
                            <button className="btn border border-secondarycolor rounded-pill px-3 c-secondarycolor w-100" onClick={onClear}>
                                Clear Filters
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </form>
    )
}