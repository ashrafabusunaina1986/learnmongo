import { getDataFormToken } from "../../../../helper/getDataFormToken";

import connect from '../../../util/db'
import User from '../../../../../models/userModel'
import { NextResponse } from "next/server";

connect()
export const GET=async req=>{
    try {
        const userId=await getDataFormToken(req)
        const user=await User.findOne({_id:userId}).select('-password')
        return NextResponse.json({
            message:'User found',
            data:user
        })
    } catch (error) {
        return NextResponse.json({error:error.message},{status:400})
    }
} 