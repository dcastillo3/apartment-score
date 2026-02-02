import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context';

function Logout() {
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);

    useEffect(() => {
        const handleLogout = async () => {
            await logout();

            navigate('/');
        };

        handleLogout();
    }, [logout, navigate]);

    return null;
}

export default Logout;
