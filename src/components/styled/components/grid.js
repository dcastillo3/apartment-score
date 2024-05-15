import styled from 'styled-components';
import { Box } from './box';
import { buildGrid } from '../styledUtils';

export const Grid = styled(Box)`
    display: grid;

    /* Explicitly set form field width to prevent grid overlap */
    input, select, textarea {
        width: 100%;
    }
    
    /* Style overrides last */
    ${buildGrid}
`;