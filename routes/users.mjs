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

router.get('/register', (req, res)=>{
    const options = {
        title: "MoodAMP",
        subTitle: `User Registration`,
        content: `
            <form action="" method="post">
                <input type="text" placeholder="Username">
                <input type="password" name="password" placeholder="Password" id="password-form">
                <input type="submit" value="Submit">
            </form> `
    };
    res.render("index", options);
})

export default router;