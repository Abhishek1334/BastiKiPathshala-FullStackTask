const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const router = express.Router();

// Validation middleware for login
const validateLogin = [body('password').notEmpty().withMessage('Password is required')];

// POST /api/auth/login - Admin login
router.post('/login', validateLogin, async (req, res) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                error: 'Validation failed',
                details: errors.array(),
            });
        }

        const { password } = req.body;
        const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

        // Verify password (direct comparison for demo - in production, use hashed passwords)
        if (password !== adminPassword) {
            return res.status(401).json({
                error: 'Invalid password.',
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            {
                role: 'admin',
                timestamp: Date.now(),
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN || '24h',
            }
        );

        // Set secure HTTP-only cookie
        res.cookie('adminToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // HTTPS only in production
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 24 * 60 * 60 * 1000, // 24 hours
            path: '/',
        });

        res.json({
            success: true,
            message: 'Login successful',
            user: {
                role: 'admin',
            },
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            error: 'Login failed. Please try again.',
        });
    }
});

// POST /api/auth/logout - Admin logout
router.post('/logout', auth, async (req, res) => {
    try {
        // Clear the cookie
        res.clearCookie('adminToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            path: '/',
        });

        res.json({
            success: true,
            message: 'Logout successful',
        });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({
            error: 'Logout failed. Please try again.',
        });
    }
});

// GET /api/auth/verify - Verify authentication status (public endpoint)
router.get('/verify', async (req, res) => {
    try {
        // Get token from cookie
        const token = req.cookies.adminToken;

        if (!token) {
            return res.json({
                success: true,
                authenticated: false,
                user: null,
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if token is for admin
        if (decoded.role !== 'admin') {
            return res.json({
                success: true,
                authenticated: false,
                user: null,
            });
        }

        res.json({
            success: true,
            authenticated: true,
            user: decoded,
        });
    } catch (error) {
        // If token is invalid or expired, return not authenticated
        res.json({
            success: true,
            authenticated: false,
            user: null,
        });
    }
});

// GET /api/auth/verify - Verify authentication status (protected endpoint)
router.get('/verify-protected', auth, async (req, res) => {
    try {
        res.json({
            success: true,
            authenticated: true,
            user: req.user,
        });
    } catch (error) {
        res.status(401).json({
            success: false,
            authenticated: false,
            error: 'Not authenticated',
        });
    }
});

module.exports = router;
