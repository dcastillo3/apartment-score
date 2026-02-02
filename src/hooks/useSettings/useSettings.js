import { useState, useContext } from "react";
import { apis } from "utils/consts";
import { generateDefaultScoreSettings, generateDefaultNoteSettings } from "./useSettingsUtils";
import { errorPrefixes } from "./useSettingsConsts";
import { AuthContext } from "context";
import axios from "axios";
import _ from "lodash";

function useSettings() {
    const { isAuthenticated } = useContext(AuthContext);
    const [scoreSettings, setScoreSettings] = useState(generateDefaultScoreSettings);
    const [noteSettings, setNoteSettings] = useState(generateDefaultNoteSettings);
    
    // Persist settings to MongoDB
    const persistSettings = async (settings) => {
        if (isAuthenticated) {
            try {
                const axiosConfig = { withCredentials: true };
                const settingsPayload = { settings };
                
                await axios.put(apis.user.data, settingsPayload, axiosConfig);
            } catch (err) {
                console.error(errorPrefixes.saveFailed, err);
            }
        }
    };

    const handleUpdateSettings = async (newScoreSettings, newNoteSettings) => {
        setScoreSettings(newScoreSettings);
        setNoteSettings(newNoteSettings);

        await persistSettings({ score: newScoreSettings, note: newNoteSettings });
    };

    const fetchSettings = async () => {
        if (!isAuthenticated) return;
        
        try {
            const axiosConfig = { withCredentials: true };
            const res = await axios.get(apis.user.data, axiosConfig);

            if (res?.data?.success) {
                const { settings } = res.data.data;
                
                if (_.isEmpty(settings)) {
                    // New user - initialize with defaults and persist to MongoDB
                    await handleUpdateSettings(scoreSettings, noteSettings);
                } else {
                    // Existing user - use fetched settings
                    setScoreSettings(settings.score);
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
        handleUpdateSettings,
        fetchSettings
    };
};

export default useSettings;