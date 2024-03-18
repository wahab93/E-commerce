import React from 'react';

export const ProductSkelton = ({ count = 9 }) => {
    const skeletonItems = Array.from({ length: count }, (_, index) => (
        <div key={index} className="col-6 col-xl-4">
            <div className="skeleton-image" style={{ height: '278px', borderRadius: '10px', width: '100%' }}></div>
        </div>
    ));

    return <>{skeletonItems}</>;
};