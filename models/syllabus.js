const mongoose = require("mongoose");
const syllabusSchema = mongoose.Schema({
    SyllabusName: {
      type: String,
      required: true,
    },
    pdfFile: {
      data: Buffer,   // Data buffer to store the PDF file
      contentType: String,   // MIME type of the file
    },
});
module.exports = mongoose.model("Syllabus", syllabusSchema);