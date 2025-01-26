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
    firstname: {
        type: String,
        required: false // Allow firstname to be empty if needed
    },
    lastname: {
        type: String,
        required: false // Allow lastname to be empty if needed
    },
    photo: {
        type: String,
        required: false // Allow photo to be empty if needed
    },
    creditBalance: {
        type: Number,
        default: 5
    }
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
