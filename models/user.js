const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    username: {
        type : String,
        required : true
    },
    password: {
        type : String
    },
    email: {
        type : String,
        required : true
    },
    token:{
        type : String,
        required : true
    },
    img:{
        type : String
    },
    coins:{
        type : Number,
        default : 0,
    }
}, {timestamps : true});
module.exports = mongoose.model("User", userSchema);
