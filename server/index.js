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

const bootApp = async () => {
    const server = express();
    const port = process.env.EXPRESS_PORT;
    
    // Connect to MongoDB
    await connectDB();
    
    // Configure Passport
    configurePassport();
    
    // Logging middleware
    server.use(morgan(logLevels.dev));
    
    // Body parser middleware
    server.use(express.json());
    server.use(express.urlencoded({ extended: false }));
    
    // Session middleware - must be before passport
    server.use(
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
    server.use(passport.initialize());
    server.use(passport.session());
    
    server.use('/api', require('./api'));

    // Start server in development mode
    if(process.env.NODE_ENV === environments.development) {
        server.listen(port, () => {
            console.log(`${logMessages.serverRunning} ${port}`);
        });
    } else {
        // Export server instance for Netlify serverless function
        console.log(logMessages.serverExported);

        module.exports = server;
    };
};

bootApp();