const express = require("express");
const { putCollege } = require("../controllers/collegeController");
const { getCollege } = require("../controllers/collegeController");
const auth = require("../middlewares/auth");

const collegeRouter = express.Router();

collegeRouter.get("/:id", auth, getCollege);
collegeRouter.post("/", auth, putCollege);

module.exports = collegeRouter;