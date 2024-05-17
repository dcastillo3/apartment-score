import { buildCategoryLabel } from "utils/reactUtils";
import { categories, defaultScoreOption, nonInputCategories, scoreOptions } from "../../../utils/consts";
import { apartmentRoomOptions } from "./apartmentConsts";

const buildApartmentNonScoreSortableCategoryInputs = () => {
    const nonScoreCategoryInputs = categories.sortableNonScoreCategories.map(category => {
        const categoryInput = {
            id: category,
            labelName: buildCategoryLabel(category),
            inputType: 'select',
            defaultValue: defaultScoreOption,
            options: apartmentRoomOptions,
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

export {
    buildApartmentNonScoreSortableCategoryInputs,
    buildApartmentScoreCategoryInputs
};