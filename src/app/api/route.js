import connectDB from "../util/db";
import Demo from "../../../models/demo";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req){
    const {email,password}=await req.json()
   // const {email,password}=await user
    await connectDB()
    await Demo.create({email,password})
    const demo=await Demo.find()
    return NextResponse.json({name:"Demo inserterd",email,demo:demo.reverse()},{status:200})
}
export async function GET(req){
    await connectDB()
    const demo=await Demo.find()
    return NextResponse.json(demo.reverse(),{status:200})
}
export async function DELETE(request,{params}){
    const id=request.nextUrl.searchParams.get("id")
    await connectDB()
    const del=await Demo.findByIdAndDelete(id)
    if(del){
        return NextResponse.json({message:'Email deleted',id},{status:200})    
    }else return NextResponse.json({message:'not Email deleted',id},{status:200})
}