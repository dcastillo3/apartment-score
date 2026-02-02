const errorMessages = {
    notAuthenticated: 'Not authenticated',
    authenticationError: 'Authentication error',
    logoutError: 'Logout error',
    invalidCredentials: 'Invalid email or password',
    userAlreadyExists: 'User already exists with this email',
    userNameTaken: 'This username is already taken',
    missingFields: 'Missing required fields',
    invalidEmail: 'Invalid email format',
    weakPassword: 'Password must be at least 8 characters with uppercase, lowercase, number, and special character'
};

const successMessages = {
    logoutSuccess: 'Logout successful',
    signupSuccess: 'Account created successfully',
    loginSuccess: 'Login successful'
};

const passwordRequirements = {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumber: true,
    requireSpecial: true
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
    cookieNames,
    passwordRequirements
};
