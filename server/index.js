import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

import { postSignup, postLogin } from './controllers/user.js';
import {
  postBlogs,
  getBlogs,
  getBlogForSlug,
  patchPublishBlog,
  putBlogs,
  blogLike,
  fetchLike
} from './controllers/blog.js';
import { postComment, getComments, deleteBlog } from './controllers/comments.js';
import Blog from './models/Blog.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};
app.use(express.json());
app.use(cors({
  origin: [
    "https://tiny-blog-assignment.onrender.com", 
    "http://localhost:5173"
  ],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true,
}));

app.get('/', (req, res) => {
  res.send("🚀 Server is live and running!");
});

const jwtCheck = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next(); // no token, treat as guest
  }
  if (!authorization) {
    return res.status(401).json({
      success: false,
      message: "Authorization token missing",
    });
  }

  const optionalJwtCheck = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return next(); // guest, no token

  const token = authHeader.split(" ")[1];
  if (!token) return next(); // malformed, treat as guest

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // logged-in user
  } catch (err) {
    console.warn("Invalid token, continuing as guest");
  }

  next();
};

  try {
    const token = authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

const increaseViewCount = async (req, res, next) => {
  const { slug } = req.params;
  try {
    const blog = await Blog.findOne({ slug });
    if (blog) {
      blog.viewCount = (blog.viewCount || 0) + 1;
      await blog.save();
    }
  } catch (error) {
    console.error("Error increasing view count:", error.message);
  }
  next();
};


// Auth
app.post('/signup', postSignup);
app.post('/login', postLogin);

// Blogs
app.get('/blogs', getBlogs);
app.post('/blogs', jwtCheck, postBlogs);
app.get('/blogs/:slug', increaseViewCount, getBlogForSlug);
app.patch('/blogs/:slug/publish', jwtCheck, patchPublishBlog);
app.put('/blogs/:slug', jwtCheck, putBlogs);
app.delete('/blogs/:slug', jwtCheck, deleteBlog);

// Likes
app.post('/blogs/:slug/like', jwtCheck, blogLike);
app.get('/blogs/:slug/like', jwtCheck, fetchLike);

// Comments
app.post('/blogs/:slug/comments', jwtCheck, postComment);
app.get('/blogs/:slug/comments', getComments);


app.listen(PORT, (err) => {
  if (err) {
    console.error('❌ Server failed to start:', err);
  } else {
    connectDB();
    console.log(`✅ Server running on port ${PORT}`);
  }
});
