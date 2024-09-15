import { Run } from '../models/run.model.js'
import { ApiError } from '../utiles/apiError.js'
import { ApiResponse } from '../utiles/apiResponse.js'

const result=async(req, res)=>{
    
    const data=req.body
    let output=""
    if(data.status.id===3){
        output = Buffer.from(req.body.stdout, 'base64').toString()
        console.log(Buffer.from(req.body.stdout, 'base64').toString())
    }
    let stdout = "";
    if(req.body.stdout!==null){
        stdout = Buffer.from(req.body.stdout, 'base64').toString()
    }
    let compile_output=""
    if(data.compile_output){
        compile_output=Buffer.from(data.compile_output, 'base64').toString()
    }
    const message = data.message;
    const description = data.status.description;
    const statusId = data.status.id
    const token = data.token
    const alreadyRun = await Run.findOne({token})
    if(alreadyRun.description!==description){
        const createRun = await Run.findByIdAndUpdate(
            alreadyRun._id,
            {
                $set:{
                    stdout,
                    compile_output,
                    message,
                    description,
                    statusId,
                    status:"Success"
                }
            },
            {
                new: true
            }
        )
        if(!createRun){
            throw new ApiError(500, "something went wrong while storing complied result")
        }
        return res.status(201).json(
            new ApiResponse(200, createRun, "run result stored Successfully")
        )
    }
    else{
        console.log("data-message", data.message)
        console.log("status: ", data.status.description)
        console.log("data: ",data);
    }

}

export {result}