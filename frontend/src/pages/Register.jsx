import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        address:''
      });
      const [error, setError] = useState('');
      const [success, setSuccess] = useState('');
      const navigate=useNavigate();
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };

     
        const validateForm = () => {
          const {name,email,password,address} = formData;
          console.log("inside validation");
          if(!name || !email || !password || !address) return "All fields are required";
          return null;
        };
      
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        
        
        const validationError = validateForm();
        if (validationError) {
          setError(validationError);
          return;
        }
        //return ;

        try {
          const response = await axios.post('http://localhost:8000/api/user/register', formData,{withCredentials:true});
          setSuccess('User registered successfully!');
          setError('');
          console.log(response.data);
          navigate("/login");
          
        } catch (error) {
            console.log(error);
          setError(error.response?.data?.message || 'Signup failed');
          setSuccess('');
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
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-gray-200"
              />
    
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-gray-200"
              />
    
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-gray-200"
              />
              <textarea name="address" value={formData.address} placeholder="Address" cols={30} rows={4} onChange={handleChange} required  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-gray-200"/>
    
              <button
                type="submit"
                style={{backgroundColor:"#317988"}}
                className="w-full py-2  text-white rounded hover:bg-white transition"
              >
                Register
              </button>
            </form>
            <p className="text-sm text-center text-gray-600">
          Already regsistered?{' '}
          <Link to="/login" className=" hover:underline" style={{color:"#317988"}}>
            Login
          </Link>
        </p>
          </div>
        </div>
      );
}

export default Register
