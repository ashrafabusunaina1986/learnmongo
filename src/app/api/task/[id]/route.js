import connectDB from '../../../util//db'
import Tasks from '../../../../../models/tasks'
import { NextResponse } from 'next/server'

export const PUT = async (req, { params }) => {
    const { id } = params
    const { _title: title, _description: description } = await req.json()
    await connectDB()
    const put = await Tasks.findByIdAndUpdate(id, { title, description })
    if (put) return NextResponse.json({ message: "task updated" }, { status: 200 })
    else return NextResponse.json({ message: "task not updated" }, { status: 200 })
}

export const GET =async (req,{params})=>{
    const {id}=params
    await connectDB()
    const get=await Tasks.findOne({_id:id})
    if(get) return NextResponse.json(get,{status:200})
    else return NextResponse.json({message:'not found'},{status:200})
}