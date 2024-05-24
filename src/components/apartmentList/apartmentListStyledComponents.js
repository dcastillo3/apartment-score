import styled from 'styled-components';
import { Card, FlexBox, Image } from '../styled';

const ApartmentListItemDetailsContainer = styled(FlexBox)`
    justify-content: space-between;
`;

const ApartmentListItemImage = styled(Image)`
    width: 100%;
    height: 200px;
    border-radius: ${({theme}) => theme.spacing(1, 1, 0, 0)};
    object-fit: cover;
`;

const ApartmentListItemContainer = styled(Card)`
    ${({theme}) => `transition: ${theme.transitions.create(['background'], {
        duration: theme.transitions.duration.standard,
    })};`}

    ${({$highlighted, theme}) => $highlighted && `
        background: ${theme.palette.success.main};
    `}
`;

export {
    ApartmentListItemDetailsContainer,
    ApartmentListItemImage,
    ApartmentListItemContainer
};