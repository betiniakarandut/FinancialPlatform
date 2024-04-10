import mongoose from "mongoose";

const StockUserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        minlength: 8,
        trim: true,
    },
    verified: {
        type: Boolean,
    },
    roles: {
        type: String,
        enum: ['Stockuser', 'admin'],
        default: 'Stockuser',
    },
    permissions: {
        type: Array,
        default: [],
    },
    phone: {
        type: String,
    },
    PayPal: {
        acctName: String,
        acctNumber: String,
    }
})

const StockUser = mongoose.model('StockUser', StockUserSchema)

export default StockUser;