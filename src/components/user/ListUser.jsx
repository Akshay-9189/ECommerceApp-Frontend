import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteUser, getAllUsers } from '../../redux/slice/userSlice'
import { GrDocumentUpdate, GrView } from 'react-icons/gr'
import { RiDeleteBinLine } from 'react-icons/ri'
import { IoArrowBack } from 'react-icons/io5'

function ListUser() {

    const dispatch = useDispatch()
    const users = useSelector(state => state.userData.userInfo)

    useEffect(() => {
        document.title = "User List"
        dispatch(getAllUsers())
    }, [dispatch])

    // const changeRole = (userId) => {
    //     dispatch(changeUserRole({ userId }))
    // }

    return (
        <div className=''>
            <div className='card col-sm-12 col-md-10 col-lg-10 mx-auto shadow-lg' style={{ backgroundColor: "rgb(200, 220, 250)" }}>
                <h4 className='display-6 mt-1 mb-0 text-center'>Users List</h4>
                <hr />
                <div className='card-body'>
                    <Link to={"/admin/dashboard"} className="btn btn-danger ms-2"><IoArrowBack />  Back</Link>
                    <div className='table-responsive col-11 mx-auto m-3'>
                        <table className="table table-bordered table-striped table-hover border-dark" style={{ backgroundColor: 'rgb(207, 238, 222)' }}>
                            <thead >
                                <tr className='text-center align-middle'>
                                    {/* <th className='col-1'>User ID</th> */}
                                    <th className='col-2'>First Name</th>
                                    <th className='col-2'>Last Name</th>
                                    <th className='col-2'>User Email</th>
                                    <th className='col-2'>Role</th>
                                    <th className='col-4'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='text-center align-middle table-group-divider'>
                                {
                                    users && users.map(us => (
                                        <tr key={us.userId} >
                                            {/* <td>{us.userId}</td> */}
                                            <td>{us.userFirstName}</td>
                                            <td>{us.userLastName}</td>
                                            <td>{us.userEmail}</td>
                                            <td>{us.roles}</td>
                                            <td>
                                                <div className='d-grid gap-2 d-xxl-flex justify-content-center'>
                                                    <Link className='btn btn-secondary hover' to={`${us.userId}`}><GrView /> View</Link>
                                                    {/* <button className='btn btn-primary hover' onClick={() => changeRole(us.userId)}><GrUserAdmin /> UpdateRole</button> */}
                                                    <Link className='btn btn-warning hover' to={`updateUser/${us.userId}`}><GrDocumentUpdate /> Update</Link>
                                                    <button className='btn btn-danger hover' onClick={() => dispatch(deleteUser({ userId: us.userId }))}><RiDeleteBinLine /> Delete</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ListUser