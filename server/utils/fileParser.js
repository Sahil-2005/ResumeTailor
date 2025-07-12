const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");

exports.parseResume = async (file) => {
  const buffer = file.buffer;
  const mimetype = file.mimetype;

  if (mimetype === "application/pdf") {
    const data = await pdfParse(buffer);
    return data.text;
  }

  if (
    mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    mimetype === "application/msword"
  ) {
    const { value } = await mammoth.extractRawText({ buffer });
    return value;
  }

  throw new Error("Unsupported file type");
};
