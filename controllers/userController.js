const userModel = require("../models/user");
const content = require("../models/content");
const bcrypt = require("bcrypt");
const College = require('../models/college');
const Course = require('../models/courseSchema');
const Branch = require('../models/branch');
const Subject = require('../models/subject');
const numofYears = require("../models/numofYears");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "NOTESAPI";
const passport = require("passport")
const { OAuth2Client } = require("google-auth-library");
const subject = require("../models/subject");

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }
    const hashedpassword = await bcrypt.hash(password, 10);
    const result = await userModel.create({
      username: username,
      email: email,
      password: hashedpassword,
    });
    const token = jwt.sign({ email: result.email, id: result._id }, SECRET_KEY);
    res.status(201).json({ user: result, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await userModel.findOne({ email: email });
    if (!existingUser) {
      return res.status(400).json({
        message: "User Not Found",
      });
    }
    const matchPassword = await bcrypt.compare(password, existingUser.password);
    if (!matchPassword) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      SECRET_KEY
    );
    res.status(200).json({ user: existingUser, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const myContent = async (req, res) => {
  try {
    token = req.body.token;
    const mycontent = await content.find({author: token});
    let i = 0;
    result=[];
    while (i < mycontent.length) {
    contentid= String(mycontent[i].contentID)
    subjectid= String(mycontent[i].subjectID)
    collegeid = contentid.replace(/[^a-zA-Z]/g, '')
    courseid= contentid.slice(0,collegeid.length+3)
    yearid = contentid.slice(0,courseid.length+1)
    branchid = contentid.slice(0,yearid.length+3)
    result.push({
      notesName: mycontent[i].contentName,
      itemType: mycontent[i].contentType,
      pdf: mycontent[i].pdfFile,
      likeCount: mycontent[i].likeCount,
      dislikeCount: mycontent[i].dislikeCount,
      college: await College.find({collegeID: collegeid}),
      course: await Course.find({ courseID:courseid}),
      branch: await Branch.find({ branchID:branchid}),
      year: await numofYears.find({ yearID:yearid}),
      subject: await Subject.find({ subjectID:subjectid})
  })
    
    i++;
}
    
    res.json(result);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal server error' });
  }
}


const googleOneTap = async (req, res) => {
  passport.authenticate("google", { failureRedirect: "/signup" });
  try {
    const googleToken = req.body.googleToken;
    const clientId = process.env.GOOGLE_CLIENT_ID; // Use environment variable
    const client = new OAuth2Client(clientId);
    const ticket = await client.verifyIdToken({
      idToken: googleToken,
      audience: clientId ,
    });
    const payload = ticket.getPayload();
    const email = payload.email;
    // Use environment variable

    let existingUser = await userModel.findOne({ email: email });
    if (!existingUser) {
      const jwtToken = jwt.sign({ user: email, id: payload.name }, SECRET_KEY); 
      existingUser = await userModel.create({
        username: payload.name,
        email: email,
        img: payload.picture,
        token: jwtToken
      });
    }
    res.status(201).json({
      user: existingUser.username,
      email: existingUser.email,
      img: existingUser.img,
      token: existingUser.token,
    });
  } catch (error) {
    console.error("Google token verification failed:", error);
    res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = { signup, signin, googleOneTap, myContent };

// 11:05
