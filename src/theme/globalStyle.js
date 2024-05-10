import { createGlobalStyle } from 'styled-components';
import { theme } from './';
import { minMobileWidth } from '../hooks/useMediaQuery/useMediaQueryConsts';

const GlobalStyle = createGlobalStyle`
    body {
        background: ${theme.palette.background.main};
        color: ${theme.palette.text.background};
        font-family: ${theme.typography.fontFamily};
        letter-spacing: 0.2px;
        min-width: ${minMobileWidth}px;

        /* Reset style */
        margin: 0;
    }

    h1, h2, h3, h4, h5, h6, p {
        /* Reset style */
        margin: 0;
    }

    button {
        /* Reset style */
        outline: none;
        border: none;
        padding: 0;
        background: inherit;
        color: inherit;
        letter-spacing: inherit;
        text-align: inherit;

        &:focus {
            outline: none;
        }
    }

    a {
        color: inherit;

        /* Reset style */
        text-decoration: none;
    }

    img {
        display: block;
    }
`;

export default GlobalStyle;