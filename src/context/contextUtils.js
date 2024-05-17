import { createContext } from "react";

const DataContext = createContext();

const ApartmentContext = createContext();

const SettingsContext = createContext();

const buildCustomTheme = theme => {
    const customTheme = {
        ...theme
    };

    return customTheme;
};

export {
    DataContext,
    ApartmentContext,
    SettingsContext,
    buildCustomTheme
};