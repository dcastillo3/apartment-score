const apiDirectory = '/api';

const apis = {
    data: `${apiDirectory}/data`,
};

const localStorageSitePrefix = 'apartment-score';

const localStorageKeys = {
    apartments: 'apartments',
    settings: 'settings',
};

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
    settings: []
};

const categories = {
    sortableNonScoreCategories: [
        'price',
        'bedrooms',
        'bathrooms',
    ],
    scoreCategories: [
        'walkScore',
        'locationScore',
        'amenityScore',
        'interiorScore',
        totalScore
    ]
};

const nonInputCategories = [
    totalScore
];

const scoreOptions = [
    {
        label: '1',
        value: 1
    },
    {
        label: '2',
        value: 2
    },
    {
        label: '3',
        value: 3
    },
    {
        label: '4',
        value: 4
    },
    {
        label: '5',
        value: 5
    },
    {
        label: '6',
        value: 6
    },
    {
        label: '7',
        value: 7
    },
    {
        label: '8',
        value: 8
    },
    {
        label: '9',
        value: 9
    },
    {
        label: '10',
        value: 10
    }
];

const defaultScoreOption = 1;

export {
    apis,
    totalScore,
    initialStates,
    localStorageSitePrefix,
    localStorageKeys,
    orders,
    categories,
    nonInputCategories,
    scoreOptions,
    defaultScoreOption
};