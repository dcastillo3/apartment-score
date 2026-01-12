import { buildCategoryLabel, buildCategoryNoteId } from "utils/reactUtils";
import { categories, defaultScoreOption, excludedInputCategories, scoreRange } from "../../../utils/consts";
import { buildSelectOptionsFromRange } from "components/common/form/formUtils";

const buildSettingsScoreCategoryInputs = () => {
    const filteredScoreCategories = categories.scoreCategories.filter(
        category => !excludedInputCategories.includes(category));
    const scoreCategoryInputs = filteredScoreCategories.map(category => {
        const categoryGroup = `${category}Group`;
        const categoryNotes = buildCategoryNoteId(category);
        const categoryGroupInput = {
            id: categoryGroup,
            inputType: 'group',
            fullRow: false,
            inputs: [
                {
                    id: category,
                    labelName: buildCategoryLabel(category),
                    inputType: 'select',
                    defaultValue: defaultScoreOption,
                    options: buildSelectOptionsFromRange(scoreRange),
                    tooltip: '',
                    additionalProps: {},
                    validations: {},
                    fullRow: false
                },
                {
                    id: categoryNotes,
                    labelName: 'notes',
                    inputType: 'textarea',
                    defaultValue: '',
                    tooltip: '',
                    additionalProps: {
                        maxLength: 150
                    },
                    validations: {},
                    fullRow: false
                }
            ]
        };

        return categoryGroupInput;
    });

    return scoreCategoryInputs;
};

const fillUpdatePriorityRatingsForm = (scoreSettings, noteSettings, updatePriorityRatingsForm) => {
    const filledGroupInputs = updatePriorityRatingsForm?.inputs?.map(groupFields => { 
        const filledInputs = groupFields.inputs.map(formField => {
            const scoreSetting = scoreSettings.find(scoreSetting => scoreSetting.id === formField.id);
            const noteSetting = noteSettings.find(noteSetting => noteSetting.id === formField.id);
            const newFormField = { ...formField };

            // Fill in default value with saved user score
            if(!_.isEmpty(scoreSetting)) newFormField.defaultValue = scoreSetting.score;

            // Fill in default value with saved user note
            if(!_.isEmpty(noteSetting)) newFormField.defaultValue = noteSetting.notes;

            return newFormField;
        });
        const newGroupFields = { 
            ...groupFields,
            inputs: filledInputs
        };

        return newGroupFields;
    });
    const filledUpdateSettingsForm = {
        ...updatePriorityRatingsForm,
        inputs: filledGroupInputs
    };

    return filledUpdateSettingsForm;
};

// Format all settingsData values as numbers. Format as array of objects with key and value.
const formatSettingsData = settingsData => {
    const settingsDataEntries = Object.entries(settingsData);
    const formattedSettingsData = settingsDataEntries.reduce((currSettings, [id, value]) => {
        let newSettings = { ...currSettings };

        if(id.includes('Notes')) {
            // Add note settings
            newSettings.noteSettings = [
                ...newSettings.noteSettings,
                {
                    id,
                    notes: value
                }
            ];
        } else {
            // Add score settings
            const formattedScore = parseInt(value);

            newSettings.scoreSettings = [
                ...newSettings.scoreSettings,
                {
                    id,
                    score: formattedScore
                }
            ];
        };

        return newSettings;
    }, { noteSettings: [], scoreSettings: [] });

    return formattedSettingsData;
};

// Generates a unique key for the form component
// Combines current timestamp with settings data to ensure form remounts when needed
const generateFormKey = (scoreSettings, noteSettings) => {
    const timestamp = Date.now().toString();
    const settingsData = JSON.stringify(scoreSettings) + JSON.stringify(noteSettings);
    const formKey = timestamp + settingsData;
    
    return formKey;
};

export {
    buildSettingsScoreCategoryInputs,
    fillUpdatePriorityRatingsForm,
    formatSettingsData,
    generateFormKey
};