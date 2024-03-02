import express from 'express';
import Songs from '../models/songsSchema.mjs';
import Playlists from '../models/playlistsSchema.mjs'
const router = express.Router();

router.get('/api', async (req, res) => {
    try {
      const allSongs = await Songs.find({});
      res.json(allSongs);
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Server Error' });
    }
  });

  router.get('/add', (req, res)=>{
    const options = {
        title: "MoodAMP",
        subTitle: `Add New Song`,
        content: `
            <form action="/songs/add" method="post">
                <input type="text" name="title" placeholder="Song Title" id="song-title" required>
                <input type="text" name="artist" placeholder="Artist" id="song-artist" required>
                <input type="number" name="duration" min="0" placeholder="Song Duration(Seconds)" id="song-duration" required>
                <select name="mood" id="song-mood" required>
                    <option value="">Choose Mood</option>
                    <option value="Happy">Happy</option>
                    <option value="Sad">Sad</option>
                    <option value="Energetic">Energetic</option>
                    <option value="Chill">Chill</option>
                    <option value="Romantic">Romantic</option>
                    <option value="Melancholic">Melancholic</option>
                    <option value="Motivational">Motivational</option>
                    <option value="Relaxed">Relaxed</option>
                    <option value="Angry">Angry</option>
                    <option value="Hopeful">Hopeful</option>
                    <option value="Nostalgic">Nostalgic</option>
                    <option value="Peaceful">Peaceful</option>
                    <option value="Excited">Excited</option>
                    <option value="Dreamy">Dreamy</option>
                    <option value="Reflective">Reflective</option>
                </select>
                <input type="url" name="link" id="song-link" placeholder="Youtube URL(Include Http(s):" required>
                <input type="submit" value="Submit">
            </form> `
    };
    res.render("index", options);
})

router.post('/add', async (req, res) => {
    try {
        const { title, artist, duration, mood, link } = req.body;
        // Create and save the new song
        const newSong = new Songs({ title, artist, duration, mood, link });
        await newSong.save();

        // Find playlists with a matching mood and update them
        const playlistsToUpdate = await Playlists.find({ mood: mood });
        const updatePromises = playlistsToUpdate.map(async (playlist) => {
            playlist.songIDs.push(newSong._id); // Add the new song's _id
            return playlist.save(); // Save the updated playlist
        });
        await Promise.all(updatePromises); // Wait for all updates to complete

        // Prepare options for the response rendering
        const options = {
            title: "MoodAMP",
            subTitle: `Song Added Successfully`,
            content: `<h1>Song Added Successfully</h1>`
        };

        // Render response with success message
        res.render('index', options);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding the song');
    }
});

export default router;