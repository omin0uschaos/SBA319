import express from 'express';
import Playlists from '../models/playlistsSchema.mjs';
import Songs from '../models/songsSchema.mjs';
import Users from '../models/usersSchema.mjs';
const router = express.Router();

router.get('/api', async (req, res) => {
    try {
      const allPlaylists = await Playlists.find({});
      res.json(allPlaylists);
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Server Error' });
    }
  });

  router.get('/', async (req, res) => {
    try {
        const allPlaylists = await Playlists.find({});
        let contentHtml = '<ul>';

        allPlaylists.forEach(playlist => {
            contentHtml += `<li><a href="/playlists/${playlist._id}">${playlist.mood} Playlist</a></li><br>`;
        });

        contentHtml += '</ul>';

        const options = {
            title: "MoodAMP",
            subTitle: `Mood Playlists`,
            content: contentHtml
        };

        res.render("index", options);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching songs');
    }
  });

router.get('/:playlistId', async (req, res) => {
    try {
        const playlistId = req.params.playlistId;
        const playlist = await Playlists.findById(playlistId);
        if (!playlist) {
          return res.status(404).send('Playlist not found');
        }

        const songsPromises = playlist.songIDs.map(songId => {
          return Songs.findById(songId);
        });
        const songs = await Promise.all(songsPromises);

        let songList = '<ul>';
        songs.forEach(song => {

            songList += `<li><a href="${song.link}">${song.artist} - ${song.title}</a></li><br>`;
        });
        songList += '</ul>';

        const options = {
            title: "MoodAMP",
            subTitle: `${playlist.mood} Playlist`,
            content: songList
        };

        res.render("index", options);
    } catch (error) {
        console.error("Error fetching playlist: ", error);
        res.status(500).send('Error fetching playlist');
    }
});



export default router;