import React, { useContext } from 'react';
import { authenticatedMenuRoutes, unauthenticatedMenuRoutes, generalMenuRoutes } from '../../routes/routesConsts';
import { getFilteredMenuRoutes } from './menuUtils';
import { AuthContext } from '../../context';
import MenuItem from './menuItem';
import { MenuContainer } from './menuStyledComponents';

function Menu() {
    const { isAuthenticated } = useContext(AuthContext);
    const filteredMenuRoutes = getFilteredMenuRoutes(authenticatedMenuRoutes, unauthenticatedMenuRoutes, generalMenuRoutes, isAuthenticated);

    const renderMenuItems = filteredMenuRoutes.map(({ name, path, icon }, idx) => (
        <MenuItem key={idx} name={name} path={path} icon={icon} />
    ));

    return (
        <MenuContainer>
            {renderMenuItems}
        </MenuContainer>
    );
};

export default Menu;