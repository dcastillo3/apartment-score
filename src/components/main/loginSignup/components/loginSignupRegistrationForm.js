import React from 'react';
import { Box } from '../../../styled';
import { Form } from '../../../common';
import { signupForm } from '../loginSignupForms';
import { toggleText } from '../loginSignupConsts';
import LoginSignupFormToggle from './loginSignupFormToggle';

function LoginSignupRegistrationForm({ handleSubmit, handleToggleForm }) {
    return (
        <Box>
            <Form
                formParams={signupForm}
                handleSubmit={handleSubmit}
            />

            <LoginSignupFormToggle
                promptText={toggleText.haveAccount}
                buttonText={toggleText.loginButton}
                onToggle={handleToggleForm}
            />
        </Box>
    );
}

export default LoginSignupRegistrationForm;
