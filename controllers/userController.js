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
    const token = req.body.token;
    const mycontent = await content.find({ author: token });
    const result = [];

    for (const contentItem of mycontent) {
      const contentid = String(contentItem.contentID);
      const subjectid = String(contentItem.subjectID);
      const collegeid = subjectid.replace(/[^a-zA-Z]/g, '');
      const courseid = subjectid.slice(0, collegeid.length + 3);
      const yearid = subjectid.slice(0, courseid.length + 1);
      const branchid = subjectid.slice(0, yearid.length + 3);

      const [college, course, branch, year, subject] = await Promise.all([
        College.find({ collegeID: collegeid }),
        Course.find({ courseID: courseid }),
        Branch.find({ branchID: branchid }),
        numofYears.find({ yearID: yearid }),
        Subject.find({ subjectID: subjectid }),
      ]);

      result.push({
        contentID: contentItem.contentID,
        notesName: contentItem.contentName,
        itemType: contentItem.contentType,
        like: contentItem.like,
        dislike: contentItem.dislike,
        pdf: contentItem.pdfFile,
        likeCount: contentItem.likeCount,
        dislikeCount: contentItem.dislikeCount,
        college,
        course,
        branch,
        year,
        subject,
      });
    }

    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



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

const coins = async (req, res) => {
  try {
    if (!req.body.token || !req.body.amount) {
      return res.status(400).json({ message: 'Token and amount are required in the request body' });
    }
    const userid = req.body.token;
    const mode = req.body.mode;
    let amount = Number(req.body.amount);

    if (mode === 'dec') {
      const user = await userModel.findOne({ "token": userid });
      if (user.coins + amount < 0) {
        return res.status(400).json({ message: 'Coins cannot go below 0' });
      }
      amount = -Math.abs(amount);
    }
    const updated = await userModel.updateOne(
      { "token": userid },
      { $inc: { "coins": amount } }
    );
    if (updated.nModified === 0) {
      return res.status(404).json({ message: 'User not found or no changes made' });
    }
    return res.status(200).json({ message: 'Coins updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const showdata = async (req, res) => {
  try {
    if (!req.body.token) {
      return res.status(400).json({ message: 'Token is required in the request body' });
    }

    const userid = req.body.token;
    const user = await userModel.findOne({ "token": userid });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports = { signup, signin, googleOneTap, myContent, showdata, coins };
// 11:05
