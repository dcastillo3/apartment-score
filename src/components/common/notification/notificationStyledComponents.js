import styled from 'styled-components';
import { Card } from 'components/styled';

const NotificationContainer = styled(Card)`
    position: fixed;
    bottom: 0px;
    right: 0px;
    /* use theme z-index */
    z-index: ${({ theme }) => theme.zIndex.snackbar};
`;

export { 
    NotificationContainer
};
