import React, { useEffect, useState } from 'react'
import { BsSave2 } from 'react-icons/bs'
import { IoArrowBack } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { signUp, updateUser } from '../../redux/slice/userSlice'
import { GrPowerReset } from 'react-icons/gr'
import { MdOutlineAppRegistration } from 'react-icons/md'

function SignUpOrUpdateUser() {

    const navigate = useNavigate()
    const { userId } = useParams()
    const [userFirstName, setUserFirstName] = useState('')
    const [userLastName, setUserLastName] = useState('')
    const [userContactNumber, setUserContactNumber] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')

    const dispatch = useDispatch()
    const { userInfo } = useSelector(state => state.userData)

    useEffect(() => {
        if (userId) {
            document.title = "Update User"
            const getSingleUser = userInfo.find(usr => usr.userId === userId)
            setUserFirstName(getSingleUser.userFirstName)
            setUserLastName(getSingleUser.userLastName)
            setUserContactNumber(getSingleUser.userContactNumber)
            setUserEmail(getSingleUser.userEmail)
            setUserPassword('')
        } else {
            document.title = "Sign Up"
        }
    }, [userInfo, userId])

    const updateUserr = (e) => {
        e.preventDefault();
        const userInfo = { userFirstName, userLastName, userContactNumber, userEmail, userPassword };
        if (userId) {
            //update
            dispatch(updateUser({ userId: userId, userInfo: userInfo }))
                .then(() => navigate('/admin/dashboard/user'))
        } else {
            dispatch(signUp(userInfo))
                .then(() => navigate('/signin'))
        }
    }

    const clearForm = (e) => {
        e.preventDefault()
        setUserFirstName('')
        setUserLastName('')
        setUserContactNumber('')
        setUserEmail('')
        setUserPassword('')
    }

    return (
        <div className='container '>
            <div className='card  col-md-6 col-md-9 col-lg-9  col-xl-8 col-xxl-8 mx-auto shadow-lg rounded' style={{ backgroundColor: "rgb(243, 210, 210)" }}>
                {
                    userId ? (
                        <h5 className='card-title display-6 text-center mt-1 mb-0'>Update Details</h5>
                    ) : (
                        <h5 className="card-title display-6  mt-1 mb-0 text-center">Sign Up</h5>
                    )
                }
                <hr />
                <div className='card-body'>
                    <form onSubmit={(e) => updateUserr(e)} className='mx-auto row d-flex gap-2 col-sm-12 col-md-11 col-lg-10 '>
                        <div className="form-group form-floating ">
                            <input type="text" className="form-control" id="userFirstName" placeholder="Enter First Name"
                                value={userFirstName} onChange={(e) => setUserFirstName(e.target.value)}
                            />
                            <label htmlFor='userFirstName' className='ms-2'>First Name : </label>
                        </div>
                        <div className="form-group form-floating ">
                            <input type="text" className="form-control " id="userLastName" placeholder="Enter Last Name"
                                value={userLastName} onChange={(e) => setUserLastName(e.target.value)}
                            />
                            <label htmlFor='userLastName' className='ms-2'>Last Name :</label>
                        </div>
                        <div className="form-group form-floating ">
                            <input type="text" className="form-control" id="userContactNumber" placeholder="Enter User Name"
                                value={userContactNumber} onChange={(e) => setUserContactNumber(e.target.value)}
                            />
                            <label htmlFor='userContactNumber' className='ms-2'>Contact Number :</label>
                        </div>
                        <div className="form-group form-floating ">
                            <input type="text" className="form-control" id="userEmail" placeholder="Enter Email"
                                value={userEmail} onChange={(e) => setUserEmail(e.target.value)}
                            />
                            <label htmlFor='userEmail' className='ms-2'>Email :</label>
                        </div>
                        <div className="form-group form-floating ">
                            <input type="password" className="form-control" id="userPassword" placeholder="Enter Password"
                                value={userPassword} onChange={(e) => setUserPassword(e.target.value)}
                            />
                            <label htmlFor='userPassword' className='ms-2'>Password :</label>
                        </div>
                        {
                            userId ? (
                                <div className='gap-3 d-flex justify-content-center mt-3'>
                                    <Link className='btn btn-info' to="/admin/dashboard/user"><IoArrowBack />  Back</Link>
                                    <button className="btn btn-danger" onClick={(e) => clearForm(e)}><GrPowerReset />  Reset</button>
                                    <button type='submit' className="btn btn-success"><BsSave2 />  Update</button>
                                </div>
                            ) : (
                                <div className='gap-3 d-flex justify-content-center mt-3'>
                                    <Link className='btn btn-info' to={'/'}><IoArrowBack />  Back</Link>
                                    <button className="btn btn-danger" onClick={(e) => clearForm(e)}><GrPowerReset />  Reset</button>
                                    <button className="btn btn-success" type="submit"><MdOutlineAppRegistration />  Register</button>
                                </div>
                            )
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}
export default SignUpOrUpdateUser