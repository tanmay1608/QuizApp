import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/slice/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, success } = useSelector((state) => state.user);

  useEffect(() => {
    if (success) {
      navigate("/");
    }
  }, [success]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      dispatch(loginUser({ email, password }));
      //navigate("/");
    } catch (error) {}
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b0e15]">
      <div className="w-full max-w-md bg-[#181b22] p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-[#f89f2b]">
          Login
        </h2>
        {error && (
          <div className="bg-red-100 text-red-600 p-2 mb-4 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-600">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2  bg-[#313237]  rounded text-white "
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-gray-600">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2  bg-[#313237]  rounded text-white"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2  text-[#313237] bg-white rounded hover:bg-[#f89f2b] hover:text-white transition"
          >
            Login
          </button>
        </form>
        <p className="text-center mt-4 text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-[#f89f2b] hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
