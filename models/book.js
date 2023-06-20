const mongoose = require("mongoose");
const bookSchema = mongoose.Schema({
    BookName: {
      type: String,
      required: true,
    },
    pdfFile: {
      data: Buffer,   // Data buffer to store the PDF file
      contentType: String,   // MIME type of the file
    },
});
module.exports = mongoose.model("Book", bookSchema);