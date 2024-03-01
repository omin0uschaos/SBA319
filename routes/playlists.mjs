import express from 'express';
import Playlists from '../models/playlistsSchema.mjs';
const router = express.Router();

router.get('/', async (req, res) => {
    try {
      const allPlaylists = await Playlists.find({});
      res.json(allPlaylists);
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Server Error' });
    }
  });

export default router;