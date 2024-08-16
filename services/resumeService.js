const { BaseResume, InputResume, JobPosting } = require('../database');
const AIService = require('./aiService');

class ResumeService {
  static async createBaseResume(userId, content) {
    const skills = await AIService.extractSkills(content);
    return BaseResume.create({ UserId: userId, content, skills });
  }

  static async getBaseResume(userId) {
    return BaseResume.findOne({ where: { UserId: userId } });
  }

  static async compareAndSaveResume(userId, inputContent) {
    const baseResume = await this.getBaseResume(userId);
    if (!baseResume) {
      throw new Error('Base resume not found');
    }

    const comparison = await AIService.compareResumes(baseResume.content, inputContent);
    const inputResume = await InputResume.create({
      content: inputContent,
      UserId: userId,
      similarity: comparison.similarityScore
    });

    return { inputResume, comparison };
  }

  static async getInputResumes(userId) {
    return InputResume.findAll({ where: { UserId: userId } });
  }

  static async getResumeHistory(userId) {
    return InputResume.findAll({ where: { UserId: userId }, order: [['createdAt', 'DESC']] });
  }

  static async getResumeImprovement(resumeContent) {
    return AIService.getResumeImprovement(resumeContent);
  }

  static async generateCoverLetter(userId, jobPostingId) {
    const baseResume = await this.getBaseResume(userId);
    const jobPosting = await JobPosting.findByPk(jobPostingId);
    if (!baseResume || !jobPosting) {
      throw new Error('Base resume or job posting not found');
    }
    return AIService.generateCoverLetter(baseResume.content, jobPosting.description);
  }

  static async predictInterviewQuestions(jobPostingId) {
    const jobPosting = await JobPosting.findByPk(jobPostingId);
    if (!jobPosting) {
      throw new Error('Job posting not found');
    }
    return AIService.predictInterviewQuestions(jobPosting.description);
  }

  static async analyzeSkillGap(userId, jobPostingId) {
    const baseResume = await this.getBaseResume(userId);
    const jobPosting = await JobPosting.findByPk(jobPostingId);
    if (!baseResume || !jobPosting) {
      throw new Error('Base resume or job posting not found');
    }
    return AIService.analyzeSkillGap(baseResume.skills.join(', '), jobPosting.requirements);
  }

  static async optimizeResumeKeywords(userId, jobPostingId) {
    const baseResume = await this.getBaseResume(userId);
    const jobPosting = await JobPosting.findByPk(jobPostingId);
    if (!baseResume || !jobPosting) {
      throw new Error('Base resume or job posting not found');
    }
    return AIService.optimizeResumeKeywords(baseResume.content, jobPosting.description);
  }

  static async translateResume(userId, targetLanguage) {
    const baseResume = await this.getBaseResume(userId);
    if (!baseResume) {
      throw new Error('Base resume not found');
    }
    return AIService.translateResume(baseResume.content, targetLanguage);
  }

  static async tailorResumeForIndustry(userId, industry) {
    const baseResume = await this.getBaseResume(userId);
    if (!baseResume) {
      throw new Error('Base resume not found');
    }
    return AIService.tailorResumeForIndustry(baseResume.content, industry);
  }

  static async assessPersonality(userId) {
    const baseResume = await this.getBaseResume(userId);
    if (!baseResume) {
      throw new Error('Base resume not found');
    }
    return AIService.assessPersonality(baseResume.content);
  }

  static async predictCareerTrajectory(userId, yearsAhead) {
    const baseResume = await this.getBaseResume(userId);
    if (!baseResume) {
      throw new Error('Base resume not found');
    }
    return AIService.predictCareerTrajectory(baseResume.content, yearsAhead);
  }

  static async trackJobApplication(userId, jobPostingId, status) {
    return JobApplication.create({ UserId: userId, JobPostingId: jobPostingId, status });
  }

  static async getJobApplications(userId) {
    return JobApplication.findAll({ where: { UserId: userId }, include: [JobPosting] });
  }

  static async simulateMockInterview(jobPostingId, userResponse) {
    const jobPosting = await JobPosting.findByPk(jobPostingId);
    if (!jobPosting) {
      throw new Error('Job posting not found');
    }
    return AIService.simulateMockInterview(jobPosting.description, userResponse);
  }

  static async getSalaryNegotiationAdvice(userId, jobOfferId) {
    const baseResume = await this.getBaseResume(userId);
    const jobOffer = await JobPosting.findByPk(jobOfferId);
    if (!baseResume || !jobOffer) {
      throw new Error('Base resume or job offer not found');
    }
    return AIService.getSalaryNegotiationAdvice(jobOffer.description, baseResume.content);
  }

  static async analyzeNetworkStrength(connections) {
    return AIService.analyzeNetworkStrength(connections);
  }

  static async generatePersonalBrand(userId, careerGoals) {
    const baseResume = await this.getBaseResume(userId);
    if (!baseResume) {
      throw new Error('Base resume not found');
    }
    return AIService.generatePersonalBrandStatement(baseResume.content, careerGoals);
  }

  static async analyzeVideoResume(userId, transcription) {
    return AIService.analyzeVideoResume(transcription);
  }

  static async getSkillDevelopmentPlan(userId, targetRole) {
    const userSkills = await UserSkill.findAll({ where: { UserId: userId } });
    const currentSkills = userSkills.map(skill => skill.name).join(', ');
    return AIService.getSkillDevelopmentPlan(currentSkills, targetRole);
  }

  static async analyzeIndustryTrends(industry, timeframe) {
    return AIService.analyzeIndustryTrends(industry, timeframe);
  }

  static async generateRecruiterOutreach(userId, recruiterId, jobPostingId) {
    const baseResume = await this.getBaseResume(userId);
    const recruiter = await User.findByPk(recruiterId);
    const jobPosting = await JobPosting.findByPk(jobPostingId);
    if (!baseResume || !recruiter || !jobPosting) {
      throw new Error('Required information not found');
    }
    return AIService.generateRecruiterOutreachMessage(baseResume.content, recruiter.profile, jobPosting.description);
  }

  static async checkDiversityInclusion(userId) {
    const baseResume = await this.getBaseResume(userId);
    if (!baseResume) {
      throw new Error('Base resume not found');
    }
    return AIService.checkDiversityInclusion(baseResume.content);
  }

  static async matchGigOpportunities(userId) {
    const userSkills = await UserSkill.findAll({ where: { UserId: userId } });
    const skills = userSkills.map(skill => skill.name).join(', ');
    const user = await User.findByPk(userId);
    return AIService.matchGigOpportunities(skills, user.preferences);
  }

  static async adviseCareerPivot(userId, targetIndustry) {
    const baseResume = await this.getBaseResume(userId);
    if (!baseResume) {
      throw new Error('Base resume not found');
    }
    return AIService.adviseCareerPivot(baseResume.content, targetIndustry);
  }
}

module.exports = ResumeService;