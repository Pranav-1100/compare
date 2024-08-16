const express = require('express');
const JobService = require('../services/jobService');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
  try {
    const jobPosting = await JobService.createJobPosting(req.body, req.user.id);
    res.status(201).json(jobPosting);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const jobPostings = await JobService.getJobPostings();
    res.json(jobPostings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/:id/score-resume', authMiddleware, async (req, res) => {
  try {
    const { resumeContent } = req.body;
    const score = await JobService.scoreResumeForJob(resumeContent, req.params.id);
    res.json(score);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;