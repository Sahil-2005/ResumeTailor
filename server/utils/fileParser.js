// const pdfParse = require("pdf-parse");
// const { readFile } = require("fs/promises");
// const path = require("path");
// const fs = require("fs");

// exports.extractTextFromFile = async (file) => {
//   const ext = path.extname(file.originalname).toLowerCase();
//   const filePath = file.path;

//   let text = "";

//   if (ext === ".pdf") {
//     const buffer = await readFile(filePath);
//     const data = await pdfParse(buffer);
//     text = data.text;
//   } else if (ext === ".doc" || ext === ".docx") {
//     // For DOCX you could use `mammoth` or another lib
//     throw new Error("DOC/DOCX parsing not implemented. Try using a PDF.");
//   } else {
//     throw new Error("Unsupported file type");
//   }

//   // Optionally delete temp file
//   fs.unlink(filePath, () => {});

//   return text;
// };


const pdfParse = require("pdf-parse");

exports.extractTextFromFile = async (file) => {
  if (!file.mimetype.includes("pdf")) {
    throw new Error("Unsupported format: only PDF resumes currently supported");
  }
  const data = await pdfParse(file.buffer);
  return data.text;
};
