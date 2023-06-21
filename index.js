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
app.post("/test", upload.single("photo"), function (req, res, next) {
  // Access JSON data
  const jsonData = JSON.parse(req.body.data);
  console.log(jsonData);

  // Access uploaded file
  const file = req.file;
  console.log(file);

  // Handle file upload
  if (file) {
    // File uploaded
    res.send({
      success: true,
      message: "File Uploaded",
      data: jsonData, // Send back the received JSON data
    });
  } else {
    // No file uploaded
    res.status(400).send("No file uploaded.");
  }
});


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
