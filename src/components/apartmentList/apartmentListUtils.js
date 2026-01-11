import { categories, scoreRange } from "utils/consts";
import { buildCategoryLabel, getApartmentListItemCategories, getCategoryFromNoteId } from "utils/reactUtils";

const fillApartmentListItemForm = (noteSettings, apartment, updateApartmentForm) => {
    const filledInputs = updateApartmentForm?.inputs?.map(formField => {
        const inputId = formField.id;
        const inputValue = apartment[inputId];
        const isScoreInput = categories.scoreCategories.includes(inputId);
        const defaultValue = isScoreInput ? inputValue.score : inputValue;
        // Separate `Notes` from Find note setting id that matches form field id
        const noteSetting = noteSettings.find(noteSetting => getCategoryFromNoteId(noteSetting.id) === inputId);
        const newFormField = { 
            ...formField,
            defaultValue
        };

        //Populate tooltip with saved user note
        if(!_.isEmpty(noteSetting)) newFormField.tooltip = noteSetting.notes;

        return newFormField;
    });

    const filledUpdateApartmentForm = {
        ...updateApartmentForm,
        inputs: filledInputs
    };

    return filledUpdateApartmentForm;
};

const formatApartmentListItemChartData = apartment => {
    const listItemCategories = getApartmentListItemCategories(apartment);
    const listItemCategoryLabels = listItemCategories.map(([category]) => buildCategoryLabel(category));
    const listItemCategoryValues = listItemCategories.map(([, value]) => value.weightedScore);
    const listItemChartData = {
        labels: listItemCategoryLabels,
        datasets: [
            {
                data: listItemCategoryValues,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }
        ]
    };
    const listItemChartRange = {
        min: scoreRange.min,
        max: (scoreRange.max * scoreRange.max) + scoreRange.max
    };

    return {
        listItemChartData,
        listItemChartRange
    };
};

const createApartmentRefs = (apartments, ref, createRef) => {
    apartments.forEach(apartment => {
        // If the ref doesn't exist yet, create it
        if (!ref.current[apartment.id]) {
            ref.current[apartment.id] = createRef(null);
        }
    });
};

export { 
    fillApartmentListItemForm,
    formatApartmentListItemChartData,
    createApartmentRefs
};