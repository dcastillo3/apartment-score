import React, { useState } from 'react';
import { menuRoutes } from '../../routes/routesConsts';
import { MobileMenuContainer, MenuIcon as MenuIconStyled, MobileMenuItemsContainer, MobileMenuItemContainer } from './menuStyledComponents';
import MenuItem from './menuItem';
import { FlexBoxColumn, SemanticButton, cardProps } from '../styled';
import MenuIcon from '@mui/icons-material/Menu';
import { ClickAwayListener } from '@mui/material';

function MobileMenu() {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMobileMenu = () => {
        setShowMenu(!showMenu);
    };

    const menuItems = showMenu && menuRoutes.map(({ name, path }, idx) => (
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