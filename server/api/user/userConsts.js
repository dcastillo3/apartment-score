const errorMessages = {
    unauthorized: 'Unauthorized',
    userNotFound: 'User not found',
    fetchFailed: 'Failed to fetch user data',
    saveFailed: 'Failed to save user data'
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
