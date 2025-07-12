// const { Configuration, OpenAIApi } = require("openai");

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);

// exports.getAISuggestions = async (resumeText, jobDescription) => {
//   const prompt = `
// You are a career coach. Compare the following resume and job description.
// Suggest 5 ways the resume can be improved to better match the job.

// Resume:
// ${resumeText}

// Job Description:
// ${jobDescription}

// Respond in bullet points.
//   `;

//   const response = await openai.createChatCompletion({
//     model: "gpt-3.5-turbo",
//     messages: [{ role: "user", content: prompt }],
//     temperature: 0.7,
//   });

//   return response.data.choices[0].message.content;
// };


const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.generateSuggestionsWithGemini = async (resumeText, jobDescription) => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `
I have the following resume:

"${resumeText}"

And I'm applying for the job with this description:

"${jobDescription}"

Give me tailored suggestions on how I can improve my resume for this job. Include what to add/remove or emphasize.
`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
};
