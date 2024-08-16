const AIService = require('./aiService');

class CareerService {
  static async suggestNetworking(industry, jobTitle) {
    return AIService.suggestNetworking(industry, jobTitle);
  }

  static async estimateSalary(jobTitle, location, experience) {
    return AIService.estimateSalary(jobTitle, location, experience);
  }

  static async recommendCareerPath(currentRole, skills, interests) {
    return AIService.recommendCareerPath(currentRole, skills, interests);
  }
}

module.exports = CareerService;