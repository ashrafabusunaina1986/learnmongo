import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    firstname:{
        type:String,
        required:[true,'please provide a firstname']
    },
    lastname:{
        type:String,
        required:[true,'please provide a lastname']
    },
    username:{
        type:String,
        required:[true,'please provide username'],
        unique:true
    },
    email:{
        type:String,
        required:[true,'Please provide a n email'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'Please provide a password']
    },
    isVerfied:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    forgotPasswordToken:String,
    forgotPasswordTokenExpiry:Date,
    verifyToken:String,
    verifyTokenExpiry:Date
})

const User=mongoose.models.user1 || mongoose.model('user1',userSchema)

export default User