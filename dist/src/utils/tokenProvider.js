import jwt from 'jsonwebtoken';
export default function tokenProvider(email) {
    var secretKey = process.env.JWT_KEY;
    var token = jwt.sign(email, secretKey);
    return token;
}
