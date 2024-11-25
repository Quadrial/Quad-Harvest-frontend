import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Header from "./Header";

const ForgotPassword = () => {
  const API_URL = "https://quad-harvest-backend.onrender.com/api/auth";
  const navigate = useNavigate(); // Initialize useNavigate
  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    const { email, newPassword } = formData;

    if (!email || !newPassword) {
      setError("Please fill in both fields.");
      return;
    }

    try {
      // Make a PATCH request to update the password
      const response = await axios.patch(`${API_URL}/forget-password`, {
        email,
        newPassword,
      });
      setMessage(response.data.message || "Password updated successfully.");

      // Redirect to the login page after successful password update
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Failed to update password.");
    }
  };

  return (
    <>
      {" "}
      <Header />
      <section className="flex flex-col items-center mt-10 px-8">
        <h1 className="text-2xl font-bold mb-4">Forgot Password</h1>
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm flex flex-col gap-4"
        >
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="newPassword" className="mb-2">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              placeholder="Enter new password"
              value={formData.newPassword}
              onChange={handleChange}
              className="p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-green-500 rounded-lg hover:bg-green-700"
          >
            Update Password
          </button>
        </form>

        {message && <p className="text-green-600 mt-4">{message}</p>}
        {error && <p className="text-red-600 mt-4">{error}</p>}
      </section>
    </>
  );
};

export default ForgotPassword;
