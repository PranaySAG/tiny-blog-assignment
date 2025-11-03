import React from "react";
import MDEditor from "@uiw/react-md-editor";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Navbar from "../components/Navbar";

function ReadBlog() {
  const { slug } = useParams();
  const [blog, setBlog] = useState({});

  const fetchBlog = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/blogs/${slug}`
    );
    setBlog(response.data.data);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-color-mode", "light");
    fetchBlog();
  }, []);

  return (
    <div className="container mt-2 px-15 " data-color-mode="light">
      <Navbar/>
      <div className="font-bold text-sm">
        <span className="text-gray-800">Blog</span>
        {" / "}
        {blog.category}
      </div>
      <h1 className="text-7xl font-bold mb-4">{blog.title}</h1>
      <p>
        <span className="font-medium text-gray-800">Author:</span>{" "}
        {blog?.author?.name}
      </p>
      <p>
        <span className="text-sm text-gray-800">Published At:</span>{" "}
        {new Date(blog?.publishedAt || blog?.updatedAt).toLocaleDateString()}
      </p>
      <MDEditor.Markdown className="white" source={blog.content} readOnly />
    </div>
  );
};

export default ReadBlog;
