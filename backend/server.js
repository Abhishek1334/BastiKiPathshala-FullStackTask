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
const allowedOrigins = [
    'https://bastikipathshala-nine.vercel.app',
    'http://localhost:5173',
    'http://localhost:3000',
];

app.use(
    cors({
        origin: function (origin, callback) {
            // Allow requests with no origin (like mobile apps or curl requests)
            if (!origin) return callback(null, true);

            if (allowedOrigins.indexOf(origin) !== -1) {
                callback(null, true);
            } else {
                console.log('CORS blocked origin:', origin);
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    })
);
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection check middleware
app.use((req, res, next) => {
    if (mongoose.connection.readyState !== 1) {
        console.log('Database not connected. Ready state:', mongoose.connection.readyState);
        return res.status(503).json({
            error: 'Database connection not available',
            readyState: mongoose.connection.readyState
        });
    }
    next();
});

// MongoDB Connection
const connectDB = async () => {
    const mongoURI =
        process.env.MONGODB_URI ||
        'mongodb+srv://abhishek1334code:odmBonWo41a3xIs8@ngoproject.x6ucfnp.mongodb.net/?retryWrites=true&w=majority&appName=NGOProject';

    console.log('Attempting to connect to MongoDB...');
    console.log('MongoDB URI:', mongoURI.substring(0, 50) + '...');
    
    try {
        await mongoose.connect(mongoURI, {
            serverSelectionTimeoutMS: 10000, // 10 seconds timeout
            socketTimeoutMS: 45000, // 45 seconds timeout
            maxPoolSize: 10, // Maximum number of connections in the pool
            minPoolSize: 1, // Minimum number of connections in the pool
        });
        
        console.log('✅ Connected to MongoDB Atlas successfully');
        console.log('Database name:', mongoose.connection.name);
        console.log('Connection state:', mongoose.connection.readyState);
    } catch (err) {
        console.error('❌ MongoDB connection error:', err);
        console.error(
            'Connection string used:',
            process.env.MONGODB_URI ? 'Environment variable' : 'Hardcoded fallback'
        );
        
        // Try one more time after a short delay
        console.log('🔄 Retrying connection in 3 seconds...');
        setTimeout(async () => {
            try {
                await mongoose.connect(mongoURI, {
                    serverSelectionTimeoutMS: 10000,
                    socketTimeoutMS: 45000,
                    maxPoolSize: 10,
                    minPoolSize: 1,
                });
                console.log('✅ Reconnected to MongoDB Atlas successfully');
            } catch (retryErr) {
                console.error('❌ Retry failed:', retryErr);
                process.exit(1);
            }
        }, 3000);
    }
};

// connect to database
connectDB();

// MongoDB connection event listeners
mongoose.connection.on('connected', () => {
    console.log('🎉 Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.error('❌ Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('⚠️ Mongoose disconnected from MongoDB');
});

mongoose.connection.on('reconnected', () => {
    console.log('🔄 Mongoose reconnected to MongoDB');
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api', require('./routes/applicants'));

// Test endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'Basti Ki Pathshala API is running!',
        timestamp: new Date().toISOString(),
    });
});

// Health check endpoint
app.get('/health', (req, res) => {
    const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
    res.json({
        status: 'OK',
        message: 'Server is running',
        database: {
            status: dbStatus,
            readyState: mongoose.connection.readyState,
            name: mongoose.connection.name,
            host: mongoose.connection.host
        },
        timestamp: new Date().toISOString(),
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error occurred:', err.message);
    console.error('Error stack:', err.stack);

    // Handle CORS errors
    if (err.message === 'Not allowed by CORS') {
        return res.status(403).json({
            error: 'CORS error: Origin not allowed',
            origin: req.headers.origin,
        });
    }

    res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔗 Allowed origins: ${allowedOrigins.join(', ')}`);
    console.log(`🔐 JWT_SECRET available: ${!!process.env.JWT_SECRET}`);
    console.log(`🍪 COOKIE_SECRET available: ${!!process.env.COOKIE_SECRET}`);
    console.log(`📊 Health check: http://localhost:${PORT}/health`);
});
