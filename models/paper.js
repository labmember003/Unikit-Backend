const mongoose = require("mongoose");
const paperSchema = mongoose.Schema({
    PaperName: {
      type: String,
      required: true,
    }
});
module.exports = mongoose.model("Paper", paperSchema);