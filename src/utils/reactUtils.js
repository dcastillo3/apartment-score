import { categories, excludedInputCategories, excludedListItemCategories, prevWeightedScoreType, totalScore } from "./consts";

const formatPriceDisplay = price => `$${price}`;

const buildCategoryLabel = category => {
    // Add space before capital letters
    const labelSpaced = category.replace(/([A-Z])/g, ' $1');
    // Capitalize first letter
    const labelName = labelSpaced.replace(/^./, str => str.toUpperCase());

    return labelName;
};

const generateUniqueId = () => {
    const uniqueId = Math.round(Math.random() * 10 * Date.now());

    return uniqueId;
};

const checkScoreCategory = (category) => 
    category !== totalScore && categories.scoreCategories.includes(category);

const checkWeightedScoreType = (category, apartment) => 
    typeof apartment[category] === prevWeightedScoreType;

const checkPrevWeightedScore = (category, apartment) => 
    checkScoreCategory(category) && checkWeightedScoreType(category, apartment);

const checkSortableNonScoreCategory = category => 
    categories.sortableNonScoreCategories.includes(category);

const checkSortableCategory = category => 
    checkSortableNonScoreCategory(category) || checkScoreCategory(category);

const getInputScoreCategories = () => 
    categories.scoreCategories.filter(scoreCategory => 
        !excludedInputCategories.includes(scoreCategory));

const getSortableCategories = () => 
    [...categories.sortableNonScoreCategories, ...categories.scoreCategories];

const getApartmentListItemCategories = apartment => 
    Object.entries(apartment).filter(([category]) => 
        checkScoreCategory(category) && !excludedListItemCategories.includes(category));

export {
    formatPriceDisplay,
    buildCategoryLabel,
    generateUniqueId,
    checkScoreCategory,
    checkPrevWeightedScore,
    checkSortableNonScoreCategory,
    checkSortableCategory,
    getInputScoreCategories,
    getSortableCategories,
    getApartmentListItemCategories
};