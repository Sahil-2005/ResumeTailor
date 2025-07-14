const { GoogleGenerativeAI } = require("@google/generative-ai");

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.generateSuggestionsWithGemini = async (resumeText, jobDescription) => {
  const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `
You are a resume coach. Here's a resume and a job description. Provide 3–5 bullet-point suggestions for improvement.

**Resume:**
${resumeText}

**Job Description:**
${jobDescription}
`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = await response.text();

  if (!text) throw new Error("No content received from Gemini");
  console.log("Gemini returned:", text.substring(0, 100), "...");
  return text;
};
