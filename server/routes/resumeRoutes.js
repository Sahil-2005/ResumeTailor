const express = require('express');
const router = express.Router();

router.post('/upload', (req, res) => {
  res.json({ message: "Received resume" });
});

module.exports = router;
