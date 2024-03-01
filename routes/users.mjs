import express from 'express';
import Users from '../models/usersSchema.mjs';
const router = express.Router();

router.get('/api', async (req, res) => {
    try {
      const allUsers = await Users.find({});
      res.json(allUsers);
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Server Error' });
    }
  });

router.get('/', (req, res)=>{
    const options = {
        title: "MoodAMP",
        subTitle: `User Registration`,
        content: ` <br /><br />`
    };
    res.render("index", options);
})

export default router;