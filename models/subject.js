const mongoose = require("mongoose");

const subjectSchema = mongoose.Schema({
  subjectId: {
    type: String,
    required: true,
  },
    subjectName: {
      type: String,
      required: true,
    },
  imageURL: {
      type: String,
      required: true,
    }
    
});
module.exports = mongoose.model("Subject", subjectSchema);
