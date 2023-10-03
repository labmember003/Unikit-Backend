const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "NOTESAPI";
const passport = require("passport")
const { OAuth2Client } = require("google-auth-library");

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

const myNotes = async (req, res) => {
  try {
    token = req.token;
    const mynotes = await notes.find({author: token});
    collegeid = mynotes.notesID.replace(/[^a-zA-Z]/g, '')
    courseid= mynotes.notesID.slice(0,length(collegeid)+3)
    yearid = mynotes.notesID.slice(0,length(courseid)+1)
    branchid = mynotes.notesID.slice(0,length(yearid)+3)
    res.json({
      notesName: mynotes.notesName,
      pdf: mynotes.pdfFile,
      college: await College.find({collegeID: collegeid}),
      course: await Course.find({ courseID:courseid}),
      branch: await Branch.find({ branchID:branchid}),
      year: await numofYears.find({ yearID:yearid})
  });
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



module.exports = { signup, signin, googleOneTap, myNotes };

// 11:05
