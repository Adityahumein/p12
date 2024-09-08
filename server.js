const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/user'); // Ensure this path is correct

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://bitterlipshai:vZufH8O82sMLVmCG@mydatabase.nwhl5.mongodb.net/?retryWrites=true&w=majority&appName=mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => {
  console.error('Error connecting to MongoDB:', err);
  process.exit(1);
});

// Middleware to authenticate requests
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ authenticated: false });

  jwt.verify(token, 'your_jwt_secret', (err, user) => {
    if (err) return res.status(403).json({ authenticated: false });
    req.user = user;
    next();
  });
};

// Signup route
app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.json({ message: 'Signup successful' });
  } catch (err) {
    console.error('Error during signup:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Logout route
app.post('/logout', (req, res) => {
  // Here you might want to handle token invalidation if needed
  res.json({ message: 'Logged out successfully' });
});

// Check authentication status
app.get('/checkAuth', authenticateToken, (req, res) => {
  res.json({ authenticated: true });
});

// Start the server
const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
