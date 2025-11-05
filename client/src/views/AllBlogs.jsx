import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getCurrentUser } from '../util.js';
import BlogCard from '../components/BlogCard.jsx';
import Navbar from '../components/Navbar.jsx';

const AllBlogs = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async (authorId = "") => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/blogs?author=${authorId}`
      );
      if (response.data.success) {
        setBlogs(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, []);

  useEffect(() => {
    if (user) {
      fetchBlogs(user._id);
    }
  }, [user]);

  return (
    <div>
      <Navbar/>
      <h1 className="text-3xl p-4 font-semibold">All Blogs</h1>

      <div className="w-full max-w-4xl mx-auto  p-4">
        {blogs.map((blog) => (
          <BlogCard
            key={blog._id}
            title={blog.title}
            content={blog.content}
            category={blog.category}
            author={blog.author}
            slug={blog.slug}
            updatedAt={blog.updatedAt}
            createdAt={blog.createdAt}
            status={blog.status}
            publishedAt={blog.publishedAt}
            viewCount={blog.viewCount}
          />
        ))}
      </div>
    </div>
  );
};

export default AllBlogs;
