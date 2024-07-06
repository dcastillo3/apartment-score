const apiDirectory = '/api';

const apis = {
    data: `${apiDirectory}/data`,
};

const localStorageSitePrefix = 'apartment-score';

const localStorageKeys = {
    apartments: 'apartments',
    settings: 'settings',
};

// Define sort orders
const orders = {
    desc: 'desc',
    asc: 'asc'
};

const totalScore = 'totalScore';

const initialStates = {
    data: [],
    sortCategory: totalScore,
    order: orders.desc,
    apartments: [],
    settings: [],
    search: '',
};

// TO-DO: Build amenity filter categories
// outdoor space yes/no
// dishwasher yes/no
// elevator building yes/no
// pet friendly yes/no
// storage space yes/no
// laundry unit/building/none
// doorman virtual/yes/no

// TO-DO: Create descriptions for each category
// TO-DO: Remove totalScore from scoreCategories. Research effect on app
const categories = {
    sortableNonScoreCategories: [
        'price',
        'bedrooms',
        'bathrooms',
    ],
    scoreCategories: [
        'walk',
        'amenity',
        'privacy',
        'size',
        'layout',
        'modern',
        'kitchen',
        'bathroom',
        'bedroom',
        'closet',
        'office',
        'view',
        'location',
        'proximity',
        'commute',
        totalScore
    ]
};

// Define categories to exclude from input fields
const excludedInputCategories = [
    totalScore
];

// Define categories to exclude from list items
const excludedListItemCategories = [
    totalScore
];

// Define the min and max score for each category
const scoreRange = {
    min: 1,
    max: 5
};

// Define the min and max rooms
const roomRange = {
    min: 1,
    max: 5
};

// Define the default score option
const defaultScoreOption = 3;

const defaultRoomOption = 1;

const prevWeightedScoreType = 'object';

export {
    apis,
    totalScore,
    initialStates,
    localStorageSitePrefix,
    localStorageKeys,
    orders,
    categories,
    excludedInputCategories,
    scoreRange,
    roomRange,
    defaultScoreOption,
    defaultRoomOption,
    prevWeightedScoreType,
    excludedListItemCategories
};