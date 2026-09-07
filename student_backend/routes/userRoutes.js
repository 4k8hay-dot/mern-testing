const express = require("express");
const router = express.Router();

const User = require("../models/userModels");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// ===================
// Student Registration
// ===================
router.post("/register", async (req, res) => {
  try {
    const { registerNo, candidateName, course, email, mark, password } =
      req.body;

    // Check Register Number
    const registerExists = await User.findOne({ registerNo });

    if (registerExists) {
      return res.status(400).json({
        message: "Register Number Already Exists",
      });
    }

    // Check Email
    const emailExists = await User.findOne({ email });

    if (emailExists) {
      return res.status(400).json({
        message: "Email Already Exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      registerNo,
      candidateName,
      course,
      email,
      mark,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      message: "Student Registered Successfully",
      data: {
        registerNo: newUser.registerNo,
        candidateName: newUser.candidateName,
        course: newUser.course,
        email: newUser.email,
        mark: newUser.mark,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ===================
// Get All Students
// ===================
router.get("/all", async (req, res) => {
  try {
    const students = await User.find().select("-password");

    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ===================
// Update Student
// ===================
router.put("/update/:id", async (req, res) => {
  try {
    const updatedStudent = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).select("-password");

    res.status(200).json({
      message: "Student Updated Successfully",
      data: updatedStudent,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ===================
// Delete Student
// ===================
router.delete("/delete/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Student Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ===================
// Student Login
// ===================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }

    // Compare entered password with hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({
        message: "Invalid Password",
      });
    }

    // Create JWT without password
    const payload = {
      id: user._id,
      email: user.email,
    };

    const token = jwt.sign(payload, "secret");

    res.status(200).json({
      message: "Login Successful",
      token: token,
      data: {
        id: user._id,
        registerNo: user.registerNo,
        candidateName: user.candidateName,
        course: user.course,
        email: user.email,
        mark: user.mark,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;