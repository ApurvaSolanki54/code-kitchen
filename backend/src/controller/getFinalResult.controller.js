import { CheckRequest } from "../models/checkRequest.model.js";

const getFinalResult = async(req, res) =>{
    const data=req.body
    let output=""
    if(data.status.id===3){
        output = Buffer.from(req.body.stdout, 'base64').toString()
        console.log(Buffer.from(req.body.stdout, 'base64').toString())
    }
    let compileOutput=""
    if(data.compile_output!==null){
        compileOutput=Buffer.from(data.compile_output, 'base64').toString()
    }
    const token=data.token
    const checkReq = await CheckRequest.findOne({token})
    if(checkReq.status !== "Success"){
        const checkRequestDoc = await CheckRequest.findByIdAndUpdate(
            token,
            {
                $set:{
                    message: data.message,
                    description:data.status.description,
                    status:"Success",
                    compilationOutput: compileOutput,
                    yourCodeOutput: output
                },
            },
            {
                new: true
            }
        )
    }
}


export {getFinalResult}