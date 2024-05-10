import styled from "styled-components";
import { Card, Box } from "../styled";

const HeaderContainer = styled(Box)`
`;

const HeaderLogoMenuContainer = styled(Card)`
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    z-index: ${({theme}) => theme.zIndex.appBar};
`;

export {
    HeaderContainer,
    HeaderLogoMenuContainer
};