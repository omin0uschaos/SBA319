import express from 'express';
import bodyParser from 'body-parser'
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import fs from 'fs';
import bcrypt from 'bcrypt';

import Users from './models/usersSchema.mjs';
import Songs from './models/songsSchema.mjs';
import Playlists from './models/playlistsSchema.mjs';
import { users, songs, playlists } from './utilities/sampleData.mjs';
import usersRouter from './routes/users.mjs';
import songsRouter from './routes/songs.mjs';
import playlistsRouter from './routes/playlists.mjs';




dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
await mongoose.connect(process.env.MONGO_URI);

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

app.engine("mood", (filePath, options, callback) =>{
    fs.readFile(filePath, (err, content) =>{
        if (err) return callback(err);

        const rendered = content
        .toString()
        .replaceAll("#title#", `${options.title}`)
        .replace('#sub-title#', `${options.subTitle}`)
        .replace('#content#', `${options.content}`)
        return callback(null, rendered);
    });
});

app.set("pages", "./views");
app.set("view engine", "mood");

app.use("/users", usersRouter);
app.use("/songs", songsRouter);
app.use("/playlists", playlistsRouter);


//Populate Database with sample data (RUN THIS FIRST!)
app.get('/seed', async (req, res)=>{
    //Clear the sample data to ensure data isn't duplicated
    await Users.deleteMany({});
    await Songs.deleteMany({});

    await Users.create(users);
    await Songs.create(songs);
    res.send('Database Seeded');
})




//separate seeding for playlist, special consideration made for unique ids from database (RUN THIS SECOND!)
app.get('/seedplaylist', async (req, res) => {
    try {
        //Clear existing playlists
        await Playlists.deleteMany({});

        //Fetch all songs and users
        const allSongs = await Songs.find({});
        const allUsers = await Users.find({});

        // Helper function to get song IDs by mood
        const getSongIdsByMood = (mood) => {
            return allSongs.filter(song => song.mood === mood).map(song => song._id);
        };

        // Helper function to get a random user ID
        const getRandomUserId = () => {
            const randomIndex = Math.floor(Math.random() * allUsers.length);
            return allUsers[randomIndex]._id;
        };

        // Create and populate playlists
        const populatedPlaylists = playlists.map(playlist => ({
            ...playlist,
            songIDs: getSongIdsByMood(playlist.mood),
            createdBy: getRandomUserId()
        }));

        // Save the updated playlists to the database
        await Playlists.create(populatedPlaylists);
        res.send('Playlist Database Seeded');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error seeding playlist database');
    }
});


//Read
app.get('/', async (req, res) => {
    try {
      const allSongs = await Songs.find({});
      res.json(allSongs);
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Server Error' });
    }
  });

//Listen
app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
  });