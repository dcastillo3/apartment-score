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
    const loginWithGoogle = () => {
        window.location.href = apis.auth.google;
    };

    // Login with email and password
    const login = async (email, password) => {
        try {
            const axiosConfig = { withCredentials: true };
            const requestData = { email, password };
            const res = await axios.post(apis.auth.login, requestData, axiosConfig);

            if (res?.data?.success) {
                const userData = buildUserData(res.data.data.user);

                setUser(userData);
                setIsAuthenticated(true);

                return { success: true };
            } else {
                return { success: false, error: res.data.err };
            }
        } catch (err) {
            const errorMessage = err?.response?.data?.err || 'Login failed';
            
            console.error(errorPrefixes.login, err);

            return { success: false, error: errorMessage };
        }
    };

    // Sign up with email and password
    const signup = async (email, password, firstName, lastName, userName) => {
        try {
            const axiosConfig = { withCredentials: true };
            const requestData = { email, password, firstName, lastName, userName };
            const res = await axios.post(apis.auth.signup, requestData, axiosConfig);

            if (res?.data?.success) {
                const userData = buildUserData(res.data.data.user);

                setUser(userData);
                setIsAuthenticated(true);

                return { success: true };
            } else {
                return { success: false, error: res.data.err };
            }
        } catch (err) {
            const errorMessage = err?.response?.data?.err || 'Signup failed';
            
            console.error(errorPrefixes.signup, err);

            return { success: false, error: errorMessage };
        }
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
        loginWithGoogle,
        login,
        signup,
        logout,
        fetchAuth
    };
}

export default useAuth;
