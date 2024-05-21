import { buildCategoryLabel } from "utils/reactUtils";
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