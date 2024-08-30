const { BaseResume, InputResume, JobPosting } = require('../database');
const AIService = require('./aiService');

class ResumeService {
  static mockBaseResume = {
    UserId: 1,
    content: `
John Doe
Software Developer
123 Main St, Anytown, USA 12345
Phone: (555) 123-4567 | Email: john.doe@email.com

Summary:
Experienced software developer with 5+ years of expertise in full-stack web development, specialized in JavaScript, React, and Node.js. Passionate about creating efficient, scalable, and user-friendly applications.

Skills:
- Programming Languages: JavaScript, Python, Java
- Front-end: React, Vue.js, HTML5, CSS3
- Back-end: Node.js, Express.js, Django
- Databases: MongoDB, PostgreSQL
- DevOps: Docker, AWS, CI/CD
- Version Control: Git, GitHub

Experience:
Senior Software Developer | TechCorp Inc. | 2018 - Present
- Led development of a high-traffic e-commerce platform, increasing sales by 30%
- Implemented microservices architecture, improving system scalability
- Mentored junior developers and conducted code reviews

Software Developer | WebSolutions LLC | 2015 - 2018
- Developed and maintained multiple client websites using React and Node.js
- Optimized database queries, reducing load times by 40%

Education:
Bachelor of Science in Computer Science | Tech University | 2011 - 2015

Certifications:
- AWS Certified Developer - Associate
- MongoDB Certified Developer
    `,
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'Java', 'MongoDB', 'AWS']
  };

  static async createBaseResume(userId, content) {
    const skills = await AIService.extractSkills(content);
    return BaseResume.create({ UserId: userId, content, skills });
  }

  static async getBaseResume(userId) {
    // For demonstration purposes, return the mock base resume
    // In a real application, you would query the database
    return Promise.resolve(this.mockBaseResume);
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