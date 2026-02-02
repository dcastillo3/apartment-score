import { createContext } from "react";

const ApartmentContext = createContext();

const SettingsContext = createContext();

const AuthContext = createContext();

const buildCustomTheme = theme => {
    const customTheme = {
        ...theme
    };

    return customTheme;
};

export {
    ApartmentContext,
    SettingsContext,
    AuthContext,
    buildCustomTheme
};