const express = require("express");
const { signin, signup, googleOneTap, myContent } = require("../controllers/userController");
const userRouter = express.Router();

userRouter.post("/signup", signup);

userRouter.post("/googleOneTap", googleOneTap);

userRouter.post("/signin", signin)

userRouter.post("/mycontent", myContent);


module.exports = userRouter;
