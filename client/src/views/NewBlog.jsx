import React, { useEffect, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { BLOG_CATEGORIES } from "../constants";
import axios from "axios";
import { getCurrentUser } from "../util.js";
import toast, { Toaster } from "react-hot-toast";

function NewBlog() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(BLOG_CATEGORIES[0]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, [])

  const savedBlog = async () => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/blogs`, {
      title,
      content,
      category,
      author: user?._id,
  })
    if (response.data.success) {
      toast.success("Blog saved successfully");
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    }

 }

  return (
    <div className="p-10" data-color-mode="light">
      <h2>Create a New Blog</h2>

      <input 
        type="text" 
        placeholder="blog-title" 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 my-5 rounded-2xl w-full bg-gray-50"/>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border my-5 p-2 rounded-lg"
      >
        {BLOG_CATEGORIES.map((cate) => (
          <option key={cate} value={cate}>{cate}</option>
        ))}
      </select>
      <MDEditor
        value={content}
        onChange={setContent}
        height={400}
      />

      <button className="bg-blue-100 mt-10 p-3 rounded-xl cursor-pointer" onClick={savedBlog}>
        Save Blog
      </button>
      <Toaster />
    </div>
  );
}

export default NewBlog;
