import React, { useState, useEffect } from "react";
import { Link } from "react-router"; // 💡 Use 'react-router-dom'
import axios from "axios";
import Delete from "../../public/delete.png";
import comment from "../../public/comment.png";
import like from "../../public/like.png";
import view from "../../public/view.png";

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
  onDelete, 
}) {
  const [likes, setLikes] = useState(initialLikes || 0);
  const [liked, setLiked] = useState(false);
  const [commentsCount, setCommentsCount] = useState(0);

  const API_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, '') || "http://localhost:5000";

  useEffect(() => {
    if (!slug) return;

    const fetchLikesAndComments = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await axios.get(`${API_URL}/blogs/${slug}/like`, { 
            headers: { Authorization: `Bearer ${token}` },
          });
          if (res.data?.success) {
            setLikes(res.data.likes);
            setLiked(res.data.liked);
          }
        } catch (err) {
          console.error("Error fetching likes:", err);
        }
      }

     
      try {
        const commentsRes = await axios.get(`${API_URL}/blogs/${slug}/comments`);
        if (commentsRes.data?.success && commentsRes.data.comments) {
          setCommentsCount(commentsRes.data.comments.length);
        }
      } catch (err) {
        console.error("Error fetching comments:", err);
      }
      
    };

    fetchLikesAndComments();
  }, [slug, API_URL]); 
  const handleLike = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("Login to like the blog");

      const res = await axios.post(
        `${API_URL}/blogs/${slug}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data?.success) {
        setLikes(res.data.likes);
        setLiked(res.data.liked);
      }
    } catch (error) {
      console.error("Error liking blog:", error);
      alert("Error while liking blog");
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this blog?");
    if (!confirmed) return;

    try {
      const res = await axios.delete(`${API_URL}/blogs/${slug}`, { 
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (res.data?.success) {
        alert("Blog deleted successfully!");
        if (onDelete) {
            onDelete(slug);
        }
      } else {
         alert(res.data?.message || "Failed to delete blog.");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
       alert("Server error while deleting blog.");
    }
  };

  if (!slug || !title) {
    return (
      <div className="animate-pulse p-4 border-b border-gray-300">
        <div className="h-4 bg-gray-200 w-1/4 mb-2"></div>
        <div className="h-6 bg-gray-300 w-3/4 mb-3"></div>
        <div className="h-4 bg-gray-200 w-1/2"></div>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto mb-12 border-b border-gray-600 border-opacity-40 relative p-5 transition-all hover:bg-gray-50">
      <div className="text-sm my-2 text-gray-500">
        {category} •{" "}
        <span className="font-semibold text-gray-700">
          {author?.name || "Unknown"}
        </span>
      </div>

      <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 my-3">
        {title}
      </h1>

      <div className="text-sm text-gray-700 mt-2 flex flex-wrap items-center gap-4">
        <span>
          <span className="font-semibold">Published:</span>{" "}
          {new Date(publishedAt || updatedAt).toLocaleDateString()}
        </span>

        <span className="flex items-center">
          <img src={view} alt="view" className="h-5" />{" "}
          <span className="ml-1 font-semibold">{viewCount || 0}</span>
        </span>

        <span className="flex items-center">
          <img src={comment} className="h-4" alt="comment" />{" "}
          <span className="ml-1 font-semibold">{commentsCount}</span>
        </span>

        <button
          onClick={handleLike}
          className={`flex items-center gap-1 hover:text-black transition-colors ${liked ? 'text-blue-600 font-bold' : 'text-gray-800'}`}
        >
          <img src={like} alt="like" className="h-4" />
          <span className="font-semibold">{likes}</span>
        </button>
      </div>

      {status !== "published" && (
        <p className="absolute top-4 right-4 bg-yellow-200 text-yellow-800 text-xs font-semibold px-2 py-1 rounded-full">
          {status?.toUpperCase()}
        </p>
      )}

      <div className="flex flex-wrap gap-3 mt-6">
        {status === "published" ? (
          <Link
            className="bg-black hover:bg-gray-700 text-white font-semibold px-4 py-2 rounded-md"
            to={`/blog/${slug}`}
          >
            Read More
          </Link>
        ) : (
          <>
            <Link
              className="bg-black hover:bg-gray-700 text-white font-semibold px-4 py-2 rounded-md"
              to={`/edit/${slug}`}
            >
              Edit
            </Link>

            <button
              onClick={handleDelete}
              className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-md"
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