import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import Users from './models/usersSchema.mjs';
import Songs from './models/songsSchema.mjs';
import Playlists from './models/usersSchema.mjs';
import { users, songs, playlists } from './path/to/sampleData.mjs'

//Populate Database with sample data
app.get('/seed', async (req, res)=>{
    //Clear the sample data to ensure data isn't duplicated
    await Users.deleteMany({});
    await Songs.deleteMany({});
    await Playlists.deleteMany({});

    await Users.create(users);
    await Songs.create(songs);
    await Playlists.create(playlists);
    res.send('Database Seeded');
})