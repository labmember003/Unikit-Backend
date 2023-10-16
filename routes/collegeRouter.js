const express = require("express");
const passport = require('passport');
collegeController = require("../controllers/collegeController");

const collegeList = require("../controllers/collegeController");
//const auth = require("../middlewares/auth");

const collegeRouter = express.Router();

//collegeRouter.get("/:id", auth, getCollege);
//collegeRouter.post("/", auth, putCollege);
collegeRouter.get('/',collegeController.getListOfColleges);

collegeRouter.post('/data', collegeController.getDataBasedOnQuery);

module.exports = collegeRouter;
