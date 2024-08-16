const express = require('express');
const ResumeService = require('../services/resumeService');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/base', authMiddleware, async (req, res) => {
  try {
    const { content } = req.body;
    const baseResume = await ResumeService.createBaseResume(req.user.id, content);
    res.status(201).json(baseResume);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/base', authMiddleware, async (req, res) => {
  try {
    const baseResume = await ResumeService.getBaseResume(req.user.id);
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
    const result = await ResumeService.compareAndSaveResume(req.user.id, content);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/input', authMiddleware, async (req, res) => {
  try {
    const inputResumes = await ResumeService.getInputResumes(req.user.id);
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

router.post('/translate', authMiddleware, async (req, res) => {
  try {
    const { targetLanguage } = req.body;
    const translatedResume = await ResumeService.translateResume(req.user.id, targetLanguage);
    res.json({ translatedResume });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/tailor', authMiddleware, async (req, res) => {
  try {
    const { industry } = req.body;
    const tailoredResume = await ResumeService.tailorResumeForIndustry(req.user.id, industry);
    res.json({ tailoredResume });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/personality', authMiddleware, async (req, res) => {
  try {
    const personalityAssessment = await ResumeService.assessPersonality(req.user.id);
    res.json({ personalityAssessment });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/career-trajectory', authMiddleware, async (req, res) => {
  try {
    const { yearsAhead } = req.query;
    const careerTrajectory = await ResumeService.predictCareerTrajectory(req.user.id, yearsAhead);
    res.json({ careerTrajectory });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/job-application', authMiddleware, async (req, res) => {
  try {
    const { jobPostingId, status } = req.body;
    const jobApplication = await ResumeService.trackJobApplication(req.user.id, jobPostingId, status);
    res.json({ jobApplication });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/job-applications', authMiddleware, async (req, res) => {
  try {
    const jobApplications = await ResumeService.getJobApplications(req.user.id);
    res.json({ jobApplications });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/mock-interview/:jobId', authMiddleware, async (req, res) => {
  try {
    const { userResponse } = req.body;
    const interviewFeedback = await ResumeService.simulateMockInterview(req.params.jobId, userResponse);
    res.json({ interviewFeedback });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/salary-negotiation/:jobId', authMiddleware, async (req, res) => {
  try {
    const negotiationAdvice = await ResumeService.getSalaryNegotiationAdvice(req.user.id, req.params.jobId);
    res.json({ negotiationAdvice });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/network-analysis', authMiddleware, async (req, res) => {
  try {
    const { connections } = req.body;
    const networkAnalysis = await ResumeService.analyzeNetworkStrength(connections);
    res.json({ networkAnalysis });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;