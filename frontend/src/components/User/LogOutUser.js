import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const LogOutUser = ({setAuth}) => {
    const navigate = useNavigate();
    useEffect(()=>{
        const logoutUser = async() =>{
            const response = await axios.get(`http://localhost:8000/api/v1/users/logout`, {withCredentials: true })
            console.log("logout: ", response.data)
            setAuth(false)
            navigate('/login')
        }
        logoutUser()
    },[])
    return (
        <h1>Logout successfully</h1>
    )
}

export default LogOutUser