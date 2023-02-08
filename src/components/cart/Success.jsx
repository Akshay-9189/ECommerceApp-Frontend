import React from 'react'
import { Link } from 'react-router-dom'
import { FcApproval } from 'react-icons/fc'

function Success() {

    return (
        <div className='container'>
            <h3 className='display-5'><FcApproval /> Youe Order Is Place Successfully </h3>
            <Link to={"/"}>Back To Home </Link>
        </div>
    )
}

export default Success