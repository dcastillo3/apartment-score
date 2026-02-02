const tabOptions = {
    login: 'Login',
    signup: 'Sign Up'
};

const tabs = [
    { id: 1, name: tabOptions.login },
    { id: 2, name: tabOptions.signup }
];

const formLabels = {
    email: 'Email',
    password: 'Password',
    firstName: 'First Name',
    lastName: 'Last Name',
    userName: 'Username'
};

const buttonLabels = {
    login: 'Login',
    signup: 'Sign Up',
    googleLogin: 'Continue with Google'
};

const headingLabels = {
    login: 'Login to Your Account',
    signup: 'Create Your Account'
};

const errorMessages = {
    missingFields: 'Please fill in all required fields',
    invalidEmail: 'Please enter a valid email address',
    weakPassword: 'Password must be at least 8 characters with uppercase, lowercase, number, and special character',
    loginFailed: 'Invalid email or password',
    signupFailed: 'Failed to create account',
    userExists: 'An account with this email already exists'
};

const successMessages = {
    signupSuccess: 'Account created successfully!',
    loginSuccess: 'Welcome back!'
};

const placeholders = {
    email: 'Enter your email',
    password: 'Enter your password',
    firstName: 'Enter your first name',
    lastName: 'Enter your last name',
    userName: 'Enter a username'
};

const tabItemProp = 'name';

const toggleText = {
    noAccount: 'Don\'t have an account?',
    haveAccount: 'Already have an account?',
    signupButton: 'Sign Up',
    loginButton: 'Login'
};

module.exports = {
    tabOptions,
    tabs,
    formLabels,
    buttonLabels,
    headingLabels,
    errorMessages,
    successMessages,
    placeholders,
    tabItemProp,
    toggleText
};
