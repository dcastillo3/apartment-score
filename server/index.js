//Import environment variables
require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo').default;
const connectDB = require('./config/database');
const configurePassport = require('./config/passport');
const { logMessages, environments, logLevels, cookieSettings } = require('./utils/consts');

// Create Express app
const app = express();

// Configure Passport (synchronous)
configurePassport();

// Logging middleware
app.use(morgan(logLevels.dev));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Session middleware - must be before passport
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URI,
            touchAfter: 24 * 3600
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
            httpOnly: true,
            secure: process.env.NODE_ENV === environments.production, // HTTPS only in production
            sameSite: cookieSettings.sameSite.lax
        }
    })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// API routes
app.use('/api', require('./api'));

// Connect to MongoDB and start server (async)
const startServer = async () => {
    try {
        // Connect to MongoDB
        await connectDB();
        
        // Start server in development mode
        if (process.env.NODE_ENV === environments.development) {
            const port = process.env.EXPRESS_PORT || 8000;
            app.listen(port, () => {
                console.log(`${logMessages.serverRunning} ${port}`);
            });
        } else {
            // In production (Netlify), just log that we're ready
            console.log(logMessages.serverExported);
        }
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

// Start the server
startServer();

// Export the Express app for Netlify serverless functions
module.exports = app;