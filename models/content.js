const mongoose = require("mongoose");
const contentSchema = mongoose.Schema({
    contentName: {
      type: String,
      required: true,
    },
    contentType: {
      type: String,
      required: true,
    },
    pdfFile: {
      type: String,  
      required: true,
    },
    author:{
      type: String,
      required: true,
    },
    contentID:{
      type: String,
      required: true,
    },
    subjectID:{
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
module.exports = mongoose.model("Content", contentSchema);
