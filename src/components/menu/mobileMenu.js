import React, { useState, useContext } from 'react';
import { authenticatedMenuRoutes, unauthenticatedMenuRoutes, generalMenuRoutes } from '../../routes/routesConsts';
import { getFilteredMenuRoutes } from './menuUtils';
import { AuthContext } from '../../context';
import { MobileMenuContainer, MenuIcon as MenuIconStyled, MobileMenuItemsContainer, MobileMenuItemContainer } from './menuStyledComponents';
import MenuItem from './menuItem';
import { FlexBoxColumn, SemanticButton, cardProps } from '../styled';
import MenuIcon from '@mui/icons-material/Menu';
import { ClickAwayListener } from '@mui/material';

function MobileMenu() {
    const [showMenu, setShowMenu] = useState(false);
    const { isAuthenticated } = useContext(AuthContext);
    const filteredMenuRoutes = getFilteredMenuRoutes(authenticatedMenuRoutes, unauthenticatedMenuRoutes, generalMenuRoutes, isAuthenticated);

    const toggleMobileMenu = () => {
        setShowMenu(!showMenu);
    };

    const menuItems = showMenu && filteredMenuRoutes.map(({ name, path }, idx) => (
        <MobileMenuItemContainer key={idx} $p={[4, 0]} $m={[0, 4]} $borderVariant={'backgroundLight'}>
            <MenuItem name={name} path={path} callback={toggleMobileMenu} />
        </MobileMenuItemContainer>
    ));

    const renderMenuItems = showMenu && (
        <ClickAwayListener onClickAway={toggleMobileMenu}>
            <MobileMenuItemsContainer $variant={cardProps.variant.info}>
                <FlexBoxColumn>
                    {menuItems}
                </FlexBoxColumn>
            </MobileMenuItemsContainer>
        </ClickAwayListener>
    );

    return (
        <MobileMenuContainer>
            <SemanticButton onClick={toggleMobileMenu} >
                <MenuIconStyled component={MenuIcon} />
            </SemanticButton>

            {renderMenuItems}
        </MobileMenuContainer>
    );
};

export default MobileMenu;