import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../model/User.js';

const router = express.Router();

// ✅ Signup API
router.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create and save new user
    const user = new User({ username, password }); // Note: plaintext (not secure in real apps)
    await user.save();

    res.status(201).json({ message: '✅ User created successfully' });
  } catch (err) {
    res.status(500).json({ error: '❌ Failed to create user' });
  }
});

// ✅ Get All Users API (only for debugging)
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, 'username password'); // Returns passwords — avoid in production
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: '❌ Failed to fetch users' });
  }
});

// ✅ Login API
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user by username
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: '❌ User not found' });

    // Compare passwords directly (for now, no hashing)
    if (password !== user.password)
      return res.status(401).json({ error: '❌ Invalid credentials' });

    // Generate JWT Token using correct env variable
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.json({ token, username: user.username });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '❌ Server error' });
  }
});

export default router;