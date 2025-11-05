import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getCurrentUser } from '../util.js';
import BlogCard from '../components/BlogCard.jsx';
import Navbar from '../components/Navbar.jsx';

const AllBlogs = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [warning, setWarning] = useState(true);

  const fetchBlogs = async (authorId = "") => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}blogs?author=${authorId}`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {}, 
        }
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
    fetchBlogs(currentUser?._id); 
  }, []);

  return (
    <div>
      <Navbar />
      <h1 className="text-3xl p-4 mt-12 font-semibold">All Blogs</h1>
      {warning && (
        <div className="flex items-center justify-between bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 max-w-4xl mx-auto mb-4" role="alert">
          <p>Hosted on Render (free tier). May take a few seconds to wake up.</p>
          <span className="close" onClick={() => setWarning(false)}>❌</span>
        </div>
      )}
      <div className="w-full max-w-4xl mx-auto p-4">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
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
          ))
        ) : (
          <p className="text-center text-gray-500">No blogs to show.</p>
        )}
      </div>
    </div>
  );
};

export default AllBlogs;
