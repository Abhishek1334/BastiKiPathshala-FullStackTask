const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

// Load environment variables
dotenv.config();

// create express app
const app = express();

// Middleware setup
app.use(
    cors({
        origin:
            process.env.NODE_ENV === 'production'
                ? ['https://bastikipathshala-nine.vercel.app']
                : ['http://localhost:5173'],
        credentials: true,
    })
);
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI ||
            'mongodb+srv://abhishek1334code:odmBonWo41a3xIs8@ngoproject.x6ucfnp.mongodb.net/?retryWrites=true&w=majority&appName=NGOProject';
        
        console.log('Attempting to connect to MongoDB...');
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ Connected to MongoDB Atlas successfully');
    } catch (err) {
        console.error('❌ MongoDB connection error:', err);
        console.error('Connection string used:', process.env.MONGODB_URI ? 'Environment variable' : 'Hardcoded fallback');
        // Don't exit the process, let it continue but log the error
    }
};

// connect to database
connectDB();

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api', require('./routes/applicants'));

// Health check endpoint
app.get('/health', (req, res) => {
    const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
    res.json({ 
        status: 'OK', 
        message: 'Server is running',
        database: dbStatus,
        timestamp: new Date().toISOString()
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
