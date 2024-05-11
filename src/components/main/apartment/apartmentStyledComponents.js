import styled from "styled-components";
import { Card, FlexBox } from "../../styled";

const ApartmentContainer = styled(Card)`
`;

const ApartmentButtonHeaderContainer = styled(FlexBox)`
    justify-content: ${({$hasApartments}) => ($hasApartments ? "space-between" : "flex-end")};
`;

export {
    ApartmentContainer,
    ApartmentButtonHeaderContainer
};