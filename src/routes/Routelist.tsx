import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './middleware/ProtectedRoute';
import Login from '../page/public/Login/Login';
import Register from '../page/public/Register/Register';
import Navbar from '../page/public/Navbar';
import Home from '../page/public/Home/Home';
import Profile from '../page/user/Profile/Profile';
import AdminPage from '../page/admin/AdminPage/AdminPage';
import ErrorPage from '../page/public/ErrorPage';
import Dashboard from '../page/user/Dashboard/Dashboard';
import Category from '../page/user/Lesson/Category/Category';
import Quiz from '../page/user/Lesson/Quiz/Quiz';

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
            <Route path="/" element={<Home />}></Route>
            <Route path="profile/:id" element={<Profile />}></Route>
            <Route path="dashboard" element={<Dashboard />}></Route>
            <Route path="category" element={<Category />}></Route>
            <Route path="quiz" element={<Quiz />}></Route>
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
