import React from "react";
import { useState, useEffect } from "react";
import { getCurrentUser } from "../util";
import { Link } from "react-router";
function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  return (
    <div className="flex items-center justify-between p-4">
      <div>
        {user ? (
          <span className="text-lg font-medium">Hello, {user.name}</span>
        ) : (
          <span className="text-lg">Welcome, Guest</span>
        )}
      </div>

      <div>
        {user ? (
          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/login";
            }}
           className="bg-black hover:bg-gray-700  text-white font-semibold p-2 rounded-md transition duration-150 ease-in-out mt-4"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="text-blue-500 hover:text-blue-700 font-medium"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
