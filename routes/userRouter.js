const express = require("express");
const { signin, signup, googleOneTap, myNotes } = require("../controllers/userController");
const userRouter = express.Router();

userRouter.post("/signup", signup);

userRouter.post("/googleOneTap", googleOneTap);

userRouter.post("/signin", signin)

userRouter.post("/myNotes", myNotes);


module.exports = userRouter;
