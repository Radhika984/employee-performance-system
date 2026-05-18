const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");


// Signup
router.post("/signup", async (req, res) => {

  const { email, password } = req.body;

  const hashedPassword =
    await bcrypt.hash(password, 10);

  const user = new User({
    email,
    password: hashedPassword
  });

  await user.save();

  res.json({
    message: "User Registered"
  });

});


// Login
router.post("/login", async (req, res) => {

  const { email, password } = req.body;

  const user =
    await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  const isMatch =
    await bcrypt.compare(
      password,
      user.password
    );

  if (!isMatch) {
    return res.status(401).json({
      message: "Invalid Password"
    });
  }

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token });

});

module.exports = router;