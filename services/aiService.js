const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

class AIService {
  static async compareResumes(baseResumeText, inputResumeText) {
    const prompt = `
Compare the following two resumes and provide a similarity score between 0 and 1, where 1 is identical and 0 is completely different. Also provide a brief explanation of the similarities and differences.

Base Resume:
${baseResumeText}

Input Resume:
${inputResumeText}

Provide the response in the following JSON format:
{
  "similarityScore": 0.75,
  "explanation": "Brief explanation here"
}
`;

    try {
      const response = await this.getCompletion(prompt);
      return JSON.parse(response);
    } catch (error) {
      console.error('Error comparing resumes:', error);
      throw new Error('Failed to compare resumes using AI');
    }
  }

  static async extractSkills(resumeText) {
    const prompt = `Extract a list of skills from the following resume:\n\n${resumeText}\n\nSkills:`;
    const response = await this.getCompletion(prompt);
    return response.split(',').map(skill => skill.trim());
  }

  static async getResumeImprovement(resumeText) {
    const prompt = `Provide suggestions to improve the following resume:\n\n${resumeText}\n\nSuggestions:`;
    return this.getCompletion(prompt);
  }

  static async scoreResumeForJob(resumeText, jobRequirements) {
    const prompt = `Score the following resume against these job requirements. Provide a score out of 100 and a brief explanation.\n\nResume:\n${resumeText}\n\nJob Requirements:\n${jobRequirements}\n\nScore and Explanation:`;
    return this.getCompletion(prompt);
  }

  static async generateCoverLetter(resumeText, jobDescription) {
    const prompt = `Generate a cover letter based on this resume and job description:\n\nResume:\n${resumeText}\n\nJob Description:\n${jobDescription}\n\nCover Letter:`;
    return this.getCompletion(prompt);
  }

  static async predictInterviewQuestions(jobDescription) {
    const prompt = `Predict 5 likely interview questions for this job description:\n\n${jobDescription}\n\nQuestions:`;
    return this.getCompletion(prompt);
  }

  static async analyzeSkillGap(resumeSkills, jobRequirements) {
    const prompt = `Analyze the skill gap between these resume skills and job requirements:\n\nResume Skills:\n${resumeSkills}\n\nJob Requirements:\n${jobRequirements}\n\nSkill Gap Analysis:`;
    return this.getCompletion(prompt);
  }

  static async suggestNetworking(industry, jobTitle) {
    const prompt = `Suggest networking strategies for someone in the ${industry} industry applying for a ${jobTitle} position:`;
    return this.getCompletion(prompt);
  }

  static async optimizeResumeKeywords(resumeText, jobDescription) {
    const prompt = `Suggest keywords to add to this resume based on the job description:\n\nResume:\n${resumeText}\n\nJob Description:\n${jobDescription}\n\nSuggested Keywords:`;
    return this.getCompletion(prompt);
  }

  static async estimateSalary(jobTitle, location, experience) {
    const prompt = `Estimate the salary range for a ${jobTitle} in ${location} with ${experience} years of experience:`;
    return this.getCompletion(prompt);
  }

  static async recommendCareerPath(currentRole, skills, interests) {
    const prompt = `Recommend a career path for someone currently in a ${currentRole} role with these skills and interests:\n\nSkills: ${skills}\nInterests: ${interests}\n\nCareer Path Recommendation:`;
    return this.getCompletion(prompt);
  }

  static async getCompletion(prompt) {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 500,
    });
    return response.choices[0].message.content.trim();
  }

  static async translateResume(resumeContent, targetLanguage) {
    const prompt = `Translate the following resume to ${targetLanguage}:\n\n${resumeContent}`;
    return this.getCompletion(prompt);
  }

  static async tailorResumeForIndustry(resumeContent, industry) {
    const prompt = `Tailor the following resume for the ${industry} industry:\n\n${resumeContent}`;
    return this.getCompletion(prompt);
  }

  static async assessPersonality(resumeContent) {
    const prompt = `Analyze the following resume and provide a brief personality assessment based on the content:\n\n${resumeContent}`;
    return this.getCompletion(prompt);
  }

  static async predictCareerTrajectory(resumeContent, yearsAhead) {
    const prompt = `Based on the following resume, predict potential career paths and positions for ${yearsAhead} years ahead:\n\n${resumeContent}`;
    return this.getCompletion(prompt);
  }

  static async simulateMockInterview(jobDescription, userResponse) {
    const prompt = `Act as an interviewer for this job description:\n${jobDescription}\n\nCandidate's response:\n${userResponse}\n\nProvide feedback and a follow-up question:`;
    return this.getCompletion(prompt);
  }

  static async getSalaryNegotiationAdvice(jobOffer, userExperience) {
    const prompt = `Provide salary negotiation advice for this job offer:\n${jobOffer}\n\nCandidate's experience:\n${userExperience}`;
    return this.getCompletion(prompt);
  }

  static async analyzeNetworkStrength(connections) {
    const prompt = `Analyze the strength and potential of this professional network:\n${JSON.stringify(connections)}`;
    return this.getCompletion(prompt);
  }

  static async generatePersonalBrandStatement(resumeContent, careerGoals) {
    const prompt = `Create a compelling personal brand statement based on this resume and career goals:\n\nResume:\n${resumeContent}\n\nCareer Goals:\n${careerGoals}`;
    return this.getCompletion(prompt);
  }

  static async analyzeVideoResume(transcription) {
    const prompt = `Analyze this video resume transcription and provide feedback on content, delivery, and areas for improvement:\n\n${transcription}`;
    return this.getCompletion(prompt);
  }

  static async getSkillDevelopmentPlan(currentSkills, targetRole) {
    const prompt = `Create a gamified skill development plan to transition from current skills to the target role:\n\nCurrent Skills:\n${currentSkills}\n\nTarget Role:\n${targetRole}`;
    return this.getCompletion(prompt);
  }
}

module.exports = AIService;