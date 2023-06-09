const mongoose = require("mongoose");
const Course = require("./courseSchema");
const collegeSchema = mongoose.Schema({
    collegeName: {
        type : String,
        required : true
    },
    collegeId: {
        type : String,
        required : true
    },
    courses: [Course.schema]
}, {timestamps : true});
module.exports = mongoose.model("College", collegeSchema);