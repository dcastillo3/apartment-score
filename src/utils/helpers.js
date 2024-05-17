import { initialStates, localStorageSitePrefix } from './consts';

const formatLocalStorageKey = localStorageKey => 
    `${localStorageSitePrefix}-${localStorageKey}`;

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