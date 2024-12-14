import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./HomePage/Home.jsx";
import NotFound from "./components/NotFound.jsx";
import Dashboard from "./dashBoardPage/Dashboard.jsx";
import Login from "./loginpage/Login.jsx";
import Register from "./loginpage/Register.jsx";
import Lesson from "./LessonsPage/Lesson.jsx";


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/lessons" element={<Lesson languageType="sign" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;