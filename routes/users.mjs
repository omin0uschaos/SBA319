import express from 'express';
import Users from '../models/usersSchema.mjs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { auth, checkToken } from '../middleware/auth.mjs';

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
router.get('/register', checkToken, (req, res)=>{
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
router.get('/login', checkToken, (req, res) => {
    const options = {
        title: "MoodAMP",
        subTitle: `User Login`,
        content: `
        <form id="loginForm" action="/users/login" method="POST">
            <input type="text" name="username" placeholder="Username" autocomplete="off" required>
            <input type="password" name="password" placeholder="Password" autocomplete="off" required>
            <button type="submit">Login</button>
        </form>
            
            <script>
                document.getElementById('loginForm').addEventListener('submit', function(e) {
                    e.preventDefault();
                
                    const formData = new FormData(this);
                    const data = Object.fromEntries(formData);
                
                    fetch('/users/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data),
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.token) {
                            localStorage.setItem('token', data.token);
                            alert('Login successful! Token stored.');
                        } else {
                            alert('Login failed.');
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
                });


            </script>

            `
    };
    res.render("index", options);
});

// Handle login form submission
router.post('/login', checkToken, async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await Users.findOne({ username });

        if (user && await bcrypt.compare(password, user.password)) {
            // User matched, create JWT Payload
            const payload = { id: user.id, username: user.username };

            // Sign token
            jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 7200 }, (err, token) => {
                if (err) throw err;
                res.json({
                    success: true,
                    token: 'Bearer ' + token
                });
            });
        } else {
            res.status(400).send('Invalid credentials');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error during login');
    }
});


export default router;