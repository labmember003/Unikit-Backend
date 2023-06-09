const mongoose = require("mongoose");
const bookSchema = mongoose.Schema({
    BookName: {
      type: String,
      required: true,
    }
});
module.exports = mongoose.model("Book", bookSchema);