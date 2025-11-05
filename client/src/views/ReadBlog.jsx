import React from "react";
import MDEditor from "@uiw/react-md-editor";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import BackButton from "../components/BackButton";
import Comment from "../components/Comment";


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
      <BackButton />
      <div className="font-bold text-sm">
        <span className="text-gray-800">Blog</span>
        {" / "}
        {blog.category}
      </div>
      <h1 className="text-3xl font-semibold my-3">{blog.title}</h1>
      <p>
        <span className="font-medium text-gray-800">Author:</span>{" "}
        {blog?.author?.name}
      </p>
      <p className="flex items-center gap-2">
        <span className="text-sm text-gray-800">Published At:</span>{" "}
        {new Date(blog?.publishedAt || blog?.updatedAt).toLocaleDateString()}
        <span className="text-sm text-gray-800">{" | Views:"}
            <span className="ml-1">{blog.viewCount}</span>
          </span>{" "}
      </p>
      <MDEditor.Markdown className="white" source={blog.content} readOnly />
      <Comment/>
    </div>
  );
};

export default ReadBlog;
