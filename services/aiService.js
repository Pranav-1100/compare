const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

class AIService {
  static async compareResumes(baseResumeText, inputResumeText) {
    // Implementation similar to the previous compareResumesWithAI function
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

  static async getCompletion(prompt) {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 500,
    });
    return response.choices[0].message.content.trim();
  }
}

module.exports = AIService;