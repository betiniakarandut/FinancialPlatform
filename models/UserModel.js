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
        enum: ['Normal user', 'Admin'],
        default: 'Normal user',
    },
    phone: {
        type: String,
    },
    cryptoWalletAddress: {
        type: String,
        default:'uytond'
    },
    profileImage: String,
})

const User = mongoose.model('RE_User', userSchema)

export default User;