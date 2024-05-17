import { Apartment } from '../components/main/apartment';
import { Biography } from '../components/main/biography';
import { NotFound } from '../components/main/notFound';
import { Settings } from '../components/main/settings';
import ApartmentIcon from '@mui/icons-material/Apartment';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';


//Maintain ID's
const menuRoutes = [
    {
        id: 1,
        name: 'Apartment',
        path: '/',
        icon: ApartmentIcon,
        Element: Apartment
    },
    {
        id: 3,
        name: 'Settings',
        path: '/settings',
        icon: SettingsIcon,
        Element: Settings
    },
    {
        id: 2,
        name: 'About',
        path: '/biography',
        icon: InfoIcon,
        Element: Biography
    },
];

const notFoundRoute = {
    id: 5,
    name: 'Not Found',
    path: '*',
    Element: NotFound
};

const generalRoutes = [
    notFoundRoute
];

const protectedRoutes = [
];

const initialDocumentTitle = `Apartment Score`;

export {
    menuRoutes,
    notFoundRoute,
    generalRoutes,
    protectedRoutes,
    initialDocumentTitle
};