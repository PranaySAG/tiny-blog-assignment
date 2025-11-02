import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getCurrentUser } from '../util.js';
import BlogCard from '../components/BlogCard.jsx';

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
      <h2 className="text-xl font-semibold mb-6">All Blogs</h2>

      <div className="container mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
          />
        ))}
      </div>
    </div>
  );
};

export default AllBlogs;
