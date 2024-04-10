import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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
        enum: ['investor', 'admin'],
        default: 'investor',
    },
    permissions: {
        type: Array,
        default: [],
    },
    phone: {
        type: String,
    },
    cryptoWalletAddress: {
        type: String,
        unique: true,
    }
})

const User = mongoose.model('User', userSchema)

export default User;