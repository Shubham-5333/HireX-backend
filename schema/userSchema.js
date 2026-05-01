import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { 
        type: String,
        require: true,
    },
    email: {    
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true,
        minlength: 1
    }
},
    {
        timestamps: true
    }
)
const Userdb = mongoose.model("User", userSchema)
export default Userdb





