import { defaultScoreOption } from "utils/consts";
import { buildCategoryNoteId, getInputScoreCategories } from "utils/reactUtils";
import { getStateFromLocalStorage } from "utils/helpers";
import { localStorageKeys } from "utils/consts";

const generateDefaultScoreSettings = () => {
    const scoreCategories = getInputScoreCategories();
    const defaultScoreSettings = scoreCategories.map(category => ({
        id: category,
        score: defaultScoreOption
    }));

    return defaultScoreSettings;
};

const generateDefaultNoteSettings = () => {
    const scoreCategories = getInputScoreCategories();
    const defaultNoteSettings = scoreCategories.map(category => ({
        id: buildCategoryNoteId(category),
        notes: ''
    }));

    return defaultNoteSettings;
}

const getInitialScoreSettings = () => {
    const storedScoreSettings = getStateFromLocalStorage(localStorageKeys.scoreSettings);
    const initialScoreSettings = storedScoreSettings.length ? storedScoreSettings : generateDefaultScoreSettings();
    
    return initialScoreSettings;
};

const getInitialNoteSettings = () => {
    const storedNoteSettings = getStateFromLocalStorage(localStorageKeys.noteSettings);
    const initialNoteSettings = storedNoteSettings.length ? storedNoteSettings : generateDefaultNoteSettings();
    
    return initialNoteSettings;
};

export {
    generateDefaultScoreSettings,
    generateDefaultNoteSettings,
    getInitialScoreSettings,
    getInitialNoteSettings
};