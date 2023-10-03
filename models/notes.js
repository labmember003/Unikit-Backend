const mongoose = require("mongoose");
const notesSchema = mongoose.Schema({
    notesName: {
      type: String,
      required: true,
    },
    pdfFile: {
      data: Buffer,
      contentType: String,  
    },
    author:{
      type: String,
      required: true,
    },
    notesID:{
      type: String,
      required: true,
    }
});
module.exports = mongoose.model("Notes", notesSchema);
