import { buildCategoryLabel, getApartmentScoreCategories, getCategoryFromNoteId } from "utils/reactUtils";
import { categories, defaultScoreOption, defaultRoomOption, roomRange, excludedInputCategories, scoreRange } from "../../../utils/consts";
import { buildSelectOptionsFromRange } from "components/common/form/formUtils";

const buildApartmentNonScoreSortableCategoryInputs = () => {
    const nonScoreCategoryInputs = categories.sortableNonScoreCategories.map(category => {
        const categoryInput = {
            id: category,
            labelName: buildCategoryLabel(category),
            inputType: 'select',
            defaultValue: defaultRoomOption,
            options: buildSelectOptionsFromRange(roomRange),
            tooltip: '',
            additionalProps: {},
            validations: {},
            fullRow: false
        };

        // Build input type for price category
        if(category === 'price') {
            categoryInput.inputType = 'number';
            categoryInput.defaultValue = '';
            categoryInput.options = [];
            categoryInput.additionalProps = {
                required: true
            };
        };

        return categoryInput;
    });

    return nonScoreCategoryInputs;
};

const buildApartmentScoreCategoryInputs = () => {
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
            tooltip: '',
            fullRow: false
        };

        return categoryInput;
    });

    return scoreCategoryInputs;
};

const formatApartmentsChartData = apartments => {
    const apartmentLabels = apartments.map(apartment => apartment.address);
    const apartmentValues = apartments.map(apartment => ({
            id: apartment.id,
            value: apartment.totalScore,
        }));
    const apartmentChartData = {
        labels: apartmentLabels,
        datasets: [
            {
                data: apartmentValues,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }
        ]
    };
    const scoreCategories = getApartmentScoreCategories();
    const apartmentChartRange = {
        min: scoreCategories.length * scoreRange.min,
        max: scoreCategories.length * (scoreRange.max * scoreRange.max) + (scoreCategories.length * scoreRange.max)
    };

    return {
        apartmentChartData,
        apartmentChartRange
    };
};

const filterApartmentsByQuery = (apartments, query = '') => {
    if(!query) return apartments;

    const filteredApartments = apartments.filter(({ address = '' }) =>
        address.toLowerCase().includes(query.toLowerCase()));

    return filteredApartments;
};

const fillAddApartmentForm = (noteSettings, addApartmentForm) => {
    const filledInputs = addApartmentForm.inputs.map(formField => {
        // Separate `Notes` from Find note setting id that matches form field id
        const noteSetting = noteSettings.find(noteSetting => getCategoryFromNoteId(noteSetting.id) === formField.id);
        const newFormField = { ...formField };

        // Populate tooltip with saved user note
        if(!_.isEmpty(noteSetting)) newFormField.tooltip = noteSetting.notes;

        return newFormField;
    });

    const newAddApartmentForm = { 
        ...addApartmentForm,
        inputs: filledInputs
    };

    return newAddApartmentForm;
};

export {
    buildApartmentNonScoreSortableCategoryInputs,
    buildApartmentScoreCategoryInputs,
    formatApartmentsChartData,
    filterApartmentsByQuery,
    fillAddApartmentForm
};