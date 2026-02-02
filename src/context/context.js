import React from 'react';
import { useAuth } from '../hooks';
import { AuthContext } from './';
import { theme } from '../theme';
import { ThemeProvider } from 'styled-components';
import { buildCustomTheme } from './contextUtils';
import AuthDependentProviders from './components/authDependentProviders';

// Root context provider that wraps the entire application
// Provides auth context first, then nested providers that depend on it
function AppContext({children}) {
    const auth = useAuth();
    const customTheme = buildCustomTheme(theme);

    return (
        <ThemeProvider theme={customTheme}>
            <AuthContext.Provider value={auth}>
                <AuthDependentProviders>
                    {children}
                </AuthDependentProviders>
            </AuthContext.Provider>
        </ThemeProvider>
    );
};

export default AppContext;