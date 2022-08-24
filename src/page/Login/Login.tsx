import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';


function Login() {
  const context = useContext(UserContext)
  
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    context?.setLoginStatus(!context.loginStatus)
    
  };
  
  return (
    <div className="mt-20 w-1/2 m-auto">
      <div className="mb-3">WELCOME! Please Login to enter.</div>
      <form className="bg-gray-100 mb-4 p-2" action="" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          className="indent-2 mb-4 border-2 rounded w-full"
          name="email"
          type="text"
          placeholder="Email"
        />

        <label htmlFor="password">Password</label>
        <input
          className="indent-2 mb-4 border-2 rounded w-full"
          name="password"
          type="text"
          placeholder="Password"
        />
        <button
          className="rounded-md border-2 bg-gray-600 text-white px-4 py-2"
          type="submit"
        >
          Login
        </button>
      </form>
      <div className='flex justify-center items-center'>
        <div>Don't have an account?</div>
        <div className='ml-3 rounded bg-gray-400 text-white px-2 py-1'>
          <Link to="/register">Register here</Link>
        </div>
      </div>
    </div>
  );
}

export default Login