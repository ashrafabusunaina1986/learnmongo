import connectDB from '../../util/db'
import Tasks from '../../../../models/tasks'
import { NextResponse } from 'next/server'

export const POST =async req=>{
    const {title,description}=await req.json()
    await connectDB()
    await Tasks.create({title,description})
    const tasks=await Tasks.find()
    return NextResponse.json({message:"saved",tasks},{status:200})
}

export const GET=async req=>{
    await connectDB()
    const tasks=await Tasks.find()
    return NextResponse.json(tasks,{status:200})
}

export const DELETE=async req=>{
    const id =req.nextUrl.searchParams.get('id')
    await connectDB()
    const del=await Tasks.findByIdAndDelete(id)
    if(del) return NextResponse.json({message:'task deleted'},{status:200})
    else return NextResponse.json({message:'task not deleted'},{status:200})
}

