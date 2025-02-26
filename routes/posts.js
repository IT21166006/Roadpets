import express from 'express';
import multer from 'multer';
import Post from '../models/Post.js';
;
const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

// Create a new post with multiple images
router.post('/', upload.array('images', 4), async (req, res) => {
    const { name, phoneNumber, location, description } = req.body; // Ensure description is included

    // Ensure images are uploaded
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: 'Please upload at least one image.' });
    }

    const images = req.files.map(file => file.path);

    try {
        const newPost = new Post({ name, phoneNumber, location, description, images });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a post
router.put('/:id', upload.array('images', 4), async (req, res) => { // Added upload middleware for updating posts
    const { name, phoneNumber, description, location } = req.body;

    // Handle image updates if any
    const images = req.files ? req.files.map(file => file.path) : undefined;

    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id,
            { name, phoneNumber, description, location, ...(images && { images }) },
            { new: true }
        );

        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found.' });
        }

        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a post
router.delete('/:id', async (req, res) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);

        if (!deletedPost) {
            return res.status(404).json({ message: 'Post not found.' });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});




//Find By Location

// Find posts by location
router.get('/location/:location', async (req, res) => {
    const { location } = req.params;

    try {
        // Find posts that match the specified location
        const posts = await Post.find({ location }).sort({ createdAt: -1 });

        if (posts.length === 0) {
            return res.status(404).json({ message: 'No posts found for this location.' });
        }

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get posts by user
router.get('/user/:userId', async (req, res) => {
    try {
        const posts = await Post.find({ user: req.params.userId }).sort({ createdAt: -1 });
        if (posts.length === 0) {
            return res.status(404).json({ message: 'No posts found for this user.' });
        }
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;