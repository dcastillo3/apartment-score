const _ = require('lodash');
const { defaultValues } = require('./userConsts');

// Validate input types to prevent NoSQL injection
const validateInputTypes = (value) => {
    if (_.isNil(value)) {
        return true; // Allow null/undefined
    }
    
    // Check if it's a plain object or array (valid for our data structure)
    if (_.isObject(value)) {
        return true;
    }
    
    // Reject non-object types when object is expected
    return false;
};

// Sanitize string to prevent injection
const sanitizeString = (str) => {
    if (!_.isString(str)) return str;
    
    let sanitized = _.trim(str);
    sanitized = sanitized.replace(/<script[^>]*>.*?<\/script>/gi, '');
    sanitized = sanitized.replace(/<[^>]*>/g, '');
    
    // Truncate to 5000 characters
    if (sanitized.length > 5000) {
        sanitized = sanitized.slice(0, 5000);
    }
    
    return sanitized;
};

// Recursively sanitize all strings in an object or array
const sanitizeData = (data) => {
    if (_.isString(data)) {
        return sanitizeString(data);
    }
    
    if (_.isArray(data)) {
        return _.map(data, item => sanitizeData(item));
    }
    
    // Use _.isObject to catch objects (including those with modified prototypes)
    // but exclude arrays, functions, etc.
    if (_.isObject(data) && !_.isFunction(data) && !_.isRegExp(data) && !_.isDate(data)) {
        // Remove dangerous keys and recursively sanitize values
        const sanitized = _.omit(data, ['__proto__', 'constructor', 'prototype']);
        return _.mapValues(sanitized, value => sanitizeData(value));
    }
    
    return data;
};

// Validate apartments structure
const validateApartments = (apartments) => {
    if (!_.isArray(apartments)) {
        return false;
    }
    
    // Basic structure check - each apartment should have required fields
    return _.every(apartments, apt => {
        return _.isPlainObject(apt) && apt.id && apt.address;
    });
};

// Validate settings structure
const validateSettings = (settings) => {
    if (!_.isPlainObject(settings)) {
        return false;
    }
    
    // Settings can have score and note properties
    // score and note should be arrays of objects OR empty objects (for new users)
    if (!_.isUndefined(settings.score)) {
        // Allow arrays (actual data) or objects (could be empty {})
        if (_.isArray(settings.score)) {
            // Valid array of score settings
            const validScoreItems = _.every(settings.score, item => {
                return _.isPlainObject(item) && item.id && _.isNumber(item.score);
            });
            if (!validScoreItems) return false;
        } else if (!_.isPlainObject(settings.score)) {
            return false;
        }
        // Empty object {} is valid for new users
    }
    
    if (!_.isUndefined(settings.note)) {
        // Allow arrays (actual data) or objects (could be empty {})
        if (_.isArray(settings.note)) {
            // Valid array of note settings
            const validNoteItems = _.every(settings.note, item => {
                return _.isPlainObject(item) && item.id;
            });
            if (!validNoteItems) return false;
        } else if (!_.isPlainObject(settings.note)) {
            return false;
        }
        // Empty object {} is valid for new users
    }
    
    return true;
};

const buildUpdateData = (apartments, settings) => {
    const updateData = {};
    
    if (!_.isUndefined(apartments)) {
        if (!validateApartments(apartments)) {
            throw new Error('Invalid apartments data structure');
        }
        updateData.apartments = sanitizeData(apartments);
    }
    
    if (!_.isUndefined(settings)) {
        if (!validateSettings(settings)) {
            throw new Error('Invalid settings data structure');
        }
        updateData.settings = sanitizeData(settings);
    }

    return updateData;
};

const buildUserData = (user) => {
    return {
        apartments: user.apartments || defaultValues.apartments,
        settings: user.settings || defaultValues.settings
    };
};

module.exports = {
    buildUpdateData,
    buildUserData,
    validateInputTypes,
    validateApartments,
    validateSettings,
    sanitizeData
};
