import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { getCurrentUser } from "../util";
import write from "../../public/edit.png";
import { useNavigate } from "react-router";

function Navbar() {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/login")
  }
  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  return (
    <div className="flex items-center justify-between p-2 bg-gray-100 shadow-md fixed w-full top-0 left-0 z-10">
      <div className="p-2 text-3xl font-bold text-gray-600">Quill</div>
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
              setTimeout(() => {
                handleNavigate();
              }, 1000);
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
