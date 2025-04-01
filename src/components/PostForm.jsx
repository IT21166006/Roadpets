import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import { useNavigate } from 'react-router-dom';

const PostForm = () => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);
    const [croppedImages, setCroppedImages] = useState([]);
    const imageRefs = useRef([]);
    const cropperRefs = useRef([]);
    const [countryCode, setCountryCode] = useState('+1'); // Default country code
    const [phoneError, setPhoneError] = useState('');
    const [locationError, setLocationError] = useState(''); // New state for location error
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Add useEffect to fetch user profile data when component mounts
    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const response = await axios.get('http://localhost:5000/api/protected/dashboard', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                // Auto-fill the name field with user's username
                if (response.data && response.data.username) {
                    setName(response.data.username);
                }
            } catch (error) {
                console.error('Error fetching user profile:', error);
                if (error.response?.status === 401) {
                    navigate('/login');
                }
            }
        };

        fetchUserProfile();
    }, [navigate]);

    // Function to fetch location using ipinfo.io
    const fetchLocation = async () => {
        try {
            const response = await axios.get('https://ipinfo.io?token=3e56a6d6dfa74a'); // Replace YOUR_IPINFO_API_TOKEN
            setLocation(response.data.city + ', ' + response.data.region + ', ' + response.data.country);
        } catch (error) {
            console.error('Error getting location:', error);
            setLocationError('Failed to get location. Please enter manually.');
        }
    };

    // Initialize Cropper.js when images are loaded
    useEffect(() => {
        images.forEach((imageSrc, index) => {
            if (imageSrc && imageRefs.current[index]) {
                cropperRefs.current[index] = new Cropper(imageRefs.current[index], {
                    aspectRatio: 4 / 5,
                    viewMode: 1,
                    autoCropArea: 1,
                });
            }
        });

        return () => {
            // Destroy cropper instances to avoid memory leaks
            cropperRefs.current.forEach((cropper) => {
                if (cropper) {
                    cropper.destroy();
                }
            });
            cropperRefs.current = [];
        };
    }, [images]);

    // Fetch location on component mount
    useEffect(() => {
        fetchLocation();
    }, []);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const fileReaders = files.map((file) => {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.readAsDataURL(file);
            });
        });

        Promise.all(fileReaders).then((results) => {
            setImages(results);
            setCroppedImages(new Array(results.length).fill(null)); // Initialize cropped images array
        });
    };

    const handleCrop = (index) => {
        if (cropperRefs.current[index]) {
            const croppedCanvas = cropperRefs.current[index].getCroppedCanvas({
                width: 400,
                height: 500,
            });

            croppedCanvas.toBlob((blob) => {
                if (blob) {
                    const updatedCroppedImages = [...croppedImages];
                    updatedCroppedImages[index] = blob; // Store the cropped image blob
                    setCroppedImages(updatedCroppedImages);
                    alert(`Image ${index + 1} cropped successfully!`);
                } else {
                    alert('Failed to crop the image. Please try again.');
                }
            }, 'image/jpeg');
        }
    };

    const handlePhoneChange = (e) => {
        const value = e.target.value;
        if (value.length > 18) {
            setPhoneError('Phone number must be 18 characters or less.');
        } else {
            setPhoneError('');
        }
        setPhoneNumber(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        
        if (!token) {
            navigate('/login');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            formData.append('location', location);
            formData.append('phoneNumber', phoneNumber); // Add phone number

            // Handle cropped images if available, otherwise use original images
            if (croppedImages.length > 0) {
                croppedImages.forEach((blob, index) => {
                    if (blob) {
                        formData.append('images', blob, `image-${index}.jpg`);
                    }
                });
            } else {
                // Convert base64 images to blobs and append
                for (let i = 0; i < images.length; i++) {
                    const base64Response = await fetch(images[i]);
                    const blob = await base64Response.blob();
                    formData.append('images', blob, `image-${i}.jpg`);
                }
            }

            // Log formData contents for debugging
            for (let pair of formData.entries()) {
                console.log(pair[0] + ': ' + pair[1]);
            }

            const response = await axios.post(
                'http://localhost:5000/api/posts',
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            if (response.data) {
                navigate('/profile');
            }
        } catch (error) {
            console.error('Error creating post:', error);
            const errorMessage = error.response?.data?.message || 'Failed to create post';
            setError(errorMessage);
            
            // Log detailed error information
            if (error.response) {
                console.error('Error response:', error.response.data);
            }
        }
    };

    return (
        <div className="container mt-5">
            <div className="card shadow-sm">
                <div className="card-body">
                    <h2 className="text-center mb-4">Create a Post</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input
                                type="text"
                                id="name"
                                className="form-control"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                readOnly
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                            <div className="input-group">
                                <select 
                                    className="form-select" 
                                    style={{ maxWidth: '100px' }}
                                    value={countryCode}
                                    onChange={(e) => setCountryCode(e.target.value)}
                                >
                                    <option value="+1">+1</option>
                                    <option value="+44">+44</option>
                                    {/* Add more country codes as needed */}
                                </select>
                                <input
                                    type="tel"
                                    id="phoneNumber"
                                    className="form-control"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    required
                                    pattern="[0-9]{10}"
                                    placeholder="Enter phone number"
                                />
                            </div>
                            {phoneError && <div className="text-danger small">{phoneError}</div>}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="location" className="form-label">Location</label>
                            <input
                                type="text"
                                id="location"
                                className="form-control"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                required
                            />
                            {locationError && <div className="text-danger small">{locationError}</div>}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea
                                id="description"
                                className="form-control"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                                rows="4"
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="images" className="form-label">Images</label>
                            <input
                                type="file"
                                id="images"
                                className="form-control"
                                onChange={handleImageChange}
                                accept="image/*"
                                multiple
                                required
                            />
                        </div>

                        {images.map((imageSrc, index) => (
                            <div key={index} className="mb-3">
                                <h5>Image {index + 1}:</h5>
                                <img
                                    ref={(el) => (imageRefs.current[index] = el)}
                                    src={imageSrc}
                                    alt={`Preview ${index + 1}`}
                                    style={{ maxWidth: '100%', marginBottom: '10px' }}
                                />
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => handleCrop(index)}
                                >
                                    Crop Image
                                </button>
                            </div>
                        ))}

                        {error && (
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        )}

                        <button 
                            type="submit" 
                            className="btn btn-primary w-100"
                            disabled={!name || !location || !description || images.length === 0}
                        >
                            Create Post
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PostForm;
