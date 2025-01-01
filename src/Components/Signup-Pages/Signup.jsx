import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import { GoogleLogin } from "@react-oauth/google";

const Signup = () => {
  const API_URL = "http://localhost:5000/api/auth";
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false); // To toggle password visibility
  const [termsAccepted, setTermsAccepted] = useState(false); // State to track checkbox

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Reset the message

    const { name, email, password, confirmPassword } = formData;
    if (!name || !email || !password || !confirmPassword) {
      setMessage("Please fill all fields");
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    // Check if terms and conditions are accepted
    if (!termsAccepted) {
      setMessage("You must accept the terms and conditions.");
      return;
    }

    try {
      // Send the signup request
      const response = await axios.post(`${API_URL}/register`, formData);
      setMessage("Signup successful!");

      // Redirect to the login page after successful signup
      navigate("/login");
    } catch (error) {
      console.log(error);
      setMessage(error.response?.data?.error || "Signup failed.");
    }
  };
  // Google OAuth success handler
  const handleGoogleSuccess = async (credentialResponse) => {
    const token = credentialResponse.credential;
    try {
      const response = await axios.post(`${API_URL}/google-login`, { token });
      setMessage("Google signup successful!");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.error || "Google signup failed.");
    }
  };

  // Google OAuth failure handler
  const handleGoogleFailure = () => {
    setMessage("Google signup was unsuccessful. Please try again.");
  };

  return (
    <>
      <Header />
      <section className="mt-[30px] flex gap-10 px-[80px]">
        <main className="md:mt-[5vh] lg:mt-[2vh] flex flex-col gap-3 lg:w-[50vw] md:w-[35vw] lg:px-[100px]">
          <div className="flex flex-col items-center">
            <h1 className="text-[23px] md:text-[25px] lg:text-[28px] text-Text2 font-[500]">
              Create an account!
            </h1>
            <h3>Sow the seeds of success, sign up now.</h3>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="flex flex-col">
              <label>Name</label>
              <input
                name="name"
                placeholder="Name*"
                type="text"
                autoComplete="off"
                value={formData.name}
                onChange={handleChange}
                className="pl-3 p-3 w-full border-2 border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="flex flex-col">
              <label>Email</label>
              <input
                name="email"
                placeholder="example@gmail.com*"
                type="email"
                autoComplete="off"
                value={formData.email}
                onChange={handleChange}
                className="pl-3 p-3 w-full border-2 border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="flex flex-col">
              <label>Password</label>
              <input
                name="password"
                placeholder="**********"
                type={showPassword ? "text" : "password"} // Toggle password visibility
                autoComplete="off"
                value={formData.password}
                onChange={handleChange}
                className="pl-3 p-3 w-full border-2 border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="flex flex-col">
              <label>Confirm Password</label>
              <input
                name="confirmPassword"
                placeholder="**********"
                type={showPassword ? "text" : "password"} // Toggle confirm password visibility using the same state
                autoComplete="off"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="pl-3 p-3 w-full border-2 border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                onChange={() => setShowPassword(!showPassword)} // Toggle show password for both fields
                className="mr-3"
              />
              <label>Show Password</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="terms"
                onChange={() => setTermsAccepted(!termsAccepted)} // Handle the checkbox state
                className="mr-3"
              />
              <label>I accept the terms and conditions.</label>
            </div>

            <div className="flex flex-col items-center text-center gap-2">
              <button
                type="submit"
                className="btn"
                disabled={!termsAccepted} // Disable the button if terms are not accepted
              >
                Create Account
              </button>
              <h1> or </h1>
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleFailure}
              />
              {message && <p>{message}</p>}
            </div>
          </form>
          {message && <p className="text-red-600 mt-3">{message}</p>}{" "}
          {/* Error message in red */}
          <div className="flex gap-3">
            <h3>Already Have An Account?</h3>
            <Link to="/login" className="text-green-500">
              Login
            </Link>
          </div>
        </main>
        <figure className="lg:w-[50vw] md:w-[45vw] hidden md:flex lg:flex">
          <img
            src="images/logo11.jpg"
            alt="Signup"
            className="lg:w-[50vw] md:w-[65vw] lg:h-[35vw] md:h-[75vw] rounded-[40px]"
          />
        </figure>
      </section>
    </>
  );
};

export default Signup;
