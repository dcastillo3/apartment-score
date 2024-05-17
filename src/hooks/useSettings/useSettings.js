import { useEffect, useState } from "react";
import { localStorageKeys } from "utils/consts";
import { getStateFromLocalStorage, setLocalStorageState } from "utils/helpers";
import { generateDefaultSettings } from "./useSettingsUtils";

function useSettings() {
    const [settings, setSettings] = useState(() => getStateFromLocalStorage(localStorageKeys.settings));
    
    const handleUpdateSettings = newSettings => {
        // Persist settings in local storage
        setLocalStorageState(localStorageKeys.settings, newSettings);

        setSettings(newSettings);
    };

    // If no apartment settings are found in local storage, generate default settings
    useEffect(() => {
        if (!settings.length) {
            const defaultSettings = generateDefaultSettings();

            handleUpdateSettings(defaultSettings);
        };
    }, []);

    return {
        settings,
        handleUpdateSettings
    };
};

export default useSettings;