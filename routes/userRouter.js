const express = require("express");
const userRouter = express.Router();

userRouter.post("/signup", (req, res) => {
    console.log("signup");
    return res.status(400).json({
        message : "signup"
    });
});

userRouter.post("/signin", (req, res) => {
    console.log("signin");
    return res.status(400).json({
        message : "signin"
    });
})

module.exports = userRouter;