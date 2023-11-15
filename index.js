const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRouter = require("./routes/userRouter");
const collegeRouter = require("./routes/collegeRouter");
const contentRouter = require("./routes/contentRouter");
 
dotenv.config();

app.use(express.json());


app.use("/users", userRouter);
app.use("/college", collegeRouter);
app.use("/content", contentRouter);
app.get("/", (req, res) => {
    res.send("Uni-Kit API From Falcon Lab");
})

const port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    app.listen(port, () => {
        console.log(`Server running on ${port}, http://localhost:${port}`)}
    );
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

