const express = require("express");
const { signin, signup, googleOneTap } = require("../controllers/userController");
const userRouter = express.Router();

userRouter.post("/signup", signup);

userRouter.post("/googleOneTap", googleOneTap);

userRouter.post("/signin", signin)

module.exports = userRouter;
