import React from 'react'
import { Link } from 'react-router-dom'
import { MdManageAccounts } from 'react-icons/md'
import { SiManageiq } from 'react-icons/si'
import { RiCoupon3Line } from 'react-icons/ri'
import { IoArrowBack } from 'react-icons/io5'
import { BiCategoryAlt, BiCategory } from 'react-icons/bi'
import { CgFileDocument } from 'react-icons/cg'

function Dashboard() {
    return (
        <div className='container'>
            <div className="card shadow-lg" style={{ backgroundColor: 'lemonchiffon' }}>
                <h4 className="card-title mx-auto mt-1 mb-0">ADMIN DASHBOAD</h4>
                <hr />
                <div className="card-body">
                    <div className='row row-cols-1 row-cols-md-2 row-cols-sm-1 g-md-5 g-3'>
                        <div className='col'>
                            <div className='col-md-8 ms-md-auto' >
                                <Link to={"product"} className="btn btn-secondary  d-flex justify-content-center align-items-center  shadow-lg" style={{ color: "violet", height: '100px' }}>
                                    <h4><SiManageiq />  Manage Products</h4>
                                </Link>
                            </div>
                        </div>
                        <div className='col'>
                            <div className='col-md-8'>
                                <Link to={"user"} className="btn btn-secondary  d-flex justify-content-center align-items-center shadow-lg" style={{ color: "violet", height: '100px' }} >
                                    <h4><MdManageAccounts />  Manage Users</h4>
                                </Link>
                            </div>
                        </div>
                        <div className='col'>
                            <div className='col-md-8 ms-md-auto'>
                                <Link to={"coupon"} className="btn btn-secondary d-flex justify-content-center align-items-center shadow-lg" style={{ color: "violet", height: '100px' }} >
                                    <h4><RiCoupon3Line />  Manage Coupons</h4>
                                </Link>
                            </div>
                        </div>
                        <div className='col'>
                            <div className='col-md-8'>
                                <Link to={"orders"} className="btn btn-secondary d-flex justify-content-center align-items-center  shadow-lg" style={{ color: "violet", height: '100px' }} >
                                    <h4><CgFileDocument />  Orders</h4>
                                </Link>
                            </div>
                        </div>
                        <div className='col'>
                            <div className='col-md-8 ms-md-auto'>
                                <Link to={"category"} className="btn btn-secondary d-flex justify-content-center align-items-center  shadow-lg" style={{ color: "violet", height: '100px' }} >
                                    <h4><BiCategory />  Manage Category</h4>
                                </Link>
                            </div>
                        </div>
                        <div className='col'>
                            <div className='col-md-8 '>
                                <Link to={"subcategory"} className="btn btn-secondary d-flex justify-content-center align-items-center  shadow-lg" style={{ color: "violet", height: '100px' }} >
                                    <h4><BiCategoryAlt /> Manage Sub Category</h4>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <br /><br />
                    <div className='d-flex justify-content-center align-items-center'>
                        <Link to={'/admin'} className='btn btn-danger '><IoArrowBack />  Back</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Dashboard