const mongoose = require('mongoose');

const applicantSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
            minlength: [2, 'Name must be at least 2 characters long'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'],
        },
        phone: {
            type: String,
            required: [true, 'Phone number is required'],
            trim: true,
            match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number'],
        },
        role: {
            type: String,
            required: [true, 'Role is required'],
            enum: ['intern', 'volunteer'],
            lowercase: true,
        },
        message: {
            type: String,
            required: [true, 'Message is required'],
            trim: true,
            minlength: [10, 'Message must be at least 10 characters long'],
            maxlength: [500, 'Message cannot exceed 500 characters'],
        },
    },
    {
        timestamps: true,
    }
);

// Create index for email field
applicantSchema.index({ email: 1 });

module.exports = mongoose.model('Applicant', applicantSchema);
