const mongoose = require("mongoose");
const numofYears = mongoose.Schema({
    yearId:{
      type: String,
      required: true,
    },
    numofYear: {
      type: String,
      required: true,
    }
    
});
module.exports = mongoose.model("Years", numofYears);
