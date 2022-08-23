import React from 'react'
import { Link, Outlet } from 'react-router-dom';

function Navbar() {
  return (
    <div>
      <div className="navbar flex items-center justify-between bg-gray-200 w-full h-16">
        <div className="navbar__logo ml-10 font-bold w-1/3">
          <Link to="/">E Learning</Link>
        </div>
        <div className="navbar__links flex justify-evenly w-1/3 ">
          <div className="navbar__link">
            <Link to="/profile">Profile</Link>
          </div>
          <div className="navbar__link">Link 2</div>
          <div className="navbar__link">Logout</div>
        </div>
      </div>
      <div className="h-full">
        <Outlet />
      </div>
    </div>
  );
}

export default Navbar;