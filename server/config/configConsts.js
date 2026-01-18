const exitCodes = {
    failure: 1
};

const logMessages = {
    mongoConnected: 'MongoDB Connected:',
    mongoError: 'Error connecting to MongoDB:',
    googleStrategyError: 'Error in Google Strategy:'
};

const defaultUserValues = {
    firstName: '',
    lastName: '',
    settings: {
        score: {},
        note: {}
    },
    apartments: []
};

module.exports = {
    exitCodes,
    logMessages,
    defaultUserValues
};
