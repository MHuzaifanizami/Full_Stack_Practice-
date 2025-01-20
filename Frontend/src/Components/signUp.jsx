import axios from 'axios';
import React from 'react';
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
const SignupForm = () => {
  
  const navigate = useNavigate()

  const signUp = async (event) => {
    event.preventDefault()
    const name = event.target.elements.name.value
    const email = event.target.elements.email.value
    const password = event.target.elements.password.value
    const res = await axios.post('http://localhost:3000/api/v1/signup', {
      name: name,
      email: email,
      password: password
    })
    toast.success(res.data.message)
    navigate('/login')

    console.log("response", res);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
        <form
          onSubmit={signUp}
        >
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input type="text" className="w-full p-2 border border-gray-300 rounded mt-1" name='name' />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input type="email" className="w-full p-2 border border-gray-300 rounded mt-1" name='email' />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input type="password" className="w-full p-2 border border-gray-300 rounded mt-1" name='password' />
          </div>
          <button className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
