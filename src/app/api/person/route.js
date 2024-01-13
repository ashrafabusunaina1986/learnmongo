import { NextResponse } from "next/server"
import path from "path"
import fs from 'fs'
import users from '../../../../public/person.json'
const filepath=path.join(__dirname,'../../../../../public/person.json')
export const POST=async(request)=>{
    const user=await request.json()
    
    if(fs.existsSync(filepath)){
        users.push({id:users.length,user:await user})
        try {
            fs.writeFileSync(filepath,JSON.stringify(users,null,2),'utf-8')
            return NextResponse.json({ok:'ok',user:await user,filepath:filepath,users:users.reverse()},{status:200})
        } catch (error) {
            return NextResponse.json({result:'not found',error},{status:200})    
        }
        
    }else{
        return NextResponse.json({result:'not found'},{status:200})
    }
    
}

export const GET=async(request)=>{
    if(fs.existsSync(filepath)){
        try {
            const data=fs.readFileSync(filepath,'utf-8')
            const users=JSON.parse(data)
            return NextResponse.json({ok:'ok',users:users.reverse()})
        } catch (error) {
            return NextResponse.json({ok:'error',error:error})
        }
    }else{
        return NextResponse.json({result:'file not found'})
    }
}