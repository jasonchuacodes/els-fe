import { Routes, Route } from 'react-router-dom';
import ErrorPage from '../page/ErrorPage';
import Login from '../page/Login/Login';
import Register from '../page/Register/Register';
import Profile from '../page/Profile/Profile';
import Navbar from '../page/Navbar';

import Home from '../page/Home/Home';
import AdminPage from '../page/AdminPage/AdminPage';
import ProtectedRoute from './middleware/ProtectedRoute';

const RouteList = () => {
  return (
    <>
      <Routes>
        {/* public routes */}
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>

        {/* user protected routes */}
        <Route element={<ProtectedRoute userRole="user" />}>
          <Route element={<Navbar />}>
            <Route path="/" element={<Home />}>
              <Route path="profile" element={<Profile />}></Route>
            </Route>
          </Route>
        </Route>

        {/* admin protected routes */}
        <Route element={<ProtectedRoute userRole="admin" />}>
          <Route path="admin/dashboard" element={<AdminPage />}></Route>
        </Route>

        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
    </>
  );
};

export default RouteList;
