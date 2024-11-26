import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Dashboard-Header";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);

  // Fetch user data from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    console.log("Fetched user data:", storedUser);

    if (storedUser && storedUser.name && storedUser.email) {
      // Normalize the profilePicture path
      if (storedUser.profilePicture) {
        storedUser.profilePicture = storedUser.profilePicture.replace(
          /\\/g,
          "/"
        );
      }
      setUser(storedUser);
    } else {
      console.error("User data not found or incomplete.");
    }
  }, []);

  // Fetch user's own posts and saved posts
  useEffect(() => {
    if (user) {
      const fetchUserPosts = async () => {
        try {
          // const response = await fetch(`http://localhost:5000/api/posts/user/${user._id}`);
          const response = await fetch(
            `https://quad-harvest-backend.onrender.com/${user._id}`
          );
          const data = await response.json();
          console.log("Fetched user posts:", data);
          if (Array.isArray(data)) setUserPosts(data);
        } catch (error) {
          console.error("Error fetching user posts:", error);
        }
      };

      const fetchSavedPosts = async () => {
        try {
          // const response = await fetch(`http://localhost:5000/api/posts/saved/${user._id}`);
          const response = await fetch(
            `https://quad-harvest-backend.onrender.com/${user._id}`
          );
          const data = await response.json();
          console.log("Fetched saved posts:", data);
          if (Array.isArray(data)) setSavedPosts(data);
        } catch (error) {
          console.error("Error fetching saved posts:", error);
        }
      };

      fetchUserPosts();
      fetchSavedPosts();
    }
  }, [user]);

  // Handle file change for profile picture
  const handleFileChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  // Handle profile picture upload
  const handleUpload = async () => {
    if (!profilePicture || !user) {
      alert("No file selected or user not logged in.");
      return;
    }

    const formData = new FormData();
    formData.append("profilePicture", profilePicture);
    formData.append("userId", user._id || user.id);

    // https://quad-harvest-backend.onrender.com/
    try {
      // const response = await axios.post(
      //   "http://localhost:5000/api/uploads",
      //   formData,
      const response = await axios.post(
        "https://quad-harvest-backend.onrender.com/api/uploads",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const updatedUser = response.data.user;
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      alert("Profile picture uploaded successfully!");
    } catch (error) {
      console.error("Upload error:", error.response?.data || error.message);
      alert("Failed to upload profile picture.");
    }
  };

  return (
    <>
      <div className="absolute">
        <Header />
      </div>
      <main className="relative flex flex-col items-center justify-center py-[20vh] lg:px-40 md:px-20 ml-[350px]">
        <section className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
            Your Profile
          </h1>

          <div className="flex flex-col items-center mb-6">
            <img
              src={
                user?.profilePicture
                  ? `https://quad-harvest-backend.onrender.com/${user.profilePicture}`
                  : "images/default-avatar.png"
              }
              alt="Profile"
              className="w-[100px] h-[100px] rounded-full border-2 border-gray-300"
            />

            <h2 className="text-xl font-semibold text-gray-700 mt-4">
              {user?.name || "User"}
            </h2>
            <p className="text-gray-500">{user?.email || "user@example.com"}</p>
          </div>

          <div className="flex flex-col items-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mb-4"
            />
            <button
              onClick={handleUpload}
              className="bg-Heading2 text-white px-6 py-2 rounded-lg shadow hover:bg-Heading1 transition duration-300"
            >
              Upload New Picture
            </button>
          </div>
        </section>

        {/* User's Own Posts */}
        <section className="mt-10 w-full max-w-2xl">
          <h2 className="text-2xl font-semibold mb-4">Your Posts</h2>
          {userPosts.length > 0 ? (
            userPosts.map((post) => (
              <div key={post._id} className="mb-6 p-4 border rounded-lg">
                <h3 className="text-xl font-bold">{post.text}</h3>
                {post.image && (
                  <img
                    src={`https://quad-harvest-backend.onrender.com/${post.image}`}
                    alt="Post Image"
                    className="w-full h-[300px] object-cover mt-3"
                  />
                )}
              </div>
            ))
          ) : (
            <p>No posts found.</p>
          )}
        </section>

        {/* Saved Posts */}
        <section className="mt-10 w-full max-w-2xl">
          <h2 className="text-2xl font-semibold mb-4">Saved Posts</h2>
          {savedPosts.length > 0 ? (
            savedPosts.map((post) => (
              <div key={post._id} className="mb-6 p-4 border rounded-lg">
                <h3 className="text-xl font-bold">{post.text}</h3>
                {post.image && (
                  <img
                    src={`https://quad-harvest-backend.onrender.com/${post.image}`}
                    alt="Saved Post Image"
                    className="w-full h-[300px] object-cover mt-3"
                  />
                )}
              </div>
            ))
          ) : (
            <p>No saved posts found.</p>
          )}
        </section>
      </main>
    </>
  );
};

export default Profile;
