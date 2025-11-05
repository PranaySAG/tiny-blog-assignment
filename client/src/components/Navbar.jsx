import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { getCurrentUser } from "../util";
import write from "../../public/edit.png";

function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  return (
    <div className="flex items-center justify-between p-2 bg-gray-100 shadow-md fixed w-full top-0 left-0 z-10">
      <div className="p-2">
        {user ? (
          <span className="text-md font-bold">Hello, {user.name}</span>
        ) : (
          <span className="text-md">Welcome, Guest</span>
        )}
      </div>
      <div>
        {user && (
          <Link to="/new">
            <p className="flex items-center gap-2 cursor-pointer">
              <img src={write} alt="write" className="h-6" />
              Write
            </p>
          </Link>
        )}
      </div>

      <div>
        {user ? (
          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/login";
            }}
            className="bg-black hover:bg-gray-700 text-white font-semibold p-2 rounded-md transition duration-150 ease-in-out"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="bg-black hover:bg-gray-700 text-white font-semibold p-2 rounded-md transition duration-150 ease-in-out"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
