import styled from 'styled-components';
import { Box, FlexBox, Image } from '../styled';

const ApartmentListTotalScoreContainer = styled(FlexBox)`
    justify-content: flex-end;
`;

const ApartmentListItemImageContainer = styled(Box)`
    position: relative;
    width: 100%;

    &:after {
        content: '';
        display: block;
        padding-bottom: 100%;
    }
`;

const ApartmentListItemImage = styled(Image)`
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: ${({theme}) => theme.spacing(1, 1, 0, 0)};
    object-fit: cover;
`;

export {
    ApartmentListTotalScoreContainer,
    ApartmentListItemImageContainer,
    ApartmentListItemImage
};