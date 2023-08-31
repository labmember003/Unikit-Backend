const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const userRouter = require("./routes/userRouter");
const collegeRouter = require("./routes/collegeRouter");
const multer = require("multer");


dotenv.config();
app.use(express.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
app.use("/users", userRouter);
app.use("/college", collegeRouter);
app.get("/", (req, res) => {
    res.send("Uni-Kit API From Falcon Lab");
})

const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    app.listen(port, () => {
        console.log(`Server running on ${port}, http://localhost:${port}`)}
    );
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

