const mongoose = require("mongoose");
const branchSchema = mongoose.Schema({
  branchId: {
    type: String,
    required: true,
  },
    branchName: {
      type: String,
      required: true,
    },
    
});
module.exports = mongoose.model("Branch", branchSchema);
