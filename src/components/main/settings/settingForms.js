import { buildSettingsScoreCategoryInputs } from "./settingUtils";

const categoryScoreInputs = buildSettingsScoreCategoryInputs(); 

const updateSettingsForm = {
    title: 'Update Your Settings',
    buttonName: 'Update Settings',
    fieldsPerRow: 2,
    inputs: [
        ...categoryScoreInputs
    ]
};

export {
    updateSettingsForm
};