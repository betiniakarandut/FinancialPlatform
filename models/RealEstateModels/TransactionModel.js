import mongoose from "mongoose";

const transactionModelSchema = new mongoose.Schema({
    userId: String,
    transactionId: String,
    amount: Number,
    transactiontype: {type: String, },
    transactionId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    timeStamp: {type: Date, default: Date.now()},
});

const Transaction = mongoose.model("Transaction", transactionModelSchema);

export default Transaction;