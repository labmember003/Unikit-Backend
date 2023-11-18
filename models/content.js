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
    like:{
      type: Array,
      default: []
    },
    dislike:{
      type: Array,
      default: []
    },
    report:{
      type: Array,
      default: []
    }
});
module.exports = mongoose.model("Content", contentSchema);
