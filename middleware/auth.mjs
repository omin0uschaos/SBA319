import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';


// Middleware to check user token
const checkToken = (req, res, next) => {
    // Check if token is present in cookies
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }
        req.userId = decoded.userId;
        next(); 
    });
};

export { checkToken };
