import React from "react";
import { Link } from "react-router";

function Footer() {
  return (
    <div>
      <footer className="border-t border-gray-200 py-8">
        <div className="container mx-auto max-w-7xl px-6 text-center">
          <nav className="flex justify-center gap-4 text-sm">
            <Link to="/" className="text-gray-700 hover:underline">
              Home
            </Link>
            <Link to="/about" className="text-gray-700 hover:underline">
              About
            </Link>
            <Link to="/blogs" className="text-gray-700 hover:underline">
              Blogs
            </Link>
          </nav>
          <p className="text-sm text-gray-700 mt-4">
            © 2025 Quill — Crafted with words.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
