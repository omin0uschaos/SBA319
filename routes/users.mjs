import express from 'express';
import Users from '../models/usersSchema.mjs';
const router = express.Router();

router.get('/', async (req, res) => {
    try {
      const allUsers = await Users.find({});
      res.json(allUsers);
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Server Error' });
    }
  });

export default router;