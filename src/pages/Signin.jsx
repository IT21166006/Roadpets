import React, { useState } from 'react';
import '../CSS/signin.css';
import Logo from "../asserts/logo.png";

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', { name, email, password });
    // Add your submission logic here
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        
          {/* <img src={Logo} width="300" height="75" alt="logo" /> <br /> */}
        <br /><br />
        <h3 className="logo">Login</h3> <br />
        <br />
       
        <form onSubmit={handleSubmit}>
          
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            /> 
             <span className="eye-icon" onClick={togglePasswordVisibility}>
                {showPassword ? '👁️' : '👁️'}
              </span>
          </div> <br /> 
          <button type="submit" className="signup-button">Sign Up</button>
        </form>
        <div className="social-signup">
          <p>Or sign up with</p>
          <div className="social-icons">
            <button className="google-icon">G</button>
            <button className="facebook-icon">f</button>
            <button className="twitter-icon">t</button>
          </div>
        </div>
        <p className="signin-link">
          Already have an account? <a href="#">Sign in</a>
        </p>
      </div>
      <div className="image-section">
        <img src="https://i.ibb.co/BHk5WL7s/Black-Simple-Dark-Photocentric-Motivation-Quote-Instagram-Post.png" alt="Road dog" />
        <div className="quote">
          <p>
            "A road dog may have no home, but it carries a heart full of
            stories, a soul full of resilience, and a silent hope for kindness"
          </p>
          <span>@roadpetsrilanka</span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
