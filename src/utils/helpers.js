import { initialStates, localStorageSitePrefix } from './consts';

const camelCaseToKebabCase = string => string.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();

const formatLocalStorageKey = localStorageKey => {
    const snakeCaseLocalStorageKey = camelCaseToKebabCase(localStorageKey);
    const formattedLocalStorageKey = `${localStorageSitePrefix}-${snakeCaseLocalStorageKey}`;

    return formattedLocalStorageKey;
};

const getStateFromLocalStorage = localStorageKey => {
    const initialState = initialStates[localStorageKey];
    const formattedLocalStorageKey = formatLocalStorageKey(localStorageKey);
    const localStorageState = localStorage.getItem(formattedLocalStorageKey);
    const state = localStorageState ? JSON.parse(localStorageState) : initialState;

    return state;
};

const setLocalStorageState = (localStorageKey, state) => {
    const localStorageState = JSON.stringify(state);
    const formattedLocalStorageKey = formatLocalStorageKey(localStorageKey);

    localStorage.setItem(formattedLocalStorageKey, localStorageState);
};

const removeLocalStorageState = localStorageKey => {
    const formattedLocalStorageKey = formatLocalStorageKey(localStorageKey);

    localStorage.removeItem(formattedLocalStorageKey)
};

export {
    getStateFromLocalStorage,
    setLocalStorageState,
    removeLocalStorageState
};