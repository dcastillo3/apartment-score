const { defaultValues } = require('./userConsts');

const buildUpdateData = (apartments, settings) => {
    const updateData = {};
    
    if (apartments !== undefined) updateData.apartments = apartments;
    if (settings !== undefined) updateData.settings = settings;

    return updateData;
};

const buildUserData = (user) => {
    const userData = {
        apartments: user.apartments || defaultValues.apartments,
        settings: user.settings || defaultValues.settings
    };

    return userData;
};

module.exports = {
    buildUpdateData,
    buildUserData
};
