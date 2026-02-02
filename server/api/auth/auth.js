const router = require('express').Router();
const passport = require('passport');
const User = require('../../models/User');
const { formatResponseData } = require('../../utils/utils');
const { errorMessages, successMessages, redirectPaths, oauthScopes, oauthProviders, cookieNames } = require('./authConsts');
const { buildUserData, validateEmail, validatePassword, hashPassword, comparePassword, sanitizeString, validateInputTypes } = require('./authUtils');

// @route   GET api/auth/google
// @desc    Initiate Google OAuth
// @access  Public
router.get('/google', passport.authenticate(oauthProviders.google, {
    scope: oauthScopes
}));

// @route   GET api/auth/google/callback
// @desc    Google OAuth callback
// @access  Public
router.get('/google/callback',
    passport.authenticate(oauthProviders.google, {
        failureRedirect: redirectPaths.authFailure,
        successRedirect: process.env.CLIENT_URL || '/'
    })
);

// @route   GET api/auth/current
// @desc    Get current authenticated user
// @access  Private
router.get('/current', (req, res) => {
    try {
        if (!req.user) {
            const responseData = formatResponseData(null, new Error(errorMessages.notAuthenticated));

            return res.status(401).send(responseData);
        }

        const userData = buildUserData(req.user);
        const responseData = formatResponseData(userData, null);
        
        res.send(responseData);
    } catch (err) {
        const responseData = formatResponseData(null, err);
        
        res.status(500).send(responseData);

        console.error(err);
    }
});

// @route   POST api/auth/logout
// @desc    Logout user
// @access  Private
router.post('/logout', (req, res) => {
    try {
        req.logout((err) => {
            if (err) {
                const responseData = formatResponseData(null, err);

                return res.status(500).send(responseData);
            }

            req.session.destroy((err) => {
                if (err) {
                    const responseData = formatResponseData(null, err);

                    return res.status(500).send(responseData);
                }

                res.clearCookie(cookieNames.session);
                
                const responseData = formatResponseData({ message: successMessages.logoutSuccess }, null);

                res.send(responseData);
            });
        });
    } catch (err) {
        const responseData = formatResponseData(null, err);
        
        res.status(500).send(responseData);

        console.error(err);
    }
});

// @route   POST api/auth/signup
// @desc    Create new user account with email/password
// @access  Public
router.post('/signup', async (req, res) => {
    try {
        const { email, password, firstName, lastName, userName } = req.body;

        // Validate input types to prevent NoSQL injection
        if (!validateInputTypes({ email, password, firstName, lastName, userName })) {
            const responseData = formatResponseData(null, new Error('Invalid input types'));

            return res.status(400).send(responseData);
        }

        if (!email || !password || !userName) {
            const responseData = formatResponseData(null, new Error(errorMessages.missingFields));

            return res.status(400).send(responseData);
        }

        if (!validateEmail(email)) {
            const responseData = formatResponseData(null, new Error(errorMessages.invalidEmail));

            return res.status(400).send(responseData);
        }

        if (!validatePassword(password)) {
            const responseData = formatResponseData(null, new Error(errorMessages.weakPassword));

            return res.status(400).send(responseData);
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            const responseData = formatResponseData(null, new Error(errorMessages.userAlreadyExists));

            return res.status(409).send(responseData);
        }

        const existingUserName = await User.findOne({ userName });

        if (existingUserName) {
            const responseData = formatResponseData(null, new Error(errorMessages.userNameTaken));

            return res.status(409).send(responseData);
        }

        const hashedPassword = await hashPassword(password);
        
        // Sanitize string inputs
        const newUser = new User({
            email: email.toLowerCase().trim(),
            password: hashedPassword,
            firstName: sanitizeString(firstName || ''),
            lastName: sanitizeString(lastName || ''),
            userName: sanitizeString(userName),
            settings: { score: {}, note: {} },
            apartments: []
        });

        await newUser.save();

        req.login(newUser, (err) => {
            if (err) {
                const responseData = formatResponseData(null, err);

                return res.status(500).send(responseData);
            }

            const userData = buildUserData(newUser);
            const responseData = formatResponseData({
                message: successMessages.signupSuccess,
                user: userData
            }, null);

            res.status(201).send(responseData);
        });
    } catch (err) {
        const responseData = formatResponseData(null, err);
        
        res.status(500).send(responseData);
        
        console.error(err);
    }
});

// @route   POST api/auth/login
// @desc    Login with email/password
// @access  Public
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input types to prevent NoSQL injection
        if (!validateInputTypes({ email, password })) {
            const responseData = formatResponseData(null, new Error('Invalid input types'));

            return res.status(400).send(responseData);
        }

        if (!email || !password) {
            const responseData = formatResponseData(null, new Error(errorMessages.missingFields));

            return res.status(400).send(responseData);
        }

        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            const responseData = formatResponseData(null, new Error(errorMessages.invalidCredentials));

            return res.status(401).send(responseData);
        }

        if (!user.password) {
            const responseData = formatResponseData(null, new Error(errorMessages.invalidCredentials));

            return res.status(401).send(responseData);
        }

        const isPasswordValid = await comparePassword(password, user.password);

        if (!isPasswordValid) {
            const responseData = formatResponseData(null, new Error(errorMessages.invalidCredentials));

            return res.status(401).send(responseData);
        }

        req.login(user, (err) => {
            if (err) {
                const responseData = formatResponseData(null, err);

                return res.status(500).send(responseData);
            }

            const userData = buildUserData(user);
            const responseData = formatResponseData({
                message: successMessages.loginSuccess,
                user: userData
            }, null);

            res.send(responseData);
        });
    } catch (err) {
        const responseData = formatResponseData(null, err);
        
        res.status(500).send(responseData);
        
        console.error(err);
    }
});

module.exports = router;

