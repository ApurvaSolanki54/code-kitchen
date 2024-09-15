import mongoose from "mongoose";

const runSchema = mongoose.Schema({
    stdout:{
        type: String
    },
    compile_output:{
        type:String
    },
    status:{
        type:String
    },
    message:{
        type: String
    },
    description:{
        type :String
    },
    statusId:{
        type: Number
    },
    languageId: {
        type:Number
    }, 
    token:{
        type: String
    }
}, {timestamps: true})

export const Run = mongoose.model("Run", runSchema)