import styled from "styled-components";
import { Box, Card, FlexBox } from "../../styled";

const ApartmentsContainer = styled(Card)`
`;

const ApartmentsFilterContainer = styled(FlexBox)`
`;

const ApartmentsFilterContainerLeft = styled(FlexBox)`
    align-items: flex-end;
`;

const ApartmentsFilterContainerRight = styled(FlexBox)`
    flex: auto;
    align-items: flex-end;
    justify-content: flex-end;
`;

const ApartmentsMobileAddButtonContainer = styled(FlexBox)`
    position: fixed;
    bottom: 0;
    right: 0;
    margin: ${({theme}) => theme.spacing(4)};
    z-index: ${({theme}) => theme.zIndex.fab};
    box-shadow: ${({theme}) => theme.shadows[4]};
`;

const ApartmentsMobileAddButtonIconContainer = styled(Box)`
    position: relative;
    top: 2px;
`;

export {
    ApartmentsContainer,
    ApartmentsFilterContainer,
    ApartmentsFilterContainerLeft,
    ApartmentsFilterContainerRight,
    ApartmentsMobileAddButtonContainer,
    ApartmentsMobileAddButtonIconContainer
};