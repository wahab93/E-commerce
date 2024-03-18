import React from 'react'
import { Link } from 'react-router-dom'

export const FavProductsOffCanvas = ({ handleDel, favproduct }) => {
    return (
        <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title c-secondarycolor" id="offcanvasExampleLabel">Favorite Products</h5>
                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
                {
                    favproduct.length == 0 ?
                        <h3 className='c-secondarycolor'>No Products</h3>
                        :
                        (
                            <>
                                <span className='mb-3'><b>Total Favorite Product</b> : <span className='d-inline-block px-2 p-1 rounded text-white text-center bg-secondarycolor'>{favproduct.length}</span></span>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Product Name</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            favproduct.map((e, i) => {
                                                return (
                                                    <>
                                                        <tr key={i}>
                                                            <th scope="row">{e.productName.substring(0, 12)}</th>
                                                            <td>{e.newPrice}</td>
                                                            <td>
                                                                <Link className='' onClick={() => handleDel(e)}>
                                                                    <i className='fa fa-trash-alt text-danger'></i>
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    </>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </>
                        )
                }
            </div>
        </div>
    )
}