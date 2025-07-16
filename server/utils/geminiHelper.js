const { GoogleGenerativeAI } = require("@google/generative-ai");

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.generateSuggestionsWithGemini = async (resumeText, jobDescription) => {
  const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `
You are an expert resume coach and career advisor. Given the candidate's resume and a job description, analyze the content and provide 4–6 clear, impactful suggestions to optimize the resume for this specific job.

Be specific, concise, and actionable. Focus on:
- Adding or highlighting relevant skills, keywords, or achievements
- Rephrasing or enhancing bullet points to match the job requirements
- Removing or downplaying irrelevant experience
- Improving clarity, impact, or professionalism of the content

Format your response in **bullet points**. Avoid repeating exact lines from the resume.

---
**Resume (Candidate):**
${resumeText}

---
**Target Job Description:**
${jobDescription}
`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = await response.text();

  if (!text) throw new Error("No content received from Gemini");
  console.log("Gemini returned:", text.substring(0, 100), "...");
  return text;
};
