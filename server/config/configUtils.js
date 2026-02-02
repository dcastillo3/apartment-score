const { defaultUserValues } = require('./configConsts');
const User = require('../models/User');

// Generate username from email (e.g., john.doe@gmail.com -> johndoe)
const generateUsernameFromEmail = (email) => {
    const username = email.split('@')[0].replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    return username;
};

// Ensure username is unique by adding a number suffix if needed
const ensureUniqueUsername = async (baseUsername) => {
    let username = baseUsername;
    let counter = 1;
    
    while (await User.findOne({ userName: username })) {
        username = `${baseUsername}${counter}`;
        counter++;
    }
    
    return username;
};

const buildNewUserFromProfile = async (profile) => {
    const { id, emails, name } = profile;
    
    // Generate unique username from email
    const baseUsername = generateUsernameFromEmail(emails[0].value);
    const uniqueUsername = await ensureUniqueUsername(baseUsername);
    
    // TODO: Implement profile completion flow to allow users to customize their username,
    // firstName, and lastName after Google OAuth signup
    
    const newUser = {
        googleId: id,
        email: emails[0].value,
        userName: uniqueUsername,
        firstName: name?.givenName || defaultUserValues.firstName,
        lastName: name?.familyName || defaultUserValues.lastName,
        settings: defaultUserValues.settings,
        apartments: defaultUserValues.apartments
    };

    return newUser;
};

module.exports = {
    buildNewUserFromProfile,
    generateUsernameFromEmail,
    ensureUniqueUsername
};
