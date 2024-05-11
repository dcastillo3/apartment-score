import { Apartment } from '../components/main/apartment';
import { Biography } from '../components/main/biography';
import { NotFound } from '../components/main/notFound';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import PersonIcon from '@mui/icons-material/Person';


//Maintain ID's
const menuRoutes = [
    {
        id: 1,
        name: 'Apartment',
        path: '/',
        icon: SlideshowIcon,
        Element: Apartment
    },
    {
        id: 2,
        name: 'About',
        path: '/biography',
        icon: PersonIcon,
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