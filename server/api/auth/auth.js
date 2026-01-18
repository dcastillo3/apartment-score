const router = require('express').Router();
const passport = require('passport');
const { formatResponseData } = require('../../utils/utils');
const { errorMessages, successMessages, redirectPaths, oauthScopes, oauthProviders, cookieNames } = require('./authConsts');
const { buildUserData } = require('./authUtils');

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

module.exports = router;
