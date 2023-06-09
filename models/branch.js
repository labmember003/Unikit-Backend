const mongoose = require("mongoose");
const Subject = require("./subject")
const branchSchema = mongoose.Schema({
    branchName: {
      type: String,
      required: true,
    },
    subjectList: [Subject.Schema]
});
module.exports = mongoose.model("Branch", branchSchema);