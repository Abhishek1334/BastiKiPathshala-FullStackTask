const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        console.log('Auth middleware - checking authentication...');
        console.log('Cookies:', req.cookies);
        
        // Get token from cookie
        const token = req.cookies.adminToken;

        if (!token) {
            console.log('No token found in cookies');
            return res.status(401).json({
                error: 'Access denied. No token provided.',
            });
        }

        console.log('Token found, verifying...');
        console.log('JWT_SECRET available:', !!process.env.JWT_SECRET);
        
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Token verified, decoded:', decoded);

        // Check if token is for admin
        if (decoded.role !== 'admin') {
            console.log('Token role is not admin:', decoded.role);
            return res.status(403).json({
                error: 'Access denied. Admin privileges required.',
            });
        }

        console.log('Authentication successful');
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                error: 'Token expired. Please login again.',
            });
        }

        return res.status(401).json({
            error: 'Invalid token.',
        });
    }
};

module.exports = auth;
