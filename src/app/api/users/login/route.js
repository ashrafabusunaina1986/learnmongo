import connectDB from '../../../util/db'
import User from '../../../../../models/userModel'
import bcryptjs from 'bcryptjs'
import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

connectDB()

export const POST=async req=>{
    try {
        const reqBody=await req.json()
        const {email,password}=reqBody
        console.log(reqBody)

        //check user is exis
        const user =await User.findOne({email})
        if(!user)return NextResponse.json({error:'user does not exit'},{status:400})

        //check password is correct
        const validPassword=await bcryptjs.compare(password,user.password)
        if(!validPassword)return NextResponse.json({error:'Invalid password'},{status:400})

        //create token data
        const tokenData={
            id:user._id,
            username:user.username,
            email:user.email
        }
        //create token
        const token=await jwt.sign(tokenData,"nextjsyoutube",{expiresIn:'1h'})
        const response=NextResponse.json({
            message:'Login successfully',
            success:true
        })
        response.cookies.set('token',token,{
            httpOnly:true
        })
        return response
        
    } catch (error) {
        return NextResponse.json({error:error.message},{status:500})
    }
}