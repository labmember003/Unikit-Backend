const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const userRouter = require("./routes/userRouter");
const collegeRouter = require("./routes/collegeRouter");

dotenv.config();
app.use(express.json());

app.use("/users", userRouter);
app.use("/college", collegeRouter);

app.get("/", (req, res) => {
    // middleware call he 3 paramenter ke saath hote hai first req, second res, third next (naam se kuch nhi hai, positional hai)
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
