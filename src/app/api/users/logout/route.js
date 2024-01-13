import { NextResponse } from "next/server"

export const GET = async req => {
    try {
        const response = NextResponse.json({
            message: "Log out successfully",
            success: true
        })
        response.cookies.set('token', '', {
            httpOnly: true,
            expires: new Date(0)
        })
        return response
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}