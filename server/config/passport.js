const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
const { logMessages } = require('./configConsts');
const { buildNewUserFromProfile } = require('./configUtils');

const configurePassport = () => {
    // Serialize user for session
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    // Deserialize user from session
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);

            done(null, user);
        } catch (err) {
            done(err, null);
        }
    });

    // Google OAuth Strategy
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: process.env.GOOGLE_CALLBACK_URL
            },
            async (_accessToken, _refreshToken, profile, done) => {
                try {
                    // Check if user already exists
                    const existingUser = await User.findOne({ googleId: profile.id });

                    if (existingUser) {
                        // Update last login
                        await existingUser.updateLastLogin();

                        return done(null, existingUser);
                    }

                    // Create new user
                    const newUserData = buildNewUserFromProfile(profile);
                    const newUser = await User.create(newUserData);

                    return done(null, newUser);
                } catch (err) {
                    console.error(logMessages.googleStrategyError, err);
                    
                    done(err, null);
                }
            }
        )
    );
};

module.exports = configurePassport;
