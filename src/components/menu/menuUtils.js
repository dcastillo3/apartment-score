const getFilteredMenuRoutes = (authenticatedMenuRoutes, unauthenticatedMenuRoutes, generalMenuRoutes, isAuthenticated) => {
    const authSpecificRoutes = isAuthenticated ? authenticatedMenuRoutes : unauthenticatedMenuRoutes;
    const combinedRoutes = [...authSpecificRoutes, ...generalMenuRoutes];
    const sortedRoutes = combinedRoutes.sort((routeA, routeB) => routeA.menuOrder - routeB.menuOrder);

    return sortedRoutes;
};

export {
    getFilteredMenuRoutes
};
