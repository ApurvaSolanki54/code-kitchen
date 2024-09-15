import axios from 'axios'
import { ApiResponse } from '../utiles/apiResponse.js';

const getLanguages=async(req,res)=>{
    
    const options = {
        method: 'GET',
        url: 'http://localhost:2358/languages',
    };
    
    try {
        console.log("inside getlanguage:")
        const response = await axios.request(options);
        console.log(response.data);
        return res.status(200).
        json(
            new ApiResponse(200, response.data, "all language fateched successfully")
        )
    } catch (error) {
        console.error(error);
    }
}

export {getLanguages}