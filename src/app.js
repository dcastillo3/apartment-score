import React, { useContext, useEffect, useState } from 'react';
import { MainRoutes } from './routes';
import { Header } from './components/header';
import { Footer } from './components/footer';
import { AuthContext, ApartmentContext, SettingsContext } from './context';
import { Box } from './components/styled';

// TODO: Implement comprehensive testing suite (unit tests, integration tests, E2E tests)

function App() {
    const { isAuthenticated, fetchAuth } = useContext(AuthContext);
    const { fetchApartments } = useContext(ApartmentContext);
    const { fetchSettings } = useContext(SettingsContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAppData = async () => {
            setLoading(true);

            // Fetch independent apis (don't rely on app state)
            await Promise.all([fetchAuth()]);
            
            // Fetch dependent apis (rely on app state from above)
            await Promise.all([fetchApartments(), fetchSettings()]);

            setLoading(false);
        };

        fetchAppData();
    }, [isAuthenticated]);

    const appRender = (
        <Box>
            <Header />
            <MainRoutes />
            <Footer />
        </Box>
    )

    const loadingRender = (
        <Box>
            Loading...
        </Box>
    );

    const renderApp = loading ? loadingRender : appRender;

    return (
        <Box>
            {renderApp}
        </Box>
    );
};

export default App;