import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            console.log('Starting to fetch user data...');
            
            const token = localStorage.getItem('token');
            const storedUser = localStorage.getItem('user');
            
            console.log('Token exists:', !!token);
            console.log('Stored user exists:', !!storedUser);

            if (!token) {
                console.log('No token found, redirecting to login...');
                navigate('/login');
                return;
            }

            try {
                // First set user from localStorage if available
                if (storedUser) {
                    console.log('Setting user from localStorage:', JSON.parse(storedUser));
                    setUser(JSON.parse(storedUser));
                }

                // Then fetch fresh data from server
                console.log('Fetching fresh data from server...');
                const response = await axios.get('http://localhost:5000/api/protected/dashboard', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                console.log('Server response:', response.data);

                if (response.data) {
                    console.log('Updating user state with server data:', response.data);
                    setUser(response.data);
                    localStorage.setItem('user', JSON.stringify(response.data));
                }
            } catch (error) {
                console.error('Error in profile:', error);
                console.error('Error response:', error.response);
                
                const errorMessage = error.response?.data?.error || 'Failed to load profile';
                setError(errorMessage);
                
                if (error.response?.status === 401 || error.response?.status === 403) {
                    console.log('Authentication error, clearing storage...');
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    navigate('/login');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [navigate]);

    if (loading) {
        return (
            <div className="container mt-5">
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-2">Loading profile data...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mt-5">
                <div className="alert alert-danger">
                    <h4 className="alert-heading">Error Loading Profile</h4>
                    <p>{error}</p>
                    <hr />
                    <p className="mb-0">
                        <button 
                            className="btn btn-outline-danger"
                            onClick={() => {
                                localStorage.clear();
                                navigate('/login');
                            }}
                        >
                            Back to Login
                        </button>
                    </p>
                </div>
            </div>
        );
    }

    // Debug output for user state
    console.log('Current user state:', user);

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-body">
                    <h2 className="card-title mb-4">User Profile</h2>
                    {user ? (
                        <div>
                            <div className="mb-3">
                                <strong>Username:</strong> {user.username || 'Not available'}
                            </div>
                            <div className="mb-3">
                                <strong>Email:</strong> {user.email || 'Not available'}
                            </div>
                            <div className="mb-3">
                                <strong>Role:</strong> {user.role || 'Not available'}
                            </div>
                            <div className="mt-4">
                                <button 
                                    className="btn btn-danger"
                                    onClick={() => {
                                        localStorage.clear();
                                        navigate('/login');
                                    }}
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center">
                            <p>No profile data available</p>
                            <button 
                                className="btn btn-primary"
                                onClick={() => navigate('/login')}
                            >
                                Go to Login
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Profile;
