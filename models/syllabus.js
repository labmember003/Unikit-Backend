const mongoose = require("mongoose");
const syllabusSchema = mongoose.Schema({
    SyllabusName: {
      type: String,
      required: true,
    }
});
module.exports = mongoose.model("Notes", syllabusSchema);