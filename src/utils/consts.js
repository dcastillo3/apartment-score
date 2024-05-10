const apiDirectory = '/api';

const apis = {
    data: `${apiDirectory}/data`,
};

const localStorageKeys = {
    apartments: `apartments`
};

const initialStates = {
    data: [],
    apartments: [],
}

export {
    apis,
    initialStates,
    localStorageKeys
};