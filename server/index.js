import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose, { get } from 'mongoose';
import { postSignup, postLogin } from './controllers/user.js';
import { postBlogs , getBlogs, getBlogForSlug, patchPublishBlog, putBlogs } from './controllers/blog.js';
import jwt from 'jsonwebtoken';
import Blog from './models/Blog.js';

dotenv.config();
const app = express();  
const PORT = process.env.PORT || 5000;

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection failed:", error);
    }
};

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.json("server is wake up")
})

const jwtCheck = (req, res, next) => {
    req.user = null;
  const { authorization } = req.headers;
    if (!authorization) {
    return res.status(401).json({
      success: false,
      message: "Authorization token missing",
    });
  }
  try {
    const token = authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken;
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
  next();
};

const increaseViewCount = async (req, res, next) => {
    const { slug } = req.params;
    try {
       const blog = await Blog.findOne( {slug})
       blog.viewCount += 1;
       await blog.save();
    } catch (error) {
        console.error("Error increasing view count:", error);
    }
    next();
};

app.get('/blogs', getBlogs);
app.post('/signup', postSignup)
app.post('/login', postLogin)
app.post("/blogs", jwtCheck, postBlogs)
app.get("/blogs/:slug", increaseViewCount, getBlogForSlug)
app.patch("/blogs/:slug/publish", jwtCheck, patchPublishBlog)
app.put("/blogs/:slug", jwtCheck, putBlogs)


app.listen(PORT, (err) => {
    if (err) {
        console.error('❌ Server failed to start:', err);
    } else {
        connectDB();
        console.log(`✅ Server is running on port ${PORT}`);
    }
});
