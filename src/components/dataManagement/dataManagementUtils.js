import _ from 'lodash';
import { exportFileNamePrefix, jsonMimeType, jsonStringifySpace, fileReaderErrorMessage, anchorElementType, validationErrors, validationLimits } from './dataManagementConsts';
import { categories } from '../../utils/consts';

// Sanitize string to prevent injection attacks
const sanitizeString = (str) => {
    if (!_.isString(str)) return '';
    
    // Trim and limit length
    let sanitized = _.trim(str);
    if (sanitized.length > validationLimits.maxStringLength) {
        sanitized = sanitized.slice(0, validationLimits.maxStringLength);
    }
    
    // Remove any potential script tags or dangerous characters
    sanitized = sanitized.replace(/<script[^>]*>.*?<\/script>/gi, '');
    sanitized = sanitized.replace(/<[^>]*>/g, '');
    
    return sanitized;
};

// Validate apartment object structure
const validateApartment = (apartment) => {
    if (!_.isPlainObject(apartment)) {
        throw new Error(validationErrors.apartmentMissingFields);
    }
    
    // Check required fields exist and are not null/undefined
    const requiredFields = ['id', 'address'];
    const hasAllRequired = _.every(requiredFields, field => {
        return !_.isNil(apartment[field]) && apartment[field] !== '';
    });
    
    if (!hasAllRequired) {
        throw new Error(validationErrors.apartmentMissingFields);
    }
    
    // Validate score categories (walk, amenity, community, etc.)
    const scoreCategories = categories.scoreCategories;
    _.forEach(scoreCategories, category => {
        if (_.isPlainObject(apartment[category])) {
            const { score } = apartment[category];
            if (_.isNumber(score) && !_.inRange(score, validationLimits.minScore, validationLimits.maxScore + 1)) {
                throw new Error(validationErrors.invalidScoreValue);
            }
        }
    });
    
    // Sanitize string fields
    const sanitized = { ...apartment };
    const stringFields = ['address', 'link', 'imageLink'];
    _.forEach(stringFields, field => {
        if (sanitized[field]) {
            sanitized[field] = sanitizeString(sanitized[field]);
        }
    });
    
    return sanitized;
};

// Validate score settings array
const validateScoreSettings = (scoreSettings) => {
    if (!_.isArray(scoreSettings)) {
        throw new Error(validationErrors.invalidScoreSettings);
    }
    
    return _.map(scoreSettings, setting => {
        if (!_.isPlainObject(setting) || _.isNil(setting.id) || setting.id === '' || !_.isNumber(setting.score)) {
            throw new Error(validationErrors.invalidScoreSettings);
        }
        
        if (!_.inRange(setting.score, validationLimits.minScore, validationLimits.maxScore + 1)) {
            throw new Error(validationErrors.invalidScoreValue);
        }
        
        return {
            id: sanitizeString(setting.id),
            score: setting.score
        };
    });
};

// Validate note settings array
const validateNoteSettings = (noteSettings) => {
    if (!_.isArray(noteSettings)) {
        throw new Error(validationErrors.invalidNoteSettings);
    }
    
    return _.map(noteSettings, setting => {
        if (!_.isPlainObject(setting) || _.isNil(setting.id) || setting.id === '') {
            throw new Error(validationErrors.invalidNoteSettings);
        }
        
        return {
            id: sanitizeString(setting.id),
            notes: sanitizeString(setting.notes || '')
        };
    });
};

// Validate entire imported data structure
const validateImportedData = (data) => {
    if (!_.isPlainObject(data)) {
        throw new Error(validationErrors.invalidStructure);
    }
    
    const { apartments, scoreSettings, noteSettings } = data;
    
    // Check all required properties exist
    if (_.isNil(apartments) || _.isNil(scoreSettings) || _.isNil(noteSettings)) {
        throw new Error(validationErrors.invalidStructure);
    }
    
    // Validate apartments array
    if (!_.isArray(apartments)) {
        throw new Error(validationErrors.invalidApartments);
    }
    
    if (apartments.length > validationLimits.maxApartments) {
        throw new Error(validationErrors.tooManyApartments);
    }
    
    // Validate and sanitize each apartment
    const validatedApartments = _.map(apartments, validateApartment);
    
    // Validate and sanitize settings
    const validatedScoreSettings = validateScoreSettings(scoreSettings);
    const validatedNoteSettings = validateNoteSettings(noteSettings);
    
    return {
        apartments: validatedApartments,
        scoreSettings: validatedScoreSettings,
        noteSettings: validatedNoteSettings
    };
};

const bundleData = (apartments, scoreSettings, noteSettings) => {
    const bundledData = {
        apartments,
        scoreSettings,
        noteSettings,
        exportDate: new Date().toISOString()
    };

    return bundledData;
};

const generateExportFileName = () => {
    const date = new Date();
    const timestamp = date.toISOString().split('T')[0];

    return `${exportFileNamePrefix}-${timestamp}.json`;
};

const exportData = (apartments, scoreSettings, noteSettings) => {
    const bundledData = bundleData(apartments, scoreSettings, noteSettings);
    const dataStr = JSON.stringify(bundledData, null, jsonStringifySpace);
    const dataBlob = new Blob([dataStr], { type: jsonMimeType });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement(anchorElementType);
    link.href = url;
    link.download = generateExportFileName();
    link.click();
    
    URL.revokeObjectURL(url);
};

const importData = (file, handleImportApartments, handleUpdateSettings) => {
    return new Promise((resolve, reject) => {
        // Check file size
        if (file.size > validationLimits.maxFileSize) {
            reject(new Error(validationErrors.fileTooLarge));
            return;
        }
        
        const reader = new FileReader();
        
        reader.onload = async (event) => {
            try {
                const importedData = JSON.parse(event.target.result);
                
                // Validate and sanitize imported data
                const validatedData = validateImportedData(importedData);
                const { apartments, scoreSettings, noteSettings } = validatedData;
                
                // Import validated data
                await handleUpdateSettings(scoreSettings, noteSettings);
                await handleImportApartments(apartments);
                
                resolve();
            } catch (error) {
                reject(error);
            }
        };
        
        reader.onerror = () => {
            reject(new Error(fileReaderErrorMessage));
        };
        
        reader.readAsText(file);
    });
};

export {
    exportData,
    importData
};
