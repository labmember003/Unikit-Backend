const mongoose = require("mongoose");
const collegeSchema = mongoose.Schema({
    collegeName: {
        type : String,
        required : true
    },
    collegeId: {
        type : String,
        required : true
    
    }
}, {timestamps : true});
module.exports = mongoose.model("College", collegeSchema);
