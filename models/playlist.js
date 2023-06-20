const mongoose = require("mongoose");
const playListSchema = mongoose.Schema({
    PlayListName: {
      type: String,
      required: true,
    },
    pdfFile: {
      data: Buffer,   // Data buffer to store the PDF file
      contentType: String,   // MIME type of the file
    },
});
module.exports = mongoose.model("Playlist", playListSchema);