import { exportFileNamePrefix, jsonMimeType, jsonStringifySpace, fileReaderErrorMessage, anchorElementType } from './dataManagementConsts';

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

const importData = (file, handleImportApartments, handleUpdateScoreSettings, handleUpdateNoteSettings) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = (event) => {
            try {
                const importedData = JSON.parse(event.target.result);
                const { apartments, scoreSettings, noteSettings } = importedData;
                
                if (scoreSettings) {
                    handleUpdateScoreSettings(scoreSettings);
                }
                
                if (noteSettings) {
                    handleUpdateNoteSettings(noteSettings);
                }
                
                if (apartments) {
                    handleImportApartments(apartments);
                }
                
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
