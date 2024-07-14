import { buildSettingsScoreCategoryInputs } from "./settingUtils";

const categoryScoreInputs = buildSettingsScoreCategoryInputs(); 

const updatePriorityRatingsForm = {
    title: 'Your Priority Ratings',
    buttonName: 'Save',
    fieldsPerRow: 2,
    inputs: [
        ...categoryScoreInputs
    ]
};

export {
    updatePriorityRatingsForm
};