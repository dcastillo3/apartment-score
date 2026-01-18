import { useState } from "react";
import { apis, initialStates } from "../../utils/consts";
import { errorPrefixes } from "./useAuthConsts";
import { buildUserData } from "./useAuthUtils";
import axios from "axios";

function useAuth() {
    const [user, setUser] = useState(initialStates.auth.user);
    const [isAuthenticated, setIsAuthenticated] = useState(initialStates.auth.isAuthenticated);

    // Verify if user is authenticated
    const fetchAuth = async () => {
        try {
            const axiosConfig = { withCredentials: true };
            const res = await axios.get(apis.auth.current, axiosConfig);

            if (res?.data?.success) {
                const userData = buildUserData(res.data.data);

                setUser(userData);

                setIsAuthenticated(true);
            } else {
                setUser(null);

                setIsAuthenticated(false);
            }
        } catch (err) {
            setUser(null);
            
            setIsAuthenticated(false);
            
            // Don't log 401 errors as they're expected for non-authenticated users
            if (err?.response?.status !== 401) {
                console.error(errorPrefixes.authCheck, err);
            }
        }
    };

    // Redirect to Google OAuth flow
    const login = () => {
        window.location.href = apis.auth.google;
    };

    // Log out user and clear their data
    const logout = async () => {
        try {
            const axiosConfig = { withCredentials: true };
            const res = await axios.post(apis.auth.logout, null, axiosConfig);

            if (res?.data?.success) {
                setUser(null);

                setIsAuthenticated(false);
            }
        } catch (err) {
            console.error(errorPrefixes.logout, err);
        }
    };

    return {
        user,
        isAuthenticated,
        login,
        logout,
        fetchAuth
    };
}

export default useAuth;
