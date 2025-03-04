import React from 'react';
import Logo from "../asserts/logo.png";
import '../CSS/navbar.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div style={{ paddingLeft: '30px' }}></div>
      <img src={Logo} width="150" height="50" alt="" />

      <button 
        className="navbar-toggler" 
        type="button" 
        data-bs-toggle="collapse" 
        data-bs-target="#navbarSupportedContent" 
        aria-controls="navbarSupportedContent" 
        aria-expanded="false" 
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ms-auto px-5">
          <li className="nav-item active">
            <a className="nav-link nav-link-large" href="/">Home <span className="visually-hidden">(current)</span></a>
          </li>
          <li className="nav-item">
            <a className="nav-link nav-link-large" href="/create">Create Post</a>
          </li>
          <li className="nav-item">
            <a className="nav-link nav-link-large" href="/create">Projects</a>
          </li>
          <li className="nav-item">
            <a className="nav-link nav-link-large" href="/gallery">Gallery</a>
          </li>
          <li className="nav-item px-3">
            <a 
              className="btn-signup" 
              href="/signup"
            >
              SignUp 
            </a>
          </li>
          
          <li className="nav-item px-3">
            <a 
              className="btn-signup me-2" 
              href="/login"
            >
              Login
            </a>
            
          </li>
          <li className="nav-item px-3">
            <a href="/profile"><AccountCircleIcon style={{ color: 'black', fontSize: '50px', cursor: 'pointer' }} /></a>
            </li>
          
        </ul>
        
      </div>
      
    </nav>
  );
};

export default Navbar;
