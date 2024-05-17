import { categories, nonInputCategories, totalScore } from "./consts";

const formatPriceDisplay = price => `$${price}`;

const buildCategoryLabel = category => {
    const labelName = category
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase());

    return labelName;
};

const generateUniqueId = () => {
    const uniqueId = Math.round(Math.random() * 10 * Date.now());

    return uniqueId;
};

const checkScoreCategory = (category) => category !== totalScore && categories.scoreCategories.includes(category);

const checkPrevWeightedScore = (category, apartment) => 
    checkScoreCategory(category) && typeof apartment[category] === 'object';

const checkSortableNonScoreCategory = category => categories.sortableNonScoreCategories.includes(category);

const checkSortableCategory = category => checkSortableNonScoreCategory(category) || checkScoreCategory(category);

const getInputScoreCategories = () => categories.scoreCategories.filter(scoreCategory => !nonInputCategories.includes(scoreCategory));

const getSortableCategories = () => [...categories.sortableNonScoreCategories, ...categories.scoreCategories];

export {
    formatPriceDisplay,
    buildCategoryLabel,
    generateUniqueId,
    checkScoreCategory,
    checkPrevWeightedScore,
    checkSortableNonScoreCategory,
    checkSortableCategory,
    getInputScoreCategories,
    getSortableCategories
};