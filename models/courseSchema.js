const mongoose = require("mongoose");
const YearOfStudy = require("./yearOfStudy");
const courseSchema = mongoose.Schema({
    courseName: {
      type: String,
      required: true,
    },
    yearsOfStudy: [YearOfStudy.schema]
});
module.exports = mongoose.model("Course", courseSchema);