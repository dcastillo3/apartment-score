const errorMessages = {
    notAuthenticated: 'Not authenticated',
    authenticationError: 'Authentication error',
    logoutError: 'Logout error'
};

const successMessages = {
    logoutSuccess: 'Logout successful'
};

const redirectPaths = {
    authFailure: '/login?error=auth_failed'
};

const oauthScopes = ['profile', 'email'];

const oauthProviders = {
    google: 'google'
};

const cookieNames = {
    session: 'connect.sid'
};

module.exports = {
    errorMessages,
    successMessages,
    redirectPaths,
    oauthScopes,
    oauthProviders,
    cookieNames
};
