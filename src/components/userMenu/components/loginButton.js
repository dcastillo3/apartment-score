import React from 'react';
import { Button, buttonProps } from '../../styled';
import { labels } from '../userMenuConsts';

function LoginButton({ login }) {
    return (
        <Button 
            onClick={login}
            $variant={buttonProps.variant.primary}
            $size={buttonProps.size.medium}
        >
            {labels.loginButton}
        </Button>
    );
}

export default LoginButton;
