import React from 'react'
import { IoArrowBack } from 'react-icons/io5'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { TbCurrencyRupee } from 'react-icons/tb'

function ViewProduct() {

    const { productId } = useParams()
    const { products } = useSelector(state => state.categoryData)
    const getProduct = products.find(prod => prod.productId === productId)

    //col-sm-8 col-md-8 col-xl-8 col-xxl-8
    return (
        <div className='container'>
            <div className='card col-md-6 col-md-9 col-lg-9 col-xl-8 col-xxl-8 mx-auto mt-4 shadow-lg rounded' style={{ backgroundColor: "rgb(207, 236, 236)" }}>
                <span className='display-6 justify-content-center mb-0 mt-1 d-flex align-items-center'>{getProduct.productName}</span>
                <hr />
                <div className='card-body col-10 mx-auto text-center' >
                    <>
                        <img className='mb-3' src={getProduct.imageURL} alt={getProduct.imageURL} width="260px" height="290px" />
                        <div className='card card-body col-10 mx-auto' style={{ backgroundColor: "lightgray" }}>
                            <ul className="list-group list-group-flush">
                                <div className='d-flex flex-column gap-1'>
                                    <li className="list-group-item">
                                        <label className='d-flex justify-content-start'> <strong> Product ID:</strong>
                                            <label className='ps-2'> {getProduct.productId}</label>
                                        </label>
                                    </li>
                                    <li className="list-group-item">
                                        <label className='d-flex justify-content-start'><strong>Description:</strong>
                                            <label className='ps-2' > {getProduct.productDescription} </label>
                                        </label>
                                    </li>
                                    <li className="list-group-item">
                                        <label className='d-flex justify-content-start'><strong>Product Price:</strong>
                                            <label className='ps-2' ><TbCurrencyRupee /> {getProduct.productPrice} </label></label>
                                    </li>
                                    <li className="list-group-item">
                                        <label className='d-flex justify-content-start'><strong>Product Total Quantity Available:</strong>
                                            <label className='ps-2' > {getProduct.productTotalQuantityAvailable} </label>
                                        </label>
                                    </li>
                                    <li className="list-group-item">
                                        <label className='d-flex justify-content-start'><strong>Product Weight:</strong>
                                            <label className='ps-2' > {getProduct.productWeight} Kg</label>
                                        </label>
                                    </li>
                                    <li className="list-group-item">
                                        <label className='d-flex justify-content-start'> <strong>Product Code:</strong>
                                            <label className='ps-2' > {getProduct.productCode}</label>
                                        </label>
                                    </li>
                                </div>
                            </ul>
                        </div>
                    </>
                </div>
                <div className='mx-auto d-grid mb-3'>
                    <Link className='btn btn-danger' to={"/admin/dashboard/product"}><IoArrowBack />  Back</Link>
                </div>
            </div>
        </div>
    )
}

export default ViewProduct