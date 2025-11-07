import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { getCurrentUser } from "../util";
import write from "../../public/edit.png";
import homeIcon from "../../public/home.png";
import aboutIcon from "../../public/aboutus.png";
import blogIcon from "../../public/blogs.png";
import { Menu, X } from "lucide-react"; // lightweight icons

function Navbar() {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = () => navigate("/login");

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-100 shadow-md z-10">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-3">
        <h1 className="text-3xl font-bold text-gray-700">Quill</h1>
        <div className="hidden md:flex items-center gap-6 ml-auto">
          <Link to="/" className="flex items-center gap-2 text-gray-700 hover:text-black">
            <img className="h-5" src={homeIcon} alt="Home" />
            Home
          </Link>

          <Link to="/about" className="flex items-center gap-2 text-gray-700 hover:text-black">
            <img className="h-5" src={aboutIcon} alt="About" />
            About
          </Link>

          <Link to="/blogs" className="flex items-center gap-2 text-gray-700 hover:text-black">
            <img className="h-5" src={blogIcon} alt="Blogs" />
            Blogs
          </Link>

          {user && (
            <Link to="/new" className="flex items-center gap-2 text-gray-700 hover:text-black">
              <img src={write} alt="Write" className="h-5" />
              Write
            </Link>
          )}

          {user ? (
            <button
              onClick={() => {
                localStorage.clear();
                setTimeout(() => handleNavigate(), 800);
              }}
              className="bg-black hover:bg-gray-700 text-white font-semibold px-3 py-1 rounded-md transition"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-black hover:bg-gray-700 text-white font-semibold px-3 py-1 rounded-md transition"
            >
              Login
            </Link>
          )}
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-700 focus:outline-none"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden flex flex-col items-start bg-gray-50 px-6 py-4 border-t border-gray-200">
          <Link
            to="/"
            className="flex items-center gap-2 py-2 text-gray-700 hover:text-black w-full"
            onClick={() => setIsOpen(false)}
          >
            <img className="h-5" src={homeIcon} alt="Home" />
            Home
          </Link>

          <Link
            to="/about"
            className="flex items-center gap-2 py-2 text-gray-700 hover:text-black w-full"
            onClick={() => setIsOpen(false)}
          >
            <img className="h-5" src={aboutIcon} alt="About" />
            About
          </Link>

          <Link
            to="/blogs"
            className="flex items-center gap-2 py-2 text-gray-700 hover:text-black w-full"
            onClick={() => setIsOpen(false)}
          >
            <img className="h-5" src={blogIcon} alt="Blogs" />
            Blogs
          </Link>

          {user && (
            <Link
              to="/new"
              className="flex items-center gap-2 py-2 text-gray-700 hover:text-black w-full"
              onClick={() => setIsOpen(false)}
            >
              <img src={write} alt="Write" className="h-5" />
              Write
            </Link>
          )}

          {user ? (
            <button
              onClick={() => {
                localStorage.clear();
                setTimeout(() => handleNavigate(), 800);
              }}
              className="mt-3 bg-black hover:bg-gray-700 text-white font-semibold px-4 py-2 rounded-md text-left transition"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="mt-3 bg-black hover:bg-gray-700 text-white font-semibold px-4 py-2 rounded-md text-left transition"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
