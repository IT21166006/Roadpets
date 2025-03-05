const jwt = require('jsonwebtoken');

exports.authenticateToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Verified token payload:', verified); // Debug log
        req.user = verified;
        next();
    } catch (error) {
        console.error('Token verification error:', error);
        res.status(403).json({ error: 'Invalid token' });
    }
};

exports.authorizeRole = (roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return res.status(403).json({ error: 'Access forbidden' });
    }
    next();
};
