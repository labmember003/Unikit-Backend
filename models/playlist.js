const mongoose = require("mongoose");
const playListSchema = mongoose.Schema({
    PlayListName: {
      type: String,
      required: true,
    }
});
module.exports = mongoose.model("Notes", playListSchema);