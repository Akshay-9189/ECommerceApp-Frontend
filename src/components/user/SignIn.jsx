import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { signIn } from '../../redux/slice/publicSlice'
import { GrPowerReset } from 'react-icons/gr'
import { IoArrowBack } from 'react-icons/io5'
import { FaSignInAlt } from 'react-icons/fa'
import { unwrapResult } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

function SignIn() {

    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const signInFunction = (e) => {
        e.preventDefault()
        const jwtRequest = { userEmail, userPassword }
        dispatch(signIn(jwtRequest))
            .then(unwrapResult)
            .then(response => {
                toast.success(`Welcome To Shop ${response.userInfo.userFirstName}`)
                if (response.userInfo.roles === 'USER')
                    navigate('/')
                else if (response.userInfo.roles === 'ADMIN')
                    navigate('/admin')
            }).catch(error => toast.error(error.message))
    }

    const clearForm = () => {
        setUserEmail('')
        setUserPassword('')
    }

    return (
        <div className="container">
            <div className="card mx-auto shadow-lg rounded user col-sm-12 col-md-10 col-lg-8 col-xl-6">
                <h5 className="card-title display-6 text-center mt-1 mb-0">Sign In</h5>
                <hr />
                <div className="card-body mx-4 ">
                    <form onSubmit={(e) => signInFunction(e)} className="mx-auto row d-flex gap-2 ">
                        <div className="form-group form-floating ">
                            <input type="email" className="form-control" id="username" placeholder='Enter User Name' required
                                value={userEmail} onChange={(e) => setUserEmail(e.target.value)}
                            />
                            <label htmlFor="userName" className='ms-2'>User Name : </label>
                        </div>
                        <div className="form-group form-floating">
                            <input type="password" className="form-control" id="password" placeholder='Enter Password' required
                                value={userPassword} onChange={(e) => setUserPassword(e.target.value)}
                            />
                            <label htmlFor="password" className='ms-2'>Password : </label>
                        </div>
                        <div className="gap-3 d-flex justify-content-center mt-3 mb-2">
                            <button className="btn btn-success" type="submit"><FaSignInAlt />  Sign In</button>
                            <button className="btn btn-danger" onClick={clearForm}><GrPowerReset />  Reset</button>
                            <Link className='btn btn-info' to={"/"}><IoArrowBack />  Back</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default SignIn