import express from 'express';
import Users from '../models/usersSchema.mjs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { checkToken } from '../middleware/auth.mjs';

const router = express.Router();
//get all users from api
router.get('/api', async (req, res) => {
    try {
      const allUsers = await Users.find({});
      res.json(allUsers);
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Server Error' });
    }
  });
//register page display
router.get('/register', (req, res)=>{
    const options = {
        title: "MoodAMP",
        subTitle: `User Registration`,
        content: `
            <form action="/users/register" method="POST">
                <input type="text" name="username" placeholder="Username" autocomplete="off" required>
                <input type="password" name="password" placeholder="Password" id="password-form" autocomplete="off" required>
                <button type="submit">Register</button>
            </form> `
    };
    res.render("index", options);
})

//register page submission
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

// Display login form
router.get('/login', (req, res) => {
    const options = {
        title: "MoodAMP",
        subTitle: `User Login`,
        content: `
            <form action="/users/login" method="POST">
                <input type="text" name="username" placeholder="Username" autocomplete="off" required>
                <input type="password" name="password" placeholder="Password" autocomplete="off" required>
                <button type="submit">Login</button>
            </form> `
    };
    res.render("index", options);
})

// Handle login form submission
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await Users.findOne({ username });

        if (!user) {
            return res.status(401).send('Invalid username or password');
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).send('Invalid username or password');
        }

        // Create JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Set the token as a cookie
        res.cookie('token', token, { httpOnly: true });

        res.redirect('/'); // Redirect to the homepage or any other page you desire after successful login
    } catch (error) {
        console.error(error);
        res.status(500).send('Error logging in');
    }
})


export default router;