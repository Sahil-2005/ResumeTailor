const { extractTextFromFile } = require("../utils/fileParser");
const { generateSuggestionsWithGemini } = require("../utils/geminiHelper");

exports.handleResumeSuggestion = async (req, res) => {
  const jobDescription = req.body.jobDescription;
  const resumeFile = req.file;

  if (!jobDescription || !resumeFile) {
    return res.status(400).json({ message: "Resume and job description are required." });
  }

  try {
    const resumeText = await extractTextFromFile(resumeFile);
    const suggestions = await generateSuggestionsWithGemini(resumeText, jobDescription);
    res.json({ suggestions });
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ message: "Failed to generate suggestions." });
  }
};
