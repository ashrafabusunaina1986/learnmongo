import connectDB from '../../util/db'
import Users from '../../../../models/users'
import { NextResponse } from 'next/server'


export const POST = async req => {
    const { firstname, lastname, email, password } = await req.json()
    await connectDB()

    const usero = await Users.findOne({ email: email })
    if (!usero) {
        await Users.create({ firstname, lastname, email, password })
        const get = await Users.find()
        return NextResponse.json({ message: 'user saved', usero, get }, { status: 200 })
    } else {
        const get = await Users.find()
        return NextResponse.json({ message: 'user already', usero, get }, { status: 200 })
    }
}
export const DELETE = async req => {
    await connectDB()
    const t = await Users.deleteMany({ __v: 0 })
    if (t) {
        const get = await Users.find()
        return NextResponse.json({ message: 'deleted', get }, { status: 200 })
    } else
        return NextResponse.json({ message: 'deleted' }, { status: 200 })
}

export const GET = async req => {
    await connectDB()
    const users = await Users.find()
    return NextResponse.json(users)
}