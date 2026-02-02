import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { authenticatedRoutes, unauthenticatedRoutes, generalRoutes } from './routesConsts';
import { AuthContext } from '../context';
import Page from './page';

function MainRoutes() {
    const { isAuthenticated } = useContext(AuthContext);

    const renderGeneralRoutes = generalRoutes.map(({ name, path, Element }, idx) => (
        <Route 
            key={idx} 
            exact 
            path={path} 
            element={<Page title={name}><Element /></Page>} 
        />
    ));

    const renderAuthenticatedRoutes = authenticatedRoutes.map(({ name, path, Element }, idx) => (
        <Route 
            key={idx} 
            exact 
            path={path} 
            element={
                isAuthenticated 
                    ? <Page title={name}><Element /></Page>
                    : <Navigate to="/login" replace />
            } 
        />
    ));

    const renderUnauthenticatedRoutes = unauthenticatedRoutes.map(({ name, path, Element }, idx) => (
        <Route 
            key={idx} 
            exact 
            path={path} 
            element={
                isAuthenticated
                    ? <Navigate to="/" replace />
                    : <Page title={name}><Element /></Page>
            } 
        />
    ));

    return (
        <Routes>
            {renderGeneralRoutes}
            {renderAuthenticatedRoutes}
            {renderUnauthenticatedRoutes}
        </Routes>
    );
};

export default React.memo(MainRoutes);