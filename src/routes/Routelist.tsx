import { Routes, Route, Navigate } from "react-router-dom"
import { useContext } from "react";
import ErrorPage from "../page/ErrorPage";
import Navbar from "../page/Navbar";
import Login from "../page/Login/Login";
import Register from "../page/Register/Register";
import Dashboard from "../page/Dashboard";
import Profile from "../page/Profile/Profile";
import { UserContext } from "../context/UserContext";
import VerifyEmail from "../page/VerifyEmail/VerifyEmail";

const RouteList = () => {
  const context = useContext(UserContext);

  const loginStatus = context?.loginStatus;
  
  return (
    <>
      <Routes>
        {loginStatus ? (
          // private routes
          <>
            <Route element={<Navbar />}>
              <Route path="/" element={<Dashboard />}></Route>
              <Route path="/profile" element={<Profile />}></Route>
            </Route>
          </>
        ) : (
          // public routes
          <>
            <Route path="/" element={<Navigate to="/login" />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/verify-email" element={<VerifyEmail />}></Route>
            <Route path="/error" element={<ErrorPage />}></Route>
            <Route path="*" element={<Navigate to="/error"></Navigate>}></Route>
          </>
        )}
      </Routes>
    </>
  );
};

export default RouteList;