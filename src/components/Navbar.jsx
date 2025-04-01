import React from 'react';
import Logo from "../asserts/logo.png";
import '../CSS/navbar.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const isAuthenticated = localStorage.getItem('token') !== null;

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      {/* Logo on the left */}
      <div className="container-fluid">
        <div className="navbar-brand">
          <img src={Logo} width="150" height="50" alt="" />
        </div>

        {/* Toggler button */}
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

        {/* Navigation items aligned to the right */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link nav-link-large" href="/">Home</a>
            </li>
            
            {isAuthenticated && (
              <li className="nav-item">
                <a className="nav-link nav-link-large" href="/create">Create Post</a>
              </li>
            )}
            
            <li className="nav-item">
              <a className="nav-link nav-link-large" href="/gallery">Gallery</a>
            </li>
            
            {!isAuthenticated ? (
              <>
                <li className="nav-item px-2">
                  <a className="btn-signup" href="/signup">SignUp</a>
                </li>
                <li className="nav-item px-2">
                  <a className="btn-signup" href="/login">Login</a>
                </li>
              </>
            ) : (
              <li className="nav-item px-2">
                <a href="/profile">
                  <AccountCircleIcon style={{ color: 'black', fontSize: '50px', cursor: 'pointer' }} />
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
