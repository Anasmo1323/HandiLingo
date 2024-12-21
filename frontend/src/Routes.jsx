import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./HomePage/Home.jsx";
import NotFound from "./components/NotFound.jsx";
import Dashboard from "./dashBoardPage/Dashboard.jsx";
import Login from "./loginpage/Login.jsx";
import Register from "./loginpage/Register.jsx";
import Lesson from "./LessonsPage/Lesson.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { useState, useEffect } from "react";
import httpClient from "./components/httpClient";

const Router = () => {
    const [user, setUserData] = useState({});


    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await httpClient.get("/@me");
                setUserData(response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute user={user}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/lessons"
          element={
            <ProtectedRoute user={user}>
              <Lesson languageType="sign" />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;