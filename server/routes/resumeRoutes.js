const express = require("express");
const router = express.Router();
const multer = require("multer");

const { handleResumeSuggestion } = require("../controllers/resumeController");

const upload = multer({ limits: { fileSize: 10 * 1024 * 1024 } });

router.post("/", upload.single("resume"), handleResumeSuggestion);

module.exports = router;
