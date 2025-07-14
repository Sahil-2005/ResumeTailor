const express = require("express");
const cors = require("cors");
require("dotenv").config();

const resumeRoutes = require("./routes/resumeRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api/generate-suggestions", resumeRoutes);

app.get("/", (req, res) => {
  res.json({ message: "ResumeTailor API running" });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
