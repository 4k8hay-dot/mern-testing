import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import {
  Link,
  useNavigate,
} from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const user = localStorage.getItem("student");

  const logout = () => {
    localStorage.removeItem("student");
    alert("Logout Successful");
    navigate("/");
    window.location.reload();
  };

  return (
    <AppBar position="static">
      <Toolbar>

        <Typography
          variant="h6"
          sx={{ flexGrow: 1 }}
        >
          Student Management System
        </Typography>

        {!user ? (
          <>
            <Button
              color="inherit"
              component={Link}
              to="/"
            >
              Login
            </Button>

            <Button
              color="inherit"
              component={Link}
              to="/register"
            >
              Register
            </Button>
          </>
        ) : (
          <>
            <Button
              color="inherit"
              component={Link}
              to="/home"
            >
              Home
            </Button>

            <Button
              color="inherit"
              component={Link}
              to="/feedback"
            >
              Feedback
            </Button>

            <Button
              color="inherit"
              onClick={logout}
            >
              Logout
            </Button>
          </>
        )}

      </Toolbar>
    </AppBar>
  );
};

export default Navbar;