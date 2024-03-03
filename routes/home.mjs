import express from 'express';
import Users from '../models/usersSchema.mjs';
import Songs from '../models/songsSchema.mjs';
import Playlists from '../models/playlistsSchema.mjs';
import jwt from 'jsonwebtoken';
import { auth, checkToken } from '../middleware/auth.mjs';
const router = express.Router();

router.get('/', checkToken, (req, res) => {
    const options = {
        title: "MoodAMP",
        subTitle: `User Home Page`,
        content: `
        <div>
            <ul>
                <li><a href="/">Add Song</a></li>
                <li><a href="/">view Playlist by mood</a></li>
                <li><a href="/">Log Out</a></li>
            </ul>
        </div>
        
        `
    };
    res.render("index", options);
})

export default router;