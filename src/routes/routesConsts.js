import { Apartment } from '../components/main/apartment';
import { About } from '../components/main/about';
import { NotFound } from '../components/main/notFound';
import { Settings } from '../components/main/settings';
import { LoginSignup } from '../components/main/loginSignup';
import { Logout } from '../components/main/logout';
import ApartmentIcon from '@mui/icons-material/Apartment';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import LogoutIcon from '@mui/icons-material/Logout';


//Maintain ID's
const apartmentRoute = {
    id: 1,
    name: 'Apartment',
    path: '/',
    icon: ApartmentIcon,
    menuOrder: 1,
    Element: Apartment
};

const settingsRoute = {
    id: 3,
    name: 'Settings',
    path: '/settings',
    icon: SettingsIcon,
    menuOrder: 2,
    Element: Settings
};

const aboutRoute = {
    id: 2,
    name: 'About',
    path: '/about',
    icon: InfoIcon,
    menuOrder: 3,
    Element: About
};

const loginRoute = {
    id: 4,
    name: 'Login',
    path: '/login',
    Element: LoginSignup
};

const logoutRoute = {
    id: 6,
    name: 'Logout',
    path: '/logout',
    icon: LogoutIcon,
    menuOrder: 4,
    Element: Logout
};

const notFoundRoute = {
    id: 5,
    name: 'Not Found',
    path: '*',
    Element: NotFound
};

const menuRoutes = [
    apartmentRoute,
    settingsRoute,
    aboutRoute
];

const authenticatedMenuRoutes = [
    apartmentRoute,
    settingsRoute,
    logoutRoute
];

const unauthenticatedMenuRoutes = [];

const generalMenuRoutes = [
    aboutRoute
];

const authenticatedRoutes = [
    apartmentRoute,
    settingsRoute,
    logoutRoute
];

const unauthenticatedRoutes = [
    loginRoute
];

const generalRoutes = [
    aboutRoute,
    notFoundRoute
];

const initialDocumentTitle = `Apartment Score`;

export {
    menuRoutes,
    authenticatedMenuRoutes,
    unauthenticatedMenuRoutes,
    generalMenuRoutes,
    authenticatedRoutes,
    unauthenticatedRoutes,
    notFoundRoute,
    generalRoutes,
    initialDocumentTitle
};