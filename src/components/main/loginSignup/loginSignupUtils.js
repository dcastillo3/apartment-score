const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);

    return isValid;
};

const validatePassword = (password) => {
    if (password.length < 8) {
        return false;
    }

    if (!/[A-Z]/.test(password)) {
        return false;
    }

    if (!/[a-z]/.test(password)) {
        return false;
    }

    if (!/\d/.test(password)) {
        return false;
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        return false;
    }

    return true;
};

const validateLoginForm = (email, errorMessages) => {
    switch (true) {
        case !email:
            return { valid: false, error: errorMessages.missingFields };
        case !validateEmail(email):
            return { valid: false, error: errorMessages.invalidEmail };
        default:
            return { valid: true, error: null };
    }
};

const validateSignupForm = (email, password, errorMessages) => {
    switch (true) {
        case !email || !password:
            return { valid: false, error: errorMessages.missingFields };
        case !validateEmail(email):
            return { valid: false, error: errorMessages.invalidEmail };
        case !validatePassword(password):
            return { valid: false, error: errorMessages.weakPassword };
        default:
            return { valid: true, error: null };
    }
};

module.exports = {
    validateEmail,
    validatePassword,
    validateLoginForm,
    validateSignupForm
};
