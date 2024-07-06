import styled from "styled-components";
import { Card, FlexBox } from "../../styled";

const ApartmentsContainer = styled(Card)`
`;

const ApartmentsFilterContainer = styled(FlexBox)`
`;

const ApartmentsFilterContainerLeft = styled(FlexBox)`
    align-items: flex-end;
`;

const ApartmentsFilterContainerRight = styled(FlexBox)`
    flex: 1;
    align-items: flex-end;
    justify-content: flex-end;
`;

export {
    ApartmentsContainer,
    ApartmentsFilterContainer,
    ApartmentsFilterContainerLeft,
    ApartmentsFilterContainerRight
};