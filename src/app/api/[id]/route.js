import { NextResponse } from 'next/server'
import Demo from '../../../../models/demo'
import connectDB from '../../util/db'

export async function PUT(req,{params}){
    const {id}= params
    const { e:email,p:password }=await req.json()
    await connectDB()
    const u=await Demo.findByIdAndUpdate(id,{email,password})
    if(u){
        return NextResponse.json({message:"email edit"},{status:200})
    }else return NextResponse.json({message:"not email edit"},{status:200})
}

export const GET=async(req,{params})=>{
    const {id}=params
    await connectDB()
    const user=await Demo.findOne({_id:id})
    return NextResponse.json(user,{status:200})
}