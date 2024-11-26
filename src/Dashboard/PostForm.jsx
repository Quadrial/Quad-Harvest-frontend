import { useState } from "react";
import PropTypes from "prop-types";

const PostForm = ({ user }) => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePost = async () => {
    if (!user || !user.id) {
      alert("User is not logged in.");
      return;
    }

    if (!text && !image) {
      alert("Please add text or an image to post.");
      return;
    }

    const formData = new FormData();
    formData.append("userId", user.id);
    formData.append("text", text);
    if (image) formData.append("image", image);

    try {
      setLoading(true);
      const response = await fetch(
        "https://quad-harvest-backend.onrender.com/posts",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Post created successfully!");
        setText("");
        setImage(null);
      } else {
        console.error("Server Error:", data.error);
        alert(data.error || "Failed to create post.");
      }
    } catch (error) {
      console.error("Network Error:", error.message);
      alert(`An error occurred: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 md:w-[45vw] lg:w-[30vw]">
      <textarea
        placeholder="What's on your mind?"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="pl-3 p-3 border-2 border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        className="border-2 border-gray-500 rounded-lg"
      />
      <button
        onClick={handlePost}
        disabled={loading}
        className={`bg-Heading2 pl-3 p-3 rounded-lg text-white ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Posting..." : "Post"}
      </button>
    </div>
  );
};

PostForm.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    email: PropTypes.string,
    profilePicture: PropTypes.string,
  }),
};

export default PostForm;
