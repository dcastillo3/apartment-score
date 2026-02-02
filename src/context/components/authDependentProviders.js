import React from 'react';
import { useApartments, useSettings } from '../../hooks';
import { SettingsContext, ApartmentContext } from '../';

// This component initializes contexts that depend on AuthContext
// Must be rendered inside AuthContext.Provider so hooks can access auth state
function AuthDependentProviders({ children }) {
    const apartments = useApartments();
    const settings = useSettings();

    return (
        <ApartmentContext.Provider value={apartments}>
            <SettingsContext.Provider value={settings}>
                {children}
            </SettingsContext.Provider>
        </ApartmentContext.Provider>
    );
}

export default AuthDependentProviders;
