import mongoose, {Schema,model,models} from "mongoose";

const userSchema=new Schema({
    firstname:String,
    lastname:String,
    email:String,
    password:String
})

const Users=models.Users || model('Users',userSchema)

export default Users