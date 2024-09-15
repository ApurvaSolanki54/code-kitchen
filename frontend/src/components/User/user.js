import axios from "axios"

const getUser = async() =>{    
    const response = await axios.get('http://localhost:8000/api/v1/users/getUser', {withCredentials: true})
    return response.data.data
}

const getAllAccepted = async()=>{
    const response = await axios.get(`http://localhost:8000/api/v1/userCodes/allAccepted`, {withCredentials: true })
    return response.data.data
}

export {getUser, getAllAccepted}