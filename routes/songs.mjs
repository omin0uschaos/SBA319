import express from 'express';
import Songs from '../models/songsSchema.mjs';
const router = express.Router();

router.get('/', async (req, res) => {
    try {
      const allSongs = await Songs.find({});
      res.json(allSongs);
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Server Error' });
    }
  });

export default router;