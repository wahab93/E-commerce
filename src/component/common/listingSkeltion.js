import React from 'react'

export const ListingSkeltion = () => {
    return (
        <>
            {Array(7).fill().map((_, index) => (
                <div className='py-3 my-2 bg-light rounded invisible' key={index}>a</div>
            ))}
        </>
    )
}