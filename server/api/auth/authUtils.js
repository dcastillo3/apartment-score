const bcrypt = require('bcrypt');
const { passwordRequirements } = require('./authConsts');

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

// Sanitize string input to prevent injection attacks
const sanitizeString = (str) => {
    if (typeof str !== 'string') {
        return '';
    }
    
    // Remove dangerous characters and HTML tags
    return str.trim()
              .replace(/<script[^>]*>.*?<\/script>/gi, '')
              .replace(/<[^>]*>/g, '')
              .slice(0, 500); // Limit length
};

// Validate input types to prevent NoSQL injection
const validateInputTypes = (inputs) => {
    for (const [key, value] of Object.entries(inputs)) {
        if (value !== null && value !== undefined && typeof value === 'object' && !Array.isArray(value)) {
            return false; // Reject objects (potential NoSQL injection)
        }
        if (Array.isArray(value)) {
            return false; // Reject arrays
        }
    }
    return true;
};

const validateEmail = (email) => {
    // More strict email validation - reject special characters that could be used in attacks
    if (typeof email !== 'string') {
        return false;
    }
    
    // Check for dangerous characters
    const dangerousChars = /[<>'"`\\;(){}\[\]]/;
    if (dangerousChars.test(email)) {
        return false;
    }
    
    // Standard email format validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValid = emailRegex.test(email);

    return isValid;
};

const validatePassword = (password) => {
    if (typeof password !== 'string') {
        return false;
    }
    
    if (password.length < passwordRequirements.minLength) {
        return false;
    }

    if (passwordRequirements.requireUppercase && !/[A-Z]/.test(password)) {
        return false;
    }

    if (passwordRequirements.requireLowercase && !/[a-z]/.test(password)) {
        return false;
    }

    if (passwordRequirements.requireNumber && !/\d/.test(password)) {
        return false;
    }

    if (passwordRequirements.requireSpecial && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        return false;
    }

    return true;
};

const hashPassword = async (password) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    return hashedPassword;
};

const comparePassword = async (password, hashedPassword) => {
    const isMatch = await bcrypt.compare(password, hashedPassword);

    return isMatch;
};

module.exports = {
    buildUserData,
    validateEmail,
    validatePassword,
    hashPassword,
    comparePassword,
    sanitizeString,
    validateInputTypes
};
