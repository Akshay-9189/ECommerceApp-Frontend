import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { createCoupon, updateCoupon } from '../../redux/slice/cartSlice'
import { BsSave2 } from 'react-icons/bs'
import { GrPowerReset, GrDocumentUpdate } from 'react-icons/gr'
import { IoArrowBack } from 'react-icons/io5'
import { unwrapResult } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

function AddOrUpdateCoupon() {

    const { couponId } = useParams()
    const navigate = useNavigate()
    const [couponName, setCouponName] = useState('')
    const [discount, setDiscount] = useState('')
    const [description, setDescription] = useState('')

    const dispatch = useDispatch()
    const { coupons } = useSelector(state => state.cartData)

    useEffect(() => {
        if (couponId) {
            const coupon = coupons.find(co => co.couponId === couponId)
            setCouponName(coupon.couponName)
            setDiscount(coupon.discount)
            setDescription(coupon.description)
        }
    }, [couponId, coupons])

    const AddOrUpdateCoupon = (e) => {
        e.preventDefault()
        const coupon = { couponName, discount, description }
        if (couponId)
            dispatch(updateCoupon({ couponId: couponId, coupon: coupon }))
                .then(unwrapResult)
                .then(response => {
                    toast.success(`Coupon ${response.couponName} Is Update Successfully`)
                    navigate('/admin/dashboard/coupon')
                }).catch(error => toast.error(error.message))
        else
            dispatch(createCoupon(coupon))
                .then(unwrapResult)
                .then(response => {
                    toast.success(`Coupon ${response.couponName} is added successfully`)
                    navigate('/admin/dashboard/coupon')
                }).catch(error => toast.error(error.message))

    }

    const clearForm = (e) => {
        e.preventDefault()
        setCouponName('')
        setDiscount('')
        setDescription('')
    }

    return (
        <div className='container'>
            <div className='card allign-middle shadow-lg bg-light col-md-10 col-lg-8 col-xl-7 mx-auto'>
                {
                    couponId ? (
                        <h2 className='display-6 card-title text-center mt-1 mb-0'>Update Coupon</h2>
                    ) : (
                        <h2 className='display-6 card-title text-center mt-1 mb-0'>Add Coupon</h2>
                    )
                }
                <hr />
                <div className='card-body mx-3'>
                    <form onSubmit={(e) => AddOrUpdateCoupon(e)} className="px-3 row d-flex gap-3 col-lg-11 mx-auto">
                        <div className="form-group form-floating ">
                            <input type="text" className="form-control  mt-2" id="couponName" placeholder="Enter First Name"
                                value={couponName} onChange={(e) => setCouponName(e.target.value)}
                            />
                            <label htmlFor='couponName' className='ms-2'>Coupon Name : </label>
                        </div>
                        <div className="form-group form-floating ">
                            <input type="number" className="form-control mt-2" id="discount" placeholder="Enter Last Name"
                                value={discount} onChange={(e) => setDiscount(e.target.value)}
                            />
                            <label htmlFor='discount' className='ms-2'>Discount (in %) :</label>
                        </div>
                        <div className="form-group form-floating ">
                            <input type="text" className="form-control  mt-2" id="description" placeholder="Enter User Name"
                                value={description} onChange={(e) => setDescription(e.target.value)}
                            />
                            <label htmlFor='description' className='ms-2'>Coupon Description :</label>
                        </div>
                        <div className='d-grid gap-3 d-flex justify-content-center mt-3 mb-1'>
                            <Link className='btn btn-danger' to="/admin/dashboard/coupon"><IoArrowBack />  Back</Link>
                            <button className="btn btn-secondary" onClick={(e) => clearForm(e)}><GrPowerReset />  Reset</button>
                            {
                                couponId ? (
                                    <button type='submit' className="btn btn-success"><GrDocumentUpdate />  Update</button>
                                ) : (
                                    <button type='submit' className="btn btn-success"><BsSave2 />  Save</button>
                                )
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddOrUpdateCoupon