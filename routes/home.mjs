import express from 'express';
import Users from '../models/usersSchema.mjs';
import Songs from '../models/songsSchema.mjs';
import Playlists from '../models/playlistsSchema.mjs';
import jwt from 'jsonwebtoken';
import { checkToken } from '../middleware/auth.mjs';
const router = express.Router();

router.get('/dashboard', checkToken, (req, res) => {
    const options = {
        title: "MoodAMP",
        subTitle: `User Dashboard`,
        content: `
        <div>
            <ul>
                <li><a href="/songs/add">Add New Song</a></li>
                <li><a href="/songs/edit">Edit Songs</a></li>
                <li><a href="/home/logout">Log Out</a></li>
            </ul>
        </div>
        
        `
    };
    res.render("index", options);
})

router.get('/logout', (req, res) => {
    // Clear the token/cookie
    res.clearCookie('token');
    res.redirect('/'); // Redirect to the homepage
});

export default router;