import React from 'react'
import Datatable from 'react-data-table-component';

export const DataTable = ({ columns, data, search, setSearch, showSubHeader, datatableHeight, placeholdervalue }) => {
    return (
        <Datatable
            columns={columns}
            data={data}
            className='customScroll'
            pagination
            fixedHeader
            fixedHeaderScrollHeight={datatableHeight}
            highlightOnHover
            subHeader={showSubHeader} // Conditionally include subheader based on prop
            subHeaderComponent={showSubHeader && (
                <input
                    type='text'
                    className='form-control w-50'
                    placeholder={placeholdervalue}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            )}
        />
    )
}