import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

const router = express.Router();

// Signup Route
router.post('/signup', async (req, res) => {
  try {
    const { name, phone, password, village, language } = req.body;

    // Validate inputs exist
    if (!phone || !password) {
      return res.status(400).json({ message: 'Phone and password are required' });
    }

    // Sanitize input to prevent NoSQL injection
    const safePhone = String(phone);

    // Check if user exists
    const existingUser = await User.findOne({ phone: safePhone });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Securely hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(String(password), salt);

    const newUser = new User({
      name: String(name || ''),
      phone: safePhone,
      password: hashedPassword,
      village: String(village || ''),
      language: String(language || '')
    });

    await newUser.save();

    // Exclude password from the returned response
    const userResponse = newUser.toObject();
    delete userResponse.password;

    res.status(201).json({ message: 'User created successfully', user: userResponse });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      return res.status(400).json({ message: 'Phone and password are required' });
    }

    // Sanitize input to prevent NoSQL injection
    const safePhone = String(phone);

    const user = await User.findOne({ phone: safePhone });
    if (!user) {
      return res.status(401).json({ message: 'Invalid phone or password' });
    }

    // Safely compare hashed password
    const isMatch = await bcrypt.compare(String(password), user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid phone or password' });
    }

    // Exclude password from the returned response
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(200).json({ message: 'Login successful', user: userResponse });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
