import React from 'react';
import { Navigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';


const ProtectedRoute = ({userRole} : {userRole: string}) => {
  const userData = (Cookies.get('auth_user') && JSON.parse(Cookies.get('auth_user') || '{}'));

  const user = (userData === undefined ? false : (userData?.is_admin ? false : 'user'))
  const admin = userData?.is_admin ? 'admin' : false;

  if (user === admin) {
    return <Navigate to="/login" />;
  }

  if (admin) {
    return admin === userRole ? <Outlet /> : <Navigate to="admin/dashboard" />
  }

  if (user) {
    return user === userRole ? <Outlet /> : <Navigate to="/" />
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default ProtectedRoute;