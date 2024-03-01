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
            <form action="/users/register" method="POST">
                <input type="text" name="username" placeholder="Username" required>
                <input type="password" name="password" placeholder="Password" id="password-form" required>
                <button type="submit">Register</button>
            </form> `
    };
    res.render("index", options);
})

router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const newUser = new Users({ username, password});
        await newUser.save();
        const options = {
            title: "MoodAMP",
            subTitle: `User Registration Success`,
            content: `
                <h1>User Registration Complete</h1>
                `
        };
        res.render("index", options);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error registering the user');
    }
})

export default router;