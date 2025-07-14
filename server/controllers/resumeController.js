const { extractTextFromFile } = require("../utils/fileParser");
const { generateSuggestionsWithGemini } = require("../utils/geminiHelper");

// exports.handleResumeSuggestion = async (req, res) => {
//   try {
//     if (!req.file || !req.body.jobDescription) {
//       return res.status(400).json({ message: "Resume file and jobDescription required" });
//     }

//     console.log("Received file:", req.file.originalname);
//     console.log("Job description length:", req.body.jobDescription.length);

//     const resumeText = await extractTextFromFile(req.file);
//     const suggestions = await generateSuggestionsWithGemini(resumeText, req.body.jobDescription);

//     return res.status(200).json({ suggestions });
//   } catch (error) {
//     console.error("Error in controller:", error);
//     return res.status(500).json({ message: error.message || "Server error" });
//   }
// };


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
