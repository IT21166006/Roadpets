import express from 'express';
import multer from 'multer';
import Post from '../models/Post.js';
import { authenticateToken } from '../middleware/auth.js';
import path from 'path';

const router = express.Router();

// Configure multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Create post route
router.post('/', authenticateToken, upload.array('images', 5), async (req, res) => {
    try {
        console.log('Request body:', req.body);
        console.log('Files:', req.files);

        // Validate required fields
        if (!req.body.name || !req.body.description || !req.body.location || !req.body.phoneNumber) {
            return res.status(400).json({ 
                message: 'Missing required fields',
                received: req.body 
            });
        }

        // Process uploaded files
        const imagePaths = req.files ? req.files.map(file => file.path) : [];

        // Create new post
        const newPost = new Post({
            name: req.body.name,
            description: req.body.description,
            location: req.body.location,
            phoneNumber: req.body.phoneNumber,
            images: imagePaths,
            user: req.user.userId
        });

        // Save post
        const savedPost = await newPost.save();
        console.log('Saved post:', savedPost);

        res.status(201).json(savedPost);
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ 
            message: 'Error creating post', 
            error: error.message,
            stack: error.stack 
        });
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

// Get user's posts
router.get('/user', authenticateToken, async (req, res) => {
    try {
        const posts = await Post.find({ user: req.user.userId })
            .sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        console.error('Error fetching user posts:', error);
        res.status(500).json({ error: 'Error fetching posts' });
    }
});

// Update post
router.put('/:id', authenticateToken, async (req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.id, user: req.user.userId });
        
        if (!post) {
            return res.status(404).json({ error: 'Post not found or unauthorized' });
        }

        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        res.json(updatedPost);
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ error: 'Error updating post' });
    }
});

// Delete post
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.id, user: req.user.userId });
        
        if (!post) {
            return res.status(404).json({ error: 'Post not found or unauthorized' });
        }

        await Post.findByIdAndDelete(req.params.id);
        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ error: 'Error deleting post' });
    }
});

// Find By Location

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

export default router;