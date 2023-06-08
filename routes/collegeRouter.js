const express = require("express");
const { putCollege } = require("../controllers/collegeController");
const { getCollege } = require("../controllers/collegeController");

const userRouter = express.Router();

userRouter.get("/:id", auth, getCollege);
userRouter.post("/", auth, putCollege);

module.exports = userRouter;