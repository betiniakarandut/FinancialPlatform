import mongoose from "mongoose";

const StockTransactionSchema = new mongoose.Schema({
    userId: {type:mongoose.Schema.Types.ObjectId, ref: 'StockUser'},
    stockId: {type: mongoose.Schema.Types.ObjectId, ref: 'Stock'},
    transactionType: {enum: ['Buy', 'Sell'], default: 'Buy'},
    quantity: {type: Number, default: 0},
    price: {type: Number,},
    timeStamp: {type: Date, default: Date.now()},
});

const StockTransaction = mongoose.model( "StockTransaction", StockTransactionSchema);

export default StockTransaction;