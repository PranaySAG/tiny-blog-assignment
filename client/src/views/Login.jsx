import React from "react";
import { Link } from "react-router";
import { useState } from "react";
import axios from "axios";


const Login = () => {


  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const loginUser = async() => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, user)
    console.log(response.data);
    if (response.data.success) {
      localStorage.setItem("currentUser", JSON.stringify(response.data.user));
      window.location.href = "/";
    }
  };
  return (
   <div className="min-h-screen flex flex-col justify-center items-center p-4">
            <div className="container w-full max-w-lg border border-gray-300 p-8 rounded-lg shadow-lg bg-white">
                <h1 className="text-center text-3xl font-bold my-4 text-gray-800">Login</h1>
                <form className="flex flex-col mx-auto space-y-6">
                    <label className="flex flex-col text-sm font-medium text-gray-700">
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={(e) => setUser({...user, email: e.target.value})}
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
                            onChange={(e) => setUser({...user, password: e.target.value})}
                            className="border border-gray-300 p-2 rounded-md mt-1 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </label>
                    <p>Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline">Sign Up</Link></p>
                    <button 
                        type="button" 
                        className="bg-black hover:bg-gray-700  text-white font-semibold py-2 rounded-md transition duration-150 ease-in-out mt-1"
                        onClick={loginUser}
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
  )
}
export default Login;
