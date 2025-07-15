const { extractTextFromFile } = require("../utils/fileParser");
const { generateSuggestionsWithGemini } = require("../utils/geminiHelper");


exports.handleResumeSuggestion = async (req, res) => {
  console.log("📥 Received request: file?", !!req.file, "jobDescription?", !!req.body.jobDescription);
  
  if (!req.file || !req.body.jobDescription) {
    console.log("❌ Missing file or job description", req.file, req.body.jobDescription);
    return res.status(400).json({ message: "Resume file and jobDescription required" });
  }

  try {
    const resumeText = await extractTextFromFile(req.file);
    console.log("✅ Extracted resume text length:", resumeText.length);
    
    const suggestions = await generateSuggestionsWithGemini(resumeText, req.body.jobDescription);
    console.log("✅ Received suggestions:", suggestions.substring(0, 100), "...");

    return res.json({ suggestions });
  } catch (err) {
    console.error("🚨 Controller error:", err);
    return res.status(500).json({ message: err.message || "Server error" });
  }
};
