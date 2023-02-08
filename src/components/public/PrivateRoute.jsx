import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function PrivateRoute({ islogIn }) {
    return islogIn ? <Outlet /> : <Navigate to={'/'} />
}
export default PrivateRoute
