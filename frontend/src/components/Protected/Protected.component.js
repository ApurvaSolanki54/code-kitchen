import React, { useEffect } from 'react'
import { Navigate, Outlet, Route, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({Component, ...rest}) => {
    const navigate = useNavigate();
    let auth = Cookies.get('XSRF-TOKEN')
    return (
        auth ? <Outlet/> : <Navigate to='/login'/>
    )
}

export default ProtectedRoute