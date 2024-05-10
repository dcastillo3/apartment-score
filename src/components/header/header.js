import React from 'react';
import { FlexBox, FlexBoxColumn, SubTitle, Title, TitleSmall, cardProps } from '../styled';
import { Menu } from '../menu';
import { HeaderContainer, HeaderLogoMenuContainer } from './headerStyledComponents';
import { useMediaQuery } from '../../hooks';

function Header() {
    const { isDesktop } = useMediaQuery();
    const headerLogoMenuContainerPadding = isDesktop ? [5, 8] : [2];

    return (
        <HeaderContainer>
                <HeaderLogoMenuContainer $variant={cardProps.variant.background} $p={headerLogoMenuContainerPadding}>
                    <FlexBox $itemsPerRow={2}>
                        <SubTitle>ApartmentScore</SubTitle>
        
                        <Menu />
                    </FlexBox>
                </HeaderLogoMenuContainer>
    
                <FlexBoxColumn $p={[8, 0]} $center>
                    <Title>Apartment Score</Title>
                    <TitleSmall>Simple Selection</TitleSmall>
                </FlexBoxColumn>
        </HeaderContainer>
    );
};

export default Header;