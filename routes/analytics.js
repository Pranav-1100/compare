const express = require('express');
const AnalyticsService = require('../services/analyticsService');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.get('/dashboard', authMiddleware, async (req, res) => {
  try {
    const analytics = await AnalyticsService.getResumeAnalytics(req.user.id);
    res.json(analytics);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;