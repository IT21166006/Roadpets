import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';

const PostForm = ({ userId }) => {
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

        // Check if name exceeds 20 characters
        if (name.length > 20) {
            alert('Name must be 20 characters or less.');
            return;
        }

        // Check if phone number exceeds 15 characters
        if (countryCode.length + phoneNumber.length > 15) {
            alert('Phone number must be 15 characters or less including country code.');
            return;
        }

        // Check if description exceeds 35 characters
        if (description.length > 35) {
            alert('Description must be 35 characters or less.');
            return;
        }

        if (croppedImages.some((img) => img === null)) {
            alert('Please crop all images before submitting.');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('phoneNumber', `${countryCode}${phoneNumber}`); // Concatenate country code and number
        formData.append('location', location);
        formData.append('description', description);
        formData.append('user', userId); // Add user ID to form data
        croppedImages.forEach((croppedImage) => {
            formData.append('images', croppedImage); // Append each cropped image
        });

        try {
            await axios.post('http://localhost:5000/api/posts', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            alert('Post created successfully!');
            resetForm();
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || 'Failed to create post.');
        }
    };

    const resetForm = () => {
        setName('');
        setPhoneNumber('');
        setLocation('');
        setDescription('');
        setImages([]);
        setCroppedImages([]);
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
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                            <div className="input-group">
                                <select
                                    className="form-select"
                                    style={{ width: '100px' }}
                                    value={countryCode}
                                    onChange={(e) => setCountryCode(e.target.value)}
                                >
                                    <option value="+1">+1 (USA)</option>
                                    <option value="+44">+44 (UK)</option>
                                    <option value="+91">+91 (India)</option>
                                    {/* Add more country codes as needed */}
                                </select>
                                <input
                                    type="text"
                                    id="phoneNumber"
                                    className="form-control"
                                    placeholder="Enter your phone number"
                                    value={phoneNumber}
                                    onChange={handlePhoneChange}
                                    required
                                />
                            </div>
                            {phoneError && <small className="text-danger">{phoneError}</small>}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="location" className="form-label">Location</label>
                            <input
                                type="text"
                                id="location"
                                className="form-control"
                                placeholder="Enter location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                required
                            />
                            {locationError && <small className="text-danger">{locationError}</small>}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea
                                id="description"
                                className="form-control"
                                placeholder="Enter a brief description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="images" className="form-label">Upload Images</label>
                            <input
                                type="file"
                                id="images"
                                className="form-control"
                                onChange={handleImageChange}
                                accept="image/*"
                                multiple
                            />
                        </div>

                        {images.map((imageSrc, index) => (
                            <div key={index} className="mb-3">
                                <h5>Crop Your Image {index + 1}:</h5>
                                <img
                                    ref={(el) => (imageRefs.current[index] = el)}
                                    src={imageSrc}
                                    alt={`To be cropped ${index + 1}`}
                                    style={{ maxWidth: '100%' }}
                                />
                                <button
                                    type="button"
                                    className="btn btn-primary mt-2"
                                    onClick={() => handleCrop(index)}
                                >
                                    Crop Image {index + 1}
                                </button>
                            </div>
                        ))}

                        <button type="submit" className="btn btn-primary btn-block">
                            Publish Post
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PostForm;
