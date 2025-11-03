import Blog from "../models/Blog.js";
import jwt from "jsonwebtoken"; 

const postBlogs = async (req, res) => {
  const { title, content, category } = req.body;
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      success: false,
      message: "Authorization header missing",
    });
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(
      authorization.split(" ")[1],
      process.env.JWT_SECRET
    );
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }

  try {
    const newBlog = new Blog({
      title,
      content,
      category,
      author: decodedToken.id, 
      slug: `temp-slug-${Date.now()}-${Math.random()
        .toString()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "")}`,
    });

    const savedBlog = await newBlog.save();

    savedBlog.slug = `${title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "")}-${savedBlog._id}`;

    await savedBlog.save();

    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      blog: savedBlog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create blog",
      error: error.message,
    });
  }
};

const getBlogs = async (req, res) => {
    const { author } = req.query;
 
    const conditions = [{ status: "published" }];

    if (author) {
      conditions.push({ author: author });
    }

   const blogs = await Blog.find({ $or: conditions }).populate('author', '_id name email').sort({ status: 1, createdAt: -1 });


   res.status(200).json({
    success: true,
    data: blogs,
    message: "Blogs fetched successfully"
   })
}

const getBlogForSlug = async (req, res) => {
    const { slug } = req.params;

    const blog = await Blog.findOne({ slug: slug}).populate('author', '_id name email');    

    if (!blog) {
        return res.status(404).json({
            success: false, 
            message: "Blog not found"
        })
    }

    res.status(200).json({
        success: true, 
        data: blog,
        message: "Blog fetched successfully"
    })
}

const patchPublishBlog = async (req, res) => {
    const { slug } = req.params;

    const blog = await Blog.findOneAndUpdate({ slug: slug }, { status: "published"});


    res.status(200).json({
        success: true,
        data: blog,
        message: "Blog published successfully"
    });
}

const putBlogs = async (req, res) => {
    const { slug } = req.params;
    const { title, content, category, author } = req.body;

    const blog = await Blog.findOneAndUpdate({ slug: slug }, { title, content, category });

    res.status(200).json({
        success: true,
        data: blog,
        message: "Blog updated successfully"
    });
}

export { postBlogs , getBlogs , getBlogForSlug , patchPublishBlog , putBlogs };