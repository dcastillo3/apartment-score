import React, { useContext } from 'react';
import { AuthContext } from '../../context';
import { FlexBox } from '../styled';
import LoginButton from './components/loginButton';
import UserProfile from './components/userProfile';

function UserMenu() {
    const { user, isAuthenticated, login, logout } = useContext(AuthContext);

    const renderUserProfile = isAuthenticated && (
        <UserProfile user={user} logout={logout} />
    );

    const renderLoginButton = !isAuthenticated && (
        <LoginButton login={login} />
    );

    return (
        <FlexBox>
            {renderUserProfile}
            {renderLoginButton}
        </FlexBox>
    );
}

export default UserMenu;
