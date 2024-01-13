
import jwt from "jsonwebtoken";

export const getDataFormToken = req => {
    try {
        const token = req.cookies.get('token')?.value || ''
        const decodedToken = jwt.verify(token, "nextjsyoutube")
        return decodedToken.id
    } catch (error) {
        throw new Error(error.message)
    }
}