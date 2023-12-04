const express = require("express");
const { signup, signin, googleOneTap, myContent, showdata, coins , otp} = require("../controllers/userController");
const userRouter = express.Router();

userRouter.post("/", showdata)

userRouter.post("/coins", coins)

userRouter.post("/signup", signup);

userRouter.post("/googleOneTap", googleOneTap);

userRouter.post("/signin", signin)

userRouter.post("/mycontent", myContent);

userRouter.post("/otp", otp);



module.exports = userRouter;
