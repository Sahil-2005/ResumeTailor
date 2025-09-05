const express = require("express");
const router = express.Router();
const multer = require("multer");

const auth = require("../middleware/authMiddleware"); // Import the auth middleware


const { handleResumeSuggestion } = require("../controllers/resumeController");

const upload = multer({ limits: { fileSize: 10 * 1024 * 1024 } });

router.post("/", upload.single("resume"), handleResumeSuggestion);
// router.post("/", auth, upload.single("resume"), handleResumeSuggestion);



module.exports = router;

