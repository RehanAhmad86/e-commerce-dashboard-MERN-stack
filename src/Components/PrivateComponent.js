import React from 'react'
import { Navigate , Outlet  } from 'react-router-dom'
const PrivateComponent = () => {
    const author = localStorage.getItem("users")
    return author?  < Outlet /> : <Navigate to="/signup"/>
}
export default PrivateComponent