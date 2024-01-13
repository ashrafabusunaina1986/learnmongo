import { NextResponse } from 'next/server'
import Images from '../../../../models/images'
import connectDB from '../../util/db'

export const POST =async req=>{
    const {name,image}=await req.json()
    await connectDB()
    const post=await Images.create({name,image})
    if(post)return NextResponse.json({message:"saved"},{status:200})
    else return NextResponse.json({message:'not saved'},{status:400})
}

export const GET=async req=>{
    await connectDB()
    const get=await Images.find()
    if(get)return NextResponse.json(get,{status:200})
    else return NextResponse.json({message:'no get'},{status:400})
    
}

export const DELETE=async req=>{
    const id =req.nextUrl.searchParams.get("id")
    await connectDB()
    const del=await Images.findByIdAndDelete(id)
    if(del) return NextResponse.json({message:"deleted"},{status:200})
    else return NextResponse.json({message:"not deleted"},{status:200})
}