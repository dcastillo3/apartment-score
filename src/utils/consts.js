const apiDirectory = '/api';

const apis = {
    data: `${apiDirectory}/data`,
};

const localStorageKeys = {
    apartments: `apartments`
};

const initialStates = {
    data: [],
    sortProperty: 'totalScore',
    order: 'desc',
    apartments: [],
}

export {
    apis,
    initialStates,
    localStorageKeys
};