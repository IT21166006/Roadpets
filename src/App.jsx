import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // ✅ Ensure proper imports

import Navbar from "./components/Navbar";
import Gallery from "./components/Gallery";
import Banner from "./components/Banner";

import Home from "../src/pages/Home"; 
import Admin from "../src/pages/Admin";
import Postform from "./components/PostForm"; 
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import Login from "./pages/Signin";
import Footer from "./components/Footer"

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/create" element={<Postform />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/banner" element={<Banner />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
