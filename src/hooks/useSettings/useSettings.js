import { useEffect, useState } from "react";
import { localStorageKeys } from "utils/consts";
import { getStateFromLocalStorage, setLocalStorageState } from "utils/helpers";
import { generateDefaultNoteSettings, generateDefaultScoreSettings, generateDefaultSettings } from "./useSettingsUtils";

function useSettings() {
    const [scoreSettings, setScoreSettings] = useState(() => getStateFromLocalStorage(localStorageKeys.scoreSettings));
    const [noteSettings, setNoteSettings] = useState(() => getStateFromLocalStorage(localStorageKeys.noteSettings));
    
    const handleUpdateScoreSettings = newSettings => {
        // Persist settings in local storage
        setLocalStorageState(localStorageKeys.scoreSettings, newSettings);

        setScoreSettings(newSettings);
    };

    const handleUpdateNoteSettings = newNoteSettings => {
        // Persist note settings in local storage
        setLocalStorageState(localStorageKeys.noteSettings, newNoteSettings);

        setNoteSettings(newNoteSettings);
    };

    // If no apartment settings are found in local storage, generate default settings
    useEffect(() => {
        if (!scoreSettings.length) {
            const defaultScoreSettings = generateDefaultScoreSettings();

            handleUpdateScoreSettings(defaultScoreSettings);
        };

        if(!noteSettings.length) {
            const defaultNoteSettings = generateDefaultNoteSettings();

            handleUpdateNoteSettings(defaultNoteSettings);
        }
    }, []);

    return {
        scoreSettings,
        noteSettings,
        handleUpdateScoreSettings,
        handleUpdateNoteSettings
    };
};

export default useSettings;