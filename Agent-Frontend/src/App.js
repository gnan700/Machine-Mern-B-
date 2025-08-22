import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddAgent from "./pages/AddAgent";
import UploadCSV from "./pages/UploadCSV";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-agent" element={<AddAgent />} />
        <Route path="/upload-csv" element={<UploadCSV />} />
      </Route>

      {/* Redirect unknown paths */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
