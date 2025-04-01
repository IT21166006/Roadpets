import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../CSS/signup.css'; // Ensure this file contains the custom CSS styles
import Logo from "../asserts/logo.png";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Attempting login...');
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password,
            });

            console.log('Login response:', response.data); // Debug log

            if (response.data.token) {
                // Store token and user data
                localStorage.setItem('token', response.data.token);
                if (response.data.user) {
                    console.log('Storing user data:', response.data.user);
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                }
                navigate('/profile');
            } else {
                setError('Invalid response from server');
            }
        } catch (error) {
            console.error('Login error:', error.response?.data || error);
            setError(error.response?.data?.error || 'Login failed');
        }
    };

    return (
        <div className="container mt-5">
            
            <div className="row justify-content-center">
                

                <div className="col-md-6">
                    <div className="card shadow" style={{ borderColor: '#ff914d' }}>
                        <div className="card-body">
                        <div className="d-flex justify-content-center">
                            <img src={Logo} width="200" alt="Logo" />
                        </div>
                            <h2 className="mx-auto mb-4" style={{ color: '#ff914d' }}>Login</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label" style={{ color: '#000' }}>Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        style={{
                                            borderColor: '#ff914d',
                                            backgroundColor: '#fff',
                                            color: '#000',
                                        }}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" style={{ color: '#000' }}>Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        style={{
                                            borderColor: '#ff914d',
                                            backgroundColor: '#fff',
                                            color: '#000',
                                        }}
                                    />
                                </div>
                                {error && (
                                    <div className="alert alert-danger" role="alert">
                                        {error}
                                    </div>
                                )}
                                <button
                                    type="submit"
                                    className="btn btn-block w-100"
                                    style={{
                                        backgroundColor: '#ff914d',
                                        borderColor: '#ff914d',
                                        color: '#fff',
                                    }}
                                >
                                    Login
                                </button>
                                <br></br>
                                <br></br>
                                <div className="d-flex justify-content-center">
                                <p>If you have not an account <a href="/signup">Signup</a></p>
                                </div>
                            
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
