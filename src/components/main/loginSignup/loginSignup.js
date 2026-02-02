import React, { useState, useContext } from 'react';
import { Box, buttonProps, cardProps, variantProps } from '../../styled';
import { Notification } from '../../common';
import { useMediaQuery } from '../../../hooks';
import { AuthContext } from '../../../context';
import { LoginSignupContainer } from './loginSignupStyledComponents';
import { errorMessages, successMessages } from './loginSignupConsts';
import { LoginSignupCredentialsForm, LoginSignupRegistrationForm, LoginSignupGoogleButton } from './components';
import { validateLoginForm, validateSignupForm } from './loginSignupUtils';

// TODO: Implement forgot password feature to allow users to reset their password via email

function LoginSignup() {
    const { isDesktop } = useMediaQuery();
    const { loginWithGoogle, login, signup } = useContext(AuthContext);
    const [showSignup, setShowSignup] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [notificationVariant, setNotificationVariant] = useState('');
    const [loading, setLoading] = useState(false);
    const [showNotification, setShowNotification] = useState(false);

    const loginContainerPadding = isDesktop ? [5, 8] : [2];
    const buttonSize = isDesktop ? buttonProps.size.medium : buttonProps.size.small;

    const handleHideNotification = () => {
        setShowNotification(false);
        setNotificationMessage('');
    };

    const handleToggleForm = () => {
        setShowSignup(!showSignup);
        setNotificationMessage('');
        setShowNotification(false);
    };

    const handleLoginSubmit = async (formData) => {
        setNotificationMessage('');
        setShowNotification(false);

        const { email, password } = formData;
        const validation = validateLoginForm(email, errorMessages);

        if (!validation.valid) {
            setNotificationMessage(validation.error);
            setNotificationVariant(variantProps.error);
            setShowNotification(true);
            return;
        }

        setLoading(true);

        const result = await login(email, password);

        if (result.success) {
            setNotificationMessage(successMessages.loginSuccess);
            setNotificationVariant(variantProps.success);
            setShowNotification(true);
        } else {
            setNotificationMessage(result.error || errorMessages.loginFailed);
            setNotificationVariant(variantProps.error);
            setShowNotification(true);
        }

        setLoading(false);
    };

    const handleSignupSubmit = async (formData) => {
        setNotificationMessage('');
        setShowNotification(false);

        const { email, password, firstName, lastName, userName } = formData;
        const validation = validateSignupForm(email, password, errorMessages);

        if (!validation.valid) {
            setNotificationMessage(validation.error);
            setNotificationVariant(variantProps.error);
            setShowNotification(true);
            return;
        }

        setLoading(true);

        const result = await signup(email, password, firstName, lastName, userName);

        if (result.success) {
            setNotificationMessage(successMessages.signupSuccess);
            setNotificationVariant(variantProps.success);
            setShowNotification(true);
        } else {
            setNotificationMessage(result.error || errorMessages.signupFailed);
            setNotificationVariant(variantProps.error);
            setShowNotification(true);
        }

        setLoading(false);
    };

    const handleGoogleLogin = () => {
        loginWithGoogle();
    };

    const renderNotification = showNotification && (
        <Box $m={[3, 0]}>
            <Notification 
                message={notificationMessage} 
                variant={notificationVariant}
                handleHideNotifiction={handleHideNotification}
            />
        </Box>
    );

    const renderLoginForm = !showSignup && (
        <LoginSignupCredentialsForm
            handleSubmit={handleLoginSubmit}
            handleToggleForm={handleToggleForm}
        />
    );

    const renderSignupForm = showSignup && (
        <LoginSignupRegistrationForm
            handleSubmit={handleSignupSubmit}
            handleToggleForm={handleToggleForm}
        />
    );

    return (
        <LoginSignupContainer $variant={cardProps.variant.background} $p={loginContainerPadding}>
            {renderNotification}
            {renderLoginForm}
            {renderSignupForm}

            <LoginSignupGoogleButton
                buttonSize={buttonSize}
                buttonVariant={buttonProps.variant.info}
                handleGoogleLogin={handleGoogleLogin}
                loading={loading}
            />
        </LoginSignupContainer>
    );
};

export default LoginSignup;
