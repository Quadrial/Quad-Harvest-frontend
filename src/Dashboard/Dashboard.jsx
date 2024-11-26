import { useEffect, useState } from "react";
import Header from "./Dashboard-Header";
import { Link } from "react-router-dom";
import { IoIosNotifications } from "react-icons/io";
import PostForm from "./PostForm";
import { BiLike, BiSave } from "react-icons/bi";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  // Fetch user data from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    } else {
      console.error("User data not found or incomplete.");
    }
  }, []);

  // Fetch posts from the server
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "https://quad-harvest-backend.onrender.com/api/posts"
        );
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        } else {
          console.error("Failed to fetch posts.");
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  // Handle new post submission
  const handlePostSubmit = async () => {
    if (!newPost.trim() || !user) return;

    try {
      const response = await fetch(
        "https://quad-harvest-backend.onrender.com/api/posts",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user._id,
            text: newPost,
          }),
        }
      );

      if (response.ok) {
        const createdPost = await response.json();
        setPosts([createdPost, ...posts]);
        setNewPost("");
      } else {
        console.error("Failed to create post.");
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  // Handle like action
  // Like a post
  const handleLike = async (postId) => {
    try {
      const response = await fetch(
        `https://quad-harvest-backend.onrender.com/api/posts/${postId}/like`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user._id }),
        }
      );

      const updatedPost = await response.json();

      // Update the post in the state
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId ? { ...post, likes: updatedPost.likes } : post
        )
      );
    } catch (error) {
      console.error("Error liking the post:", error);
    }
  };

  // Save a post
  const handleSave = async (postId) => {
    try {
      const response = await fetch(
        `https://quad-harvest-backend.onrender.com/api/posts/${postId}/save`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user._id }),
        }
      );

      const updatedPost = await response.json();

      // Update the post in the state
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId ? { ...post, saves: updatedPost.saves } : post
        )
      );
    } catch (error) {
      console.error("Error saving the post:", error);
    }
  };

  return (
    <>
      {/* Header Section */}
      <section className="flex flex-row">
        <Header />
        <div className="md:ml-[30vw] lg:ml-[20vw]">
          {/* Top Section */}
          <main className="fixed bg-yellow-50 h-[100px] lg:w-[79vw] md:w-[68vw] flex justify-around py-5 lg:px-[20px] md:px-[10px]">
            <section className="flex flex-col">
              <h1 className="text-[15px] md:text-[23px] lg:text-[28px] font-[400]">
                Welcome back!
              </h1>
              {user ? (
                <h2 className="text-[12px] font-semibold">
                  Hello, {user.name}.
                </h2>
              ) : (
                <h2 className="text-[18px]">
                  User data not found. Please log in again.
                </h2>
              )}
            </section>

            <section className="flex items-center gap-4">
              <IoIosNotifications className="w-[50px] h-[50px]" />
              <Link to="/profile">
                <img
                  src={
                    user?.profilePicture
                      ? `https://quad-harvest-backend.onrender.com/${user.profilePicture}`
                      : "images/default-avatar.png"
                  }
                  alt="Profile"
                  className="w-[60px] h-[50px] rounded-full border-2"
                />
              </Link>
            </section>
          </main>

          {/* Post Form and Feed Section */}
          <section className="lg:px-[20vw] md:px-[10vw] py-5 mt-[100px]">
            <PostForm user={user} />

            {/* Display Posts */}
            <div className="mt-10 w-full">
              {posts.length > 0 ? (
                posts.map((post) => (
                  <div key={post._id} className="p-4 border-b mb-5">
                    <Link
                      to={`/profile/${post.userId._id}`}
                      className="flex items-center gap-3"
                    >
                      <img
                        src={
                          post.userId?.profilePicture
                            ? `https://quad-harvest-backend.onrender.com/${post.userId.profilePicture}`
                            : "images/default-avatar.png"
                        }
                        alt="Poster"
                        className="w-[50px] h-[50px] rounded-full border-2"
                      />
                      <h2 className="text-xl font-semibold">
                        {post.userId?.name || "PUser"}
                      </h2>
                    </Link>

                    <p className="mt-3">{post.text}</p>

                    {post.image && (
                      <img
                        src={`https://quad-harvest-backend.onrender.com/${post.image}`}
                        alt="Post"
                        className="w-full h-[300px] rounded-lg object-cover mt-3"
                      />
                    )}

                    <div className="mt-3 flex gap-5 items-center">
                      <button
                        onClick={() => handleLike(post._id)}
                        className={`flex items-center gap-2 ${
                          post.likes.includes(user?._id)
                            ? "text-blue-500"
                            : "text-gray-500"
                        } hover:text-blue-700`}
                      >
                        <BiLike className="w-[30px] h-[30px]" />
                        {post.likes.length}
                      </button>

                      <button
                        onClick={() => handleSave(post._id)}
                        className={`flex items-center gap-2 ${
                          post.saves.includes(user?._id)
                            ? "text-green-500"
                            : "text-gray-500"
                        } hover:text-green-700`}
                      >
                        <BiSave className="w-[30px] h-[30px]" />
                        {post.saves.length}
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p>No posts available. Be the first to post something!</p>
              )}
            </div>
          </section>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
