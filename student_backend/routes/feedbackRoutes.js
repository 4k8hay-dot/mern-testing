const express = require("express");
const router = express.Router();

const Feedback = require("../models/feedbackModels");

// ===================
// Add Feedback
// ===================
router.post("/add", async (req, res) => {
  try {
    const { email, course, feedback } = req.body;

    const newFeedback = new Feedback({
      email,
      course,
      feedback,
    });

    await newFeedback.save();

    res.status(201).json({
      message: "Feedback Submitted Successfully",
      data: newFeedback,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;