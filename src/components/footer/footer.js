import React from 'react';
import { FlexBox, Text, cardProps } from '../styled';
import { FooterContainer } from './footerStyledComponents';
import { useMediaQuery } from '../../hooks';

function Footer() {
    const { isDesktop } = useMediaQuery();
    const headerContainerPadding = isDesktop ? [10, 8, 8, 8] : [10, 2, 8, 2];

    return (
        <FooterContainer $variant={cardProps.variant.background} $p={headerContainerPadding}>
            <FlexBox $center>
                <Text>©2024 Apartment Score</Text>
            </FlexBox>
        </FooterContainer>
    );
};

export default Footer;