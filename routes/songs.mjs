import express from 'express';
import Songs from '../models/songsSchema.mjs';
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
            <form action="" method="post">
                <input type="text" placeholder="Song Title" id="song-title">
                <input type="text" placeholder="Artist" id="song-artist">
                <input type="number" min="0" placeholder="Song Duration(Seconds)" id="song-duration">
                <select name="song-mood" id="song-mood">
                    <option value="Mood">Choose Mood</option>
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
                <input type="submit" value="Submit">
            </form> `
    };
    res.render("index", options);
})

export default router;