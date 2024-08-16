const { BaseResume, InputResume, JobPosting } = require('../database');
const { Op } = require('sequelize');

class AnalyticsService {
  static async getResumeAnalytics(userId) {
    const baseResume = await BaseResume.findOne({ where: { UserId: userId } });
    const inputResumes = await InputResume.findAll({ where: { UserId: userId } });
    const appliedJobs = await JobPosting.findAll({
      include: [{
        model: InputResume,
        where: { UserId: userId }
      }]
    });

    return {
      totalApplications: inputResumes.length,
      averageSimilarity: inputResumes.reduce((sum, resume) => sum + resume.similarity, 0) / inputResumes.length,
      topIndustriesApplied: this.getTopIndustries(appliedJobs),
      skillsFrequency: this.analyzeSkillsFrequency(baseResume, inputResumes),
    };
  }

  static getTopIndustries(jobs) {
    const industries = jobs.map(job => job.industry);
    return [...new Set(industries)].slice(0, 5); // Return top 5 unique industries
  }

  static analyzeSkillsFrequency(baseResume, inputResumes) {
    const allSkills = [baseResume.skills, ...inputResumes.map(r => r.skills)].flat();
    return allSkills.reduce((freq, skill) => {
      freq[skill] = (freq[skill] || 0) + 1;
      return freq;
    }, {});
  }
}

module.exports = AnalyticsService;