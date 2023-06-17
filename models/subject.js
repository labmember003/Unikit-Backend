const mongoose = require("mongoose");
const Notes = require("./notes");
const Book = require("./book");
const Playlist = require("./playlist")
const Syllabus = require("./syllabus")
const Paper = require("./paper")

const subjectSchema = mongoose.Schema({
    subjectName: {
      type: String,
      required: true,
    },
    notesList: [Notes.schema],
    bookList: [Book.schema],
    playList: [Playlist.schema],
    syllabusList: [Syllabus.schema],
    paperList: [Paper.schema]

});
module.exports = mongoose.model("Subject", subjectSchema);