import { defaultScoreOption } from "utils/consts";
import { buildCategoryNoteId, getInputScoreCategories } from "utils/reactUtils";

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

export {
    generateDefaultScoreSettings,
    generateDefaultNoteSettings
};