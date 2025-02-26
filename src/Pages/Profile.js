import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
    const [posts, setPosts] = useState([]);
    const userId = 'currentUserId'; // Replace with actual user ID from authentication context

    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                const response = await axios.get(`/api/posts/user/${userId}`);
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching user posts:', error);
            }
        };

        fetchUserPosts();
    }, [userId]);

    return (
        <div>
            <h1>User Profile</h1>
            <h2>Your Posts</h2>
            <ul>
                {posts.map(post => (
                    <li key={post._id}>
                        <h3>{post.name}</h3>
                        <p>{post.description}</p>
                        <img src={post.images[0]} alt={post.description} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Profile;
