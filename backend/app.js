const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();

const sequelize = require('./models/index');
const User = require('./models/User');
const Bid = require('./models/Bid');

sequelize.sync({ alter: true }).then(() => {
    console.log('Database & tables created!');
});

app.use(cors());
app.use(express.json());

//middlewares
const authenticateToken = (req, res, next) => {
    const token = req.body.headers['Authorization'];
    console.log("AUTH TOKEN", token)
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, 'your_secret_key', (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

app.get('/', (req, res) => {
  res.send('Welcome to the Bidding Application!');
});
app.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existingUser = await User.findOne({ where: { username } }) || await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({message:'User already exists with the given username or email'});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, email, password: hashedPassword });
        console.log(newUser, "newUser"); // It's generally not a good practice to log user details
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error("Error in Signup:", error.message); // Logging the error for debugging
        res.status(500).send('Error during signup');
    }
});
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).send('User not found');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send('Invalid password');
        }

        const token = jwt.sign({ userId: user.id }, 'your_secret_key', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).send(error.message);
    }
});
app.post('/api/logout', authenticateToken, (req, res) => {
    const refreshToken = req.body.token;
    console.log("logout api called")
    // Invalidate the refresh token...
    res.sendStatus(204); // No Content
});
app.post('/api/token/refresh', async (req, res) => {
    const refreshToken = async () => {
        const currentRefreshToken = localStorage.getItem('refreshToken'); // Adjust based on where you store it
        try {
            const response = await api.post('/api/token/refresh', { token: currentRefreshToken });
            localStorage.setItem('token', response.data.token);
            return response.data.token;
        } catch (error) {
            console.error('Token refresh failed', error);
            // Redirect to login or handle failure
        }
    };
});
app.post('/api/user/profile', authenticateToken, async (req, res) => {
    try {
        const email = req.body.headers.email;
        const user = await User.findOne({ where: { email } });
        console.log("fetching user profile", user);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.json({ name: user.username, email: user.email /* other user data */ });
    } catch (error) {
        console.log("Error in fetching user profile")
        res.status(500).send(error.message);
    }
});
app.post('/bid', authenticateToken, async (req, res) => {
    try {
        const { amount } = req.body;
        const userId = req.user.userId;
        const newBid = await Bid.create({ amount, userId });
        res.status(201).json(newBid);
    } catch (error) {
        res.status(500).send(error.message);
    }
});
app.get('/bids', async (req, res) => {
    try {
        const bids = await Bid.findAll();
        res.json(bids);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

