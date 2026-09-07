import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";

const Register = () => {
  const navigate = useNavigate();

  const [student, setStudent] = useState({
    registerNo: "",
    candidateName: "",
    course: "",
    email: "",
    mark: "",
    password: "",
  });

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/user/register",
        student
      );

      alert(response.data.message);

      setStudent({
        registerNo: "",
        candidateName: "",
        course: "",
        email: "",
        mark: "",
        password: "",
      });

      // Go to Login Page after successful registration
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={5} sx={{ p: 4, mt: 5 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Student Registration
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Register Number"
            name="registerNo"
            type="number"
            margin="normal"
            value={student.registerNo}
            onChange={handleChange}
            required
          />

          <TextField
            fullWidth
            label="Candidate Name"
            name="candidateName"
            margin="normal"
            value={student.candidateName}
            onChange={handleChange}
            required
          />

          <TextField
            fullWidth
            label="Course"
            name="course"
            margin="normal"
            value={student.course}
            onChange={handleChange}
            required
          />

          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            margin="normal"
            value={student.email}
            onChange={handleChange}
            required
          />

          <TextField
            fullWidth
            label="Mark"
            name="mark"
            type="number"
            margin="normal"
            value={student.mark}
            onChange={handleChange}
            required
          />

          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            margin="normal"
            value={student.password}
            onChange={handleChange}
            required
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3 }}
          >
            Register
          </Button>

          <Button
            variant="outlined"
            fullWidth
            sx={{ mt: 2 }}
            onClick={() => navigate("/")}
          >
            Back to Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;