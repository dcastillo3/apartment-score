import React from 'react';
import { useApartments, useData, useSettings } from '../hooks';
import { DataContext, SettingsContext, ApartmentContext } from './';
import { theme } from '../theme';
import { ThemeProvider } from 'styled-components';
import { buildCustomTheme } from './contextUtils';

function AppContext({children}) {
    const data = useData();
    const apartments = useApartments();
    const settings = useSettings();
    const customTheme = buildCustomTheme(theme);
    
    return (
        <ThemeProvider theme={customTheme}>
            <DataContext.Provider value={data}>
                <ApartmentContext.Provider value={apartments}>
                    <SettingsContext.Provider value={settings}>
                        {children}
                    </SettingsContext.Provider>
                </ApartmentContext.Provider>
            </DataContext.Provider>
        </ThemeProvider>
    );
};

export default AppContext;