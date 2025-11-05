import React, { useState } from "react";
import { Link } from "react-router";
import axios from "axios";

const SignUp = () => {

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    });

    const signUpUser = async() => {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}signup`, user)
        console.log(response.data);
    }

    return (
        <div className="min-h-screen flex flex-col justify-center items-center p-4">
            <div className="container w-full max-w-lg border border-gray-300 p-8 rounded-lg shadow-lg bg-white">
                <h1 className="text-center text-3xl font-bold my-4 text-gray-800">Create Account</h1>
                <form className="flex flex-col mx-auto space-y-6">
                    <label className="flex flex-col text-sm font-medium text-gray-700">
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={user.name}
                            onChange={(e) => {
                                setUser({...user, name: e.target.value })
                            }}                    
                            className="border border-gray-300 p-2 rounded-md mt-1"
                            required
                        />
                    </label>
                    <label className="flex flex-col text-sm font-medium text-gray-700">
                        Email:
                        <input
                            type="email"
                            name="email"                          
                            value={user.email}
                            onChange={(e) => {
                                setUser({...user, email: e.target.value })
                            }}
                            className="border border-gray-300 p-2 rounded-md mt-1"
                            required
                        />
                    </label>     
                    <label className="flex flex-col text-sm font-medium text-gray-700">
                        Password:
                        <input
                            type="password"
                            name="password"
                            value={user.password}
                            onChange={(e) => {
                                setUser({...user, password: e.target.value })
                            }}
                            className="border border-gray-300 p-2 rounded-md mt-1"
                            required
                        />
                    </label>
                    <p>Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link></p>
                    <button 
                        type="button" 
                        className="bg-black hover:bg-gray-700  text-white font-semibold py-2 rounded-md transition duration-150 ease-in-out mt-4"
                        onClick={signUpUser}
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;