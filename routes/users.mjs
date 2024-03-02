import express from 'express';
import Users from '../models/usersSchema.mjs';
import bcrypt from 'bcrypt';
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

// Display login form
router.get('/login', (req, res) => {
    const options = {
        title: "MoodAMP",
        subTitle: `User Login`,
        content: `
            <form action="/users/login" method="POST">
                <input type="text" name="username" placeholder="Username" required>
                <input type="password" name="password" placeholder="Password" required>
                <button type="submit">Login</button>
            </form> `
    };
    res.render("index", options);
});

// Handle login form submission
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await Users.findOne({ username });

        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                const options = {
                    title: "MoodAMP",
                    subTitle: `Login Success`,
                    content: `<h1>Welcome, ${user.username}!</h1>`
                };
                res.render("index", options);
            } else {
                res.status(400).send('Invalid credentials');
            }
        } else {
            res.status(400).send('User not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error during login');
    }
});


export default router;