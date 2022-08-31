import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthApi from '../../../api/AuthApi';

interface IErrors {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

function Register() {
  const [params, setParams] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
  });
  const [errors, setErrors] = useState<IErrors | null>(null);

  const [status, setStatus] = useState<string>('default');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParams({ ...params, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    setStatus('submitting');

    AuthApi.register(params)
      .then((res) => {
        setStatus('success');
      })
      .catch((err) => {
        const errorData = err.response.data.errors;
        setStatus('default');
        setErrors(errorData);
      });
  };

  return (
    <div className="flex flex-col h-screen items-center justify-center">
      {status === 'success' && (
        <div>
          Thank you! Kindly verify your registration by clicking on the link we
          have sent to your email.

          <div className='flex items-center mt-2'>
            Already verified? Click here to
            <Link className="rounded-md border-2 bg-gray-600 text-white ml-1 px-2 py-1" to="/login">Login</Link>
          </div>
        </div>
      )}
      {status === 'submitting' && (
        <div className="flex items-center h-screen">Loading...</div>
      )}
      {status === 'default' && (
        <>
          <div className="font-bold text-xl mb-3">
            REGISTER
          </div>
          <form
            className="bg-gray-100 mb-4 p-2"
            action="POST"
            onSubmit={handleSubmit}
          >
            <label htmlFor="firstName">First Name</label>
            <div className="text-red-700 text-xs italic">
              {errors?.['first_name']}
            </div>
            <input
              className="indent-2 mb-4 border-2 rounded w-full"
              name="first_name"
              type="text"
              placeholder="First name"
              value={params.first_name}
              onChange={handleChange}
            />
            <label htmlFor="lastName">Last Name</label>
            <div className="text-red-700 text-xs italic">
              {errors?.['last_name']}
            </div>
            <input
              className="indent-2 mb-4 border-2 rounded w-full"
              name="last_name"
              type="text"
              placeholder="Last Name"
              value={params.last_name}
              onChange={handleChange}
            />
            <label htmlFor="email">Email</label>
            <div className="text-red-700 text-xs italic">
              {errors?.['email']}
            </div>
            <input
              className="indent-2 mb-4 border-2 rounded w-full"
              name="email"
              type="text"
              placeholder="Email"
              value={params.email}
              onChange={handleChange}
            />
            <label htmlFor="password">Password</label>
            <div className="text-red-700 text-xs italic">
              {errors?.['password']}
            </div>
            <input
              className="indent-2 mb-4 border-2 rounded w-full"
              name="password"
              type="password"
              placeholder="Password"
              value={params.password}
              onChange={handleChange}
            />
            <label htmlFor="passwordConfirmation">Confirm Password</label>
            <div className="text-red-700 text-xs italic">
              {errors?.['password']}
            </div>
            <input
              className="indent-2 mb-4 border-2 rounded w-full"
              name="confirm_password"
              type="password"
              placeholder="Confirm Password"
              value={params.confirm_password}
              onChange={handleChange}
            />

            <button
              className="rounded-md border-2 bg-gray-600 text-white px-4 py-2"
              type="submit"
            >
              Register
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default Register;
