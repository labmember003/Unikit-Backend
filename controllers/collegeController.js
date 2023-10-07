const { default: mongoose } = require("mongoose");
const College = require('../models/college');
const Course = require('../models/courseSchema');
const Branch = require('../models/branch');
const Subject = require('../models/subject');
const numofYears = require("../models/numofYears");

const getCollege = async (req, res) => {
    const collegeId = req.params.id;
    try {
        const college = await collegeModel.findOne({collegeId: collegeId}); 
        res.status(202).json(college);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }
}

const putCollege = async (req, res) => {
    const {collegeName, collegeId, courses} = req.body;

    const newCollege = new collegeModel({
        collegeName: collegeName,
        collegeId: collegeId,
        courses: courses
    });
    try {
        await newCollege.save();
        res.status(201).json(newCollege);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }
}

const getListOfColleges = async (req, res) => {
    try {
      const colleges = await College.find();
      res.json(colleges);
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  const getDataBasedOnQuery = async (req, res) => {
    try {
        const {
            collegeId,
            courseId,
            year,
            branchId
        } = req.query;
        //const numofYear =query.courseId.slice(-1);
        //const courseId = query.courseId.slice(0,query.courseId.length-1);
        let query = {};

        if (collegeId) {
            query.collegeId = collegeId;
        }

        if (courseId) {
          query.courseId = courseId;
        }

        if (year) {
            query.year = year;
          }

        if (branchId) {
            query.branchId = branchId;
        }

        let results = {};

        if (collegeId) {
            results = await Course.find({ courseID: { $regex: `^${collegeId}`, $options: 'i' } });
        }

        if (courseId) {
            results = await numofYears.find({ yearID: { $regex: `^${courseId}`, $options: 'i' }});
        }

        if (year) {
            results = await Branch.find({ branchID: { $regex: `^${year}`, $options: 'i' } });
        }

        if (branchId) {
            results = await Subject.find({ subjectID: { $regex: `^${branchId}`, $options: 'i' } });
        }

        res.json(results);
    } catch (error) {
        console.log(error)

        res.status(500).json({ error: 'An error occurred' });
    }
};

module.exports = {
  getListOfColleges,
    getDataBasedOnQuery
};
