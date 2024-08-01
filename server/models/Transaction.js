import { Schema,model } from "mongoose";

const transactionSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    amount:{
        type:Number,
        required:true,
    },
    category:{
        type:String,
        default:"Others",
    },
    type:{
        type:String,
        enum:["debit", "credit"],
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
},{
    timestamps:true,
});

const Transaction = model("Transaction", transactionSchema);

export default Transaction;