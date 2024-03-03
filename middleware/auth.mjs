import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    // Check if the Authorization header exists
    if (!req.headers.authorization) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // Attempt to retrieve the token from the Authorization header
    const token = req.headers.authorization.split(' ')[1]; // Get token from header

    // Check if not token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};
//check user token function
const checkToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        // If no token is provided, instruct the client to navigate to the login page
        return res.status(401).json({ redirectTo: '/users/login', msg: 'Not authenticated' });
    }

    const token = authHeader.split(' ')[1]; // Bearer <token>
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            // If token verification fails, instruct the client to navigate to the login page
            return res.status(403).json({ redirectTo: '/users/login', msg: 'Token is not valid' });
        }
        req.user = decoded; // Add user info to request
        // If token is valid, proceed with the request
        next();
    });
};

export { auth, checkToken };