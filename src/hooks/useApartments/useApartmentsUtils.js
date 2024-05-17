import { checkPrevWeightedScore, checkSortableCategory, generateUniqueId } from "utils/reactUtils";

const buildTotalScore = weightedScores => Object.keys(weightedScores)
.reduce((acc, key) => acc + parseInt(weightedScores[key].weightedScore), 0);

const buildWeightedScores = (apartment, settings) => settings.reduce((acc, setting) => {
    const category = setting.id;
    let score = apartment[category];
    const prevWeightedScore = checkPrevWeightedScore(category, apartment);
    
    // Reassign score to score property if previously calculated
    if (prevWeightedScore) score = score.score;

    const parsedScore = parseInt(score);
    const weightedScore = parsedScore * setting.score;
    return {
        ...acc,
        [category]: {
            score: parsedScore,
            weightedScore
        }
    };
}, {});

const formatApartmentData = (apartment) => {
    // Format all sortable non score categories as numbers
    const apartmentEntries = Object.entries(apartment);
    const formattedApartment = apartmentEntries.reduce((acc, [category, value]) => {
        const isSortableCategory = checkSortableCategory(category);
        const isWeightedScore = checkPrevWeightedScore(category, apartment);
        const formattedValue = {
            [category]: isSortableCategory && !isWeightedScore ? parseInt(value) : value
        };

        return {
            ...acc,
            ...formattedValue
        };
    }, {});

    return formattedApartment;
};

const buildNewApartment = (apartment, settings) => {
    const formattedApartment = formatApartmentData(apartment);
    const newWeightedScores = buildWeightedScores(formattedApartment, settings);
    const newTotalScore = buildTotalScore(newWeightedScores);
    const newApartment = {
        ...formattedApartment,
        ...newWeightedScores,
        totalScore: newTotalScore
    };

    // If apartment does not have an id, assign a random id
    if (!newApartment.id) newApartment.id = generateUniqueId();

    return newApartment;
};

export {
    buildNewApartment
}