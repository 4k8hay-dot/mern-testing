import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Stack,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Home = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    getStudents();
  }, []);

  const getStudents = async () => {
    try {
      const res = await axios.get("http://localhost:3000/user/all");
      setStudents(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // =========================
  // Edit Student
  // =========================
  const handleEdit = (student) => {
    console.log(student);

    // Later we'll navigate to the update page
    // navigate("/update", { state: student });
  };

  // =========================
  // Delete Student
  // =========================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3000/user/delete/${id}`);

      alert("Student Deleted Successfully");

      getStudents();
    } catch (error) {
      console.log(error);
      alert("Unable to delete student");
    }
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Student Details
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Register No</b>
              </TableCell>

              <TableCell>
                <b>Candidate Name</b>
              </TableCell>

              <TableCell>
                <b>Course</b>
              </TableCell>

              <TableCell>
                <b>Email</b>
              </TableCell>

              <TableCell>
                <b>Mark</b>
              </TableCell>

              <TableCell align="center">
                <b>Action</b>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {students.map((student) => (
              <TableRow key={student._id}>
                <TableCell>{student.registerNo}</TableCell>

                <TableCell>{student.candidateName}</TableCell>

                <TableCell>{student.course}</TableCell>

                <TableCell>{student.email}</TableCell>

                <TableCell>{student.mark}</TableCell>

                <TableCell align="center">
                  <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="center"
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<EditIcon />}
                      onClick={() => handleEdit(student)}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="contained"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDelete(student._id)}
                    >
                      Delete
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Home;