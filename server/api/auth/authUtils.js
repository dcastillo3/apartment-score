const buildUserData = (user) => {
    const userData = {
        id: user._id,
        email: user.email,
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        settings: user.settings,
        apartments: user.apartments
    };

    return userData;
};

module.exports = {
    buildUserData
};
