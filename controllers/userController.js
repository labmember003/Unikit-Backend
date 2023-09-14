const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "NOTESAPI";
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

const googleOneTap = (req, res, next) => {
  passport.authenticate("google", { failureRedirect: "/signup" }),
    async (err, user) => {
      if (err) {
        console.error("Google authentication error:", err);
        return res.status(401).json({ error: "Unauthorized" });
      }
      try {
        const googleToken = req.body.googleToken;
        const clientId = "Google Oauth client_id";
        const client = new OAuth2Client(clientId);
        const ticket = await client.verifyIdToken({
          idToken: googleToken,
          audience: clientId,
        });

        const payload = ticket.getPayload();
        const email = payload.email;
        const jwtToken = jwt.sign(
          { user: email, id: payload.name },
          SECRET_KEY
        );
        let existingUser = await userModel.findOne({ email: email });
        if (!existingUser) {
          let existingUser = await userModel.create({
            username: payload.name,
            email: email,
          });
        }

        res.status(201).json({
          user: existingUser.email,
          id: existingUser._id,
          token: jwtToken,
        });
      } catch (error) {
        console.error("Google token verification failed:", error);
        res.status(401).json({ error: "Unauthorized" });
      }
    };
};

module.exports = { signup, signin, googleOneTap };

// 11:05
