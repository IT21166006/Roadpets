import express from 'express';
import jwt from 'jsonwebtoken';
import { authorizeRole } from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

// Authentication middleware
const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ error: 'Access denied. No token provided.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded token:', decoded); // Debug log
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Auth error:', error);
        return res.status(403).json({ error: 'Invalid token.' });
    }
};

// Dashboard route
router.get('/dashboard', authenticateToken, async (req, res) => {
    try {
        console.log('Fetching user data for ID:', req.user.userId);

        const user = await User.findById(req.user.userId)
            .select('-password')
            .lean();

        if (!user) {
            console.log('No user found for ID:', req.user.userId);
            return res.status(404).json({ error: 'User not found' });
        }

        const userData = {
            username: user.username,
            email: user.email,
            role: user.role
        };

        console.log('Sending user data:', userData); // Debug log
        res.json(userData);
    } catch (error) {
        console.error('Dashboard error:', error);
        res.status(500).json({ error: 'Error fetching user data' });
    }
});

// Example of a route restricted to admin users only
router.get('/admin', authenticateToken, authorizeRole(['admin']), (req, res) => {
    res.status(200).json({ message: 'Welcome Admin!' });
});

export default router;



