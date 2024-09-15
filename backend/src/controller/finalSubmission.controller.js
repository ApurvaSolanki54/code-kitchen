import { CheckRequest } from "../models/checkRequest.model.js";
import { Question } from "../models/question.model.js";
import { Testcase } from "../models/testcase.model.js";
import { User } from "../models/user.model.js"
import { Buffer } from 'buffer'
import { asyncHandler } from "../utiles/asyncHandler.js";
import axios from "axios";
import { ApiResponse } from "../utiles/apiResponse.js";
import { AllCheckRequest } from "../models/allCheckRequest.model.js";

const encode = (str) => {
    return Buffer.from(str, "binary").toString("base64")
}

  const decode = (str) => {
    return Buffer.from(str, 'base64').toString()
}
const finalSubmission = asyncHandler( async(req, res) => {
    const language = req.body.language
    const languageId = req.body.languageId
    const questionId = req.body.questionId
    const currCode= req.body.code
    const code =  encode(req.body.code)
    const question = await Question.findById(questionId)
    const user = await User.findById(userId)
    let checkRequestArray = []
    for(let i=0; i<question.testcase.length; i++){
        const testcase = await Testcase.findById(question.testcase[i])
        const options = {
            method: 'POST',
            url: 'http://localhost:2358/submissions',
            params: {
                base64_encoded: 'true',
                // fields: '*'
            },
            data: {
                language_id: languageId,
                source_code: code,
                callback_url: "http://192.168.1.113:8000/api/v1/final-result/",   
                
                stdin: Buffer.from(testcase.input, "binary").toString("base64"),//question.testcase[i].input, 
                expected_output: Buffer.from(testcase.output, "binary").toString("base64"),//question.testcase[i].output,
                cpu_time_limit: parseFloat(15).toFixed(3),
                cpu_extra_time: parseFloat(2).toFixed(3),
            }
            
        };
        try {
            const response = await axios.request(options);
            const checkRequest=await CheckRequest.create({
                _id: response.data.token,
                token:response.data.token,
                userId:user,
                questionId:questionId,
                testcaseId:testcase,
                status:"Pending",
                cases: i
                // questionId: question,
                // testcaseId: question.testcase[i]
            })

            checkRequestArray.push(checkRequest._id)
        } catch (error) {
            console.error("message-error:",error);
        }
    }
    const allCheckRequest = await AllCheckRequest.create({
        userId: userId,
        questionId:questionId,
        languageId: languageId,
        languageName: language,
        code: currCode,
        checkRequest: checkRequestArray
    })
    const allCheckRequest1 = await AllCheckRequest.findById(allCheckRequest._id)
    return res.status(200).json(
        new ApiResponse(200, allCheckRequest, "code submitted successfully")
    )
})


export {finalSubmission}