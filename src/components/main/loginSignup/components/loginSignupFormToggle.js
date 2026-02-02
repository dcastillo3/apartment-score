import React from 'react';
import { Box, FlexBox, SemanticButton, Text, SubTitle } from '../../../styled';

function LoginSignupFormToggle({ promptText, buttonText, onToggle }) {
    return (
        <FlexBox $center>
            <Text>{promptText}</Text>
            <Box $m={[0, 0, 0, 1]}>
                <SemanticButton onClick={onToggle}>
                    <SubTitle>{buttonText}</SubTitle>
                </SemanticButton>
            </Box>
        </FlexBox>
    );
}

export default LoginSignupFormToggle;
