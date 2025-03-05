import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // ✅ Ensure proper imports

import Navbar from "./components/Navbar";
import Gallery from "./components/Gallery";
import Banner from "./components/Banner";

import Home from "../src/pages/Home"; 
import Admin from "../src/pages/Admin";
import Postform from "./components/PostForm"; 
import Footer from "./components/Footer"

import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import AdminDashboard from './components/AdminDashboard';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        {/* <Route path="/admin" element={<Admin />} /> */}
        <Route path="/create" element={<Postform />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/banner" element={<Banner />} />
        

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/" element={<Login />} />

      </Routes>
      
    </Router>
  );
}

export default App;
