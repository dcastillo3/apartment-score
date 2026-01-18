import styled from 'styled-components';
import { Image } from '../styled';

const UserAvatar = styled(Image)`
    width: ${({theme}) => theme.spacing(4)};
    height: ${({theme}) => theme.spacing(4)};
    border-radius: 50%;
    object-fit: cover;
    border: 2 solid ${({theme}) => theme.palette.background.medium};
`;

export {
    UserAvatar
};
