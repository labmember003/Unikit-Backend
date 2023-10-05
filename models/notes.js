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
    },
    likeCount:{
      type: Number,
      required: true,
      default: 0
    },
    dislikeCount:{
      type: Number,
      required: true,
      default: 0
    }
});
module.exports = mongoose.model("Notes", notesSchema);
