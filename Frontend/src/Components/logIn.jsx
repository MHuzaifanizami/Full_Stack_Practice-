import axios from 'axios';
import React from 'react';
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';


const LoginForm = () => {
  const navigate = useNavigate()

  const Login = async(event) => {
    event.preventDefault()
    const email =  event.target.elements.email.value
    const password =  event.target.elements.password.value
    const res = await axios.post('https://full-stack-practice-backend.vercel.app/api/v1/login', {
      email: email,
      password: password
    })
    toast.success(res.data.message)
    navigate('/todos')
    console.log("response", res.data.message);
   
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <form 
        onSubmit={Login}
        >
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input type="email" className="w-full p-2 border border-gray-300 rounded mt-1" name='email' />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input type="password" className="w-full p-2 border border-gray-300 rounded mt-1" name='password'/>
          </div>
          <button className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
