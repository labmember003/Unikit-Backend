const express = require("express");
collegeController=require("../controllers/collegeController");

const collegeList = require("../controllers/collegeController");
//const auth = require("../middlewares/auth");

const collegeRouter = express.Router();

//collegeRouter.get("/:id", auth, getCollege);
//collegeRouter.post("/", auth, putCollege);
collegeRouter.get('/', collegeController.getListOfColleges);

collegeRouter.get('/data', collegeController.getDataBasedOnQuery);

module.exports = collegeRouter;
