import MDEditor from "@uiw/react-md-editor";
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router";
import Navbar from "../components/Navbar";
import { BLOG_CATEGORIES } from "./../constants";

function EditBlog() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(BLOG_CATEGORIES[0]);
  const { slug } = useParams();

  const loadBlog = async () => {
    if (!slug) return;

    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/blogs/${slug}`
    );

    const blogData = response?.data?.data;

    setTitle(blogData?.title);
    setContent(blogData?.content);
    setCategory(blogData?.category);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-color-mode", "light");
    loadBlog();
  }, []);

  const updateBlog = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/blogs/${slug}`,
        {
          title,
          content,
          category,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response?.data?.success) {
        toast.success("Blog saved successfully");
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Error updating blog");
    }
  };

  const publishBlog = async () => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/blogs/${slug}/publish`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response?.data?.success) {
        toast.success("Blog published successfully");
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Error publishing blog");
    }
  };
  return (
    <div className="p-10" data-color-mode="light">
      <Navbar/>
      <h2>Edit Blog</h2>

      <input
        type="text"
        placeholder="blog-title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 my-5 rounded-2xl w-full bg-gray-50"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border my-5 p-2 rounded-lg"
      >
        {BLOG_CATEGORIES.map((cate) => (
          <option key={cate} value={cate}>
            {cate}
          </option>
        ))}
      </select>
      <MDEditor value={content} onChange={setContent} height={400} />

      <div className="flex gap-4">
        <button
          className="bg-blue-100 mt-10 p-3 rounded-xl cursor-pointer"
          onClick={updateBlog}
        >
          Update Blog
        </button>
        <button
          className="bg-blue-100 mt-10 p-3 rounded-xl cursor-pointer"
          onClick={publishBlog}
        >
          Publish
        </button>
      </div>
      <Toaster />
    </div>
  );
}

export default EditBlog;
