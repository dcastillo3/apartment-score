import { initialStates, localStorageKeys } from './consts';

const getStateFromLocalStorage = localStorageKey => {
    const initialState = initialStates[localStorageKey];
    const localStorageState = localStorage.getItem(localStorageKeys[localStorageKey]);
    const state = localStorageState ? JSON.parse(localStorageState) : initialState;

    return state;
};

const setLocalStorageState = (localStorageKey, state) => {
    const localStorageState = JSON.stringify(state);

    localStorage.setItem(localStorageKey, localStorageState);
};

const removeLocalStorageState = localStorageKey => {
    localStorage.removeItem(localStorageKeys[localStorageKey])
};

export {
    getStateFromLocalStorage,
    setLocalStorageState,
    removeLocalStorageState
};