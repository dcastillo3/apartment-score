import styled from "styled-components";
import { Card, FlexBox } from "../../styled";

const LoginSignupContainer = styled(Card)`
    form {
        width: 100%;
    }
`;

const DividerLine = styled(FlexBox)`
    flex: 1;
    height: 1px;
    background-color: ${props => props.theme.palette.text.background};
`;

export {
    LoginSignupContainer,
    DividerLine
};
