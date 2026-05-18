const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());


// Routes
const employeeRoutes =
require("./routes/employeeRoutes");

const aiRoutes =
require("./routes/aiRoutes");

const authRoutes =
require("./routes/authRoutes");


app.use("/api/employees",
employeeRoutes);

app.use("/api/ai",
aiRoutes);

app.use("/api/auth",
authRoutes);


// MongoDB
mongoose.connect(
  process.env.MONGO_URI
)
.then(() => {

  console.log("MongoDB Connected");

})
.catch((err) => {

  console.log(err);

});


// Test
app.get("/", (req, res) => {

  res.send("Server Running");

});


const PORT =
process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `Server running on ${PORT}`
  );

});