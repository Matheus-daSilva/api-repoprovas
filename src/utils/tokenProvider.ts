import jwt from 'jsonwebtoken'

export default function tokenProvider(email: string) {
    const secretKey = process.env.JWT_KEY
    const token = jwt.sign(email, secretKey)
    return token
}