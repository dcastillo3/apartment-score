import { buildCategoryLabel } from "utils/reactUtils";
import { categories, defaultScoreOption, excludedInputCategories, scoreRange } from "../../../utils/consts";
import { buildSelectOptionsFromRange } from "components/common/form/formUtils";

const buildSettingsScoreCategoryInputs = () => {
    const filteredScoreCategories = categories.scoreCategories.filter(
        category => !excludedInputCategories.includes(category));
    const scoreCategoryInputs = filteredScoreCategories.map(category => {
        const categoryInput = {
            id: category,
            labelName: buildCategoryLabel(category),
            inputType: 'select',
            defaultValue: defaultScoreOption,
            options: buildSelectOptionsFromRange(scoreRange),
            additionalProps: {},
            validations: {},
            fullRow: false
        };

        return categoryInput;
    });

    return scoreCategoryInputs;
};

const fillUpdateSettingsForm = (settings, updatePriorityRatingsForm) => {
    const filledInputs = updatePriorityRatingsForm?.inputs?.map(formField => {
        const filledInput = settings.find(setting => setting.id === formField.id);

        return {
            ...formField,
            defaultValue: filledInput?.score
        };
    });

    const filledUpdateSettingsForm = {
        ...updatePriorityRatingsForm,
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