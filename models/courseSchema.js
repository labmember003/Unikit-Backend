const mongoose = require("mongoose");
const courseSchema = mongoose.Schema({
    courseName: {
      type: String,
      required: true,
    },
});
module.exports = mongoose.model("Course", courseSchema);