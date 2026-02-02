import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./HomeComponents/Navbar";
import HomeSlider from "./HomeComponents/HomeSlider";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import ForgotPassword from "./auth/ForgotPass";

const App = () => {
  return (
    <Router> {/* <-- THIS is required */}
      <Navbar />
      <Routes>
        <Route path="/" element={<HomeSlider />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/forgot-password' element={<ForgotPassword/>} />
      </Routes>
    </Router>
  );
};

export default App;
