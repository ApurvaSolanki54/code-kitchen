import axios from 'axios'
import { Buffer } from 'buffer'
import { ApiResponse } from '../utiles/apiResponse.js'
import { Run } from '../models/run.model.js'

const encode = (str) => {
    return Buffer.from(str, "binary").toString("base64")
}
const decode = (str) => {
    return Buffer.from(str, 'base64').toString()
}

const submitCode = async(req, res)=>{
    const code =  encode(req.body.code)
    const input = encode(req.body.input)
    const languageId = req.body.languageId
    const options = {
        method: 'POST',
        url: 'http://localhost:2358/submissions',
        params: {
            base64_encoded: 'true',
            fields: '*'
        },
        data: {

            language_id: languageId,
            source_code: code,
            callback_url: "http://192.168.1.113/api/v1/result/",
            stdin: input,
            cpu_time_limit: parseFloat(15).toFixed(3),
            cpu_extra_time: parseFloat(2).toFixed(3),
            
        }
    };
    try {
        const response = await axios.request(options);
        console.log("response data from submitted code: ", response.data);
        const run = await Run.create({
            token:response.data.token,
            status:"Pending",
            description:""
          
        })
        return res.status(200).json(
            new ApiResponse(
                200,
                response.data,
                "code submitted successfully"
            )
        )
    } catch (error) {
        console.error("message-error:",error.message);
    }

}


export {submitCode}