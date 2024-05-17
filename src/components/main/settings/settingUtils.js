import { buildCategoryLabel } from "utils/reactUtils";
import { categories, defaultScoreOption, nonInputCategories, scoreOptions } from "../../../utils/consts";

const buildSettingsScoreCategoryInputs = () => {
    const filteredScoreCategories = categories.scoreCategories.filter(
        category => !nonInputCategories.includes(category));
    const scoreCategoryInputs = filteredScoreCategories.map(category => {
        const categoryInput = {
            id: category,
            labelName: buildCategoryLabel(category),
            inputType: 'select',
            defaultValue: defaultScoreOption,
            options: scoreOptions,
            additionalProps: {},
            validations: {},
            fullRow: false
        };

        return categoryInput;
    });

    return scoreCategoryInputs;
};

const fillUpdateSettingsForm = (settings, updateSettingsForm) => {
    const filledInputs = updateSettingsForm?.inputs?.map(formField => {
        const filledInput = settings.find(setting => setting.id === formField.id);

        return {
            ...formField,
            defaultValue: filledInput?.score
        };
    });

    const filledUpdateSettingsForm = {
        ...updateSettingsForm,
        inputs: filledInputs
    };

    return filledUpdateSettingsForm;
};

// Format all settingsData values as numbers. Format as array of objects with key and value.
const formatSettingsData = settingsData => {
    const settingsDataEntries = Object.entries(settingsData);
    const formattedSettingsData = settingsDataEntries.map(([id, score]) => {
        const formattedScore = parseInt(score);

        return {
            id,
            score: formattedScore
        };
    });

    return formattedSettingsData;
};

export {
    buildSettingsScoreCategoryInputs,
    fillUpdateSettingsForm,
    formatSettingsData
};