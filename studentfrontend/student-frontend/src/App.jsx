import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Home from "./Components/Home";
import Feedback from "./Components/Feedback";
import ProtectedRoute from "./Components/ProtectedRoutes";

function App() {
  const user = localStorage.getItem("student");

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Login */}
        <Route
          path="/"
          element={
            user ? <Navigate to="/home" replace /> : <Login />
          }
        />

        {/* Register */}
        <Route
          path="/register"
          element={
            user ? <Navigate to="/home" replace /> : <Register />
          }
        />

        {/* Home */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* Feedback */}
        <Route
          path="/feedback"
          element={
            <ProtectedRoute>
              <Feedback />
            </ProtectedRoute>
          }
        />

        {/* Invalid URL */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;