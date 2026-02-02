import React from 'react';
import { Box, FlexBox, Button, TextSmall } from '../../../styled';
import { DividerLine } from '../loginSignupStyledComponents';
import { buttonLabels } from '../loginSignupConsts';

function LoginSignupGoogleButton({ buttonSize, buttonVariant, handleGoogleLogin, loading }) {
    return (
        <FlexBox $center>
            <Box>
                <FlexBox $center $m={[4, 0]}>
                    <DividerLine />
                    <Box $p={[0, 2]}>
                        <TextSmall>OR</TextSmall>
                    </Box>
                    <DividerLine />
                </FlexBox>

                <FlexBox $center>
                    <Button
                        $size={buttonSize}
                        $variant={buttonVariant}
                        onClick={handleGoogleLogin}
                        disabled={loading}
                    >
                        {buttonLabels.googleLogin}
                    </Button>
                </FlexBox>
            </Box>
        </FlexBox>
    );
}

export default LoginSignupGoogleButton;
