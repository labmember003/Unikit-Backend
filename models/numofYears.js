const mongoose = require("mongoose");
const numofYears = mongoose.Schema({
    yearId:{
      type: String,
      required: true,
    },
    numofYear: {
      type: Number,
      required: true,
    }
    
});
module.exports = mongoose.model("Years", numofYears);