import styled from 'styled-components';
import { FlexBox, Image } from '../styled';

const ApartmentListItemDetailsContainer = styled(FlexBox)`
    justify-content: space-between;
`;

const ApartmentListItemImage = styled(Image)`
    width: 100%;
    height: 200px;
    border-radius: ${({theme}) => theme.spacing(1, 1, 0, 0)};
    object-fit: cover;
`;

export {
    ApartmentListItemDetailsContainer,
    ApartmentListItemImage
};