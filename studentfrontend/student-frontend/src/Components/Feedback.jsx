import React, { useState } from "react";
import axios from "axios";

import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";

const Feedback = () => {
  const [feedbackData, setFeedbackData] = useState({
    email: "",
    course: "",
    feedback: "",
  });

  const handleChange = (e) => {
    setFeedbackData({
      ...feedbackData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/feedback/add",
        feedbackData
      );

      alert(response.data.message);

      setFeedbackData({
        email: "",
        course: "",
        feedback: "",
      });
    } catch (error) {
      alert(error.response?.data?.message || "Failed to Submit Feedback");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={5} sx={{ p: 4, mt: 5 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Student Feedback
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            name="email"
            margin="normal"
            value={feedbackData.email}
            onChange={handleChange}
            required
          />

          <TextField
            fullWidth
            label="Course"
            name="course"
            margin="normal"
            value={feedbackData.course}
            onChange={handleChange}
            required
          />

          <TextField
            fullWidth
            label="Feedback"
            name="feedback"
            margin="normal"
            multiline
            rows={4}
            value={feedbackData.feedback}
            onChange={handleChange}
            required
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3 }}
          >
            Submit Feedback
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Feedback;