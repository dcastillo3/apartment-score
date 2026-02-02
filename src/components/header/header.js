import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SubTitle, Title, TitleMedium, TitleSmall, cardProps, SemanticButton } from '../styled';
import { Menu, MobileMenu } from '../menu';
import { HeaderContainer, HeaderFlexBoxContainer, HeaderLogoMenuContainer, HeaderTitleContainer } from './headerStyledComponents';
import { useMediaQuery } from '../../hooks';

function Header() {
    const navigate = useNavigate();
    const { isDesktop } = useMediaQuery();
    const headerLogoMenuContainerPadding = isDesktop ? [5, 8] : [2];
    const HeaderTitleComponent = isDesktop ? Title : TitleMedium;
    const HeaderSubTitleComponent = isDesktop ? TitleSmall : SubTitle;

    const handleLogoClick = () => {
        navigate('/');
    };

    const renderDesktopMenu = isDesktop && (
        <Menu />
    );

    const renderMobileMenu = !isDesktop && (
        <MobileMenu />
    );

    return (
        <HeaderContainer>
                <HeaderLogoMenuContainer $variant={cardProps.variant.background} $p={headerLogoMenuContainerPadding}>
                    <HeaderFlexBoxContainer $isDesktop={isDesktop}>
                        {renderMobileMenu}

                        <SemanticButton onClick={handleLogoClick}>
                            <SubTitle>ApartmentScore</SubTitle>
                        </SemanticButton>

                        {renderDesktopMenu}
                    </HeaderFlexBoxContainer>
                </HeaderLogoMenuContainer>
    
                <HeaderTitleContainer $p={[8, 0]} $center>
                    <HeaderTitleComponent>Apartment Score</HeaderTitleComponent>
                    <HeaderSubTitleComponent>Simple Selection</HeaderSubTitleComponent>
                </HeaderTitleContainer>
        </HeaderContainer>
    );
};

export default Header;