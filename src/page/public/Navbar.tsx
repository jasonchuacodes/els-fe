import React, { useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import AuthApi from '../../api/AuthApi';
import { UserContext, UserContextType } from '../../context/UserContext';

function Navbar() {
  const navigate = useNavigate();
  const authUser = (Cookies.get('auth_user') && JSON.parse(Cookies.get('auth_user') || '{}'));
  const token = Cookies.get('access_token');
  
  const logout = () => {
    AuthApi.logout(token)
    Cookies.remove('auth_user');
    Cookies.remove('user');
    Cookies.remove('access_token');
    navigate('/login');
  }

  return (
    <div>
      <div className="navbar flex items-center justify-between bg-gray-200 w-full h-16 px-4">
        <div className="navbar__logo w-1/2  font-bold">
          <Link to="/">E Learning</Link>
        </div>
        <div className="navbar__links flex w-1/2 justify-evenly ">
          <div className="navbar__link">
            <button onClick={() => navigate(`/profile/${authUser.id}`)}>My Profile</button>
          </div>
          <div className="navbar__link">
            <Link to="/dashboard">Dashboard</Link>
          </div>
          <div className="navbar__link">
            <button className="bg-white rounded px-2" onClick={logout}>Logout</button>  
          </div>
        </div>
      </div>
      <div className='mt-10'>
        <Outlet />
      </div>
    </div>
  );
}

export default Navbar;
