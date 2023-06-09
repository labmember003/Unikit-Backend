const mongoose = require("mongoose");
const Notes = require("./notes");
const Book = require("./book");
const subjectSchema = mongoose.Schema({
    subjectName: {
      type: String,
      required: true,
    },
    notesList: [Notes.Schema],
    bookList: [Book.Schema]
});
module.exports = mongoose.model("Subject", subjectSchema);