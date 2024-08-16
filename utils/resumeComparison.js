const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function compareResumesWithAI(baseResumeText, inputResumeText) {
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
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 500,
    });

    const result = JSON.parse(response.choices[0].message.content);
    return result;
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    throw new Error('Failed to compare resumes using AI');
  }
}

module.exports = { compareResumesWithAI };