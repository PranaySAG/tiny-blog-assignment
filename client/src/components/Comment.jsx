import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

function Comment() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { slug } = useParams();
  const author = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/blogs/${slug}/comments`);
        setComments(res.data.comments || []);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchComments();
  }, []);

  const commentPost = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/blogs/${slug}/comments`,
        { content: newComment },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setComments((prev) => [res.data.comment, ...prev]);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className="p-4 border-t mt-6">
      <h2 className="text-lg font-semibold mb-3">Comments</h2>
      <form onSubmit={commentPost} className="mb-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full p-2 border rounded-lg"
          placeholder="Write a comment..."
        ></textarea>
        <button
          type="submit"
          className="bg-black hover:bg-gray-700 text-white font-semibold p-2 rounded-md transition duration-150 ease-in-out mt-4"
        >
          Post Comment
        </button>
      </form>
      <div className="space-y-3">
        
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment._id} className="p-3 border rounded-lg bg-gray-50">
              <p className="text-sm text-gray-700">{comment.content}</p>
              <p className="text-xs text-gray-500 mt-1">
                by {comment.user?.name || "Anonymous"}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-sm">No comments yet.</p>
        )}
      </div>
    </div>
  );
}

export default Comment;
