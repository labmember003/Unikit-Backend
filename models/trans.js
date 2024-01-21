const mongoose = require("mongoose");
const transaction = mongoose.Schema({
  transid: {
    type: String,
    required: true,
  },
    type: {
      type: String,
      required: true,
    },
  amt:{
    type: Number,
    required: true,
  },
  wallet:{
    type: String,
    required: true,
  },
    
});
module.exports = mongoose.model("Trans", transaction);
