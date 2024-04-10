import mongoose from "mongoose";

const StockInvestmentSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'StockUser'},
    stockId: {type: mongoose.Schema.Types.ObjectId, ref: 'Stock'},
    investmentAmt: String,
    investmentStatus: Boolean,
    timeStamp: { type: Date, default: Date.now() },
});

const StockInvestment = mongoose.model("StockInvestment", StockInvestmentSchema);

export default StockInvestment;