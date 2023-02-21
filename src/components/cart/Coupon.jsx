import { unwrapResult } from '@reduxjs/toolkit'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { addCouponToCart, getAllCoupons } from '../../redux/slice/cartSlice'

function Coupon({ shopCartId }) {

    const [couponName, setCouponName] = useState('')
    const dispatch = useDispatch()
    const { coupons } = useSelector(state => state.cartData)

    useEffect(() => {
        document.title = "Shopping Cart"
        dispatch(getAllCoupons())
            .then(unwrapResult)
            .catch(error => toast.error(error.message))
    }, [dispatch])

    const addCoupToCart = () => {
        dispatch(addCouponToCart({ shoppingCartId: shopCartId, couponName: couponName }))
            .then(unwrapResult)
            .then(response => toast.success(`Coupon ${response.coupon.couponName} is added to cart`))
            .catch(error => toast.error(error.message))
    }

    return (
        <div className="mt-3 shadow-lg">
            <div className="card" style={{ backgroundColor: "papayawhip" }}>
                <div className="card-body" >
                    <button className="btn d-flex justify-content-between fst-italic  btn-link" data-bs-toggle="collapse" type='button' data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                        Add A Discount Coupon (optional)
                    </button>
                    <div className="collapse" id="collapseExample">
                        <hr />
                        <div className="mt-3">
                            <div className=" form-floating  mb-2 ">
                                <input type="text" className="form-control form-control  mt-2" id="discount" placeholder="Enter The Discount Code"
                                    value={couponName} onChange={(e) => setCouponName(e.target.couponName)}
                                />
                                <label htmlFor="discount" className='font-weight-bold'>Enter The Discount Code</label>
                            </div>
                            <div className='btn-group dropend'>
                                <button className="btn btn-link dropdown-toggle  mb-1 d-flex justify-content-start" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Coupons For You
                                </button>
                                <ul className="dropdown-menu bg-dark" style={{ minWidth: '300px' }}>
                                    <div className="container my-2" >
                                        {
                                            coupons && coupons.map(co => (
                                                <div className="col-12 my-2" key={co.couponId}>
                                                    <div className="card " style={{ backgroundColor: 'aquamarine' }}>
                                                        <div className="card-body " >
                                                            <li className="list-group-item d-flex justify-content-between align-items-center border-0 ">
                                                                <h6 className="card-title">{co.couponName}</h6>
                                                                <button className='btn btn-sm btn-outline-success' onClick={() => setCouponName(co.couponName)}>Get</button>
                                                            </li>
                                                            <small >
                                                                <span className='text-muted'>{co.description}</span>
                                                            </small>
                                                            <div />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </ul>
                            </div>
                        </div>
                        <div className='d-flex justify-content-around align-items-center'>
                            <button className='btn btn-sm btn-success' onClick={() => addCoupToCart()}>Apply</button>
                            <button className='btn btn-sm btn-danger' onClick={() => setCouponName('')}>Clear</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Coupon