import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    clerkId: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
   firstname:{
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    creditBalance: {
        type: Number,
        default: 5
    }
})

const UserModel = mongoose.model('User', userSchema)

export default UserModel

