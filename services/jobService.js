const { JobPosting } = require('../database');
const aiService = require('./aiService');

class JobService {
  static async createJobPosting(jobData, creatorId) {
    return JobPosting.create({ ...jobData, creatorId });
  }

  static async getJobPostings() {
    return JobPosting.findAll();
  }

  static async scoreResumeForJob(resumeContent, jobPostingId) {
    const jobPosting = await JobPosting.findByPk(jobPostingId);
    if (!jobPosting) throw new Error('Job posting not found');
    return aiService.scoreResumeForJob(resumeContent, jobPosting.requirements);
  }
}

module.exports = JobService;