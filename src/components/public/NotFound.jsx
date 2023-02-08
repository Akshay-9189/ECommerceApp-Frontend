import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className='container mt-3'>
      <p className='display-6 text-center'>The page you are looking is not yet developed......</p>
      <Link className='d-grid col-3 container btn btn-outline-dark hover mt-5' to={'/'}>Back</Link>
    </div>
  )
}

export default NotFound