import React, { useState } from "react";
import { Link } from "react-router";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const loginUser = async () => {
    if (!user.email || !user.password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}login`,
        user
      );

      if (response.data.success) {
        localStorage.setItem("currentUser", JSON.stringify(response.data.user));
        localStorage.setItem("token", response.data.token);
        toast.success("Login successful!");
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      } else {
        toast.error(response.data.message || "Invalid email or password");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="container w-full max-w-lg border border-gray-300 p-8 rounded-lg shadow-lg bg-white">
        <h1 className="text-center text-3xl font-bold my-4 text-gray-800">
          Login
        </h1>
        <form className="flex flex-col mx-auto space-y-6">
          <label className="flex flex-col text-sm font-medium text-gray-700">
            Email:
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="border border-gray-300 p-2 rounded-md mt-1 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </label>
          <label className="flex flex-col text-sm font-medium text-gray-700">
            Password:
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="border border-gray-300 p-2 rounded-md mt-1 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </label>
          <p>
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
          <button
            type="button"
            className="bg-black hover:bg-gray-700 text-white font-semibold py-2 rounded-md transition duration-150 ease-in-out mt-1"
            onClick={loginUser}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
