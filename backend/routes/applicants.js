const express = require('express');
const { body, validationResult } = require('express-validator');
const Applicant = require('../models/Applicant');
const auth = require('../middleware/auth');

const router = express.Router();

// Validation middleware
const validateRegistration = [
    body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters long'),
    body('email').isEmail().normalizeEmail().withMessage('Please enter a valid email'),
    body('phone')
        .matches(/^[\+]?[1-9][\d]{0,15}$/)
        .withMessage('Please enter a valid phone number'),
    body('role')
        .isIn(['intern', 'volunteer'])
        .withMessage('Role must be either intern or volunteer'),
    body('message')
        .trim()
        .isLength({ min: 10, max: 500 })
        .withMessage('Message must be between 10 and 500 characters'),
];

// POST /api/register - Register a new applicant
router.post('/register', validateRegistration, async (req, res) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                error: 'Validation failed',
                details: errors.array(),
            });
        }

        const { name, email, phone, role, message } = req.body;

        // Check if email already exists
        const existingApplicant = await Applicant.findOne({ email });
        if (existingApplicant) {
            return res.status(400).json({
                error: 'An applicant with this email already exists',
            });
        }

        // Create new applicant
        const applicant = new Applicant({
            name,
            email,
            phone,
            role,
            message,
        });

        await applicant.save();

        res.status(201).json({
            success: true,
            message: 'Application submitted successfully!',
            data: {
                id: applicant._id,
                name: applicant.name,
                email: applicant.email,
                role: applicant.role,
                createdAt: applicant.createdAt,
            },
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            error: 'Failed to submit application. Please try again.',
        });
    }
});

// GET /api/test-applicants - Test endpoint (no auth required)
router.get('/test-applicants', async (req, res) => {
    try {
        console.log('Testing applicants endpoint...');
        const count = await Applicant.countDocuments();
        console.log('Total applicants in database:', count);
        
        res.json({
            success: true,
            count: count,
            message: 'Test endpoint working'
        });
    } catch (error) {
        console.error('Test applicants error:', error);
        res.status(500).json({
            error: 'Test failed',
            details: error.message
        });
    }
});

// GET /api/applicants - Get all applicants (admin only)
router.get('/applicants', auth, async (req, res) => {
    try {
        console.log('Fetching applicants...');
        console.log('User authenticated:', req.user);
        
        const applicants = await Applicant.find({}).select('-__v').sort({ createdAt: -1 });
        console.log('Found applicants:', applicants.length);

        res.json({
            success: true,
            count: applicants.length,
            data: applicants,
        });
    } catch (error) {
        console.error('Fetch applicants error:', error);
        console.error('Error details:', {
            name: error.name,
            message: error.message,
            stack: error.stack
        });
        res.status(500).json({
            error: 'Failed to fetch applicants',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

module.exports = router;
