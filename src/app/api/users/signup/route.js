import connectDB from '../../../util/db'
import User from '../../../../../models/userModel'
import bcryptjs from 'bcryptjs'
import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

connectDB()

export const POST =async req=>{
    try {
        const reqBody=await req.json()
        const {firstname,lastname,username,email,password}=reqBody
        
        console.log(reqBody)

        //check if user already
        const user=await User.findOne({email})
        if(user) return NextResponse.json({error:'user already'},{status:400})

        //hash password
        const salt=await bcryptjs.genSalt(10)
        const hashedPassword=await bcryptjs.hash(password,salt)
        
        const newUser=new User({
            firstname,
            lastname,
            username,
            email,
            password:hashedPassword,
        })

        const savedUser=await newUser.save()

        console.log(savedUser)

        const tokenData={
            id:savedUser._id,
            username:savedUser.username,
            email:savedUser.email
        }

        const token=await jwt.sign(tokenData,"nextjsyoutube",{expiresIn:'1h'})
        const response=NextResponse.json({
            message:'user created successfully',
            success:true,
            data:savedUser
        })
        response.cookies.set('token',token,{
            httpOnly:true
        })

        return response
    } catch (error) {
        return NextResponse.json({error:error.message},{status:500})
    }
}