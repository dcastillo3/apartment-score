const { defaultUserValues } = require('./configConsts');

const buildNewUserFromProfile = (profile) => {
    const { id, emails, name } = profile;
    const newUser = {
        googleId: id,
        email: emails[0].value,
        firstName: name?.givenName || defaultUserValues.firstName,
        lastName: name?.familyName || defaultUserValues.lastName,
        settings: defaultUserValues.settings,
        apartments: defaultUserValues.apartments
    };

    return newUser;
};

module.exports = {
    buildNewUserFromProfile
};
