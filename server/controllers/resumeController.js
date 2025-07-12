const { parseResume } = require("../utils/fileParser");
const { getAISuggestions } = require("../utils/gptHelper");

exports.handleResumeUpload = async (req, res) => {
  const resumeFile = req.file;
  const jobDescription = req.body.jobDescription;

  if (!resumeFile || !jobDescription) {
    return res.status(400).json({ message: "Missing resume file or job description." });
  }

  try {
    const resumeText = await parseResume(resumeFile);
    const suggestions = await getAISuggestions(resumeText, jobDescription);
    res.status(200).json({ suggestions });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Failed to process resume." });
  }
};
