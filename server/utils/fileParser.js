// const pdfParse = require("pdf-parse");

// exports.extractTextFromFile = async (file) => {
//   if (!file.mimetype.includes("pdf")) {
//     throw new Error("Unsupported format: only PDF resumes currently supported");
//   }
//   const data = await pdfParse(file.buffer);
//   return data.text;
// };


const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");

exports.extractTextFromFile = async (file) => {
  if (file.mimetype.includes("pdf")) {
    const data = await pdfParse(file.buffer);
    return data.text;
  } else if (
    file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || // .docx
    file.mimetype === "application/msword" // .doc
  ) {
    try {
      const result = await mammoth.extractRawText({ buffer: file.buffer });
      return result.value; // plain text
    } catch (error) {
      throw new Error("Failed to parse DOC/DOCX file");
    }
  } else {
    throw new Error("Unsupported format: only PDF and DOC/DOCX files are currently supported");
  }
};
