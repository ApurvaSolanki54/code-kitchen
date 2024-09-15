import mongoose from "mongoose";

const testcaseSchema = new mongoose.Schema({

    input:{
        type: String
    },
    output:{
        type: String
    }
}, {timestamps:true})

export const Testcase = mongoose.model("Testcase", testcaseSchema)