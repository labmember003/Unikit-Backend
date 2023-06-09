const mongoose = require("mongoose");
const notesSchema = mongoose.Schema({
    NotesName: {
      type: String,
      required: true,
    }
});
module.exports = mongoose.model("Notes", notesSchema);