import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  // Retrieve user data from localStorage
  const storedUser = JSON.parse(localStorage.getItem("user"));

  // Check if user is authenticated (exists in localStorage and has an _id)
  const isAuthenticated = storedUser && storedUser._id;

  // If user is not authenticated, redirect to the login page
  if (!isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  // If authenticated, render the protected component (children)
  return <Outlet />;
};

export default ProtectedRoute;

<main className="bg-yellow-50 h-[100px] lg:w-[79vw] md:w-[68vw] flex justify-around py-5 lg:px-[20px] md:px-[10px] px-3 md:gap-[150px] ">
          <section className="flex flex-col">
            <h1 className="text-[15px] md:text-[23px] lg:text-[28px] font-[400]">
              Welcome back!
            </h1>

            {user && user.name && user.email ? (
              <>
                <h2 className="text-[12px] font-semibold">
                  Hello, {user.name}.
                </h2>
                {/* <p>Your email: {user.email}</p> */}
              </>
            ) : (
              <h2 className="text-[18px] mt-4">
                User data not found. Please log in again.
              </h2>
            )}
          </section>

          <section className="flex flex-row content-center items-cente gap-4">
            <IoIosNotifications className="w-[50px] h-[50px]" />
            <Link to="/profile">
              <img
                src={
                  user?.profilePicture
                    ? `http://localhost:5000/${user.profilePicture}`
                    : "images/default-avatar.png"
                }
                alt="Profile"
                className="w-[60px] h-[50px] rounded-[100px] border-2 border-gray-300"
              />
            </Link>
          </section>
        </main>

