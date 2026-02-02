import _ from "lodash";
import { initialDocumentTitle, generalRoutes, menuRoutes, authenticatedRoutes, unauthenticatedRoutes, notFoundRoute } from "./routesConsts";

const getRouteById = id => {
    const menuRoute = menuRoutes.find(route => route.id === id);
    if (!_.isEmpty(menuRoute)) return menuRoute;

    const generalRoute = generalRoutes.find(route => route.id === id);
    if (!_.isEmpty(generalRoute)) return generalRoute;

    const authenticatedRoute = authenticatedRoutes.find(route => route.id === id);
    if (!_.isEmpty(authenticatedRoute)) return authenticatedRoute;

    const unauthenticatedRoute = unauthenticatedRoutes.find(route => route.id === id);
    if (!_.isEmpty(unauthenticatedRoute)) return unauthenticatedRoute;

    return notFoundRoute;
};

const getRouteByPathname = pathname => {
    const menuRoute = menuRoutes.find(route => route.path === pathname);
    if (!_.isEmpty(menuRoute)) return menuRoute;

    const generalRoute = generalRoutes.find(route => route.path === pathname);
    if (!_.isEmpty(generalRoute)) return generalRoute;

    const authenticatedRoute = authenticatedRoutes.find(route => route.path === pathname);
    if (!_.isEmpty(authenticatedRoute)) return authenticatedRoute;

    const unauthenticatedRoute = unauthenticatedRoutes.find(route => route.path === pathname);
    if (!_.isEmpty(unauthenticatedRoute)) return unauthenticatedRoute;

    return notFoundRoute;
};

const buildDocumentTitle = title =>
    title !== getRouteById(1).name ? `${initialDocumentTitle} | ${title}` : initialDocumentTitle;

export {
    getRouteById,
    getRouteByPathname,
    buildDocumentTitle
};