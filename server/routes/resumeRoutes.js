const express = require("express");
const router = express.Router();
const multer = require("multer");
const { handleResumeUpload } = require("../controllers/resumeController");

// File Upload Middleware
const storage = multer.memoryStorage(); // Store file in memory for quick parsing
const upload = multer({ storage });

// POST /api/generate-suggestions
router.post("/generate-suggestions", upload.single("resume"), handleResumeUpload);

module.exports = router;
