import mongoose from 'mongoose';

const plansSchema = new mongoose.Schema({
    planId: {type: mongoose.Schema.Types.ObjectId, ref: 'StockUser'},
    plans: {
        enums: ['Gold', 'Diamond', 'Silver'], 
        default: 'NormalUser'
    },

});

const Plans = mongoose.model('STOCK_Plans', plansSchema);

export default Plans;