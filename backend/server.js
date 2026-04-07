require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorMiddleware');

// Validate critical environment variables
const requiredEnvVars = ['MONGO_URI', 'JWT_SECRET'];
requiredEnvVars.forEach((varName) => {
    if (!process.env[varName]) {
        console.error(`ERROR: Environment variable ${varName} is missing!`);
    }
});

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(helmet({
    contentSecurityPolicy: false, // Ensure frontend works correctly when served via backend
    crossOriginEmbedderPolicy: false
}));
app.use(cors());
app.use(express.json());
app.use(morgan('dev')); // Use 'combined' for more detailed production logs

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/resumes', require('./routes/resumes'));
app.use('/api/ai', require('./routes/ai'));
app.use('/api/upload', require('./routes/upload'));

// Health Check for Render
app.get('/health', (req, res) => res.status(200).send('API is running successfully 🚀'));

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
    // Serve static files from the frontend build
    app.use(express.static(path.join(__dirname, '../frontend/dist')));

    // Any route that is not API goes to index.html
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend', 'dist', 'index.html'));
    });
} else {
    app.get("/", (req, res) => {
        res.send("Backend API is active. Set NODE_ENV=production to automatically serve the frontend UI here.");
    });
}

// Error handling middleware
app.use(errorHandler);

const startServer = (port) => {
    const server = app.listen(port, '0.0.0.0', () => {
        console.log(`Server running on port ${port} 🚀`);
    }).on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.log(`Port ${port} is in use, trying ${port + 1}...`);
            startServer(port + 1);
        } else {
            console.error(err);
        }
    });
};

const DEFAULT_PORT = process.env.PORT || 5001;
startServer(parseInt(DEFAULT_PORT));

