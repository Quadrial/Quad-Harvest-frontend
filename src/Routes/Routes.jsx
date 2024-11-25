import React from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "../Signup-Pages/Signup";
import Login from "../Signup-Pages/Login";
import Dashboard from "../Dashboard/Dashboard";
import ForgotPassword from "../Signup-Pages/Forget";
import Landingpage from "../Landingpage/Landingpage";
import Profile from "../Dashboard/Profile";

const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landingpage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};

export default MyRoutes;
