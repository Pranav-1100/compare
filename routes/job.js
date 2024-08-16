const express = require('express');
const { JobPosting } = require('../database');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
  try {
    const jobPosting = await JobPosting.create(req.body);
    res.status(201).json(jobPosting);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const jobPostings = await JobPosting.findAll();
    res.json(jobPostings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const jobPosting = await JobPosting.findByPk(req.params.id);
    if (!jobPosting) {
      return res.status(404).json({ error: 'Job posting not found' });
    }
    res.json(jobPosting);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;