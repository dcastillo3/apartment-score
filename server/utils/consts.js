const logMessages = {
    serverRunning: 'Server is running in development on port:',
    serverExported: 'Server is being exported for Netlify serverless function'
};

const errorMessages = {
    notFound: 'Not Found'
};

const environments = {
    development: 'development',
    production: 'production'
};

const logLevels = {
    dev: 'dev'
};

const cookieSettings = {
    sameSite: {
        lax: 'lax',
        strict: 'strict',
        none: 'none'
    }
};

module.exports = {
    logMessages,
    errorMessages,
    environments,
    logLevels,
    cookieSettings
};
