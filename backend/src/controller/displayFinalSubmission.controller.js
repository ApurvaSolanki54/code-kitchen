import { AllCheckRequest } from "../models/allCheckRequest.model.js";
import { CheckRequest } from "../models/checkRequest.model.js";
import { ApiResponse } from "../utiles/apiResponse.js";
import { asyncHandler } from "../utiles/asyncHandler.js";


const displayFinalSubmission = asyncHandler( async(req, res) => {
    let flag=0;

    const allCheckRequestId = req.body.allCheckRequestId
    const allCheckRequest = await AllCheckRequest.findOne({ _id: allCheckRequestId })
    console.log("display: ", allCheckRequest)

    let resultObj=[]
    for(let i=0; i<allCheckRequest.checkRequest.length; i++){
        const checkRequestDoc = await CheckRequest.findById(allCheckRequest.checkRequest[i]).populate('testcaseId')        
        const checkRequestToken = checkRequestDoc.token
        if(checkRequestDoc.status === "Success"){
            console.log("display1: ",i, checkRequestDoc)
            
            if(checkRequestDoc.description === "Accepted"){
                flag=flag+1;
                resultObj.push(checkRequestDoc)
            }
            else{
                resultObj.push(checkRequestDoc)
            }
        }
        else{
            resultObj.push(checkRequestDoc)
        }
    }
    
    if(flag === allCheckRequest.checkRequest.length){
        console.log("successfull")
        const ans=await AllCheckRequest.findByIdAndUpdate(
            allCheckRequestId,
            {
                $set:{
                    statusOfSubmission:"Accepted"
                }
            },
            {
                new: true
            }
        )
        return res.status(201).json(
            new ApiResponse(200, resultObj,"all testcase passed Successfully")
        ) 
    }
    else{
        await AllCheckRequest.findByIdAndUpdate(
            allCheckRequestId,
            {
                $set:{
                    statusOfSubmission:"Attempted"
                }
            },
            {
                new: true
            }
        )
    }
    return res.status(201).json(
        new ApiResponse(200, resultObj , "not all question submitted successfully")
    )
})


export {displayFinalSubmission}