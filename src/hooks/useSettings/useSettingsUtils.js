import { defaultScoreOption } from "utils/consts";
import { getInputScoreCategories } from "utils/reactUtils";

const generateDefaultSettings = () => {
    const scoreCategories = getInputScoreCategories();
    const defaultSettings = scoreCategories.map(category => ({
        id: category,
        score: defaultScoreOption
    }));

    return defaultSettings;
};

export {
    generateDefaultSettings
};