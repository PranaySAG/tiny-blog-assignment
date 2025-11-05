import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import axios from "axios";
import Delete from "../../public/delete.png";

function BlogCard({
  title,
  category,
  author,
  slug,
  updatedAt,
  status,
  publishedAt,
  viewCount,
  likes: initialLikes,
}) {
  const [likes, setLikes] = useState(initialLikes || 0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/blogs/${slug}/like`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (res.data.success) {
          setLikes(res.data.likes);
          setLiked(res.data.liked);
        }
      } catch (error) {
        console.error("Error fetching blog likes:", error);
      }
    };

    fetchLikes();
  }, [slug]);

  const handleLike = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/blogs/${slug}/like`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (res.data.success) {
        setLikes(res.data.likes);
        setLiked(res.data.liked);
      }
    } catch (error) {
      console.error("Error liking blog:", error);
      alert("Error while liking blog");
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirmed) return;

    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/blogs/${slug}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (res.data.success) {
        alert("Blog deleted successfully!");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  return (
    <div className="w-full mx-auto mb-15 border-b border-gray-600 border-0.5 relative p-5">
      <div className="text-sm my-2">
        {category} by{" "}
        <span className="font-semibold text-gray-600">{author.name}</span>
      </div>

      <h1 className="text-4xl font-semibold text-gray-800 my-3">{title}</h1>

      <div className="text-sm text-gray-800 mt-2 flex items-center gap-2">
        <span>{new Date(publishedAt || updatedAt).toLocaleDateString()}</span>
        <span className="text-sm text-gray-800">
          {"Views:"}
          <span className="ml-1">{viewCount}</span>
        </span>
        <button
          onClick={handleLike}
          className={`flex items-center gap-1 ${
            liked ? "text-red-600" : "text-gray-600"
          }`}
        >
          ❤️ {likes}
        </button>
      </div>

      {status !== "published" && (
        <p className="absolute top-4 right-4 bg-yellow-200 text-yellow-800 text-xs font-semibold px-2 py-1 rounded-full">
          {status.toUpperCase()}
        </p>
      )}

      <div className="flex items-center gap-3 absolute bottom-2 right-2">
        {status === "published" ? (
          <Link
            className="bg-black hover:bg-gray-700 text-white font-semibold p-2 rounded-md"
            to={`/blog/${slug}`}
          >
            Read More
          </Link>
        ) : (
          <>
            <Link
              className="bg-black hover:bg-gray-700 text-white font-semibold p-2 rounded-md"
              to={`/edit/${slug}`}
            >
              Edit Blog
            </Link>

            <button
              onClick={handleDelete}
              className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white font-semibold p-2 rounded-md"
            >
              <img src={Delete} alt="delete" className="w-4 h-4" />
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default BlogCard;
