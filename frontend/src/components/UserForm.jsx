import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { PORT } from "../utils/constants";

const UserForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    address: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:${PORT}/api/user/auth/register`,
        formData
      );
      setSuccess("User registered successfully!");
      setError("");
      const token = response.data.token;
      Cookies.set("token", token, { expires: 15, secure: true });
      localStorage.setItem("role", response.data.role);

      navigate("/");
    } catch (error) {
      setError(error.response?.data?.message || "Signup failed");
      setSuccess("");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">User Data</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-green-300"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-green-300"
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-green-300"
          />
          <textarea
            name="address"
            value={formData.address}
            cols={3}
            rows={4}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-green-300"
          />

          <button
            type="submit"
            style={{ backgroundColor: "#317988" }}
            className="w-full py-2  text-white rounded hover:bg-white transition"
          >
            Register
          </button>
        </form>
        <p className="text-sm text-center text-gray-600">
          Already regsistered?{" "}
          <Link
            to="/login-user"
            className=" hover:underline"
            style={{ color: "#317988" }}
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default UserForm;
