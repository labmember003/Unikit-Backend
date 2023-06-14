const mongoose = require("mongoose");
const Subject = require("./subject")
const branchSchema = mongoose.Schema({
    branchName: {
      type: String,
      required: true,
    },
    subjectList: [Subject.schema]
});
module.exports = mongoose.model("Branch", branchSchema);