import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteCoupon, getAllCoupons } from '../../redux/slice/cartSlice'
import { MdOutlineAddCircleOutline } from 'react-icons/md'
import { IoArrowBack } from 'react-icons/io5'
import { GrDocumentUpdate } from 'react-icons/gr'
import { RiDeleteBinLine } from 'react-icons/ri'

function ListCoupon() {

    const dispatch = useDispatch()
    const { coupons } = useSelector(state => state.cartData)

    useEffect(() => {
        document.title = "Manage Coupon"
        dispatch(getAllCoupons())
    }, [dispatch])

    return (
        <div className='container'>
            <div className='card col-10 col-sm-12 mx-auto shadow-lg ' style={{ backgroundColor: "whitesmoke" }}>
                <h4 className='display-6 text-center mt-1 mb-0'>Coupon List</h4>
                <hr />
                <div className='card-body'>
                    <div className='gap-3 d-flex'>
                        <Link to={"add"} className='btn btn-info hover'><MdOutlineAddCircleOutline />  Add Coupon</Link>
                        <Link to={"/admin/dashboard"} className="btn btn-danger hover"><IoArrowBack />  Back</Link>
                    </div>
                    {
                        coupons.length === 0 ? (
                            <div className='container mt-3'>
                                <div className='row ' style={{ height: "300px", backgroundColor: 'lightgray' }}>
                                    <div className='d-flex align-items-center justify-content-center'>
                                        <h4 className='display-5'>Coupon Not Available</h4>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className='mt-4 table-responsive col-sm-12 col-md-11 col-lg-10 mx-auto ' >
                                <table className="table table-bordered table-striped table-hover   border-dark" style={{ backgroundColor: 'lightgrey' }}>
                                    <thead className='table-dark align-middle'>
                                        <tr className='text-center'>
                                            <th className='col-3'>Coupon ID</th>
                                            <th className='col-2'>Coupon Name</th>
                                            <th className='col-2'>Discount (in %)</th>
                                            <th className='col-2'>Coupon Discription</th>
                                            <th className='col-3'>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className='text-center align-middle'>
                                        {
                                            coupons && coupons.map(c => (
                                                <tr key={c.couponId}>
                                                    <td>{c.couponId}</td>
                                                    <td>{c.couponName}</td>
                                                    <td> {c.discount}</td>
                                                    <td>{c.description}</td>
                                                    <td>
                                                        <div className='d-grid gap-3 d-md-flex justify-content-center'>
                                                            <Link className='btn btn-warning ' to={`${c.couponId}`}><GrDocumentUpdate />  Update</Link>
                                                            <button className='btn btn-danger ' onClick={() => dispatch(deleteCoupon({ couponId: c.couponId }))}><RiDeleteBinLine />  Delete</button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
export default ListCoupon