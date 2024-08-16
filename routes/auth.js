const express = require('express');
const { User } = require('../database');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.create({ username, email, password });
    const token = user.generateAuthToken();
    res.status(201).json({ user: { id: user.id, username: user.username, email: user.email }, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = user.generateAuthToken();
    res.json({ user: { id: user.id, username: user.username, email: user.email }, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/me', authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;