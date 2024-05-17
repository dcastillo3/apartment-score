import React from "react";
import { categories } from "utils/consts";
import { buildCategoryLabel, checkScoreCategory } from "utils/reactUtils";
import { apartmentListItemCategoryPadding, nonListItemCategories } from "./apartmentListConsts";
import { FlexBox, FlexBoxColumn, Label, TextSmall } from "components/styled";

const fillApartmentForm = (apartment, updateApartmentForm) => {
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

const buildApartmentListItemCategories = apartment => {
    const apartmentCategories = Object.entries(apartment).filter(([key]) => {
        return !nonListItemCategories.includes(key);
    });

    // Render max of two fields per row
    const categoriesPerRow = 2;
    const apartmentCategoriesLength = apartmentCategories.length;
    const renderedCategories = [];
    let categoryStack = [];
    let categoriesPerCurrRow = categoriesPerRow;
    let idx = 0;
    const addCategoryRow = () => {
        const categoryRow = (
            <FlexBox $itemsPerRow={categoriesPerRow} key={idx}>
                {categoryStack}
            </FlexBox>
        );

        categoryStack = [];
        categoriesPerCurrRow = categoriesPerRow;
        renderedCategories.push(categoryRow);
    };

    while (idx < apartmentCategoriesLength) {
        let [categoryKey, categoryValue] = apartmentCategories[idx];
        const categoryLabel = buildCategoryLabel(categoryKey);
        const isScoreCategory = checkScoreCategory(categoryKey);

        // If score category, display weighted score
        if(isScoreCategory) {
            categoryValue = categoryValue.weightedScore;
        };

        const category = (
            <FlexBoxColumn $p={apartmentListItemCategoryPadding} key={idx}>
                <Label>{categoryLabel}: </Label>
                <TextSmall>{categoryValue}</TextSmall>
            </FlexBoxColumn>
        );

        categoryStack.push(category);

        const rowIsFull = categoryStack.length === categoriesPerCurrRow;
        const lastApartmentCategory = (idx === (apartmentCategoriesLength - 1));

        idx += 1;

        if(rowIsFull || lastApartmentCategory) addCategoryRow();
    };

    return renderedCategories;
};

export { 
    fillApartmentForm,
    buildApartmentListItemCategories
};