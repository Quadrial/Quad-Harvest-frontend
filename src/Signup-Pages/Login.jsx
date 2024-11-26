import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  // const API_URL = "http://localhost:5000/api/auth";
  const API_URL = "https://quad-harvest-backend.onrender.com/api/auth";
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const { email, password } = formData;
    if (!email || !password) {
      setMessage("Please fill in both fields.");
      return;
    }

    try {
      // Make a POST request to the login endpoint
      const response = await axios.post(`${API_URL}/login`, formData);
      const updatedUser = response.data.user;

      // Normalize the profilePicture path before storing
      if (updatedUser?.profilePicture) {
        updatedUser.profilePicture = updatedUser.profilePicture.replace(
          /\\/g,
          "/"
        );
      }

      // Store the user data in localStorage
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setMessage("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.error || "Login failed.");
    }
  };

  // Toggle password visibility
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  // Google OAuth success handler
  const handleGoogleSuccess = async (credentialResponse) => {
    const token = credentialResponse.credential;
    try {
      const response = await axios.post(`${API_URL}/google-login`, { token });

      // Store complete user data in localStorage, including profilePicture
      const userData = response.data.user;
      if (userData && userData.profilePicture) {
        userData.profilePicture = userData.profilePicture.replace(/\\/g, "/");
      }
      localStorage.setItem("user", JSON.stringify(userData));

      setMessage("Google login successful!");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.error || "Google login failed.");
    }
  };

  // Google OAuth failure handler
  const handleGoogleFailure = () => {
    setMessage("Google login was unsuccessful. Please try again.");
  };

  return (
    <>
      <Header />
      <section className="relative mt-[30px] flex gap-10 px-[80px]">
        <main className="md:mt-[10vw] lg:mt-[3.5vw] flex flex-col text-cente gap-3 lg:w-[50vw] md:w-[35vw] lg:px-[100px]">
          <div className="flex flex-col items-center">
            <h1 className="text-[28px] font-[500]">Welcome back!</h1>
            <h3>Sow the seeds of success, login now.</h3>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="flex flex-col">
              <label>Email</label>
              <input
                placeholder="example@gmail.com"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="off"
                className="pl-3 p-3 w-full border-2 border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="flex flex-col">
              <label>Password</label>
              <input
                placeholder="**********"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="off"
                className="pl-3 p-3 w-full border-2 border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="showPassword"
                  checked={showPassword}
                  onChange={handleTogglePassword}
                  className="mr-2"
                />
                <label htmlFor="showPassword">Show Password</label>
              </div>

              <Link to="/forgot-password" className="text-green-500">
                Forgot your password?
              </Link>
            </div>
          </form>

          <div className="flex flex-col gap-3 items-center">
            <button onClick={handleSubmit} className="btn mt-3">
              Login
            </button>
            <h1> or </h1>
            <GoogleLogin
              clientId="309744924880-7ud98991mma53rf9d96f6iubtnn7itcs.apps.googleusercontent.com"
              onSuccess={handleGoogleSuccess}
              onFailure={handleGoogleFailure}
              render={(renderProps) => (
                <button
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  className="btn"
                >
                  Login with Google
                </button>
              )}
            />
            {message && <p className="text-red-600">{message}</p>}
            <div className="flex gap-3">
              <h3>Don't Have An Account?</h3>
              <Link to="/signup" className="text-green-500">
                Sign up
              </Link>
            </div>
          </div>
        </main>
        <figure className="lg:w-[50vw] md:w-[45vw] hidden md:flex lg:flex">
          <img
            src="images/image2.jpg"
            alt="Login Illustration"
            className="lg:w-[50vw] md:w-[65vw] lg:h-[35vw] md:h-[75vw] rounded-[40px]"
          />
        </figure>
      </section>
    </>
  );
};

export default Login;
