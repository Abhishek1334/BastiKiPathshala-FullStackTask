const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        // Get token from cookie
        const token = req.cookies.adminToken;

        if (!token) {
            return res.status(401).json({
                error: 'Access denied. No token provided.',
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if token is for admin
        if (decoded.role !== 'admin') {
            return res.status(403).json({
                error: 'Access denied. Admin privileges required.',
            });
        }

        req.user = decoded;
        next();
    } catch (error) {
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
