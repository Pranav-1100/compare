const express = require('express');
const CareerService = require('../services/careerService');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/networking', authMiddleware, async (req, res) => {
  try {
    const { industry, jobTitle } = req.body;
    const suggestions = await CareerService.suggestNetworking(industry, jobTitle);
    res.json({ suggestions });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/salary-estimate', authMiddleware, async (req, res) => {
  try {
    const { jobTitle, location, experience } = req.body;
    const estimate = await CareerService.estimateSalary(jobTitle, location, experience);
    res.json({ estimate });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/career-path', authMiddleware, async (req, res) => {
  try {
    const { currentRole, skills, interests } = req.body;
    const recommendation = await CareerService.recommendCareerPath(currentRole, skills, interests);
    res.json({ recommendation });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;