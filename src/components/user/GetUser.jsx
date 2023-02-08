import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { IoArrowBack } from 'react-icons/io5'

function GetUser() {

    const { userId } = useParams()
    const { userInfo } = useSelector(state => state.userData)
    const getSingleUser = userInfo.find(usr => usr.userId === userId)

    return (
        <div className='container'>
            <div className='card col-sm-12 col-md-10 col-lg-9 col-xl-8 mx-auto mt-4 shadow-lg rounded' style={{ backgroundColor: " rgb(243, 210, 210)" }}>
                <h5 className='display-6 text-center mt-2 mb-0'>{getSingleUser.userFirstName}</h5>
                <hr />
                <div className='card-body mx-auto col-10 text-center table-responsive' >
                    <table className='table'>
                        <tbody>
                            <tr>
                                <td>
                                    <ul className="list-group list-group-flush">
                                        <div className='d-flex flex-column gap-1'>
                                            <li className="list-group-item">
                                                <label className='d-flex justify-content-start'> <strong> User ID : </strong>
                                                    <label className='ps-2'> {getSingleUser.userId}</label>
                                                </label>
                                            </li>
                                            <li className="list-group-item">
                                                <label className='d-flex justify-content-start'> <strong>First Name : </strong>
                                                    <label className='ps-2' > {getSingleUser.userFirstName}</label>
                                                </label>
                                            </li>
                                            <li className="list-group-item">
                                                <label className='d-flex justify-content-start'> <strong>Last Name : </strong>
                                                    <label className='ps-2' > {getSingleUser.userLastName}</label>
                                                </label>
                                            </li>
                                            <li className="list-group-item">
                                                <label className='d-flex justify-content-start'> <strong>Contact Number : </strong>
                                                    <label className='ps-2' > {getSingleUser.userContactNumber}</label>
                                                </label>
                                            </li>
                                            <li className="list-group-item">
                                                <label className='d-flex justify-content-start'> <strong>User Email : </strong>
                                                    <label className='ps-2' > {getSingleUser.userEmail}</label>
                                                </label>
                                            </li>
                                            <li className="list-group-item">
                                                <label className='d-flex justify-content-start'> <strong>Role : </strong>
                                                    <label className='ps-2' > {getSingleUser.roles}</label>
                                                </label>
                                            </li>
                                        </div>
                                    </ul>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='mx-auto d-grid mb-3'>
                    <Link className='btn btn-danger' to={"/admin/dashboard/user"}><IoArrowBack />  Back</Link>
                </div>
            </div>
        </div>
    )
}
export default GetUser