const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const { formatResponseData } = require('../../utils/utils');
const { errorMessages, successMessages } = require('./userConsts');
const { buildUpdateData, buildUserData } = require('./userUtils');

// Middleware to ensure user is authenticated before accessing routes
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }

    return res.status(401).json(formatResponseData(null, new Error(errorMessages.unauthorized)));
};

// GET /api/user/data - Fetch user's apartments and settings
router.get('/data', isAuthenticated, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        
        if (!user) {
            return res.status(404).json(formatResponseData(null, new Error(errorMessages.userNotFound)));
        }

        const userData = buildUserData(user);

        res.json(formatResponseData({
            message: successMessages.dataFetched,
            ...userData
        }, null));
    } catch (err) {
        console.error('Error fetching user data:', err);

        res.status(500).json(formatResponseData(null, new Error(errorMessages.fetchFailed)));
    }
});

// PUT /api/user/data - Update user's apartments and settings
router.put('/data', isAuthenticated, async (req, res) => {
    try {
        const { apartments, settings } = req.body;
        
        // Validate and sanitize input - buildUpdateData now throws on invalid structure
        let userUpdateData;
        try {
            userUpdateData = buildUpdateData(apartments, settings);
        } catch (validationError) {
            return res.status(400).json(formatResponseData(null, validationError));
        }
        
        const findByIdAndUpdateOptions = { new: true, runValidators: true };

        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            { $set: userUpdateData },
            findByIdAndUpdateOptions
        );

        if (!updatedUser) {
            return res.status(404).json(formatResponseData(null, new Error(errorMessages.userNotFound)));
        }

        const updatedUserData = buildUserData(updatedUser);

        res.json(formatResponseData({
            message: successMessages.dataSaved,
            ...updatedUserData
        }, null));
    } catch (err) {
        console.error('Error updating user data:', err);

        res.status(500).json(formatResponseData(null, new Error(errorMessages.saveFailed)));
    }
});

module.exports = router;
