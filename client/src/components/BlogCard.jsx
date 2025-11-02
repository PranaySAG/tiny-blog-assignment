import React from "react";
import { Link } from "react-router";
function BlogCard({
  _id,
  title,
  category,
  author,
  slug,
  updatedAt,
  status,
  publishedAt,
}) {
  return (
    <div className="w-full mx-auto bg-white shadow-md rounded-2xl p-4 space-y-3 border border-gray-100 relative">
      <div className="font-bold text-sm">
        <span className="text-gray-800">Blog</span>
        {" / "}
        {category}
      </div>
      <h1 className="text-4xl font-semibold text-gray-800">{title}</h1>
      <div className="text-sm text-gray-600 space-y-1">
        <p>
          <span className="font-medium text-gray-800">Author:</span>{" "}
          {author.name}
        </p>
        <p>
          <span className="text-sm text-gray-800">Published At:</span>{" "}
          {new Date(publishedAt || updatedAt).toLocaleDateString()}
        </p>

        {status != "published" ? (
          <p className="absolute top-4 right-4 bg-yellow-200 text-yellow-800 text-xs font-semibold px-2 py-1 rounded-full">
            {status.toUpperCase()}
          </p>
        ) : null}

        {status == "published" ? (
          <Link
            type="button"
            className="bg-black cursor-pointer hover:bg-gray-700  text-white font-semibold p-2 rounded-md transition duration-150 ease-in-out mt-4"
            to={`/blog/${slug}`}
          >
            Read More
          </Link>
        ) : (
          <Link
            type="button"
            className="bg-black cursor-pointer hover:bg-gray-700  text-white font-semibold p-2 rounded-md transition duration-150 ease-in-out mt-4"
            to={`/edit/${slug}`}
          >
             Edit Blog
          </Link>
        )}
      </div>
    </div>
  );
}

export default BlogCard;
