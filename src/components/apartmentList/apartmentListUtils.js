import { categories, scoreRange } from "utils/consts";
import { buildCategoryLabel, getApartmentListItemCategories } from "utils/reactUtils";

const fillApartmentListItemForm = (apartment, updateApartmentForm) => {
    const filledInputs = updateApartmentForm?.inputs?.map(formField => {
        const inputId = formField.id;
        const inputValue = apartment[inputId];
        const isScoreInput = categories.scoreCategories.includes(inputId);
        const defaultValue = isScoreInput ? inputValue.score : inputValue;

        return {
            ...formField,
            defaultValue
        };
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

export { 
    fillApartmentListItemForm,
    formatApartmentListItemChartData
};