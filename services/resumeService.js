const { BaseResume, InputResume } = require('../database');
const AIService = require('./aiService');

class ResumeService {
  static async createBaseResume(userId, content) {
    const skills = await aiService.extractSkills(content);
    return BaseResume.create({ UserId: userId, content, skills });
  }

  static async getBaseResume(userId) {
    return BaseResume.findOne({ where: { UserId: userId } });
  }

  static async compareResumes(baseResumeContent, inputResumeContent) {
    return aiService.compareResumes(baseResumeContent, inputResumeContent);
  }

  static async getResumeHistory(userId) {
    return InputResume.findAll({ where: { UserId: userId }, order: [['createdAt', 'DESC']] });
  }

  static async getResumeImprovement(resumeContent) {
    return aiService.getResumeImprovement(resumeContent);
  }

  static async generateCoverLetter(userId, jobPostingId) {
    const baseResume = await this.getBaseResume(userId);
    const jobPosting = await JobPosting.findByPk(jobPostingId);
    return AIService.generateCoverLetter(baseResume.content, jobPosting.description);
  }

  static async predictInterviewQuestions(jobPostingId) {
    const jobPosting = await JobPosting.findByPk(jobPostingId);
    return AIService.predictInterviewQuestions(jobPosting.description);
  }

  static async analyzeSkillGap(userId, jobPostingId) {
    const baseResume = await this.getBaseResume(userId);
    const jobPosting = await JobPosting.findByPk(jobPostingId);
    return AIService.analyzeSkillGap(baseResume.skills.join(', '), jobPosting.requirements);
  }

  static async optimizeResumeKeywords(userId, jobPostingId) {
    const baseResume = await this.getBaseResume(userId);
    const jobPosting = await JobPosting.findByPk(jobPostingId);
    return AIService.optimizeResumeKeywords(baseResume.content, jobPosting.description);
  }
}

module.exports = ResumeService;