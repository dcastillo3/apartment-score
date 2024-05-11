import styled from "styled-components";
import { Box, Card, FlexBox, FlexBoxColumn, SemanticButton } from "../styled";
import { Icon } from "@mui/material";

const MenuContainer = styled(FlexBox)`
    justify-content: flex-end;
`;

const MenuItemContainer = styled(SemanticButton)`
    ${({active}) => active && `text-decoration: underline;`}
`;

const MobileMenuItemsContainer = styled(Card)`
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    width: ${({theme}) => theme.spacing(50)};
    z-index: ${({theme}) => theme.zIndex.drawer};
`;

const MobileMenuItemContainer = styled(Box)`
    border-bottom: solid 1px ${({theme, $borderVariant}) => theme.palette[$borderVariant].main};
`;

const MobileMenuContainer = styled(FlexBoxColumn)`
`;

const MenuIcon = styled(Icon)`
    font-size: ${({theme}) => theme.typography.h3.fontSize} !important;
    position: relative !important;
    top: 3px !important;
`;

export {
    MenuContainer,
    MenuItemContainer,
    MobileMenuItemsContainer,
    MobileMenuItemContainer,
    MobileMenuContainer,
    MenuIcon
};