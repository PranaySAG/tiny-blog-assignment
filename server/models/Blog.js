import { Schema, model } from "mongoose";

const blogSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
    category: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

const Blog = model("Blog", blogSchema);

export default Blog;
