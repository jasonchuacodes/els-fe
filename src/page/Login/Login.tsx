import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LoginApi from '../../api/LoginApi';
import Cookies from 'js-cookie';

function Login() {
  const [params, setParams] = useState({});
  const [errors, setErrors] = useState();

  interface IEvent {
    target: {
      name: string;
      value: string;
    };
  }

  const handleChange = (e: IEvent) => {
    setParams({ ...params, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    LoginApi.login(params)
      .then((res) => {
        console.log(res);
        Cookies.set('login_token', res.data.token);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <div className="font-bold text-xl mb-3">LOGIN</div>
      <form className="bg-gray-100 mb-4 p-2" action="" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <div className="text-red-700 text-xs italic">{errors?.['email']}</div>
        <input
          className="indent-2 mb-4 border-2 rounded w-full"
          name="email"
          type="text"
          placeholder="Email"
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <div className="text-red-700 text-xs italic">
          {errors?.['password']}
        </div>
        <input
          className="indent-2 mb-4 border-2 rounded w-full"
          name="password"
          type="text"
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
