const mongoose = require("mongoose");
const courseSchema = mongoose.Schema({
  courseId:{
    type: String,
    required: true
  },
  numofYears:{
    type: Number,
    required: true,
    },
    courseName: {
      type: String,
      required: true,
    },
    
});
module.exports = mongoose.model("Course", courseSchema);
