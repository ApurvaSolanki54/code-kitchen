import { ApiResponse } from "../utiles/apiResponse.js";
import { asyncHandler } from "../utiles/asyncHandler.js";
import { AllCheckRequest } from "../models/allCheckRequest.model.js";

const userSubmittedCode = asyncHandler( async(req, res) => {
    const questionId  = req.body.questionId;
    const userId = req.user._id;
    const userCodes = await AllCheckRequest.find({
        $and: [{userId}, {questionId}]
    })
    if(!userCodes){
        return res.status(404).json(
            new ApiResponse(404,"Not Found Question")
        )
    }
    return res.status(200).json(
        new ApiResponse(200, userCodes, "Success")
    )
})

const userAllAccepted = asyncHandler( async(req, res) => {
    const userId = req.user._id;
    const userCodes = await AllCheckRequest.find({userId}).populate('questionId')
    if(!userCodes){
        return res.status(404).json(
            new ApiResponse(404,"Not Found Question")
        )
    }
    return res.status(200).json(
        new ApiResponse(200, userCodes, "Success")
    )
})

export {userSubmittedCode, userAllAccepted}