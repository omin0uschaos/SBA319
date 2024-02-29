import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import Users from './models/usersSchema.mjs';
import Songs from './models/songsSchema.mjs';
import Playlists from './models/playlistsSchema.mjs';
import { users, songs, playlists } from './utilities/sampleData.mjs'

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
await mongoose.connect(process.env.MONGO_URI);

app.use(express.json());

//Populate Database with sample data
app.get('/seed', async (req, res)=>{
    //Clear the sample data to ensure data isn't duplicated
    await Users.deleteMany({});
    await Songs.deleteMany({});

    await Users.create(users);
    await Songs.create(songs);
    res.send('Database Seeded');
})

//separate seeding for playlist, special consideration made for generated ids.
app.get('/seedplaylist', async (req, res) =>{
    await Playlists.deleteMany({});
    await Playlists.create(playlists);
    res.send('Playlist Database Seeded');
})



//Listen
app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
  });