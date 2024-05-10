import { Apartment } from '../components/main/apartment';
import { PitchDeck } from '../components/main/pitchDeck';
import { Donate } from '../components/main/donate';
import { Biography } from '../components/main/biography';
import { NotFound } from '../components/main/notFound';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import QueuePlayNextIcon from '@mui/icons-material/QueuePlayNext';
import HandshakeIcon from '@mui/icons-material/Handshake';
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
        name: 'Pitch',
        path: '/pitch-deck',
        icon: QueuePlayNextIcon,
        Element: PitchDeck
    },
    {
        id: 3,
        name: 'Donate',
        path: '/donate',
        icon: HandshakeIcon,
        Element: Donate
    },
    {
        id: 4,
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

const initialDocumentTitle = `App Boilerplate`;

export {
    menuRoutes,
    notFoundRoute,
    generalRoutes,
    protectedRoutes,
    initialDocumentTitle
};