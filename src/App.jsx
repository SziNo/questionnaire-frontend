import { useEffect, Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { Navbar, Footer } from "./layout";
import { checkTokenExpiration } from "@/utils/auth";
import "./index.css";

const Home = lazy(() => import("@/pages/Home/Home"));
const Admin = lazy(() => import("@/pages/Admin/Admin"));
const QuizQuestions = lazy(() => import("@/pages/QuizQuestions/QuizQuestions"));
const Register = lazy(() => import("@/pages/Authentication/Register"));
const Login = lazy(() => import("@/pages/Authentication/Login"));
const Quiz = lazy(() => import("@/pages/Quiz/Quiz"));
const ThankYou = lazy(() => import("@/pages/Authentication/ThankYou"));

const App = () => {
  useEffect(() => {
    checkTokenExpiration();
  }, []);

  return (
    <>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/quiz/:type" element={<QuizQuestions />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/quiz/:type" element={<Quiz />} />
          <Route path="/thank-you" element={<ThankYou />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
};

export default App;
