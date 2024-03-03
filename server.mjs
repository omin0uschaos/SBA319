import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import fs from 'fs';
//logig and password middleware
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
//third-party middleware
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';
//schema imports
import Users from './models/usersSchema.mjs';
import Songs from './models/songsSchema.mjs';
import Playlists from './models/playlistsSchema.mjs';
//sample data import
import { users, songs, playlists } from './utilities/sampleData.mjs';
//express router imports
import navigationRouter from './routes/navigation.mjs';
import usersRouter from './routes/users.mjs';
import songsRouter from './routes/songs.mjs';
import playlistsRouter from './routes/playlists.mjs';
import homeRouter from './routes/home.mjs';
import errorHandler from './utilities/errorHandler.mjs'
import { checkToken } from './middleware/auth.mjs';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
await mongoose.connect(process.env.MONGO_URI);


app.use(express.json());

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

app.use(methodOverride('_method'));
app.use(express.static('styles'));
app.use('/images', express.static('images'));

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

app.use('/navigation', navigationRouter); 
app.use("/users", usersRouter);
app.use("/songs", songsRouter);
app.use("/playlists", playlistsRouter);
app.use("/home", homeRouter);


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
            createdBy: [getRandomUserId()]
        }));

        // Save the updated playlists to the database
        await Playlists.create(populatedPlaylists);
        res.send('Playlist Database Seeded');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error seeding playlist database');
    }
});

app.get('/', (req, res) => {

        const options = {
            title: "MoodAMP",
            subTitle: `HOMEPAGE`,
            content: `
            <h1>Welcome to MoodAMP</h1>
            <p>Your ultimate destination for music that matches every mood and moment.</p>
        
    
        <section id="discover-music">
            <h2>Discover Music for Every Mood</h2>
            <ul>
                <li><strong>Happy</strong> - Let the joy flow with tracks that bring out your brightest smile.</li>
                <li><strong>Sad</strong> - Find comfort in melodies that understand your sorrow.</li>
                <li><strong>Energetic</strong> - Boost your energy with beats that propel you forward.</li>
                <li><strong>Chill</strong> - Unwind and relax with soothing tunes that help you calm your mind.</li>
                <li><strong>Romantic</strong> - Ignite your passion with love songs that speak to the heart.</li>
                <li><strong>Reflective</strong> - Indulge in introspection with music that encourages you to ponder life.</li>
            </ul>
        </section>
    
        <section id="features">
            <h2>Features</h2>
            <p>Explore our carefully curated playlists, add your favorite music, discover new music, and enjoy seamless streaming.</p>
        </section>
    
        <section id="join-community">
            <h2>Join Our Community</h2>
            <p>MoodAMP is a community of music lovers. Share your favorite playlists, discover new music, and connect with others.</p>
        </section>
    
        <section id="start-listening">
            <h2>Start Listening Today</h2>
            <p>Ready to let your emotions lead the way? Dive into MoodAMP now and discover the perfect playlists for every mood.</p>
        </section>`
        };

        res.render("index", options);
  });

app.use('*', (req, res, next) => {
    const error = new Error('Page not found');
    error.status = 404;
    next(error);
});
//errorHandler
app.use(errorHandler);
//Listen
app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
  });