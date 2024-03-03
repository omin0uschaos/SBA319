import express from 'express';
import jwt from 'jsonwebtoken';
import { checkToken } from '../middleware/auth.mjs';

const router = express.Router();

router.get('/userstatus', (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ isLoggedIn: false });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.json({ isLoggedIn: false });
        }
        res.json({ isLoggedIn: true, username: decoded.username });
    });
});


export default router;
