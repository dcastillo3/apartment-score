import React from 'react';
import { Box } from '../../../styled';
import { Form } from '../../../common';
import { loginForm } from '../loginSignupForms';
import { toggleText } from '../loginSignupConsts';
import LoginSignupFormToggle from './loginSignupFormToggle';

function LoginSignupCredentialsForm({ handleSubmit, handleToggleForm }) {
    return (
        <Box>
            <Form
                formParams={loginForm}
                handleSubmit={handleSubmit}
            />

            <LoginSignupFormToggle
                promptText={toggleText.noAccount}
                buttonText={toggleText.signupButton}
                onToggle={handleToggleForm}
            />
        </Box>
    );
}

export default LoginSignupCredentialsForm;
