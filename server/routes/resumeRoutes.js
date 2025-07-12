// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const { handleResumeUpload } = require("../controllers/resumeController");

// // File Upload Middleware
// const storage = multer.memoryStorage(); // Store file in memory for quick parsing
// const upload = multer({ storage });

// // POST /api/generate-suggestions
// router.post("/generate-suggestions", upload.single("resume"), handleResumeUpload);

// module.exports = router;


const express = require("express");
const router = express.Router();
const multer = require("multer");
const { handleResumeSuggestion } = require("../controllers/resumeController");

const upload = multer({ limits: { fileSize: 10 * 1024 * 1024 } }); // 10MB

router.post("/", upload.single("resume"), handleResumeSuggestion);

module.exports = router;
