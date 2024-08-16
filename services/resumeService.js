const { BaseResume, InputResume } = require('../database');
const aiService = require('./aiService');

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
}

module.exports = ResumeService;