import { useState, useContext } from "react";
import { localStorageKeys, apis } from "utils/consts";
import { setLocalStorageState } from "utils/helpers";
import { getInitialScoreSettings, getInitialNoteSettings } from "./useSettingsUtils";
import { errorPrefixes } from "./useSettingsConsts";
import { AuthContext } from "context";
import axios from "axios";

function useSettings() {
    const { isAuthenticated } = useContext(AuthContext);
    const [scoreSettings, setScoreSettings] = useState(getInitialScoreSettings);
    const [noteSettings, setNoteSettings] = useState(getInitialNoteSettings);
    
    // Persist settings to MongoDB (if authenticated) or localStorage (if not)
    const persistSettings = async (settings) => {
        if (isAuthenticated) {
            try {
                const axiosConfig = { withCredentials: true };
                const settingsPayload = { settings };
                
                await axios.put(apis.user.data, settingsPayload, axiosConfig);
            } catch (err) {
                console.error(errorPrefixes.saveFailed, err);
            }
        } else {
            // Save each setting type to its own localStorage key
            if (settings.score) {
                setLocalStorageState(localStorageKeys.scoreSettings, settings.score);
            }
            if (settings.note) {
                setLocalStorageState(localStorageKeys.noteSettings, settings.note);
            }
        }
    };

    const handleUpdateScoreSettings = async (newSettings) => {
        setScoreSettings(newSettings);

        await persistSettings({ score: newSettings, note: noteSettings });
    };

    const handleUpdateNoteSettings = async (newNoteSettings) => {
        setNoteSettings(newNoteSettings);

        await persistSettings({ score: scoreSettings, note: newNoteSettings });
    };

    const fetchSettings = async () => {
        if (!isAuthenticated) return;
        
        try {
            const axiosConfig = { withCredentials: true };
            const res = await axios.get(apis.user.data, axiosConfig);

            if (res?.data?.success) {
                const { settings = {} } = res.data.data;
                if (settings.score) {
                    setScoreSettings(settings.score);
                }
                if (settings.note) {
                    setNoteSettings(settings.note);
                }
            }
        } catch (err) {
            console.error(errorPrefixes.fetchFailed, err);
        }
    };

    return {
        scoreSettings,
        noteSettings,
        handleUpdateScoreSettings,
        handleUpdateNoteSettings,
        fetchSettings
    };
};

export default useSettings;