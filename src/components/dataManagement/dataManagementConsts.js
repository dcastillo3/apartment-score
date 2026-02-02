const dataManagementHeading = 'Your Data Management';
const exportButtonLabel = 'Export Data';
const importButtonLabel = 'Import Data';
const importingButtonLabel = 'Importing...';
const importErrorMessage = 'Failed to import data:';
const fileInputType = 'file';
const jsonFileAccept = '.json';
const exportFileNamePrefix = 'apartment-score-data';
const jsonMimeType = 'application/json';
const jsonStringifySpace = 2;
const fileReaderErrorMessage = 'Failed to read file';
const anchorElementType = 'a';
const successExportMessage = 'Data exported successfully!';
const successImportMessage = 'Data imported successfully!';
const errorImportMessage = 'Failed to import data. Please check the file and try again.';

// Validation error messages
const validationErrors = {
    invalidStructure: 'Invalid data structure. File must contain apartments, scoreSettings, and noteSettings.',
    invalidApartments: 'Invalid apartments data. Must be an array.',
    invalidScoreSettings: 'Invalid score settings. Must be an array of objects with id and score.',
    invalidNoteSettings: 'Invalid note settings. Must be an array of objects with id and notes.',
    apartmentMissingFields: 'Apartment is missing required fields (id, address, etc).',
    invalidScoreValue: 'Score values must be numbers between 0 and 5.',
    fileTooLarge: 'File size exceeds maximum allowed (5MB).',
    tooManyApartments: 'Too many apartments (maximum 1000).'
};

// Validation limits
const validationLimits = {
    maxFileSize: 5 * 1024 * 1024, // 5MB
    maxApartments: 1000,
    maxStringLength: 1000,
    minScore: 0,
    maxScore: 5
};

export {
    dataManagementHeading,
    exportButtonLabel,
    importButtonLabel,
    importingButtonLabel,
    importErrorMessage,
    fileInputType,
    jsonFileAccept,
    exportFileNamePrefix,
    jsonMimeType,
    jsonStringifySpace,
    fileReaderErrorMessage,
    anchorElementType,
    successExportMessage,
    successImportMessage,
    errorImportMessage,
    validationErrors,
    validationLimits
};
