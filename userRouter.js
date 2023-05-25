const express = require("express");
const userRouter = express.Router();

userRouter.post("/signup", () => {
    console.log("signup");
});

userRouter.post("/signin", () => {
    console.log("signup");
})

module.exports = userRouter;