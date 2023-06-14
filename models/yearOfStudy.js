const mongoose = require("mongoose");
const Branch = require("./branch");
const yearOfStudySchema = mongoose.Schema({
    numberOfYears: {
      type: Number,
      required: true,
    },
    branchList: [Branch.schema]
});
module.exports = mongoose.model("YearOfStudy", yearOfStudySchema);