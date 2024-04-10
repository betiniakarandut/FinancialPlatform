import mongoose from "mongoose";

const StockModelShema = new mongoose.Schema({
    name: String,
    description: String,
    symbol: Number,
    currentPrice: {type: String,},
    timeStamp: {type: Date, default: Date.now()},
});

const Stock = mongoose.model("Stock", StockModelShema);

export default Stock;