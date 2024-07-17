import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, 'Please provide your name'],
        minLength : [3, 'Name must contain atleast 3characters!'],
        maxLength : [30, 'Name cannot exceed 30 characters']
    },
    email : {
        type : String,
        required : [true, 'Please provide you email'],
        validator: [validator.isEmail, 'Please provide a valid email']
    },
    phone : {
        type: Number,
        required : [true, 'Please provide your phone number']
    },
    password : {
        type : String,
        required : [true, 'Please provide your password'],
        minLength: [8, 'Password most contain atleast 8 characters'],
        maxLength: [32, 'Password connot exceed 32 characters']
    },
    role : {
        type : String,
        required : [true, 'Please provide your role'],
        enum : ['Job Seeker', 'Employer']      //iske alawa koi value enter nahi ho sakti
    },
    createdAt : {
        type : Date,
        default : Date.now,
    }
})


//HASHING THE PASSWORD
// userSchema save hone se pehle yeh code run karega
userSchema.pre('save', async function (next){
    if(!this.isModified('password')){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10)
})


//COMPARING THE PASSWORD    
userSchema.methods.comparePassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
};


//GENERATING A JWT TOKEM FOR AUTHORIZAION
userSchema.methods.getJWTToken = function (){
    return jwt.sign ({ id : this._id }, process.env.JWT_SECRET_KEY, { expiresIn : process.env.JWT_EXPIRE})
}

export const User = mongoose.model('User', userSchema)