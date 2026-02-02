const errorMessages = {
    unauthorized: 'Unauthorized',
    userNotFound: 'User not found',
    fetchFailed: 'Failed to fetch user data',
    saveFailed: 'Failed to save user data',
    invalidInputType: 'Invalid input type',
    invalidApartmentsStructure: 'Invalid apartments data structure',
    invalidSettingsStructure: 'Invalid settings data structure'
};

const successMessages = {
    dataFetched: 'User data fetched successfully',
    dataSaved: 'User data saved successfully'
};

const defaultValues = {
    apartments: [],
    settings: {
        score: {},
        note: {}
    }
};

module.exports = {
    errorMessages,
    successMessages,
    defaultValues
};
