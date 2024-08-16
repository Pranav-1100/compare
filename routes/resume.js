const express = require('express');
const { BaseResume, InputResume } = require('../database');
const ResumeService = require('../services/resumeService');
const authMiddleware = require('../middleware/auth');
const { compareResumesWithAI } = require('../utils/resumeComparison');

const router = express.Router();

router.post('/base', authMiddleware, async (req, res) => {
  try {
    const { content } = req.body;
    const baseResume = await BaseResume.create({
      content,
      UserId: req.user.id
    });
    res.status(201).json(baseResume);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/base', authMiddleware, async (req, res) => {
  try {
    const baseResume = await BaseResume.findOne({ where: { UserId: req.user.id } });
    if (!baseResume) {
      return res.status(404).json({ error: 'Base resume not found' });
    }
    res.json(baseResume);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/compare', authMiddleware, async (req, res) => {
  try {
    const { content } = req.body;
    const baseResume = await BaseResume.findOne({ where: { UserId: req.user.id } });
    if (!baseResume) {
      return res.status(404).json({ error: 'Base resume not found' });
    }

    const comparison = await compareResumesWithAI(baseResume.content, content);
    const inputResume = await InputResume.create({
      content,
      UserId: req.user.id,
      similarity: comparison.similarityScore
    });

    res.json({
      inputResume,
      comparison
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/input', authMiddleware, async (req, res) => {
  try {
    const inputResumes = await InputResume.findAll({ where: { UserId: req.user.id } });
    res.json(inputResumes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/history', authMiddleware, async (req, res) => {
    try {
      const history = await ResumeService.getResumeHistory(req.user.id);
      res.json(history);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  router.post('/improve', authMiddleware, async (req, res) => {
    try {
      const suggestions = await ResumeService.getResumeImprovement(req.body.content);
      res.json({ suggestions });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  router.post('/cover-letter/:jobId', authMiddleware, async (req, res) => {
    try {
      const coverLetter = await ResumeService.generateCoverLetter(req.user.id, req.params.jobId);
      res.json({ coverLetter });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  router.get('/interview-questions/:jobId', authMiddleware, async (req, res) => {
    try {
      const questions = await ResumeService.predictInterviewQuestions(req.params.jobId);
      res.json({ questions });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  router.get('/skill-gap/:jobId', authMiddleware, async (req, res) => {
    try {
      const analysis = await ResumeService.analyzeSkillGap(req.user.id, req.params.jobId);
      res.json({ analysis });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  router.get('/optimize-keywords/:jobId', authMiddleware, async (req, res) => {
    try {
      const keywords = await ResumeService.optimizeResumeKeywords(req.user.id, req.params.jobId);
      res.json({ keywords });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });  

module.exports = router;