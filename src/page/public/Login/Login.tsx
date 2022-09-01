import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthApi from '../../../api/AuthApi';

export interface IEvent {
  target: {
    name: string;
    value: string;
  };
}

const Login = () =>{
  const navigate = useNavigate();
  const [params, setParams] = useState({});
  const [errors, setErrors] = useState();

  const handleChange = (e: IEvent) => {
    setParams({ ...params, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    AuthApi.login(params)
      .then((res) => {
        Cookies.set('auth_user', JSON.stringify(res.data.user));
        Cookies.set('access_token', res.data.token);
        navigate(`/profile/${res.data.user.id}`);
      })
      .catch((err) => {
        setErrors(err.response.data.errors);
      });
  };

  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <div className="font-bold text-xl mb-3">LOGIN</div>
      <form className="bg-gray-100 mb-4 p-2" action="" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <div className="text-red-700 text-xs italic">
          {errors?.['password']}
        </div>
        <input
          className="indent-2 mb-4 border-2 rounded w-full"
          name="email"
          type="text"
          placeholder="Email"
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <div className="text-red-700 text-xs italic">{errors?.['email']}</div>
        <input
          className="indent-2 mb-4 border-2 rounded w-full"
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <button
          className="rounded-md border-2 bg-gray-600 text-white px-4 py-2"
          type="submit"
        >
          Login
        </button>
      </form>
      <div className="flex flex-col items-center">
        <div>Don't have an account?</div>
        <div>
          Register{' '}
          <Link className="bg-gray-200 rounded px-2 py-1 " to="/register">
            here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
