import React from 'react';
import { menuRoutes } from '../../routes/routesConsts';
import MenuItem from './menuItem';
import { UserMenu } from '../userMenu';
import { MenuContainer } from './menuStyledComponents';

function Menu() {
    const renderMenuItems = menuRoutes.map(({ name, path, icon }, idx) => (
        <MenuItem key={idx} name={name} path={path} icon={icon} />
    ));

    return (
        <MenuContainer>
            {renderMenuItems}
            <UserMenu />
        </MenuContainer>
    );
};

export default Menu;