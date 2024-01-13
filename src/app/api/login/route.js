import connectDB from '../../util/db'
import Users from '../../../../models/users'
import { NextResponse } from 'next/server'

export const POST=async req=>{
    const {email,password}=await req.json()
    await connectDB()
    const user =await Users.find({email:email,password:password})
    if(user.length===1)return NextResponse.json({message:'user found',user},{status:200})
    else return NextResponse.json({message:'user not found',user},{status:200})
}
export const GET=async req=>{
    await connectDB()
    const get =await Users.find()
    return NextResponse.json(get,{status:200})
}