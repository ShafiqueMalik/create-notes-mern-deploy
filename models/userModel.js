import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    pic: {
        type: String,
        required: true,
        default: "https://images.pexels.com/photos/390574/pexels-photo-390574.jpeg?auto=compress&cs=tinysrgb&w=100"
    }
},
    {
        timestamps: true
    }
);

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
});

userSchema.methods.matchPassword= async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}


const UserModel = mongoose.model("User", userSchema);
export default UserModel;
